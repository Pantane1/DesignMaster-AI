
import React, { useState } from 'react';
import { DesignMode, PosterData, BusinessCardData, PosterDesignResult, BusinessCardDesignResult } from './types';
import PosterForm from './components/PosterForm';
import BusinessCardForm from './components/BusinessCardForm';
import DesignPreview from './components/DesignPreview';
import { generateDesign } from './services/geminiService';

const App: React.FC = () => {
  const [mode, setMode] = useState<DesignMode>(DesignMode.POSTER);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PosterDesignResult | BusinessCardDesignResult | null>(null);

  const [posterData, setPosterData] = useState<PosterData>({
    eventType: '',
    title: '',
    date: '',
    colors: '',
    audience: '',
    tone: ''
  });

  const [cardData, setCardData] = useState<BusinessCardData>({
    name: '',
    title: '',
    company: '',
    phone: '',
    email: '',
    brandColors: ''
  });

  const handleModeChange = (newMode: DesignMode) => {
    setMode(newMode);
    setResult(null);
    setError(null);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = mode === DesignMode.POSTER ? posterData : cardData;
      const res = await generateDesign(mode, data);
      setResult(res);
    } catch (err) {
      console.error(err);
      setError('Failed to generate design. Please check your connection or try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">DesignMaster <span className="text-indigo-600 font-medium">AI</span></h1>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-xs text-gray-400 hover:text-gray-600 underline">Billing Docs</a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8 lg:mt-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Controls Panel */}
          <aside className="w-full lg:w-1/3 shrink-0">
            <div className="bg-white rounded-2xl border shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-6 text-gray-800">New Design Project</h2>
              
              {/* Task Selector */}
              <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
                <button
                  onClick={() => handleModeChange(DesignMode.POSTER)}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition ${
                    mode === DesignMode.POSTER ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Poster
                </button>
                <button
                  onClick={() => handleModeChange(DesignMode.BUSINESS_CARD)}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition ${
                    mode === DesignMode.BUSINESS_CARD ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Business Card
                </button>
              </div>

              {/* Dynamic Form */}
              {mode === DesignMode.POSTER ? (
                <PosterForm
                  data={posterData}
                  onChange={setPosterData}
                  onSubmit={handleGenerate}
                  loading={loading}
                />
              ) : (
                <BusinessCardForm
                  data={cardData}
                  onChange={setCardData}
                  onSubmit={handleGenerate}
                  loading={loading}
                />
              )}

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}
            </div>
          </aside>

          {/* Result Panel */}
          <section className="flex-1 min-h-[500px]">
            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-slate-200 rounded-3xl bg-white/50">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Ready to visualize</h3>
                <p className="text-slate-500 max-w-md">Fill out the form on the left to generate a professional, modern design concept curated by AI.</p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <h3 className="text-lg font-bold mt-6 text-gray-800">Processing Your Request</h3>
                <p className="text-gray-400 text-sm mt-2">Our AI designer is crafting the perfect layout...</p>
              </div>
            )}

            {result && !loading && (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 lg:p-12">
                <div className="flex items-center justify-between mb-8 pb-6 border-b">
                   <div>
                    <h2 className="text-2xl font-bold text-slate-900">Concept: {mode === DesignMode.POSTER ? posterData.title || 'Untitled Poster' : cardData.name || 'Professional Card'}</h2>
                    <p className="text-sm text-slate-500">Design generated based on your brand goals</p>
                   </div>
                   <button 
                    onClick={() => window.print()}
                    className="flex items-center space-x-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition"
                   >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 00-2 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                     <span>Print Specs</span>
                   </button>
                </div>
                <DesignPreview mode={mode} result={result} />
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="max-w-7xl mx-auto px-4 mt-20 pb-10 text-center border-t pt-10">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-4">AI Design Principles</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
          <div className="p-4 rounded-xl bg-white border text-xs font-medium text-gray-600 shadow-sm">Modern Minimalist</div>
          <div className="p-4 rounded-xl bg-white border text-xs font-medium text-gray-600 shadow-sm">Grid Balanced</div>
          <div className="p-4 rounded-xl bg-white border text-xs font-medium text-gray-600 shadow-sm">Type Focused</div>
          <div className="p-4 rounded-xl bg-white border text-xs font-medium text-gray-600 shadow-sm">Print Ready</div>
        </div>
        
        {/* Developer Info */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 font-medium">
            Developed with precision by{' '}
            <a 
              href="https://github.com/pantane1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-indigo-600 font-bold hover:underline"
            >
              Pantane
            </a>
          </p>
          <div className="mt-2 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <a href="mailto:pantane254@gmail.com" className="text-xs text-slate-400 hover:text-indigo-600 transition flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              pantane254@gmail.com
            </a>
            <span className="hidden sm:inline text-slate-300">|</span>
            <a href="https://wa.me/254740312402" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-green-600 transition flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03c0 2.12.554 4.189 1.604 6.04L0 24l6.117-1.604a11.803 11.803 0 005.927 1.603h.005c6.632 0 12.028-5.398 12.03-12.03a11.79 11.79 0 00-3.469-8.471z"/></svg>
              WhatsApp Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
