import { solarData } from '../constants/data'; 

/**
 * وظيفة اختيار أفضل إنفرتر وبطارية مطابقين من مصفوفة البيانات
 */
const findBestSelections = (requiredInvSize, totalPVWattage, requiredBattSize) => {
  const parseCapacity = (capStr) => {
    const num = parseFloat(capStr.replace(/[^\d.]/g, ''));
    return isNaN(num) ? 0 : num;
  };

  // --- فلترة الإنفرتر ---
  const sortedInverters = [...solarData.inverters].sort((a, b) => a.price - b.price);
  let matchedInv = sortedInverters.find(inv => 
    parseCapacity(inv.capacity) >= requiredInvSize && 
    inv.maxSolarPower >= totalPVWattage
  );
  if (!matchedInv) matchedInv = sortedInverters[sortedInverters.length - 1];

  // --- فلترة البطارية ---
  const sortedBatteries = [...solarData.batteries].sort((a, b) => a.price - b.price);
  let matchedBatt = sortedBatteries.find(batt => 
    parseCapacity(batt.capacity) >= requiredBattSize
  );
  if (!matchedBatt) matchedBatt = sortedBatteries[sortedBatteries.length - 1];

  return { selectedInverter: matchedInv, selectedBattery: matchedBatt };
};

/**
 * الدالة الرئيسية لحسابات المنظومة الشمسية
 * تم التحديث لدعم القدرة المتغيرة (النهار والليل) للمكيفات
 */
export const calculateSolarSystem = (selectedDevices, panelPower) => {
  let dayEnergyWh = 0;    
  let nightEnergyWh = 0;  
  let maxPeakLoad = 0;    

  // حساب الاستهلاك بناءً على الأجهزة المختارة
  Object.values(selectedDevices).forEach(device => {
    // 1. تحديد القدرة لكل فترة:
    // إذا كان للجهاز قدرة نهارية/ليلية مخصصة (مثل المكيف) نستخدمها، وإلا نستخدم القدرة العامة
    const dP = Number(device.dayPower) || Number(device.power) || 0;
    const nP = Number(device.nightPower) || Number(device.power) || 0;

    // 2. حساب حمل الذروة (Peak Load):
    // يعتمد على أقصى سحب لحظي محتمل (إما كل أجهزة النهار تعمل معاً أو كل أجهزة الليل)
    const currentPeak = Math.max(
      (Number(device.dayCount) || 0) * dP,
      (Number(device.nightCount) || 0) * nP
    );
    maxPeakLoad += currentPeak;
    
    // 3. حساب استهلاك الطاقة (Wh):
    // المعادلة المحدثة: (عدد النهار * قدرة النهار * ساعات النهار) + (عدد الليل * قدرة الليل * ساعات الليل)
    const dayWh = (Number(device.dayCount) || 0) * dP * (Number(device.dayHours) || 0);
    const nightWh = (Number(device.nightCount) || 0) * nP * (Number(device.nightHours) || 0);

    dayEnergyWh += dayWh;
    nightEnergyWh += nightWh;
  });

  const totalDailyEnergy = dayEnergyWh + nightEnergyWh;

  // 1. حساب الألواح (6 ساعات ذروة مع معامل فقد وكفاءة 0.88)
  const totalEnergyRequired = totalDailyEnergy * 1.15; // إضافة هامش أمان 15%
  const panelsNeeded = Math.ceil(totalEnergyRequired / (panelPower * 6 * 0.88));
  const totalPVWattage = panelsNeeded * panelPower;

  // 2. حساب حجم الإنفرتر (الحمل الأقصى * معامل أمان 1.2 لتحمل تيار البدء)
  const theoreticalInverterSizeKva = (maxPeakLoad * 1.2) / 1000;
  
  // 3. حساب سعة البطارية المطلوبة (تعتمد كلياً على استهلاك المساء)
  // كفاءة التفريغ لبطاريات الليثيوم LiFePO4 محسوبة بـ 90%
  const calculatedBattery = (nightEnergyWh / 1000) / (0.9 * 0.9);
  const minBattery = 2.5; // الحد الأدنى للبطارية المتوفرة

  const finalBatteryKwh = nightEnergyWh > 0 
    ? Math.max(calculatedBattery, minBattery) 
    : minBattery;

  // اختيار أفضل المكونات المتوفرة من قاعدة البيانات بناءً على النتائج المحسوبة
  const { selectedInverter, selectedBattery } = findBestSelections(
    theoreticalInverterSizeKva, 
    totalPVWattage, 
    finalBatteryKwh
  );
  
  // تنظيف القيم النصية وتحويلها لأرقام للعرض في الواجهة
  const productValueOnly = parseFloat(selectedInverter.capacity.replace(/[^\d.]/g, ''));
  const battereValueOnly = parseFloat(selectedBattery.capacity.replace(/[^\d.]/g, ''));
  const selectedPanelObj = solarData.solarPanels.find(p => parseFloat(p.capacity) === panelPower);

  // إرجاع النتائج النهائية
  return {
    panels: panelsNeeded,
    inverterProductValue: productValueOnly, 
    inverterActualNeed: theoreticalInverterSizeKva.toFixed(2), 
    inverterBrand: selectedInverter.brand,
    inverterName: selectedInverter.name, 
    
    batteryKwh: battereValueOnly,
    batteryPrice: selectedBattery.price,
    batteryName: selectedBattery.name, 
    
    batteries: parseFloat(finalBatteryKwh.toFixed(1)),
    totalEnergy: totalDailyEnergy,
    peakLoad: (maxPeakLoad / 1000).toFixed(2),

    panelName: selectedPanelObj ? selectedPanelObj.name : `${panelPower}W`,
    panelCapacity: `${panelPower}W`, // إضافة القدرة للتقرير
    
    dayEnergyWh: Math.round(dayEnergyWh),
    nightEnergyWh: Math.round(nightEnergyWh),
    actualLoadKwh: (totalDailyEnergy / 1000).toFixed(2),
    peakLoadKw: (maxPeakLoad / 1000).toFixed(2),
    
    // تمرير مصفوفة الأجهزة المحدثة لضمان ظهور تفاصيل النهار والليل في التقرير
    selectedDevices: selectedDevices 
  };
};
