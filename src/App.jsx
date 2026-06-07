import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue, useSpring, useAnimationFrame, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Smile, MousePointer2, Hexagon, Mail, FileText, Menu, X } from 'lucide-react';
import avatar640 from './assets/profile-avatar-640.webp';
import avatar960 from './assets/profile-avatar-960.webp';
import strip1 from './assets/portfolio-strip-1.webp';
import strip2 from './assets/portfolio-strip-2.webp';
import strip3 from './assets/portfolio-strip-3.webp';
import strip4 from './assets/portfolio-strip-4.webp';
import strip5 from './assets/portfolio-strip-5.webp';
import strip6 from './assets/portfolio-strip-6.webp';

const Github = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const Linkedin = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

// --- MOCK DATA ---
const PORTFOLIO_IMAGES = [
  strip1,
  strip2,
  strip3,
  strip4,
  strip5,
  strip6
];

const SERVICES = [
  { num: "01", title: "WEB DEVELOPMENT", desc: "Building scalable, robust, and interactive web applications using modern programming languages and frameworks." },
  { num: "02", title: "WEB DESIGN", desc: "Designing clean, modern, and conversion-focused websites with careful attention to layout, typography, and aesthetics." },
  { num: "03", title: "WIREFRAMING", desc: "Creating structural blueprints for digital experiences, focusing on functionality, user flow, and information architecture." },
  { num: "04", title: "UI/UX DESIGN", desc: "Crafting intuitive and engaging user interfaces with a focus on seamless user experiences and user-centric design principles." },
  { num: "05", title: "BRANDING", desc: "Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence." },
];

const PROJECTS = [
  { id: "01", name: "Whatsapp Chatbot", desc: "Industry-Funded FYP (RM 5.5K Grant)", type: "ON DEVELOPMENT", images: ["https://placehold.co/800x600/0a0a0a/333333?text=?", "https://placehold.co/800x600/0a0a0a/333333?text=?"] },
  { id: "02", name: "Personal Portfolio 2025", desc: "DIGITAL PORTFOLIO EXPERIENCE", type: "VIEW SOURCE", link: "https://github.com/adricocorson/adrico", images: ["https://s13.gifyu.com/images/bqPqf.jpg", "https://s13.gifyu.com/images/bqPIw.gif"] },
  { id: "03", name: "STWD STUDIO", desc: "Creative Agency Website", type: "VIEW SOURCE", link: "https://github.com/adricocorson/STWD", images: ["https://s13.gifyu.com/images/bqPUn.jpg", "https://s13.gifyu.com/images/bqPUH.gif"] },
  { id: "04", name: "Vouch AI Business Assistant", desc: "UM HACKATHON PROJECT", type: "VIEW SOURCE", link: "https://github.com/adricocorson/AmbatuWIN", images: ["https://s13.gifyu.com/images/bqej6.jpg", "https://s13.gifyu.com/images/bqe02.gif"] },
  { id: "05", name: "Warung Padang Rush", desc: "INDONESIAN RESTAURANT SIMULATION GAME", type: "VISIT WEBSITE", link: "https://padangrush.netlify.app/", images: ["https://s13.gifyu.com/images/b728n.jpg", "https://s13.gifyu.com/images/b728q.gif"] },
];

const TECH_BADGES = [
  { name: "Firebase", color: "FFCA28", iconId: "firebase" },
  { name: "AWS", color: "FF9900", customImg: "https://s13.gifyu.com/images/b7M7t.png" },
  { name: "GSAP", color: "88CE02", iconId: "greensock" },
  { name: "React", color: "61DAFB", iconId: "react" },
  { name: "JavaScript", color: "F7DF1E", iconId: "javascript" },
  { name: "HTML", color: "E34F26", iconId: "html5" },
  { name: "CSS", color: "1572B6", iconId: "css" },
  { name: "MySQL", color: "4479A1", iconId: "mysql" },
  { name: "C#", color: "512BD4", iconId: "dotnet" },
  { name: "C", color: "A8B9CC", iconId: "c" },
  {
    name: "XML", color: "00608C", fallbackSvg: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 8-4 4 4 4" />
        <path d="m16 8 4 4-4 4" />
        <path d="m14 5-4 14" />
      </svg>
    )
  },
  { name: "Python", color: "3776AB", iconId: "python" },
  { name: "Java", color: "ED8B00", iconId: "openjdk" },
  { name: "Tailwind CSS", color: "06B6D4", iconId: "tailwindcss" },
  { name: "Canva", color: "00C4CC", customImg: "https://s13.gifyu.com/images/b7MI2.png" },
  { name: "Microsoft", color: "D83B01", customImg: "https://s13.gifyu.com/images/b7MIk.png" },
  {
    name: "VSCode", color: "007ACC", fallbackSvg: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
      </svg>
    )
  },
  { name: "SAP", color: "0FAAFF", iconId: "sap" },
  { name: "GitHub", color: "FFFFFF", iconId: "github" },
  {
    name: "Flow", color: "16CA48", fallbackSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3v4.6l-5.8 10.1A2 2 0 0 0 5 21h14a2 2 0 0 0 1.7-3.3L15 7.6V3" />
        <path d="M8 3h8" /><path d="M5 16h14" />
      </svg>
    )
  },
  { name: "n8n", color: "EA4B71", iconId: "n8n" }
];

// --- COMPONENTS ---

const BadgeItem = ({ badge }) => {
  const [srcIndex, setSrcIndex] = useState(0);

  const sources = [
    badge.customImg,
    badge.iconId && `https://cdn.simpleicons.org/${badge.iconId}/${badge.color}`
  ].filter(Boolean);

  const handleError = () => {
    if (srcIndex < sources.length - 1) {
      setSrcIndex(srcIndex + 1);
    } else {
      setSrcIndex(-1);
    }
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2.5 sm:gap-2.5 sm:px-5 md:px-6 md:py-3 bg-[#161616] border border-white/10 rounded-full hover:bg-[#222222] transition-colors whitespace-nowrap">
      <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 bg-white/5 rounded-md">
        {srcIndex >= 0 && sources[srcIndex] ? (
          <img
            src={sources[srcIndex]}
            alt=""
            aria-hidden="true"
            draggable="false"
            loading="lazy"
            decoding="async"
            onError={handleError}
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain"
          />
        ) : badge.fallbackSvg ? (
          <div style={{ color: `#${badge.color}` }} className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center">
            {badge.fallbackSvg}
          </div>
        ) : (
          <div style={{ color: `#${badge.color}`, fontSize: '14px' }} className="font-bold leading-none">
            {badge.customText || badge.name.charAt(0)}
          </div>
        )}
      </div>
      <span className="text-white text-xs sm:text-sm font-medium">
        {badge.name}
      </span>
    </div>
  );
};

const HLSVideo = ({ src, desaturated = false, className = "" }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls;
    let isDisposed = false;
    const playVideo = () => video.play().catch(() => { });

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', playVideo);
    } else {
      import('hls.js').then(({ default: Hls }) => {
        if (isDisposed || !Hls.isSupported()) return;
        hls = new Hls({ enableWorker: true });
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, playVideo);
      });
    }

    return () => {
      isDisposed = true;
      video.removeEventListener('loadedmetadata', playVideo);
      if (hls) hls.destroy();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
      style={{ filter: desaturated ? 'saturate(0)' : 'none' }}
    />
  );
};

const ProjectMedia = ({ src, projectName, index }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="aspect-video md:aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden bg-zinc-900 relative group border border-white/5">
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center gap-3 bg-[#090909] text-center px-4">
        {hasError ? (
          <>
            <div className="h-9 w-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-500">!</div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-300">Preview unavailable</p>
              <p className="text-[11px] uppercase tracking-wide text-zinc-600 mt-1">{projectName}</p>
            </div>
          </>
        ) : (
          <>
          <div className="h-9 w-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-500">
            {String(index + 1).padStart(2, "0")}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-300">
              Loading preview
            </p>
            <p className="text-[11px] uppercase tracking-wide text-zinc-600 mt-1">
              {projectName}
            </p>
          </div>
          </>
        )}
      </div>
      {!hasError && (
        <img
          src={src}
          alt={`${projectName} work preview ${index + 1}`}
          loading="lazy"
          decoding="async"
          onError={() => setHasError(true)}
          className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
    </div>
  );
};

const LocalTime = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kuala_Lumpur',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setTime(formatter.format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
};

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(min-width: 1024px)').matches;
  });

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const handleChange = () => setIsDesktop(media.matches);

    handleChange();
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  return isDesktop;
};

// --- NEW ROLLING LINK COMPONENT ---
const RollingLink = ({ href = "#", children, className = "", target, onClick }) => {
  const handleClick = (e) => {
    // Let Lenis handle the smooth anchor scrolling if it's an internal link
    if (href.startsWith('#') && window.lenis) {
      e.preventDefault();
      window.lenis.scrollTo(href, { offset: 0, duration: 1.5 });
    }
    if (onClick) onClick(e);
  };

  // Fallback for non-string children (just in case)
  if (typeof children !== 'string') {
    return (
      <a href={href} target={target} onClick={handleClick} className={`group relative inline-flex overflow-hidden cursor-pointer ${className}`}>
        <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">{children}</span>
        <span className="absolute inset-0 inline-block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 text-white">{children}</span>
      </a>
    );
  }

  return (
    <a
      href={href}
      target={target}
      onClick={handleClick}
      rel={target === "_blank" ? "noreferrer" : undefined}
      className={`group relative inline-flex overflow-hidden cursor-pointer ${className}`}
    >
      <span className="flex">
        {children.split('').map((char, i) => (
          <span
            key={`default-${i}`}
            className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
            style={{ transitionDelay: `${i * 0.025}s` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
      <span className="absolute inset-0 flex text-white">
        {children.split('').map((char, i) => (
          <span
            key={`hover-${i}`}
            className="inline-block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
            style={{ transitionDelay: `${i * 0.025}s` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </a>
  );
};

const Navbar = ({ isVisible }) => {
  const [isOpen, setIsOpen] = useState(false);

  // UX Fix: Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 w-full z-50 flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 lg:py-6 text-white mix-blend-difference"
      >
        {/* Desktop Links */}
        <div className="hidden lg:flex w-full justify-between items-center">
          <RollingLink href="#home" className="font-bold tracking-widest text-sm uppercase">Home</RollingLink>
          <RollingLink href="#about" className="font-bold tracking-widest text-sm uppercase">About</RollingLink>
          <RollingLink href="#services" className="font-bold tracking-widest text-sm uppercase">Services</RollingLink>
          <RollingLink href="#projects" className="font-bold tracking-widest text-sm uppercase">Projects</RollingLink>
          <RollingLink href="#contacts" className="font-bold tracking-widest text-sm uppercase">Contacts</RollingLink>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden w-full justify-between items-center">
          <span className="font-black text-xl tracking-normal mix-blend-difference">ADRICO</span>
          <button aria-label="Open navigation menu" onClick={() => setIsOpen(true)} className="min-h-11 min-w-11 p-2 -mr-2 flex items-center justify-center">
            <Menu size={28} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-black text-white flex flex-col justify-center items-center overflow-hidden px-6 py-10"
          >
            <button aria-label="Close navigation menu" onClick={() => setIsOpen(false)} className="absolute top-5 right-5 sm:top-6 sm:right-6 min-h-11 min-w-11 p-2 text-zinc-400 hover:text-white transition-colors flex items-center justify-center">
              <X size={36} strokeWidth={1.5} />
            </button>
            <div className="flex flex-col gap-6 sm:gap-8 text-center">
              <RollingLink onClick={() => setIsOpen(false)} href="#home" className="font-black text-5xl sm:text-6xl uppercase tracking-normal">Home</RollingLink>
              <RollingLink onClick={() => setIsOpen(false)} href="#about" className="font-black text-5xl sm:text-6xl uppercase tracking-normal">About</RollingLink>
              <RollingLink onClick={() => setIsOpen(false)} href="#services" className="font-black text-5xl sm:text-6xl uppercase tracking-normal">Services</RollingLink>
              <RollingLink onClick={() => setIsOpen(false)} href="#projects" className="font-black text-5xl sm:text-6xl uppercase tracking-normal">Projects</RollingLink>
              <RollingLink onClick={() => setIsOpen(false)} href="#contacts" className="font-black text-5xl sm:text-6xl uppercase tracking-normal">Contacts</RollingLink>
            </div>

            <div className="absolute bottom-10 flex gap-6 text-zinc-400">
              <a href="https://github.com/adricocorson" className="hover:text-white transition-colors"><Github size={24} /></a>
              <a href="https://www.linkedin.com/in/adrico/" className="hover:text-white transition-colors"><Linkedin size={24} /></a>
              <a href="mailto:adricocorsonz@gmail.com" className="hover:text-white transition-colors"><Mail size={24} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="inline-block relative">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

const ScrollRevealText = ({ text, className, progress }) => {
  const words = text.split(" ");
  if (!progress) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return (
          <React.Fragment key={i}>
            <Word progress={progress} range={[start, end]}>{word}</Word>
            {i < words.length - 1 && " "}
          </React.Fragment>
        );
      })}
    </p>
  );
};

const ContactLetter = ({ char, index, progress }) => {
  const start = 0.02 + (index * 0.015);
  const end = start + 0.1;

  const charY = useTransform(progress, [start, end], ["120%", "0%"], { clamp: true });
  const charRotate = useTransform(progress, [start, end], [15, 0], { clamp: true });
  const charOpacity = useTransform(progress, [start, end], [0, 1], { clamp: true });

  return (
    <motion.span
      style={{ y: charY, rotate: charRotate, opacity: charOpacity, display: 'inline-block' }}
      className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-normal leading-none origin-bottom-left"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

const FooterChar = ({ char, index, progress }) => {
  const start = index * 0.1;
  const end = start + 0.5;
  const y = useTransform(progress, [start, end], ["120%", "0%"], { clamp: true });
  const opacity = useTransform(progress, [start, end], [0, 1], { clamp: true });

  return (
    <motion.span
      style={{ y, opacity, display: 'inline-block' }}
      className="char"
    >
      {char}
    </motion.span>
  );
};

const ShinyText = ({
  text,
  disabled = false,
  speed = 2,
  className = '',
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = 'left',
  delay = 0
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef(null);
  const directionRef = useRef(direction === 'left' ? 1 : -1);

  const animationDuration = speed * 1000;
  const delayDuration = delay * 1000;

  useAnimationFrame(time => {
    if (disabled || isPaused) {
      lastTimeRef.current = null;
      return;
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;

    elapsedRef.current += deltaTime;

    if (yoyo) {
      const cycleDuration = animationDuration + delayDuration;
      const fullCycle = cycleDuration * 2;
      const cycleTime = elapsedRef.current % fullCycle;

      if (cycleTime < animationDuration) {
        const p = (cycleTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else if (cycleTime < cycleDuration) {
        progress.set(directionRef.current === 1 ? 100 : 0);
      } else if (cycleTime < cycleDuration + animationDuration) {
        const reverseTime = cycleTime - cycleDuration;
        const p = 100 - (reverseTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else {
        progress.set(directionRef.current === 1 ? 0 : 100);
      }
    } else {
      const cycleDuration = animationDuration + delayDuration;
      const cycleTime = elapsedRef.current % cycleDuration;

      if (cycleTime < animationDuration) {
        const p = (cycleTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else {
        progress.set(directionRef.current === 1 ? 100 : 0);
      }
    }
  });

  useEffect(() => {
    directionRef.current = direction === 'left' ? 1 : -1;
    elapsedRef.current = 0;
    progress.set(0);
  }, [direction, progress]);

  const backgroundPosition = useTransform(progress, p => `${150 - p * 2}% center`);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const gradientStyle = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{ ...gradientStyle, backgroundPosition }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </motion.span>
  );
};

const ClickSpark = ({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  children
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const startTimeRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let resizeTimeout;

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const easeFunc = useCallback(
    t => {
      switch (easing) {
        case 'linear':
          return t;
        case 'ease-in':
          return t * t;
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  const drawSparks = useCallback(function drawSparksFrame(timestamp) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sparksRef.current = sparksRef.current.filter(spark => {
      const elapsed = timestamp - spark.startTime;
      if (elapsed >= duration) {
        return false;
      }

      const progress = elapsed / duration;
      const eased = easeFunc(progress);

      const distance = eased * sparkRadius * extraScale;
      const lineLength = sparkSize * (1 - eased);

      const x1 = spark.x + distance * Math.cos(spark.angle);
      const y1 = spark.y + distance * Math.sin(spark.angle);
      const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
      const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

      ctx.strokeStyle = sparkColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      return true;
    });

    if (sparksRef.current.length > 0) {
      animationIdRef.current = requestAnimationFrame(drawSparksFrame);
    } else {
      animationIdRef.current = null;
      startTimeRef.current = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [duration, easeFunc, extraScale, sparkColor, sparkRadius, sparkSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  const handleClick = e => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const now = performance.now();
    const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now
    }));

    sparksRef.current.push(...newSparks);
    if (!animationIdRef.current) {
      animationIdRef.current = requestAnimationFrame(drawSparks);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100vw',
          height: '100dvh',
          display: 'block',
          userSelect: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          mixBlendMode: 'difference'
        }}
      />
      {children}
    </div>
  );
};

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 28, stiffness: 100, mass: 0.8 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 28);
      cursorY.set(e.clientY - 28);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{ x: cursorXSpring, y: cursorYSpring }}
      className="fixed top-0 left-0 w-14 h-14 border-[2.5px] border-white mix-blend-difference rounded-full pointer-events-none z-[9999] hidden md:block"
    />
  );
};

// --- ANIMATION VARIANTS ---
const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const footerFadeUp = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function App() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const marqueeRef = useRef(null);
  const gridRef = useRef(null);
  const footerRef = useRef(null);
  const contactRef = useRef(null);

  // --- PRELOADER STATE ---
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (!window.matchMedia("(min-width: 1024px)").matches) return false;
    return sessionStorage.getItem("adricoIntroPlayed") !== "true";
  });
  const [isZooming, setIsZooming] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true); // Start as visible
  const isDesktop = useIsDesktop();
  const [shouldLoadHeroVideo, setShouldLoadHeroVideo] = useState(false);

  // --- DYNAMIC NAVBAR LOGIC ---
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", () => {
    if (aboutRef.current) {
      // Hide navbar when the About section hits the top of the viewport
      if (aboutRef.current.getBoundingClientRect().top <= 100) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
    }
  });

  useEffect(() => {
    if (!isDesktop) {
      return undefined;
    }

    const enableVideo = () => setShouldLoadHeroVideo(true);

    window.addEventListener('pointermove', enableVideo, { once: true, passive: true });
    window.addEventListener('scroll', enableVideo, { once: true, passive: true });
    window.addEventListener('keydown', enableVideo, { once: true });

    return () => {
      window.removeEventListener('pointermove', enableVideo);
      window.removeEventListener('scroll', enableVideo);
      window.removeEventListener('keydown', enableVideo);
    };
  }, [isDesktop]);

  // --- ADRICO PRELOADER LOGIC ---
  useEffect(() => {
    if (!isLoading) return undefined;

    const duration = 2600;
    function easeInOutCubic(x) {
      return x < 0.5
        ? 4 * x * x * x
        : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    let rafId;
    const percentEl = document.getElementById('percent');
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      if (percentEl) {
        percentEl.innerText = Math.floor(easedProgress * 100);
      }

      if (progress < 1) {
        rafId = requestAnimationFrame(updateCounter);
      } else if (percentEl) {
        percentEl.innerText = "100";
      }
    }

    rafId = requestAnimationFrame(updateCounter);

    const zoomTimeout = setTimeout(() => {
      setIsZooming(true);
    }, duration);

    const finishTimeout = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("adricoIntroPlayed", "true");
    }, duration + 420);

    return () => {
      clearTimeout(zoomTimeout);
      clearTimeout(finishTimeout);
      cancelAnimationFrame(rafId);
    };
  }, [isLoading]);

  // --- PORTFOLIO SCROLLER SETUP ---
  const { scrollYProgress: gridScrollProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"]
  });

  // Controls the slide intensity. Row 1 moves left, Row 2 moves right.
  const row1X = useTransform(gridScrollProgress, [0, 1], ["0%", "-20%"]);
  const row2X = useTransform(gridScrollProgress, [0, 1], ["-20%", "0%"]);

  // We duplicate a few items in the array to make the continuous scroll illusion perfect
  const row1Images = [...PORTFOLIO_IMAGES.slice(0, 3), PORTFOLIO_IMAGES[0], PORTFOLIO_IMAGES[1]];
  const row2Images = [...PORTFOLIO_IMAGES.slice(3, 6), PORTFOLIO_IMAGES[3], PORTFOLIO_IMAGES[4]];

  // --- LENIS SMOOTH SCROLL INTEGRATION ---
  useEffect(() => {
    // Only initialize smooth scrolling AFTER the loading screen disappears
    if (isLoading || !isDesktop) {
      window.lenis = undefined;
      return;
    }

    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js";
    script.async = true;

    let lenis;
    let rafId;

    script.onload = () => {
      lenis = new window.Lenis({
        duration: 1.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 2,
        syncTouch: false,
      });

      window.lenis = lenis;

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    };

    document.head.appendChild(script);

    return () => {
      if (lenis) lenis.destroy();
      if (rafId) cancelAnimationFrame(rafId);
      if (script.parentNode) script.parentNode.removeChild(script);
      window.lenis = undefined;
    };
  }, [isLoading, isDesktop]);

  // --- MARQUEE PLAYBACK RATE CONTROL ---
  useEffect(() => {
    const container = marqueeRef.current;
    if (!container) return;

    const handleMouseEnter = () => {
      container.getAnimations({ subtree: true }).forEach(anim => {
        anim.playbackRate = 0.4;
      });
    };

    const handleMouseLeave = () => {
      container.getAnimations({ subtree: true }).forEach(anim => {
        anim.playbackRate = 1;
      });
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const { scrollYProgress: rawAboutProgress } = useScroll({
    target: aboutRef,
    offset: ["start start", "end end"]
  });

  const mappedAboutProgress = useTransform(rawAboutProgress, [0, 0.75], [0, 1]);

  const smoothAboutProgress = useSpring(mappedAboutProgress, {
    damping: 40,
    stiffness: 50,
    mass: 1
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const avatarX = useSpring(mouseX, springConfig);
  const avatarY = useSpring(mouseY, springConfig);

  // --- NEW FOOTER ANIMATION TRACKING ---
  const { scrollYProgress: rawFooterProgress } = useScroll({
    target: footerRef,
    // "start 80%" = Animation begins when the top of the footer reaches 80% down the screen
    // "end end" = Animation perfectly concludes exactly when the bottom of the footer hits the bottom of the screen
    offset: ["start 80%", "end end"]
  });

  // CRITICAL FIX: Explicitly clamping the useTransform strictly locks progress between [0, 1].
  const mappedFooterProgress = useTransform(rawFooterProgress, [0, 0.8], [0, 1], { clamp: true });
  const smoothFooterProgress = useSpring(mappedFooterProgress, { damping: 25, stiffness: 60, mass: 0.5 });

  // --- CONTACT PARALLAX & STICKY PIN LOGIC ---
  const { scrollYProgress: contactScrollProgress } = useScroll({
    target: contactRef,
    offset: ["start end", "end start"]
  });
  const smoothContactProgress = useSpring(contactScrollProgress, { damping: 25, stiffness: 80, mass: 0.5 });

  // Background Parallax moves throughout the entire 250vh scroll duration
  const contactTextY = useTransform(contactScrollProgress, [0, 1], ["-20%", "40%"]);
  const contactTextScale = useTransform(contactScrollProgress, [0, 1], [0.8, 1.2], { clamp: true });
  const contactShape1Y = useTransform(contactScrollProgress, [0, 1], ["-40%", "80%"]);
  const contactShape2Y = useTransform(contactScrollProgress, [0, 1], ["60%", "-60%"]);
  const contactShapeRotate1 = useTransform(contactScrollProgress, [0, 1], [-45, 90]);
  const contactShapeRotate2 = useTransform(contactScrollProgress, [0, 1], [45, -90]);

  // Foreground Content scrubs in sequentially *WHILE* the screen is pinned (0.30 to 0.70)
  const descOpacity = useTransform(smoothContactProgress, [0.10, 0.22], [0, 1], { clamp: true });
  const descY = useTransform(smoothContactProgress, [0.10, 0.22], [30, 0], { clamp: true });

  const btnOpacity = useTransform(smoothContactProgress, [0.16, 0.28], [0, 1], { clamp: true });
  const btnY = useTransform(smoothContactProgress, [0.16, 0.28], [20, 0], { clamp: true });
  const btnScale = useTransform(smoothContactProgress, [0.16, 0.28], [0.8, 1], { clamp: true });

  const handleHeroMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / 15;
    const y = (e.clientY - innerHeight / 2) / 15;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <ClickSpark sparkColor="#ffffff" sparkSize={12} sparkRadius={24} sparkCount={10} duration={600}>

      {/* --- CUSTOM ADRICO PRELOADER --- */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="adrico-preloader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[999999] bg-[#0a0a0a] flex justify-center items-center overflow-hidden"
          >
            <div className={`preloader-wrapper ${isZooming ? 'zoom-out' : ''}`}>
              <div className="text-container">
                <h1 className="bg-text">ADRICO</h1>
                <h1 className="wave-text">ADRICO</h1>
                <div className="loading-info">
                  loading... <span id="percent" className="text-white inline-block min-w-[1.8em] text-right">0</span> %
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-black text-white min-h-screen font-sans selection:bg-purple-500 selection:text-white">
        <CustomCursor />
        <style dangerouslySetInnerHTML={{
          __html: `
        /* --- PRELOADER CSS --- */
        .preloader-wrapper {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .preloader-wrapper.zoom-out {
            /* Dramatically sped up the zoom and removed the delay/bounce */
            animation: zoomThrough 0.6s ease-in forwards;
        }

        .text-container {
            position: relative;
            display: inline-block;
        }

        .bg-text {
            /* CRITICAL RESPONSIVENESS FIX: Scaled down min-size to guarantee no horizontal overflow on iPhone SE */
            font-size: clamp(2rem, 12vw, 10rem);
            font-weight: 900;
            color: #2a2a2a;
            margin: 0;
            letter-spacing: 0;
            line-height: 1.1;
            user-select: none;
        }

        .wave-text {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            font-size: clamp(2rem, 12vw, 10rem);
            font-weight: 900;
            margin: 0;
            letter-spacing: 0;
            line-height: 1.1;
            color: transparent;
            user-select: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0,50 Q25,45 50,50 T100,50 L100,100 L0,100 Z' fill='%23ffffff'/%3E%3C/svg%3E");
            background-repeat: repeat-x;
            background-size: 2.5em 4em;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            background-position: 0em -0.9em;
            /* [FIX] Combined into a single animation to avoid CSS minification bugs */
            animation: waveFill 2.6s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }

        .loading-info {
            position: absolute;
            bottom: -0.5em;
            right: 0.1em;
            font-weight: 600;
            font-size: clamp(0.7rem, 1.5vw, 1rem);
            color: #666;
            display: flex;
            gap: 4px;
            opacity: 0;
            animation: preloaderFadeIn 0.2s ease-in forwards 0.1s;
        }

        /* --- PRELOADER KEYFRAMES --- */
        @keyframes waveFill {
            0% { background-position: 0em -0.9em; } 
            100% { background-position: 15em -2.3em; } 
        }
        @keyframes preloaderFadeIn {
            to { opacity: 1; }
        }
        @keyframes zoomThrough {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(24); opacity: 0; }
        }

        /* --- NEOLEAF FOOTER CSS --- */
        .giant-text {
            font-size: 5.5rem;
            line-height: 1.1;
            letter-spacing: 0;
            display: flex;
            justify-content: center;
        }

        @media (min-width: 640px) {
          .giant-text {
            font-size: 9rem;
          }
        }

        @media (min-width: 1024px) {
          .giant-text {
            font-size: 16rem;
          }
        }

        @media (min-width: 1440px) {
          .giant-text {
            font-size: 22rem;
          }
        }

        .char {
            display: inline-block;
            background: linear-gradient(180deg, #ffffff 0%, #e2e2e2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
            padding: 0 0.15em;
            margin: 0 -0.15em;
        }

        /* Webkit Browsers (Chrome, Safari, Edge) */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #050505; 
        }
        ::-webkit-scrollbar-thumb {
          background: #27272a; 
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #a855f7; 
        }
        
        /* Firefox Support */
        * {
          scrollbar-width: thin;
          scrollbar-color: #27272a #050505;
        }

        /* --- FLUID ANIMATED BUTTON CSS --- */
        .btn-animated {
          position: relative;
          overflow: hidden;
          min-height: 44px;
          padding: 0.9rem 1.5rem;
          font-size: 1rem;
          font-weight: 700;
          color: #000000;
          background-color: #ffffff;
          border: 1px solid #000000;
          border-radius: 9999px;
          cursor: pointer;
          outline: none;
          transition: border-color 0.6s ease, transform 0.3s ease;
          display: inline-flex;
          text-decoration: none;
        }

        @media (min-width: 640px) {
          .btn-animated {
            padding: 1rem 2.25rem;
            font-size: 1.0625rem;
          }
        }

        @media (min-width: 1024px) {
          .btn-animated {
            padding: 1.25rem 3rem;
            font-size: 1.125rem;
          }
        }

        .btn-animated:hover {
          transform: scale(1.05);
        }

        .btn-animated .text-wrapper {
          position: relative;
          z-index: 10;
          display: block;
          overflow: hidden;
        }

        .btn-animated .text-default {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: transform 0.85s cubic-bezier(0.3, 0, 0.2, 1);
        }

        .btn-animated .text-hover {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #ffffff;
          transition: transform 0.85s cubic-bezier(0.3, 0, 0.2, 1);
        }

        .btn-animated:hover .text-default,
        .btn-animated:hover .text-hover {
          transform: translateY(-100%);
        }

        .btn-animated::before {
          content: '';
          position: absolute;
          top: 100%; 
          left: 50%;
          transform: translateX(-50%);
          width: 250%; 
          aspect-ratio: 1 / 1;
          background-color: #000000;
          border-radius: 50%;
          z-index: 0;
          transition: top 0.85s cubic-bezier(0.3, 0, 0.2, 1);
        }

        .btn-animated:hover::before {
          top: -150%; 
        }

        /* --- TECH MARQUEE CSS --- */
        .marquee-container {
          display: flex;
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }

        .marquee-track {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          gap: 0.75rem;
          padding-right: 0.75rem;
          /* Increased from 25s to 50s for a much slower, more luxurious glide */
          animation: scroll 50s linear infinite; 
        }

        @media (min-width: 768px) {
          .marquee-container {
            mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          }

          .marquee-track {
            gap: 1.5rem;
            padding-right: 1.5rem;
          }
        }

        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        `}} />

        <Navbar isVisible={isNavVisible} />

        {/* --- HERO SECTION --- */}
        <section
          id="home"
          ref={heroRef}
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
          className="relative min-h-[100svh] sm:min-h-[110svh] lg:min-h-[125vh] flex flex-col items-center justify-start overflow-hidden pt-24 sm:pt-28 lg:pt-32"
        >
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_34%,rgba(255,255,255,0.12),transparent_34%),linear-gradient(180deg,#050505_0%,#000_70%)]" />
          {shouldLoadHeroVideo && isDesktop && !isLoading && (
            <HLSVideo src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8" className="z-0 opacity-50" />
          )}

          {/* Gradient Fades for blending into the next section */}
          <div className="absolute top-0 w-full h-[200px] bg-gradient-to-b from-black to-transparent z-0 pointer-events-none" />
          <div className="absolute bottom-0 w-full h-[300px] bg-gradient-to-t from-black to-transparent z-0 pointer-events-none" />

          {/* Massive Background Text (Parallaxed) */}
          <motion.div
            style={{ y: heroTextY, opacity: heroOpacity }}
            className="absolute top-[14svh] sm:top-[12vh] w-full text-center z-10 pointer-events-none px-4"
          >
            <h1 className="opacity-90">
              {/* UX FIX: Forced to stay on one row (whitespace-nowrap) and mathematically scaled down slightly so it fits screen edges perfectly */}
              <ShinyText
                text="HI, I'M RICO"
                speed={3}
                color="#b5b5b5"
                shineColor="#ffffff"
                className="text-5xl min-[390px]:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-black leading-none tracking-normal whitespace-nowrap"
              />
            </h1>
          </motion.div>

          {/* 3D Avatar (Wrapped with entry animation + mouse tracking) */}
          <motion.div
            initial={isDesktop ? { scale: 0.8, opacity: 0, y: 50 } : false}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={isDesktop ? { duration: 1.2, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
            className="relative z-20 w-[min(72vw,20rem)] h-[min(72vw,20rem)] md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] mt-[18svh] sm:mt-[18vh] lg:mt-[20vh] pointer-events-none"
          >
            <motion.div style={{ x: avatarX, y: avatarY }} className="w-full h-full">
              <img
                src={avatar640}
                srcSet={`${avatar640} 640w, ${avatar960} 960w`}
                sizes="(min-width: 768px) 28rem, min(72vw, 20rem)"
                alt="Rico 3D avatar"
                width="640"
                height="800"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
          </motion.div>

          {/* --- BOTTOM HERO ELEMENTS & TECH MARQUEE --- */}
          <div className="absolute bottom-5 sm:bottom-8 w-full flex flex-col gap-6 sm:gap-8 md:gap-10 z-30">

            <div className="px-4 sm:px-6 lg:px-16 flex flex-col md:flex-row justify-between items-center md:items-end gap-5 md:gap-0 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                className="max-w-[17rem] md:max-w-[13rem]"
              >
                <p className="text-xs md:text-sm font-medium uppercase tracking-wide leading-relaxed text-zinc-400">
                  A Developer Driven By Crafting Striking And Unforgettable Projects
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                className="flex items-center justify-center flex-wrap md:flex-nowrap gap-3 md:gap-4"
              >
                <a href="https://github.com/adricocorson" target="_blank" rel="noreferrer" className="flex items-center justify-center min-h-11 min-w-11 p-3 md:p-4 rounded-lg bg-black border border-zinc-800 text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:scale-110 shadow-lg" aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/adrico/" target="_blank" rel="noreferrer" className="flex items-center justify-center min-h-11 min-w-11 p-3 md:p-4 rounded-lg bg-black border border-zinc-800 text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:scale-110 shadow-lg" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:adricocorsonz@gmail.com?subject=Let's%20Work%20Together" target="_blank" rel="noreferrer" className="flex items-center justify-center min-h-11 min-w-11 p-3 md:p-4 rounded-lg bg-black border border-zinc-800 text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:scale-110 shadow-lg" aria-label="Email">
                  <Mail size={20} />
                </a>
                <a href="https://wa.me/601128741876" target="_blank" rel="noreferrer" className="flex items-center justify-center min-h-11 min-w-11 p-3 md:p-4 rounded-lg bg-black border border-zinc-800 text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:scale-110 shadow-lg" aria-label="WhatsApp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              ref={marqueeRef}
              className="marquee-container"
            >
              {[1, 2].map((trackIndex) => (
                <div key={trackIndex} className="marquee-track">
                  {TECH_BADGES.map((badge, i) => (
                    <BadgeItem key={`${trackIndex}-${i}`} badge={badge} />
                  ))}
                </div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* --- PORTFOLIO GRID SCROLLER --- */}
        <section ref={gridRef} className="relative z-10 bg-black pb-20 sm:pb-24 lg:pb-32 pt-8 sm:pt-10 overflow-hidden flex flex-col gap-3 sm:gap-4">
          <motion.div
            style={{ x: row1X }}
            className="flex gap-3 sm:gap-4 w-max px-4 md:px-10"
          >
            {row1Images.map((src, i) => (
              <div
                key={`r1-${i}`}
                className="w-[82vw] sm:w-[58vw] md:w-[42vw] xl:w-[28vw] aspect-video bg-zinc-900 rounded-xl overflow-hidden relative group cursor-pointer shrink-0"
              >
                <img src={src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="w-full h-full object-cover transition-all duration-700 saturate-50 group-hover:saturate-100 opacity-60 group-hover:opacity-100" />
              </div>
            ))}
          </motion.div>

          <motion.div
            style={{ x: row2X }}
            className="flex gap-3 sm:gap-4 w-max px-4 md:px-10"
          >
            {row2Images.map((src, i) => (
              <div
                key={`r2-${i}`}
                className="w-[82vw] sm:w-[58vw] md:w-[42vw] xl:w-[28vw] aspect-video bg-zinc-900 rounded-xl overflow-hidden relative group cursor-pointer shrink-0"
              >
                <img src={src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="w-full h-full object-cover transition-all duration-700 saturate-50 group-hover:saturate-100 opacity-60 group-hover:opacity-100" />
              </div>
            ))}
          </motion.div>
        </section>

        {/* --- ABOUT SECTION (Sticky Scrub) --- */}
        <section id="about" ref={aboutRef} className="relative z-20 bg-white text-black rounded-t-[2rem] sm:rounded-t-[3rem] -mt-12 sm:-mt-16 min-h-[100svh] lg:h-[250vh]">
          <div className="relative lg:sticky top-0 w-full min-h-[100svh] lg:h-[100dvh] flex flex-col items-center justify-center px-5 sm:px-8 lg:px-20 py-24 sm:py-28 lg:py-0 overflow-hidden">

            <motion.div
              animate={{ y: [-20, 20], rotate: [10, -10] }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 3, ease: "easeInOut" }}
              className="absolute top-40 left-10 text-purple-500 drop-shadow-xl hidden md:block"
            >
              <Smile size={80} strokeWidth={1.5} />
            </motion.div>
            <motion.div
              animate={{ y: [20, -20], rotate: [-10, 10] }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 3.5, ease: "easeInOut" }}
              className="absolute top-60 right-20 text-blue-500 drop-shadow-xl hidden md:block"
            >
              <MousePointer2 size={80} strokeWidth={1.5} fill="currentColor" />
            </motion.div>
            <motion.div
              animate={{ y: [25, -15], rotate: [0, -45, 0] }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 4.5, ease: "easeInOut" }}
              className="absolute top-[20%] right-32 text-emerald-500 drop-shadow-2xl hidden md:block opacity-60"
            >
              <Hexagon size={90} strokeWidth={1.5} />
            </motion.div>

            <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
              <div className="overflow-hidden mb-7 sm:mb-10 pb-4">
                <motion.h2
                  initial={{ y: "100%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-normal leading-none"
                >
                  ABOUT ME
                </motion.h2>
              </div>

              <ScrollRevealText
                text="I'm an IT student at Asia Pacific University specializing in Business Information Systems. I combine front-end development, UI/UX design, and full-stack engineering to craft seamless digital experiences. Always eager to explore new technologies, I'm currently seeking opportunities to bring innovative projects to life."
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium max-w-3xl leading-relaxed text-zinc-800 mb-8 sm:mb-12"
                progress={isDesktop ? smoothAboutProgress : null}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <a href="/Adrico_Resume.pdf" download="Adrico_Resume.pdf" className="btn-animated shadow-2xl">
                  <span className="text-wrapper">
                    <span className="text-default">
                      <FileText size={20} /> Résumé
                    </span>
                    <span className="text-hover">
                      <FileText size={20} /> Résumé
                    </span>
                  </span>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SERVICES SECTION --- */}
        <section id="services" className="relative z-20 bg-white text-black pb-20 sm:pb-24 lg:pb-32 px-5 sm:px-8 lg:px-20 overflow-hidden pt-8 sm:pt-10">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              variants={slideInLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, margin: "-50px" }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-normal mb-10 md:mb-16 text-center md:text-left"
            >
              SERVICES
            </motion.h2>

            <div className="flex flex-col border-t border-black/20">
              {SERVICES.map((service, i) => (
                <motion.div
                  key={service.num}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, margin: "-15% 0px -15% 0px" }}
                  variants={{
                    hidden: { borderBottomColor: "rgba(0,0,0,0)", transition: { duration: 0.4 } },
                    show: { borderBottomColor: "rgba(0,0,0,0.2)", transition: { duration: 0.8 } }
                  }}
                  className="flex flex-col sm:flex-row items-start md:items-center gap-3 sm:gap-0 py-7 sm:py-8 md:py-10 border-b border-black/20"
                >
                  <div className="w-auto sm:w-16 md:w-24 shrink-0 overflow-hidden pt-1 md:pt-2">
                    <motion.div
                      custom={i}
                      variants={{
                        hidden: { y: "100%", opacity: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                        show: (i) => ({
                          y: "0%",
                          opacity: 1,
                          transition: { duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }
                        })
                      }}
                      className="text-3xl sm:text-4xl md:text-6xl font-black text-black"
                    >
                      {service.num}
                    </motion.div>
                  </div>
                  <div className="flex-1 flex flex-col gap-2 overflow-hidden pt-1 md:pt-2 sm:pl-6 md:pl-10 min-w-0">
                    <motion.div
                      custom={i}
                      variants={{
                        hidden: { y: "100%", opacity: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                        show: (i) => ({
                          y: "0%",
                          opacity: 1,
                          transition: { duration: 0.8, delay: (i * 0.15) + 0.1, ease: [0.16, 1, 0.3, 1] }
                        })
                      }}
                    >
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-1 md:mb-3 text-black leading-tight">{service.title}</h3>
                      <p className="text-zinc-800 max-w-2xl text-sm sm:text-base md:text-lg font-medium leading-relaxed">{service.desc}</p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- PROJECTS SECTION --- */}
        <section id="projects" className="relative z-30 bg-black text-white rounded-[2rem] sm:rounded-[3rem] -mt-12 sm:-mt-16 pt-24 sm:pt-28 lg:pt-32 pb-24 sm:pb-32 lg:pb-40 px-4 sm:px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-normal leading-none mb-12 sm:mb-16 lg:mb-20 text-center"
            >
              PROJECTS
            </motion.h2>

            <div className="flex flex-col gap-10 sm:gap-16 md:gap-32 pb-[6vh] md:pb-[10vh]">
              {PROJECTS.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 120, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative md:sticky bg-[#0f0f0f] border border-zinc-800 rounded-[1.25rem] sm:rounded-[2rem] md:rounded-[2.5rem] p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col gap-5 sm:gap-6 md:gap-6 shadow-2xl md:top-[calc(1rem+var(--offset-desktop))] lg:top-[calc(1.5rem+var(--offset-desktop))]"
                  style={{
                    "--offset-mobile": `${i * 16}px`,
                    "--offset-desktop": `${i * 24}px`,
                    zIndex: i
                  }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 sm:gap-6">
                    <div className="flex items-start sm:items-center gap-4 sm:gap-5 md:gap-8 min-w-0">
                      <span className="text-3xl sm:text-4xl md:text-7xl font-black text-white leading-none">{project.id}</span>
                      <div className="min-w-0">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 leading-tight">{project.name}</h3>
                        <p className="text-xs md:text-sm tracking-wide uppercase text-zinc-500 font-bold leading-relaxed">{project.desc}</p>
                      </div>
                    </div>
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 min-h-11 px-5 py-2 md:px-6 md:py-2 rounded-full border border-zinc-700 text-xs md:text-sm font-bold tracking-wide uppercase hover:bg-white hover:text-black transition-colors w-full md:w-auto justify-center"
                      >
                        {project.type === "VIEW SOURCE" ? <Github size={16} /> : <ArrowUpRight size={16} />}
                        {project.type}
                      </a>
                    ) : (
                      <button className="min-h-11 px-5 py-2 md:px-6 md:py-2 rounded-full border border-zinc-700 text-xs md:text-sm font-bold tracking-wide uppercase hover:bg-white hover:text-black transition-colors w-full md:w-auto">
                        {project.type}
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6 mt-1 sm:mt-2 md:mt-4">
                    {project.images.map((img, idx) => (
                      <ProjectMedia key={`${project.id}-${idx}`} src={img} projectName={project.name} index={idx} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CONTACT SECTION (Sticky Pinned Container) --- */}
        <section id="contacts" ref={contactRef} className="relative z-20 bg-white text-black -mt-12 sm:-mt-16 min-h-[100svh] lg:h-[250vh]">
          <div className="relative lg:sticky top-0 w-full min-h-[100svh] lg:h-[100dvh] overflow-hidden flex flex-col items-center justify-center py-24 sm:py-28 lg:py-0">

            {/* --- BACKGROUND ELEMENTS --- */}
            <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
              {/* Subtle Dot Grid */}
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '40px 40px' }} />

              {/* Floating Soft Orbs */}
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="hidden lg:block absolute top-[-14%] left-[-8%] w-[42vw] h-[42vw] rounded-full bg-purple-300 mix-blend-multiply filter blur-[80px] opacity-20 will-change-transform"
              />
              <motion.div
                animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="hidden lg:block absolute bottom-[-12%] right-[-8%] w-[36vw] h-[36vw] rounded-full bg-pink-200 mix-blend-multiply filter blur-[80px] opacity-[0.15] will-change-transform"
              />

              {/* Massive Parallax Typography Watermark */}
              <motion.div style={isDesktop ? { y: contactTextY, scale: contactTextScale } : undefined} className="absolute w-full flex justify-center opacity-[0.03] select-none">
                <span className="text-8xl sm:text-[9rem] md:text-[12rem] lg:text-[16rem] font-black leading-none whitespace-nowrap tracking-normal">LET'S TALK</span>
              </motion.div>

              {/* Floating Parallax Geometrics */}
              <motion.div style={isDesktop ? { y: contactShape1Y, rotate: contactShapeRotate1 } : undefined} className="absolute top-[25%] left-[10%] md:left-[20%] text-black/10">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
              </motion.div>
              <motion.div style={isDesktop ? { y: contactShape2Y, rotate: contactShapeRotate2 } : undefined} className="absolute bottom-[25%] right-[10%] md:right-[20%] text-black/10">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10" /></svg>
              </motion.div>
              <motion.div style={isDesktop ? { y: contactShape1Y, x: 60, rotate: contactShapeRotate2 } : { x: 60 }} className="absolute top-[60%] left-[5%] text-black/10 hidden md:block">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /></svg>
              </motion.div>
            </div>

            {/* --- FOREGROUND CONTENT --- */}
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10 px-5 sm:px-8 md:px-10">

              <div className="overflow-hidden mb-7 sm:mb-8 md:mb-10 flex">
                {isDesktop ? (
                  <div className="flex">
                    {"LET'S TALK".split('').map((char, i) => (
                      <ContactLetter key={i} char={char} index={i} progress={smoothContactProgress} />
                    ))}
                  </div>
                ) : (
                  <h2 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-normal leading-none">
                    LET'S TALK
                  </h2>
                )}
              </div>

              <motion.p
                style={isDesktop ? { opacity: descOpacity, y: descY } : undefined}
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium max-w-2xl leading-relaxed text-zinc-800 mb-8 md:mb-12"
              >
                I am actively seeking full-time roles and job opportunities in startups, agencies, and design studios. Whether you're building something exciting, looking for fresh creative talent, or just want to connect feel free to reach out.
              </motion.p>

              <motion.div style={isDesktop ? { opacity: btnOpacity, y: btnY, scale: btnScale } : undefined}>
                <a href="mailto:adricocorsonz@gmail.com?subject=Let's%20Work%20Together" target="_blank" rel="noreferrer" className="btn-animated shadow-2xl">
                  <span className="text-wrapper">
                    <span className="text-default">Contact Me</span>
                    <span className="text-hover">Contact Me</span>
                  </span>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- EXPANDED FOOTER --- */}
        <footer ref={footerRef} className="bg-[#141414] text-white pt-14 sm:pt-16 lg:pt-20 pb-8 relative overflow-hidden rounded-t-[2rem] sm:rounded-t-[2.5rem] md:rounded-t-[3.5rem] z-40 -mt-12 sm:-mt-16">
          <div className="max-w-[90rem] mx-auto px-5 sm:px-8 lg:px-16 relative z-10 flex flex-col h-full">

            <div className="flex flex-col lg:flex-row justify-between mb-10 sm:mb-12 gap-10 sm:gap-14 lg:gap-8 mt-4">

              <div className="flex gap-10 md:gap-28 w-full md:w-auto justify-between md:justify-start">
                <motion.div variants={footerFadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-col gap-5">
                  <RollingLink href="#home" className="font-medium text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300">HOME</RollingLink>
                  <RollingLink href="#about" className="font-medium text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300">ABOUT</RollingLink>
                  <RollingLink href="#services" className="font-medium text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300">SERVICES</RollingLink>
                </motion.div>
                <motion.div variants={footerFadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-col gap-5">
                  <RollingLink href="#projects" className="font-medium text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300">PROJECTS</RollingLink>
                  <RollingLink href="#contacts" className="font-medium text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300">CONTACT</RollingLink>
                </motion.div>
              </div>

              <motion.div variants={footerFadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="w-full lg:max-w-[460px]">
                <h3 className="text-2xl md:text-3xl font-medium mb-6 tracking-normal">Still have questions?</h3>
                {/* CRITICAL UX FIX: Flex alignment explicitly centers socials horizontally on mobile for a balanced look */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 w-full">
                  <a href="https://www.linkedin.com/in/adrico/" target="_blank" rel="noreferrer" className="bg-white/5 border border-white/10 text-white min-h-11 px-5 sm:px-6 py-3.5 md:py-4 rounded-full font-medium hover:bg-white hover:text-black hover:border-white transition-all duration-300 whitespace-nowrap text-sm md:text-base flex items-center justify-center gap-2 w-full sm:w-auto">
                    <Linkedin size={18} /> LinkedIn
                  </a>
                  <a href="https://wa.me/601128741876" target="_blank" rel="noreferrer" className="bg-white/5 border border-white/10 text-white min-h-11 px-5 sm:px-6 py-3.5 md:py-4 rounded-full font-medium hover:bg-white hover:text-black hover:border-white transition-all duration-300 whitespace-nowrap text-sm md:text-base flex items-center justify-center gap-2 w-full sm:w-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    WhatsApp
                  </a>
                  <a href="https://github.com/adricocorson" target="_blank" rel="noreferrer" className="bg-white/5 border border-white/10 text-white min-h-11 px-5 sm:px-6 py-3.5 md:py-4 rounded-full font-medium hover:bg-white hover:text-black hover:border-white transition-all duration-300 whitespace-nowrap text-sm md:text-base flex items-center justify-center gap-2 w-full sm:w-auto">
                    <Github size={18} /> GitHub
                  </a>
                </div>
              </motion.div>
            </div>

            <div className="flex-grow flex items-end justify-center w-full mt-2">
              <div className="w-full border-b border-gray-800 pt-4" style={{ clipPath: "inset(-100vh -100vw 0 -100vw)" }}>
                <div className="transform-gpu flex justify-center">
                  <h2 className="giant-text font-black select-none mb-[-4vw] md:mb-[-5vw]">
                    {["A", "d", "r", "i", "c", "o"].map((char, index) => (
                      <FooterChar key={index} char={char} index={index} progress={smoothFooterProgress} />
                    ))}
                  </h2>
                </div>
              </div>
            </div>

            <motion.div variants={footerFadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 mt-5 sm:mt-6 gap-4 text-center md:text-left pb-4">
              <p>© 2026 Adrico Corson Mulia. All rights reserved.</p>
              <div className="flex items-center">
                <span className="tracking-wide uppercase text-xs font-bold">LOCAL TIME KL/MY:&nbsp;<span className="text-gray-300 font-medium"><LocalTime /></span></span>
              </div>
            </motion.div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 pointer-events-none z-0"></div>
        </footer>
      </div>
    </ClickSpark>
  );
}
