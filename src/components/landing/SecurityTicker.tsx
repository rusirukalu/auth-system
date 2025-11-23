import React from 'react';

export const SecurityTicker = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-black py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex gap-8 text-xs text-gray-500 font-mono uppercase tracking-widest">
        {Array(10)
          .fill(
            'SECURE CONNECTION ESTABLISHED • END-TO-END ENCRYPTION ACTIVE • 24/7 MONITORING •'
          )
          .map((text, i) => (
            <span key={i}>{text}</span>
          ))}
      </div>
    </div>
  );
};
