export const PREDEFINED_DEVICES = [
  { 
    id: 'lights', 
    label: 'لمبات LED', 
    defaultPower: 30, 
    nightOnly: true 
  }, 
  { 
    id: 'fans', 
    label: 'مراوح', 
    defaultPower: 20 
  },
  { 
    id: 'tvs', 
    label: 'شاشة', 
    defaultPower: 100 
  },
  { 
    id: 'washers', 
    label: 'غسالة', 
    defaultPower: 300 
  },
  { 
    id: 'fridges', 
    label: 'ثلاجة', 
    defaultPower: 180 
  },
  { 
    id: 'ac_1ton', 
    label: 'مكيف طن (إنفرتر)', 
    defaultPower: 1000,
    dayPower: 1000,    // قدرة افتراضية للنهار (وضع سوبر)
    nightPower: 400    // قدرة افتراضية لليل (وضع اقتصادي)
  },
  { 
    id: 'ac_1_5ton', 
    label: 'مكيف طن ونص (إنفرتر)', 
    defaultPower: 1500,
    dayPower: 1500,    // قدرة افتراضية للنهار (وضع سوبر)
    nightPower: 500    // قدرة افتراضية لليل (وضع اقتصادي)
  },
];
