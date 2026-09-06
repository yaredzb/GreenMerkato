import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showSubtitle = true }) => {
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  }[size];

  const titleSize = {
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl'
  }[size];

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 select-none">
      {/* Structural Ethiopian Mesob & Circularity Emblem */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#1C462C] to-[#122E1D] border-2 border-[#DF9F28] shadow-sm ${iconDimensions} shrink-0`}>
        <svg viewBox="0 0 48 48" className="w-5/6 h-5/6">
          {/* Subtle Woven Ge'ez Diamond Circle */}
          <circle cx="24" cy="24" r="21" fill="none" stroke="#DF9F28" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.9" />
          
          {/* Terracotta Clay Diamond Core - Soil / Compost Windrow */}
          <polygon points="24,8 40,24 24,40 8,24" fill="#B94726" />
          
          {/* Inner Woven Netela Raw Cotton Diamond */}
          <polygon points="24,13 35,24 24,35 13,24" fill="#FAF7F0" />
          
          {/* Central Deep Forest Seed / Sprout Node */}
          <circle cx="24" cy="24" r="5" fill="#1C462C" />
          
          {/* Golden Teff Core Point */}
          <circle cx="24" cy="24" r="2" fill="#DF9F28" />
          
          {/* 4 Cardinal Agricultural Nodes (Vendor, Collection, Compost, Farmer) */}
          <circle cx="24" cy="6" r="2.2" fill="#DF9F28" />
          <circle cx="42" cy="24" r="2.2" fill="#B94726" />
          <circle cx="24" cy="42" r="2.2" fill="#DF9F28" />
          <circle cx="6" cy="24" r="2.2" fill="#B94726" />
        </svg>
      </div>

      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`font-serif font-bold tracking-tight text-[#1C462C] ${titleSize}`}>
            GreenMerkato
          </span>
          <span className="font-sans font-extrabold text-[11px] text-[#B94726] bg-[#B94726]/10 px-1.5 py-0.5 rounded border border-[#B94726]/20">
            ግሪን መርካቶ
          </span>
          <span className="hidden md:inline-flex items-center gap-1 text-[9px] font-bold text-[#1C462C] uppercase tracking-wider bg-[#DF9F28]/20 text-[#8B5E3C] px-1.5 py-0.5 rounded border border-[#DF9F28]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1C462C]" />
            አዲስ አበባ
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[11px] font-medium text-stone-600 tracking-normal flex items-center gap-1 mt-0.5">
            <span className="text-[#1C462C] font-semibold">የመርካቶ ኦርጋኒክ ማዳበሪያ</span>
            <span className="text-stone-300">•</span>
            <span>Merkato Circular Operations</span>
          </span>
        )}
      </div>
    </div>
  );
};

