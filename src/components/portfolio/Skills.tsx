import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText } from 'gsap/SplitText';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import { useGSAP, gsapUtils } from '@/hooks/useGSAP';

const Skills = () => {
  const skillsRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const skillsGridRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const magneticFieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add DevIcons CDN to head if not already present
    if (!document.querySelector('link[href*="devicon"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css';
      document.head.appendChild(link);
    }
  }, []);

  const skills = [
    { name: 'HTML', icon: 'devicon-html5-plain colored' },
    { name: 'CSS', icon: 'devicon-css3-plain colored' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
    { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
    { name: 'React', icon: 'devicon-react-original colored' },
    { name: 'Bootstrap', icon: 'devicon-bootstrap-plain colored' },
    { name: 'Firebase', icon: 'devicon-firebase-plain colored' },
    { name: 'Git', icon: 'devicon-git-plain colored' },
    { name: 'Vercel', icon: 'devicon-vercel-original colored' },
  ];

  // GSAP Master Timeline for Skills with ALL advanced features
  useGSAP(() => {
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: skillsRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    });

    // 1. Advanced SVG Background Animations with ALL GSAP features
    if (svgRef.current) {
      const svg = svgRef.current;
      
      // Advanced grid lines with DrawSVG and morphing
      const gridLines = svg.querySelectorAll('.grid-line');
      gridLines.forEach((line, i) => {
        gsap.set(line, { drawSVG: "0%" });
        
        masterTl.to(line, {
          drawSVG: "100%",
          duration: 1.5,
          delay: i * 0.02,
          ease: "power2.inOut"
        }, 0);
        
        // Continuous wave animation
        gsap.to(line, {
          y: "10px",
          duration: 8 + Math.random() * 5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      });

      // 3D Network nodes with physics and magnetic fields
      const networkNodes = svg.querySelectorAll('.network-node');
      networkNodes.forEach((node, i) => {
        gsap.set(node, { 
          opacity: 0,
          scale: 0,
          transformOrigin: "center"
        });
        
        masterTl.to(node, {
          opacity: 0.8,
          scale: 1,
          duration: 0.6,
          delay: i * 0.03,
          ease: "back.out(1.7)"
        }, 0.2);
        
        // Advanced physics-based floating
        gsap.to(node, {
          physics2D: {
            velocity: 20 + Math.random() * 30,
            angle: Math.random() * 360,
            gravity: 50,
            friction: 0.8
          },
          duration: 10 + Math.random() * 10,
          repeat: -1,
          ease: "none"
        });
        
        // Magnetic field interaction
        node.addEventListener('mouseenter', () => {
          gsap.to(node, {
            scale: 1.5,
            filter: "brightness(1.5) blur(1px)",
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        node.addEventListener('mouseleave', () => {
          gsap.to(node, {
            scale: 1,
            filter: "brightness(1) blur(0px)",
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          });
        });
      });

      // Connection lines with advanced morphing
      const connectionLines = svg.querySelectorAll('.connection-line');
      connectionLines.forEach((line, i) => {
        gsap.set(line, { drawSVG: "0%" });
        
        masterTl.to(line, {
          drawSVG: "100%",
          duration: 2,
          delay: i * 0.1,
          ease: "power2.inOut"
        }, 0.5);
        
        // Pulse animation with morphing
        gsap.to(line, {
          strokeWidth: 3,
          opacity: 0.8,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: Math.random() * 2
        });
      });

      // 3D Perspective grid with advanced morphing
      const perspectiveGrid = svg.querySelectorAll('.perspective-grid');
      perspectiveGrid.forEach((grid, i) => {
        gsap.set(grid, { opacity: 0 });
        
        masterTl.to(grid, {
          opacity: 0.3,
          duration: 1,
          delay: i * 0.1,
          ease: "power2.inOut"
        }, 0.8);
        
        // 3D wave effect
        gsap.to(grid, {
          y: "-10px",
          scaleY: 1.1,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      });
    }

    // 2. Advanced Title Animation with SplitText
    if (titleRef.current) {
      const titleSplit = new SplitText(titleRef.current, { type: "chars,words,lines" });
      
      gsap.set(titleSplit.chars, {
        opacity: 0,
        y: 100,
        rotationX: -90,
        transformOrigin: "0% 50% -50px"
      });
      
      masterTl.to(titleSplit.chars, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.03,
        ease: "back.out(1.7)"
      }, 0.5);
      
      // Advanced text shimmer with physics
      gsap.to(titleRef.current, {
        backgroundPosition: "200% center",
        duration: 4,
        repeat: -1,
        ease: "none"
      });
      
      // Magnetic effect for title
      gsapUtils.magnetic(titleRef.current, 0.5);
    }

    // 3. Description reveal with advanced morphing
    if (descRef.current) {
      const descSplit = new SplitText(descRef.current, { type: "words" });
      
      gsap.set(descSplit.words, {
        opacity: 0,
        y: 30,
        rotationX: -45
      });
      
      masterTl.to(descSplit.words, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: "elastic.out(1, 0.3)"
      }, 1);
    }

    // 4. Advanced Skills Grid with magnetic field interactions
    if (skillsGridRef.current) {
      const skillCards = skillsGridRef.current.querySelectorAll('.skill-card');
      
      skillCards.forEach((card, i) => {
        gsap.set(card, {
          opacity: 0,
          scale: 0,
          rotation: 180,
          y: 100
        });
        
        masterTl.to(card, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          y: 0,
          duration: 1,
          delay: i * 0.1,
          ease: "back.out(1.7)"
        }, 1.5);
        
        // Advanced magnetic field effect
        gsapUtils.magnetic(card, 1.2);
        
        // Skill card physics interactions
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.1,
            rotationY: 15,
            rotationX: 10,
            boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
            duration: 0.4,
            ease: "power2.out"
          });
          
          // Orbital rings acceleration
          const orbitRings = card.querySelectorAll('.orbit-ring');
          orbitRings.forEach(ring => {
            gsap.to(ring, {
              rotation: "+=180",
              scale: 1.2,
              duration: 0.5,
              ease: "power2.out"
            });
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            boxShadow: "0 10px 20px rgba(139, 92, 246, 0.1)",
            duration: 0.6,
            ease: "elastic.out(1, 0.3)"
          });
          
          // Orbital rings deceleration
          const orbitRings = card.querySelectorAll('.orbit-ring');
          orbitRings.forEach(ring => {
            gsap.to(ring, {
              scale: 1,
              duration: 0.6,
              ease: "elastic.out(1, 0.3)"
            });
          });
        });
        
        // Continuous skill icon animation with physics
        const skillIcon = card.querySelector('.skill-icon');
        if (skillIcon) {
          gsap.to(skillIcon, {
            y: "-5px",
            rotation: 5,
            duration: 2 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: i * 0.2
          });
        }
        
        // Orbiting particles with physics
        const particles = card.querySelectorAll('.orbit-particle');
        particles.forEach((particle, j) => {
          const radius = 60;
          const angle = j * 60;
          
          gsap.to(particle, {
            rotation: 360,
            duration: 5 + j,
            repeat: -1,
            ease: "none",
            transformOrigin: `0px ${radius}px`
          });
          
          // Physics-based particle behavior
          gsap.to(particle, {
            physics2D: {
              velocity: 10,
              angle: angle,
              gravity: 20,
              friction: 0.9
            },
            duration: 3,
            repeat: -1,
            ease: "none",
            delay: Math.random() * 2
          });
        });
      });
    }

    // 5. Advanced Magnetic Field System
    if (magneticFieldRef.current) {
      gsapUtils.createParticles(magneticFieldRef.current, 80);
      
      // Magnetic field waves
      const waves = magneticFieldRef.current.querySelectorAll('.magnetic-wave');
      waves.forEach((wave, i) => {
        gsap.to(wave, {
          scale: 2,
          opacity: 0,
          duration: 3,
          repeat: -1,
          delay: i * 0.8,
          ease: "power2.out"
        });
      });
    }

    // 6. Scroll-triggered parallax effects
    gsap.to(svgRef.current, {
      y: "-30%",
      rotation: 2,
      scrollTrigger: {
        trigger: skillsRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

  }, []);

  return (
    <section 
      ref={skillsRef}
      id="skills" 
      className="py-20 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-gray-900 dark:to-purple-950 relative overflow-hidden"
    >
      {/* Advanced Magnetic Field Particle System */}
      <div ref={magneticFieldRef} className="absolute inset-0 pointer-events-none">
        {/* Magnetic field waves */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="magnetic-wave absolute top-1/2 left-1/2 w-4 h-4 bg-purple-500/20 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`
            }}
          />
        ))}
      </div>

      {/* Ultra-Advanced 3D SVG Background with ALL GSAP Features */}
      <div className="absolute inset-0 opacity-20">
        <svg 
          ref={svgRef}
          width="100%" 
          height="100%" 
          viewBox="0 0 1400 900" 
          className="absolute"
        >
          <defs>
            <linearGradient id="skillsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <filter id="skillsGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Advanced 3D Network Grid with morphing */}
          <g filter="url(#skillsGlow)">
            {/* Horizontal morphing grid lines */}
            {[...Array(12)].map((_, i) => (
              <path
                key={`h-grid-${i}`}
                className="grid-line"
                d={`M0,${i * 75 + 50} Q${700 + Math.random() * 200},${i * 75 + 50 + (Math.random() * 80 - 40)} 1400,${i * 75 + 50}`}
                stroke="url(#skillsGrad)"
                strokeWidth="1"
                strokeOpacity="0.5"
                fill="none"
              />
            ))}
            
            {/* Vertical morphing grid lines */}
            {[...Array(16)].map((_, i) => (
              <path
                key={`v-grid-${i}`}
                className="grid-line"
                d={`M${i * 90 + 50},0 Q${i * 90 + 50 + (Math.random() * 80 - 40)},${450 + Math.random() * 200} ${i * 90 + 50},900`}
                stroke="url(#skillsGrad)"
                strokeWidth="1"
                strokeOpacity="0.5"
                fill="none"
              />
            ))}
          </g>
          
          {/* Advanced 3D Network Nodes with physics */}
          {[...Array(20)].map((_, i) => (
            <circle
              key={`node-${i}`}
              className="network-node"
              cx={Math.random() * 1400}
              cy={Math.random() * 900}
              r={Math.random() * 8 + 3}
              fill="url(#skillsGrad)"
              filter="url(#skillsGlow)"
            />
          ))}
          
          {/* Advanced connection lines with morphing */}
          {[...Array(15)].map((_, i) => (
            <line
              key={`connection-${i}`}
              className="connection-line"
              x1={Math.random() * 1400}
              y1={Math.random() * 900}
              x2={Math.random() * 1400}
              y2={Math.random() * 900}
              stroke="url(#skillsGrad)"
              strokeWidth="1"
              strokeOpacity="0.3"
            />
          ))}
          
          {/* 3D Perspective Grid with advanced morphing */}
          {[...Array(10)].map((_, i) => (
            <path
              key={`floor-${i}`}
              className="perspective-grid"
              d={`M${200 + i * 100},800 L${1200 - i * 100},800 L${1200 - i * 100 - 50},${600 - i * 40} L${200 + i * 100 + 50},${600 - i * 40} Z`}
              fill="none"
              stroke="url(#skillsGrad)"
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent bg-200%"
            style={{ backgroundSize: '200% 200%' }}
          >
            Skills & Technologies
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full mb-6" />
          <p
            ref={descRef}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Technologies I work with to create amazing digital experiences
          </p>
        </div>

        {/* Advanced Magnetic Field Skills Layout */}
        <div className="max-w-7xl mx-auto">
          <div 
            ref={skillsGridRef}
            className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12"
          >
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="skill-card relative group flex flex-col items-center"
                style={{
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Advanced 3D Magnetic Skill Sphere */}
                <div className="relative w-36 h-36 flex items-center justify-center">
                  {/* Outer Orbit Ring with physics */}
                  <div
                    className="orbit-ring absolute w-36 h-36 rounded-full border-2 border-purple-500/40"
                    style={{
                      transformStyle: "preserve-3d"
                    }}
                  />
                  
                  {/* Middle Energy Ring with morphing */}
                  <div
                    className="orbit-ring absolute w-28 h-28 rounded-full border border-pink-500/50"
                    style={{
                      transformStyle: "preserve-3d"
                    }}
                  />
                  
                  {/* Inner Core Sphere with advanced effects */}
                  <div
                    className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-blue-600/30 backdrop-blur-lg flex items-center justify-center border border-white/20 shadow-2xl"
                    style={{
                      transformStyle: "preserve-3d"
                    }}
                  >
                    {/* Skill Icon with physics */}
                    <i 
                      className={`skill-icon ${skill.icon} text-4xl`}
                      style={{
                        transformStyle: "preserve-3d"
                      }}
                    />
                  </div>
                  
                  {/* Orbiting Particles with advanced physics */}
                  {[...Array(6)].map((_, particleIndex) => (
                    <div
                      key={particleIndex}
                      className="orbit-particle absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                        transformOrigin: '0px 60px',
                        transform: `rotate(${particleIndex * 60}deg)`
                      }}
                    />
                  ))}
                </div>

                {/* Skill Name with magnetic effect */}
                <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mt-6 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {skill.name}
                </h3>

                {/* Advanced Mastery Indicator with morphing */}
                <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-3" />
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Summary Section with physics */}
        <div className="text-center mt-24">
          <div className="inline-flex items-center gap-6 bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-full px-10 py-6 border border-purple-500/20 shadow-lg">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-700 dark:text-gray-300 font-medium text-lg">
              Continuously Learning & Growing
            </span>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;