import React from 'react';
import { Zap, Sun, Moon, ArrowLeft, ArrowRight, Plus, Minus } from 'lucide-react';
import Stepper from './ui/Stepper';
import Button from './ui/Button';
import { PREDEFINED_DEVICES } from '../constants/devices';
import styles from './step.module.css';

const StepDeviceList = ({ selectedStandard, setSelectedStandard, onNext, onBack }) => {
  
  const updateValue = (deviceId, field, delta) => {
    const currentVal = selectedStandard[deviceId][field] || 0;
    const newVal = Math.max(0, currentVal + delta);
    setSelectedStandard(prev => ({
      ...prev,
      [deviceId]: { ...prev[deviceId], [field]: newVal }
    }));
  };

  const toggleDevice = (device) => {
    setSelectedStandard(prev => {
      if (prev[device.id]) {
        const next = { ...prev };
        delete next[device.id];
        return next;
      }
      
      // تهيئة الجهاز مع دعم القدرة المنفصلة للمكيفات
      const isAC = device.id.includes('ac');
      return {
        ...prev,
        [device.id]: {
          dayCount: 1,
          nightCount: 1,
          power: device.defaultPower, // القدرة العامة للأجهزة العادية
          dayPower: isAC ? (device.dayPower || 1000) : device.defaultPower, // قدرة النهار
          nightPower: isAC ? (device.nightPower || 400) : device.defaultPower, // قدرة الليل
          dayHours: device.nightOnly ? 0 : 6,
          nightHours: device.id === 'lights' ? 12 : 6
        }
      };
    });
  };

  return (
    <div className={styles.stepCard}>
      <h3 className={styles.title}>
        <Zap size={20} className={styles.titleIcon} /> اختيار الأجهزة والأحمال
      </h3>

      <div className={styles.deviceGrid}>
        {PREDEFINED_DEVICES.map((device) => {
          const isSelected = !!selectedStandard[device.id];
          const isAC = device.id.includes('ac');

          return (
            <div 
              key={device.id} 
              className={`${styles.deviceCard} ${isSelected ? styles.deviceCardActive : ''}`}
            >
              <div className={styles.deviceHeader} onClick={() => toggleDevice(device)}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-[#f28100] text-white' : 'bg-slate-200 text-slate-400'}`}>
                    <Zap size={18} />
                  </div>
                  <span className={`font-bold text-sm ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>
                    {device.label}
                  </span>
                </div>
                
                {/* إظهار القدرة العامة فقط للأجهزة غير المكيفة */}
                {isSelected && !isAC && (
                  <div className={styles.powerBadge}>
                    <button onClick={(e) => { e.stopPropagation(); updateValue(device.id, 'power', -10); }}><Minus size={12}/></button>
                    <span>{selectedStandard[device.id].power}W</span>
                    <button onClick={(e) => { e.stopPropagation(); updateValue(device.id, 'power', 10); }}><Plus size={12}/></button>
                  </div>
                )}
              </div>

              {isSelected && (
                <div className={styles.deviceControls}>
                  {/* قسم النهار */}
                  {!device.nightOnly && (
                    <div className="flex flex-col gap-2 mb-3">
                      <div className="grid grid-cols-2 gap-3">
                        <Stepper 
                          label="عدد النهار" 
                          value={selectedStandard[device.id].dayCount} 
                          onInc={() => updateValue(device.id, 'dayCount', 1)} 
                          onDec={() => updateValue(device.id, 'dayCount', -1)} 
                        />
                        <Stepper 
                          label="ساعات نهاراً" 
                          unit="س" 
                          icon={<Sun size={19} className={styles.dayColor}/>}
                          value={selectedStandard[device.id].dayHours} 
                          onInc={() => updateValue(device.id, 'dayHours', 1)} 
                          onDec={() => updateValue(device.id, 'dayHours', -1)} 
                        />
                      </div>
                      {/* إضافة تحكم القدرة النهارية للمكيف */}
                      {isAC && (
                        <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <span className="text-[10px] font-bold text-slate-500">قدرة النهار (سوبر)</span>
                          <div className={styles.powerBadge}>
                            <button onClick={() => updateValue(device.id, 'dayPower', -50)}><Minus size={12}/></button>
                            <span className="text-xs font-bold">{selectedStandard[device.id].dayPower}W</span>
                            <button onClick={() => updateValue(device.id, 'dayPower', 50)}><Plus size={12}/></button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* قسم الليل */}
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-3">
                      <Stepper 
                        label="عدد الليل" 
                        value={selectedStandard[device.id].nightCount} 
                        onInc={() => updateValue(device.id, 'nightCount', 1)} 
                        onDec={() => updateValue(device.id, 'nightCount', -1)} 
                      />
                      <Stepper 
                        label="ساعات ليلاً"
                        unit="س" 
                        icon={<Moon size={19} className={styles.nightColor}/>}
                        value={selectedStandard[device.id].nightHours} 
                        onInc={() => updateValue(device.id, 'nightHours', 1)} 
                        onDec={() => updateValue(device.id, 'nightHours', -1)} 
                      />
                    </div>
                    {/* إضافة تحكم القدرة الليلية للمكيف */}
                    {isAC && (
                      <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <span className="text-[10px] font-bold text-slate-500">قدرة الليل (اقتصادي)</span>
                        <div className={styles.powerBadge}>
                          <button onClick={() => updateValue(device.id, 'nightPower', -50)}><Minus size={12}/></button>
                          <span className="text-xs font-bold">{selectedStandard[device.id].nightPower}W</span>
                          <button onClick={() => updateValue(device.id, 'nightPower', 50)}><Plus size={12}/></button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.footer}>
        <Button onClick={onBack} icon={ArrowRight} variant="secondary">السابق</Button>
        <Button onClick={onNext} variant="amber" icon={ArrowLeft}>التالي</Button>
      </div>
    </div>
  );
};

export default StepDeviceList;
