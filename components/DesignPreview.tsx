
import React from 'react';
import { DesignMode, PosterDesignResult, BusinessCardDesignResult } from '../types';

interface DesignPreviewProps {
  mode: DesignMode;
  result: PosterDesignResult | BusinessCardDesignResult;
}

const DesignPreview: React.FC<DesignPreviewProps> = ({ mode, result }) => {
  if (mode === DesignMode.POSTER) {
    const p = result as PosterDesignResult;
    return (
      <div className="animate-in fade-in duration-700 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Visual Representation */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Mockup Representation</h3>
            <div 
              className="poster-preview w-full max-w-md rounded-xl shadow-2xl overflow-hidden border p-8 flex flex-col justify-between"
              style={{ backgroundColor: p.colors.background, color: p.colors.text }}
            >
              <div className="space-y-4">
                 <div className="h-2 w-16" style={{ backgroundColor: p.colors.accent }}></div>
                 <h2 className="text-4xl font-extrabold tracking-tight leading-none" style={{ fontFamily: p.fontPairing.heading }}>
                   {p.headline}
                 </h2>
                 <p className="text-lg opacity-90" style={{ fontFamily: p.fontPairing.body }}>
                   {p.subtext}
                 </p>
              </div>
              
              <div className="mt-8 flex items-center justify-between border-t pt-4" style={{ borderColor: `${p.colors.text}20` }}>
                <div className="text-xs font-bold uppercase tracking-widest">{p.cta}</div>
                <div 
                  className="px-4 py-2 text-sm font-bold rounded-sm"
                  style={{ backgroundColor: p.colors.primary, color: p.colors.background }}
                >
                  GET TICKETS
                </div>
              </div>
            </div>
          </div>

          {/* Specs */}
          <div className="space-y-6">
            <section>
              <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2">Typography</h4>
              <div className="p-4 bg-white rounded-lg border shadow-sm">
                <p className="text-sm text-gray-500">Heading: <span className="text-gray-900 font-semibold">{p.fontPairing.heading}</span></p>
                <p className="text-sm text-gray-500">Body: <span className="text-gray-900 font-semibold">{p.fontPairing.body}</span></p>
              </div>
            </section>

            <section>
              <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2">Color Palette</h4>
              <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg border shadow-sm">
                {Object.entries(p.colors).map(([key, hex]) => (
                  <div key={key} className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border shadow-inner mb-1" style={{ backgroundColor: hex }}></div>
                    <span className="text-[10px] text-gray-400 uppercase">{key}</span>
                    <span className="text-[10px] font-mono font-bold text-gray-700">{hex}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2">Layout & Strategy</h4>
              <div className="p-4 bg-white rounded-lg border shadow-sm space-y-3">
                <p className="text-sm text-gray-700 leading-relaxed italic border-l-4 border-indigo-200 pl-3">"{p.visualMetaphor}"</p>
                <p className="text-sm text-gray-600 leading-relaxed">{p.layoutDescription}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  const c = result as BusinessCardDesignResult;
  return (
    <div className="animate-in fade-in duration-700 space-y-12 pb-12">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {/* Front & Back Preview */}
        <div className="space-y-8">
           <h3 className="text-xl font-bold text-gray-800 text-center">Business Card Mockup (3.5" x 2")</h3>
           <div className="space-y-6">
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-400 mb-2 uppercase tracking-tighter">Front Face</span>
                <div 
                  className="design-card-preview w-full max-w-sm rounded-lg shadow-xl border overflow-hidden p-6 flex flex-col justify-center items-center text-center"
                  style={{ backgroundColor: c.colors.background, color: c.colors.text }}
                >
                  <div className="w-10 h-10 mb-4 rounded-sm" style={{ backgroundColor: c.colors.primary }}></div>
                  <h2 className="text-xl font-bold tracking-tight uppercase" style={{ color: c.colors.text }}>{c.front.elements[0]}</h2>
                  <p className="text-xs tracking-widest mt-1 opacity-70">{c.front.elements[1]}</p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-400 mb-2 uppercase tracking-tighter">Back Face</span>
                <div 
                  className="design-card-preview w-full max-w-sm rounded-lg shadow-xl border overflow-hidden p-6 flex flex-col justify-between"
                  style={{ backgroundColor: c.colors.background, color: c.colors.text }}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-xs font-bold">{c.back.elements[0]}</p>
                      <p className="text-[10px] opacity-60">{c.back.elements[1]}</p>
                    </div>
                    <div className="w-8 h-8 bg-gray-200 border border-gray-300 flex items-center justify-center">
                       <span className="text-[8px] font-mono text-gray-500">QR</span>
                    </div>
                  </div>
                  <div className="space-y-0.5 mt-auto">
                    <p className="text-[10px]">{c.back.elements[2]}</p>
                    <p className="text-[10px]">{c.back.elements[3]}</p>
                  </div>
                </div>
              </div>
           </div>
        </div>

        {/* Card Details */}
        <div className="space-y-6">
          <section>
            <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2">Typography Setup</h4>
            <div className="p-4 bg-white rounded-lg border shadow-sm">
              <p className="text-sm text-gray-500">Primary (Headings): <span className="text-gray-900 font-semibold">{c.typography.primary}</span></p>
              <p className="text-sm text-gray-500">Secondary (Details): <span className="text-gray-900 font-semibold">{c.typography.secondary}</span></p>
            </div>
          </section>

          <section>
            <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2">Technical Specs</h4>
            <div className="p-4 bg-white rounded-lg border shadow-sm space-y-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">QR Code Strategy</p>
                <p className="text-sm text-gray-700">{c.qrPlacement}</p>
              </div>
              <hr />
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Print & Spacing</p>
                <p className="text-sm text-gray-700">{c.spacingNotes}</p>
              </div>
            </div>
          </section>

          <section>
            <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2">Layout Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <p className="text-xs font-bold text-indigo-800 uppercase mb-1">Front Design</p>
                <p className="text-xs text-indigo-700 leading-relaxed">{c.front.layout}</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <p className="text-xs font-bold text-indigo-800 uppercase mb-1">Back Design</p>
                <p className="text-xs text-indigo-700 leading-relaxed">{c.back.layout}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DesignPreview;
