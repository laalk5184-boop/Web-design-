import { Instagram, Facebook, Figma } from 'lucide-react';

export function LogoTicker() {
  const logos = [
    { name: 'Vanguard', icon: null, style: "font-serif italic text-2xl md:text-3xl font-black tracking-tight" },
    { name: 'TechNews', icon: null, style: "font-mono text-xl md:text-2xl font-bold tracking-widest uppercase" },
    { name: 'Forbes', icon: null, style: "font-serif text-3xl md:text-4xl font-bold tracking-tighter" },
    { name: 'INNOVATE', icon: null, style: "font-sans text-2xl md:text-3xl font-black tracking-[0.2em] uppercase" },
    { name: 'Meta Partner', icon: <Facebook className="w-8 h-8" />, style: "font-sans text-xl md:text-2xl font-bold" },
    { name: 'DesignHub', icon: null, style: "font-serif text-2xl md:text-3xl font-medium tracking-wide" },
    { name: 'Figma', icon: <Figma className="w-8 h-8" />, style: "font-sans text-xl md:text-2xl font-bold" },
    { name: 'FUTURE', icon: null, style: "font-sans text-2xl md:text-3xl font-black italic tracking-tighter" },
  ];

  return (
    <section className="py-12 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 overflow-hidden relative flex flex-col justify-center">
      
      <div className="max-w-7xl mx-auto w-full px-4 mb-8 text-center">
        <p className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
          Trusted by ambitious brands & featured in
        </p>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10 pointer-events-none"></div>

      <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused]">
        <ul className="flex items-center justify-center">
          {logos.map((logo, index) => (
            <li key={`logo-1-${index}`} className="flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 mx-10 md:mx-16 cursor-pointer">
              {logo.icon}
              <span className={`text-gray-800 dark:text-gray-200 whitespace-nowrap ${logo.style}`}>
                {logo.name}
              </span>
            </li>
          ))}
        </ul>
        <ul className="flex items-center justify-center" aria-hidden="true">
          {logos.map((logo, index) => (
            <li key={`logo-2-${index}`} className="flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 mx-10 md:mx-16 cursor-pointer">
              {logo.icon}
              <span className={`text-gray-800 dark:text-gray-200 whitespace-nowrap ${logo.style}`}>
                {logo.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
