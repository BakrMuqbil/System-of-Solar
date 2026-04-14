import React, { useState } from 'react';
import StepCustomerInfo from './StepCustomerInfo';
import StepDeviceList from './StepDeviceList';
import StepPanelSelection from './StepPanelSelection';
import { calculateSolarSystem } from '../utils/solarCalculations';
import styles from './form.module.css';

function SolarForm({ onCalculate }) {
  const [step, setStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });
  const [selectedStandard, setSelectedStandard] = useState({});
  const [selectedPanel, setSelectedPanel] = useState({ 
    capacity: "--", 
    brand: "--" 
  });

  const handleFinalCalculate = () => {
    // 1. تنظيف رقم قدرة اللوح وتحويله من "590W" إلى 590
    const numericPanelPower = parseFloat(selectedPanel.capacity.replace(/[^\d.]/g, ''));
    
    // 2. التحقق من وجود أجهزة مختارة لتجنب نتيجة الصفر
    if (Object.keys(selectedStandard).length === 0) {
      alert("يرجى اختيار أجهزة أولاً");
      setStep(2);
      return;
    }
    
if (!numericPanelPower || numericPanelPower === 0) {
    alert("يرجى اختيار ألواح أولاً");
    setStep(3);
    return;
}

    // 3. تنفيذ الحسابات باستخدام الأجهزة والقدرة المختارة
    const results = calculateSolarSystem(selectedStandard, numericPanelPower);

    const finalResults = { 
    ...results, 
    customerInfo,
    selectedDevices: selectedStandard,
    panelBrand: selectedPanel.brand, // تأكد أن selectedPanel يحتوي على brand
    panelCapacity: selectedPanel.capacity 
  };
    // 4. إرسال النتائج مع معلومات العميل واللوح المختار للعرض النهائي
    onCalculate(finalResults);  

    //console.log("Calculation finalResults:", finalResults);
  };

  return (
    <div className={styles.formContainer} dir="rtl">
      {/* مؤشر الخطوات العلوي */}
      <div className={styles.stepHeader}>
        {[1, 2, 3].map((s) => (
          <div key={s} className={styles.stepItem}>
            <div className={`${styles.stepDot} ${step >= s ? styles.activeDot : styles.inactiveDot}`}>
              {s}
            </div>
            <span className={`${styles.stepLabel} ${step >= s ? styles.activeLabel : styles.inactiveLabel}`}>
              {s === 1 ? 'البيانات' : s === 2 ? 'الأجهزة' : 'الألواح'}
            </span>
          </div>
        ))}
      </div>

      <div className="animate-in fade-in slide-in-from-left-4 duration-500">
        {step === 1 && (
          <StepCustomerInfo 
            customerInfo={customerInfo} 
            setCustomerInfo={setCustomerInfo} 
            onNext={() => setStep(2)} 
          />
        )}
        
        {step === 2 && (
          <StepDeviceList 
            selectedStandard={selectedStandard} 
            setSelectedStandard={setSelectedStandard} 
            onNext={() => setStep(3)} 
            onBack={() => setStep(1)} 
          />
        )}
        
        {step === 3 && (
          <StepPanelSelection 
            selectedPanel={selectedPanel} 
            setSelectedPanel={setSelectedPanel} 
            onBack={() => setStep(2)} 
            onCalculate={handleFinalCalculate} 
            customerName={customerInfo.name} 
          />
        )}
      </div>
    </div>
  );
}

export default SolarForm;
