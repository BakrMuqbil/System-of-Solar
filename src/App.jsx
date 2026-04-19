import React, { useState } from 'react';
import SolarForm from './components/SolarForm';
import SolarCalculator from './components/SolarCalculator';

function App() {
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const handleCalculation = (data) => {
    setResults(data);
    setShowResults(true); // إظهار النتائج فور الحساب
  };

  return (
    <div className="min-h-screen bg-slate-50 text-right font-sans" dir="rtl">
      {/* هيدر الموقع - تم تحديثه */}
      <header className="bg-white border-b border-slate-200 py-3 px-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* قسم اللوجو الفعلي */}
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" // تأكد من وضع ملف logo.png المرفق في مجلد public وليس src
              alt="شعار لاند سولار" 
              className="h-10 w-auto object-contain" // ارتفاع مناسب
            />
             <img 
              src="/header.png" // تأكد من وضع صورة الاسم العربي (Image 9) المرفقة في مجلد public وتسميتها text_logo.png
              alt="Land Solar Name Logo" 
              className="h-12 w-auto object-contain border-r border-slate-100 pr-3" // ارتفاع مناسب مع فاصل
            />
          </div>

          {/* إصدار الحاسبة - تم الحفاظ على التصميم المتناسق */}
          <div className="flex flex-col items-end">
            <div className="text-[10px] font-bold text-center text-[#00a896] bg-emerald-50 px-1 py-1 rounded-full border border-emerald-100 uppercase tracking-widest ">
              نظام تحجيم المنظومات v2.1
            </div>
           <p className="text-slate-500 text-[10px] text-center mt-2 leading-relaxed">
  تم التطوير بواسطة المهندس {' '}
  <span 
    className="text-emerald-600 font-bold cursor-pointer hover:text-emerald-400 transition-colors underline decoration-dotted underline-offset-4"
    onClick={() => {
      const devMessage = "السلام عليكم م. بكر، أود التواصل بخصوص نظام تحجيم المنظومات الشمسية.";
      window.open(`https://wa.me/967774265902?text=${encodeURIComponent(devMessage)}`, '_blank');
    }}
  >
    بكر أحمد
  </span>
</p>

          </div>

        </div>
      </header>

      {/* المحتوى الرئيسي للموقع */}
      <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
  {/* التعديل هنا: نغير الـ class الخاص بـ grid بناءً على ظهور النتائج */}
  <div className={`grid gap-8 items-start ${showResults ? 'lg:grid-cols-12' : 'max-w-2xl mx-auto'}`}>
    
    {/* الجانب الأيمن: الفورم (يأخذ مساحة كاملة إذا لم تكن هناك نتائج) */}
    <div className={showResults ? 'lg:col-span-7' : 'w-full'}>
      <SolarForm onCalculate={handleCalculation} />
    </div>

    {/* الجانب الأيسر: النتائج - تظهر فقط عندما يكون showResults صحيحاً */}
    {showResults && (
      <div className="lg:col-span-5 lg:sticky lg:top-28 animate-in fade-in zoom-in duration-500">
        <SolarCalculator results={results} />
      </div>
    )}

  </div>
</main>


      {/* الفوتر */}
     <footer className="mt-12 px-4 mb-10" dir="rtl">
  <div className="max-w-3xl mx-auto bg-[#059669] text-white rounded-[2.5rem] p-6 shadow-md">
    
    {/* العنوان الرئيسي */}
    <h2 className="text-center text-xl font-bold mb-6">معلومات الاتصال</h2>

    {/* الحاوية بنظام Grid مقسمة لعمودين متساويين دائماً */}
    <div className="grid grid-cols-2 relative">
      
      {/* القسم الأيمن: التواصل */}
      <div className="flex flex-col  pr-2 font-bold">
        <div className="flex items-center gap-1 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-base font-bold">التواصل:</span>
        </div>
        <div className="text-[12px] space-y-1 ">
          <p>المبيعات: <a href="tel:774276866" className="hover:underline font-bold mr-6">774276866</a></p>
           <p>خدمة العملاء: <a href="https://wa.me/967783265111" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold mr-2">783265111</a></p>
        </div>
      </div>

      {/* الخط الفاصل الرأسي في المنتصف تماماً */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/40 "></div>

      {/* القسم الأيسر: العنوان */}
      <div className="flex flex-col  pl-2">
        <div className="flex items-center gap-1 mb-3 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-base font-bold ">العنوان:</span>
        </div>

<div className="text-[12px] leading-tight font-bold mr-3">
<a href="https://www.google.com/maps/search/?api=1&query=لاند+سولار"
  target="_blank" 
  rel="noopener noreferrer"
  className="text-[12px] leading-tight font-bold mr-3 hover:text-green-700 transition-colors cursor-pointer block" > 
  <p>عدن - المنصورة - خلف سوق</p>
  <p>الخضار - مقابل فندق ماس</p>
  <p>عدن</p>
</a>

        </div>

      </div>

    </div>
  </div>

  <p className="text-slate-400 text-[13px] text-center mt-6 leading-relaxed">
  © 2026 جميع الحقوق محفوظة لشركة لاند سولار للطاقة المتجددة <br />
  تم التطوير بواسطة المهندس {' '}
  <span 
    className="text-emerald-900/80  font-bold cursor-pointer hover:text-emerald-400 transition-colors underline decoration-dotted underline-offset-4"
    onClick={() => {
      const devMessage = "السلام عليكم م. بكر، أود التواصل بخصوص نظام تحجيم المنظومات الشمسية.";
      window.open(`https://wa.me/967774265902?text=${encodeURIComponent(devMessage)}`, '_blank');
    }}
  >
    بكر أحمد
  </span>
</p>

  
</footer>

    </div>
  );
}

export default App;