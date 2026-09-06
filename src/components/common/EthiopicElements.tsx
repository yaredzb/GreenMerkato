import React from 'react';

/**
 * Authentic Ethiopian Tibeb (ጥበብ) Woven Ribbon Pattern
 * Traditional netela/gabi embroidery geometric border featuring
 * emerald green (#1C462C), harvest gold (#DF9F28), and terracotta clay (#B94726).
 */
export const TibebStripe: React.FC<{ className?: string; height?: number }> = ({ 
  className = '', 
  height = 6 
}) => {
  return (
    <div 
      className={`w-full overflow-hidden shrink-0 select-none ${className}`} 
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      <svg 
        width="100%" 
        height={height} 
        viewBox="0 0 480 12" 
        preserveAspectRatio="repeat-x"
        className="w-full h-full block"
      >
        <defs>
          <pattern id="tibebPattern" width="48" height="12" patternUnits="userSpaceOnUse">
            {/* Base cotton background */}
            <rect width="48" height="12" fill="#FAF7F0" />
            
            {/* Top & Bottom gold guidelines */}
            <line x1="0" y1="1" x2="48" y2="1" stroke="#DF9F28" strokeWidth="0.8" opacity="0.8" />
            <line x1="0" y1="11" x2="48" y2="11" stroke="#DF9F28" strokeWidth="0.8" opacity="0.8" />
            
            {/* Central Diamond Chevrons (Emerald Green) */}
            <polygon points="12,6 18,1 24,6 18,11" fill="#1C462C" />
            <polygon points="36,6 42,1 48,6 42,11" fill="#1C462C" />
            
            {/* Inner Gold Diamond Accent */}
            <polygon points="18,4 20,6 18,8 16,6" fill="#DF9F28" />
            <polygon points="42,4 44,6 42,8 40,6" fill="#DF9F28" />
            
            {/* Terracotta/Clay Stepped Frets & Crosses (መስቀል ጥልፍ) */}
            <rect x="5" y="4" width="2" height="4" fill="#B94726" />
            <rect x="4" y="5" width="4" height="2" fill="#B94726" />
            <rect x="29" y="4" width="2" height="4" fill="#B94726" />
            <rect x="28" y="5" width="4" height="2" fill="#B94726" />

            {/* Geometric stitch dots */}
            <circle cx="0" cy="6" r="1" fill="#1C462C" />
            <circle cx="24" cy="6" r="1" fill="#DF9F28" />
          </pattern>
        </defs>
        <rect width="100%" height="12" fill="url(#tibebPattern)" />
      </svg>
    </div>
  );
};

/**
 * Addis Ababa City Administration Circular Green Economy Seal
 */
export const AddisAbabaSeal: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  size = 'md',
  className = ''
}) => {
  const dim = {
    sm: 'w-8 h-8 text-[7px]',
    md: 'w-11 h-11 text-[9px]',
    lg: 'w-14 h-14 text-[10px]'
  }[size];

  return (
    <div className={`relative inline-flex items-center justify-center rounded-full border-2 border-[#DF9F28] bg-[#1C462C] text-[#FAF7F0] shadow-sm font-bold shrink-0 ${dim} ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full p-0.5">
        {/* Outer Circular Teeth / Weave */}
        <circle cx="50" cy="50" r="46" fill="none" stroke="#DF9F28" strokeWidth="2.5" strokeDasharray="3, 2" />
        <circle cx="50" cy="50" r="41" fill="none" stroke="#FAF7F0" strokeWidth="0.8" opacity="0.5" />

        {/* Central Mesob & Sprout Motif */}
        {/* Mesob Base (Terracotta) */}
        <polygon points="35,68 65,68 60,48 40,48" fill="#B94726" />
        <line x1="38" y1="58" x2="62" y2="58" stroke="#DF9F28" strokeWidth="1.5" />
        
        {/* Mesob Conical Lid */}
        <polygon points="38,48 62,48 50,30" fill="#DF9F28" />
        <circle cx="50" cy="27" r="2.5" fill="#FAF7F0" />

        {/* Green Sprout Emerging from Soil */}
        <path d="M50 30 Q44 20 37 24 Q43 28 50 30" fill="#48B365" />
        <path d="M50 30 Q56 20 63 24 Q57 28 50 30" fill="#48B365" />
      </svg>
    </div>
  );
};

/**
 * Traditional Ethiopian Decorative Section Divider
 */
export const EthiopicDivider: React.FC<{ label?: string; amharicLabel?: string; className?: string }> = ({ 
  label, 
  amharicLabel,
  className = '' 
}) => {
  return (
    <div className={`flex items-center gap-3 my-4 ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#DFD9CE] to-[#DFD9CE]" />
      <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C462C] select-none">
        <span className="text-[#B94726] text-[10px]">❖</span>
        <span className="text-[#DF9F28] text-[12px]">◈</span>
        {amharicLabel && (
          <span className="font-bold text-[#1C462C] font-sans">
            {amharicLabel}
          </span>
        )}
        {label && (
          <span className="text-stone-500 font-medium text-[11px] uppercase tracking-wider">
            {label}
          </span>
        )}
        <span className="text-[#DF9F28] text-[12px]">◈</span>
        <span className="text-[#B94726] text-[10px]">❖</span>
      </div>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#DFD9CE] to-[#DFD9CE]" />
    </div>
  );
};

/**
 * Authentic Merkato Tera Market Badge
 */
export const MerkatoTeraPill: React.FC<{ 
  zone: string; 
  amharicZone?: string;
  type?: 'fruit' | 'grain' | 'vegetable' | 'general' 
}> = ({ zone, amharicZone, type = 'vegetable' }) => {
  const getTeraAmharic = (z: string) => {
    if (amharicZone) return amharicZone;
    if (z.includes('Atikilt')) return 'አትክልት ተራ';
    if (z.includes('Bomb')) return 'ቦምብ ተራ';
    if (z.includes('Shera')) return 'ሽራ ተራ';
    if (z.includes('Sebategna')) return 'ሰባተኛ';
    if (z.includes('Dubai')) return 'ዱባይ ተራ';
    if (z.includes('Military')) return 'ወታደር ተራ';
    return 'መርካቶ';
  };

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border border-[#DF9F28]/40 bg-[#FAF7F0] text-[#1C462C] shadow-2xs">
      <span className="w-1.5 h-1.5 rounded-full bg-[#B94726]" />
      <span className="text-[#1C462C] font-bold">{getTeraAmharic(zone)}</span>
      <span className="text-stone-400 text-[10px] font-normal">({zone})</span>
    </span>
  );
};
