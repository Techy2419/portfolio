import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';

// Register all GSAP plugins
gsap.registerPlugin(
  ScrollTrigger,
  TextPlugin,
  MorphSVGPlugin,
  MotionPathPlugin,
  DrawSVGPlugin,
  SplitText,
  CustomEase,
  Physics2DPlugin
);

// Custom easing curves for premium animations
CustomEase.create("elastic", "M0,0 C0,0 0.056,0.442 0.175,0.442 0.294,0.442 0.332,0 0.332,0 0.332,0 0.414,1.347 0.671,1.347 0.991,1.347 1,0 1,0");
CustomEase.create("power", "M0,0 C0.14,0 0.242,0.438 0.272,0.561 0.313,0.728 0.354,0.963 1,1");
CustomEase.create("smooth", "M0,0 C0.25,0.1 0.25,1 1,1");

export interface GSAPAnimationConfig {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  pinSpacing?: boolean;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export const useGSAP = (animationFn: (ctx: gsap.Context) => void, deps: any[] = []) => {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {}, scope);
    animationFn(ctx);

    return () => ctx.revert();
  }, deps);

  return { scope };
};

// Advanced animation utilities
export const gsapUtils = {
  // Magnetic effect for interactive elements
  magnetic: (element: string | Element, strength: number = 1) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength * 0.1;
      const deltaY = (e.clientY - centerY) * strength * 0.1;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  },

  // Advanced text reveal animations
  textReveal: (element: string | Element, config: any = {}) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    const split = new SplitText(el, { type: "chars,words,lines" });
    
    gsap.set(split.chars, { 
      opacity: 0, 
      y: 100,
      rotationX: -90,
      transformOrigin: "0% 50% -50"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none reverse",
        ...config.scrollTrigger
      }
    });

    tl.to(split.chars, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.8,
      stagger: 0.02,
      ease: "back.out(1.7)"
    });

    return tl;
  },

  // Particle system animation
  createParticles: (container: string | Element, count: number = 50) => {
    const containerEl = typeof container === 'string' ? document.querySelector(container) : container;
    if (!containerEl) return;

    const particles: HTMLElement[] = [];
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-70';
      containerEl.appendChild(particle);
      particles.push(particle);

      // Random positioning and animation
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 0.5 + 0.5
      });

      gsap.to(particle, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        duration: Math.random() * 10 + 5,
        repeat: -1,
        yoyo: true,
        ease: "none"
      });

      gsap.to(particle, {
        opacity: Math.random() * 0.8 + 0.2,
        duration: Math.random() * 3 + 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }

    return particles;
  },

  // Morphing SVG animations
  morphSVG: (element: string | Element, shapes: string[], config: any = {}) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    const tl = gsap.timeline({ repeat: -1, ...config });
    
    shapes.forEach((shape, index) => {
      tl.to(el, {
        morphSVG: shape,
        duration: 2,
        ease: "power2.inOut",
        delay: index === 0 ? 0 : 0.5
      });
    });

    return tl;
  },

  // Advanced scroll-triggered animations
  scrollReveal: (elements: string | NodeList, config: any = {}) => {
    const els = typeof elements === 'string' ? document.querySelectorAll(elements) : elements;
    
    gsap.fromTo(els, 
      {
        opacity: 0,
        y: 100,
        scale: 0.8,
        rotation: 5
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "elastic.out(1, 0.3)",
        scrollTrigger: {
          trigger: els[0],
          start: "top 80%",
          toggleActions: "play none none reverse",
          ...config.scrollTrigger
        }
      }
    );
  },

  // Physics-based animations
  physics: (element: string | Element, config: any = {}) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    return gsap.to(el, {
      physics2D: {
        velocity: config.velocity || 100,
        angle: config.angle || 90,
        gravity: config.gravity || 500,
        friction: config.friction || 0.8
      },
      duration: config.duration || 3,
      ease: "none"
    });
  },

  // Motion path animations
  motionPath: (element: string | Element, path: string, config: any = {}) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    return gsap.to(el, {
      motionPath: {
        path: path,
        autoRotate: config.autoRotate !== false,
        alignOrigin: config.alignOrigin || [0.5, 0.5]
      },
      duration: config.duration || 3,
      ease: config.ease || "power2.inOut",
      repeat: config.repeat || 0,
      yoyo: config.yoyo || false
    });
  },

  // Drawing SVG animations
  drawSVG: (element: string | Element, config: any = {}) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    gsap.set(el, { drawSVG: "0%" });
    
    return gsap.to(el, {
      drawSVG: "100%",
      duration: config.duration || 2,
      ease: config.ease || "power2.inOut",
      scrollTrigger: config.scrollTrigger
    });
  }
};

export default useGSAP;