import React from 'react';
import { SolarPanel, Battery, Zap, LayoutDashboard, Share2 } from 'lucide-react';
import styles from './calculator.module.css';
// مكون فرعي داخلي للنتائج
function ResultItem({ icon, label, value, unit, colorClass, bgClass, brand= null }) {
  return (
    // أضفنا flex و justify-between لضمان توزيع العناصر على الأطراف
    <div className={`${styles.itemBox} flex items-center justify-between w-full`}>
      
      {/* القسم الأيمن: يحتوي الأيقونة والنصوص */}
      <div className="flex items-center gap-3">
        <div className={`${styles.iconWrapper} ${bgClass} ${colorClass}`}>
          {React.cloneElement(icon, { size: 28 })}
        </div>
        <div>
          <p className={styles.label}>{label}</p>
          <p className={styles.value}>
            {value} <span className={styles.unit}>{unit}</span>
          </p>
        </div>
      </div>

      {/* القسم الأيسر: يظهر فيه اسم الماركة فقط */}
      {brand && (
        <div className="text-left">
          <span className="text-[10px] font-bold text-emerald-400/60 uppercase border-l border-emerald-500/20 pl-2">
            {brand}
          </span>
        </div>
      )}
      
    </div>
  );
}
function SolarCalculator({ results }) { 
  // 2. الحماية من الخطأ: التأكد من وجود results قبل القراءة
  const hasResults = results && results.panels > 0;
  // استخراج بيانات العميل من داخل results التي أرسلناها من الفورم
  const client = results?.customerInfo;

      /* const handleWhatsApp = () => {
    if (!hasResults) return;

    const phoneNumber = "967783265111";
    
    const deviceLabels = {
      lights: 'لمبات LED',
      fans: 'مراوح',
      tvs: 'شاشة',
      washers: 'غسالة',
      fridges: 'ثلاجة',
      ac_1ton: 'مكيف طن (إنفرتر)',
      ac_1_5ton: 'مكيف طن ونص (إنفرتر)'
    };

    const devicesList = Object.entries(results.selectedDevices || {}).map(([id, dev]) => {
      const dC = Number(dev.dayCount) || 0;
      const nC = Number(dev.nightCount) || 0;
      const power = Number(dev.power) || 0;
      const dH = Number(dev.dayHours) || 0;
      const nH = Number(dev.nightHours) || 0;
      
      const deviceName = deviceLabels[id] || id; 
      // حساب إجمالي استهلاك الجهاز الواحد بناءً على التقسيم الجديد
      const totalWh = (dC * dH * power) + (nC * nH * power);

      return `◈_ *${deviceName}*: القدرة ${power}W\n` +
             `#_ *النهار* \n` +
             `•_ العدد: ${dC} \n` +
             `•_ عدد الساعات: ${dH}س \n` +
             `#_ *المساء* \n` +
             `•_ العدد: ${nC} \n` +
             `•_ عدد الساعات: ${nH}س \n` +
             `•_ إجمالي الاستهلاك: ${totalWh}Wh`;
    }).join('\n\n_______________\n\n');
    

    const message = 
      `️# *نتائج التحجيم لشركة Land Solar* \n` +
      `________________________\n\n` +
      `@ *بيانات العميل:*\n\n` +
      `• الاسم: ${results.customerInfo?.name || 'غير محدد'}\n` +
      `• الجوال: ${results.customerInfo?.phone || 'غير محدد'}\n` +
      `• المنطقة: ${results.customerInfo?.address || 'غير محدد'}\n` +
      `________________________\n\n` +
      `📋 *تفاصيل الاستهلاك اليومي:*\n\n` +
      `${devicesList}\n\n` +
      `________________________\n\n` +
      `📊 *ملخص الطاقة:* \n\n` +
      `• أحمال الذروة: ${results.peakLoadKw || '0'} KW\n` + 
      `• استهلاك النهار: ${results.dayEnergyWh || '0'} Wh\n` +
      `• استهلاك المساء: ${results.nightEnergyWh || '0'} Wh\n` +
      `• الإجمالي اليومي: ${results.actualLoadKwh || '0'} kWh\n\n` +
      `🛠️ *المنظومة المقترحة:*\n` +
      `◈ *الألواح:* ${results.panels || '0'} ألواح (${results.panelCapacity || ''})\n` +
      `   ➥ النوع: ${results.panelName || ''}\n\n` +
      `◈ *الإنفرتر:* ${results.inverterProductValue || '0'} KW\n` +
      `   ➥ الموديل: ${results.inverterName || ''}\n\n` +
      `◈ *البطارية:* ${results.batteryKwh || '0'} kWh\n` +
      `   ➥ النوع: ${results.batteryName || ''} LiFePO4 (ليثيوم)\n\n` +
      `━━━━━━━━━━━━━━━━\n` +
      `🔗 *رابط مراجعة النتائج:* [رابط الملحق]\n\n` +
      `*تم التحليل بواسطة تطبيق Land Solar*`;

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }; */
const handleWhatsApp = () => {
  if (!hasResults) return;

  const phoneNumber = "967783265111";
  const deviceLabels = {
    lights: 'لمبات LED',
    fans: 'مراوح',
    tvs: 'شاشة',
    washers: 'غسالة',
    fridges: 'ثلاجة',
    ac_1ton: 'مكيف طن (إنفرتر)',
    ac_1_5ton: 'مكيف طن ونص (إنفرتر)'
  };

  // تنسيق قائمة الأجهزة بالتفصيل الجديد
  const devicesList = Object.entries(results.selectedDevices || {}).map(([id, dev]) => {
    const dC = Number(dev.dayCount) || 0;
    const nC = Number(dev.nightCount) || 0;
    const dP = Number(dev.dayPower) || Number(dev.power) || 0;
    const nP = Number(dev.nightPower) || Number(dev.power) || 0;
    const dH = Number(dev.dayHours) || 0;
    const nH = Number(dev.nightHours) || 0;
    
    const deviceName = deviceLabels[id] || id; 
    const deviceTotalWh = (dC * dP * dH) + (nC * nP * nH);

    return `◈_ *${deviceName}*: القدرة ${dP === nP ? dP + 'W' : dP + '/' + nP + 'W'}\n` +
           `#_ *النهار* \n` +
           `•_ العدد: ${dC} | ساعات: ${dH}س\n` +
           `#_ *المساء* \n` +
           `•_ العدد: ${nC} | ساعات: ${nH}س\n` +
           `•_ استهلاك الجهاز: ${deviceTotalWh}Wh`;
  }).join('\n\n_______________\n\n');

  const message = 
    `️# *نتائج التحجيم لشركة Land Solar* \n` +
    `________________________\n\n` +
    `@ *بيانات العميل:*\n\n` +
    `• الاسم: ${results.customerInfo?.name || 'غير محدد'}\n` +
    `• الجوال: ${results.customerInfo?.phone || 'غير محدد'}\n` +
    `• المنطقة: ${results.customerInfo?.address || 'غير محدد'}\n` +
    `________________________\n\n` +
    `📋 *تفاصيل الاستهلاك اليومي:*\n\n` +
    `${devicesList}\n\n` +
    `________________________\n\n` +
    `📊 *ملخص الطاقة:* \n\n` +
    `• أحمال الذروة: ${results.peakLoadKw} KW\n` + 
    `• استهلاك النهار: ${results.dayEnergyWh} Wh\n` +
    `• استهلاك المساء: ${results.nightEnergyWh} Wh\n` +
    `• الإجمالي اليومي: ${results.actualLoadKwh} kWh\n\n` +
    `🛠️ *المنظومة المقترحة:*\n` +
    `◈ *الألواح:* ${results.panels} ألواح (${results.panelCapacity})\n` +
    `   ➥ النوع: ${results.panelName}\n\n` +
    `◈ *الإنفرتر:* ${results.inverterProductValue} KW\n` +
    `   ➥ الموديل: ${results.inverterName}\n\n` +
    `◈ *البطارية:* ${results.batteryKwh} kWh\n` +
    `   ➥ النوع: ${results.batteryName} LiFePO4 (ليثيوم)\n\n` +
    `━━━━━━━━━━━━━━━━\n` +
    `🔗 *رابط مراجعة النتائج:* [رابط الملحق]\n\n` +
    `*تم التحليل بواسطة تطبيق Land Solar*`;

  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
};

  return (
    <div className={styles.resultsCard}>
      <div className={styles.glow}></div>
      
      <h3 className={styles.header}>
        <LayoutDashboard size={20} className="text-[#00a896]" /> تحليل المنظومة المقترحة
      </h3>
      
      <div className={styles.itemsContainer}>
        <ResultItem 
          icon={<SolarPanel />} 
          label="عدد الألواح" 
          value={hasResults ? results.panels : "--"} 
          brand={hasResults ? results.panelName : null}
          unit="ألواح" 
          colorClass="text-emerald-400" 
          bgClass="bg-emerald-500/10" 
        />
        <ResultItem 
          icon={<Zap />} 
          label="حجم الإنفرتر" 
          value={hasResults ? results.inverterProductValue : "--"} 
brand={hasResults ? results.inverterName : null}
          unit="kW" 
          colorClass="text-emerald-400" 
          bgClass="bg-emerald-500/10" 
        />
        <ResultItem 
          icon={<Battery />} 
          label="سعة تخزين LiFePO4" 
          value={hasResults ? results.batteryKwh : "--"} 
         brand={hasResults ? results.batteryName : null}
          unit="kWh" 
          colorClass="text-emerald-400" 
          bgClass="bg-emerald-500/10" 
        />
      </div>

      {hasResults && (
        <div className={styles.footerActions}>
          <button className={styles.btnQuote}
          onClick={handleWhatsApp}
          >
            طلب عرض سعر رسمي
          </button>
          <button className="w-full bg-emerald-900/40 text-emerald-100 py-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border border-emerald-700/30">
            <Share2 size={16} /> مشاركة التقرير
          </button>
        </div>
      )}
    </div>
  );
}

export default SolarCalculator;
