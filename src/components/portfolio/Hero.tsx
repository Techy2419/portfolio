import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText } from 'gsap/SplitText';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGSAP, gsapUtils } from '@/hooks/useGSAP';

const Hero = () => {
  const roles = [
    "Computer Science Student",
    "Aspiring Developer", 
    "React Enthusiast",
    "Problem Solver"
  ];
  
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  
  // GSAP Master Timeline for ALL hero animations
  useGSAP(() => {
    const masterTl = gsap.timeline({ delay: 0.5 });
    
    // 1. Advanced SVG Background Animations with ALL GSAP features
    if (svgRef.current) {
      const svg = svgRef.current;
      
      // Animate center platform with morphing
      const centerPlatform = svg.querySelector('#centerPlatform');
      if (centerPlatform) {
        gsap.to(centerPlatform, {
          attr: { r: "430" },
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      }
      
      // Advanced grid lines with DrawSVG
      const gridLines = svg.querySelectorAll('.grid-line');
      gridLines.forEach((line, i) => {
        gsap.set(line, { drawSVG: "0%" });
        gsap.to(line, {
          drawSVG: "100%",
          duration: 2,
          delay: i * 0.05,
          repeat: -1,
          repeatDelay: 5,
          ease: "power2.inOut"
        });
      });
      
      // 3D Cubes with physics and morphing
      const cubes = svg.querySelectorAll('.hero-cube');
      cubes.forEach((cube, i) => {
        gsap.set(cube, {
          transformOrigin: "50% 50%",
          opacity: 0
        });
        
        masterTl.to(cube, {
          opacity: 1,
          duration: 0.5,
          delay: i * 0.1
        }, 0.2);
        
        // Continuous 3D rotation and floating
        gsap.to(cube, {
          rotationY: 360,
          duration: 10 + i * 2,
          repeat: -1,
          ease: "none"
        });
        
        gsap.to(cube, {
          y: "+=20",
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
        
        // Physics-based hover effect
        cube.addEventListener('mouseenter', () => {
          gsap.to(cube, {
            physics2D: {
              velocity: 50,
              angle: Math.random() * 360,
              gravity: 200
            },
            duration: 1,
            ease: "power2.out"
          });
        });
      });
      
      // Floating code elements with advanced motion paths
      const codeElements = svg.querySelectorAll('.code-element');
      codeElements.forEach((element, i) => {
        const path = `M${Math.random() * 1920},${Math.random() * 1080} Q${Math.random() * 1920},${Math.random() * 1080} ${Math.random() * 1920},${Math.random() * 1080}`;
        
        gsap.to(element, {
          motionPath: {
            path: path,
            autoRotate: true
          },
          duration: 15 + Math.random() * 10,
          repeat: -1,
          ease: "none"
        });
        
        gsap.to(element, {
          opacity: 0.8,
          duration: 2 + Math.random() * 3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      });
      
      // Orbital animations with advanced morphing
      const orbitals = svg.querySelectorAll('.orbital');
      orbitals.forEach((orbital, i) => {
        gsap.to(orbital, {
          rotation: 360,
          duration: 20 + i * 5,
          repeat: -1,
          ease: "none",
          transformOrigin: "960px 540px"
        });
        
        // Morphing orbital shapes
        const originalRx = 150 + i * 100;
        const originalRy = 50 + i * 30;
        gsap.to(orbital, {
          attr: { 
            rx: originalRx + 20,
            ry: originalRy + 10
          },
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      });
      
      // Particles along orbital paths with physics
      const orbitalParticles = svg.querySelectorAll('.orbital-particle');
      orbitalParticles.forEach((particle, i) => {
        const radius = 150 + (Math.floor(i/6) * 100);
        const angle = (i % 6) * 60;
        
        gsap.to(particle, {
          rotation: 360,
          duration: 10 + Math.floor(i/6) * 2,
          repeat: -1,
          ease: "none",
          transformOrigin: "960px 540px"
        });
        
        gsap.to(particle, {
          attr: { r: "6" },
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: i * 0.2
        });
      });
      
      // Central core with advanced glow effects
      const centralCore = svg.querySelector('#centralCore');
      if (centralCore) {
        gsap.to(centralCore, {
          attr: { r: "45" },
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
        
        gsap.to(centralCore, {
          filter: "blur(15px)",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      }
    }
    
    // 2. Advanced Name Animation with SplitText and magnetic effects
    if (nameRef.current) {
      const nameSplit = new SplitText(nameRef.current, { type: "chars,words" });
      gsap.set(nameSplit.chars, {
        opacity: 0,
        y: 100,
        rotationX: -90,
        transformOrigin: "0% 50% -50px"
      });
      
      masterTl.to(nameSplit.chars, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: "back.out(1.7)"
      }, 1);
      
      // Advanced magnetic effect
      gsapUtils.magnetic(nameRef.current, 0.8);
      
      // Text shimmer effect
      gsap.to(nameRef.current, {
        backgroundPosition: "200% center",
        duration: 3,
        repeat: -1,
        ease: "none"
      });
    }
    
    // 3. Advanced Role Text with morphing and 3D effects
    if (roleRef.current) {
      gsap.set(roleRef.current, {
        opacity: 0,
        y: 50,
        rotationX: -45
      });
      
      masterTl.to(roleRef.current, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, 1.5);
      
      // Role changing animation with advanced 3D effects
      const roleChangeTimeline = gsap.timeline({ repeat: -1 });
      roles.forEach((role, index) => {
        roleChangeTimeline
          .to(roleRef.current, {
            text: { value: role },
            duration: 0.5,
            ease: "power2.inOut"
          })
          .to(roleRef.current, {
            rotationY: 180,
            scale: 1.1,
            duration: 0.3,
            ease: "power2.inOut"
          }, "-=0.2")
          .to(roleRef.current, {
            rotationY: 360,
            scale: 1,
            duration: 0.3,
            ease: "power2.inOut"
          })
          .to({}, { duration: 2.5 }); // Pause
      });
      
      masterTl.add(roleChangeTimeline, 2);
      
      // Add magnetic effect
      gsapUtils.magnetic(roleRef.current, 0.6);
    }
    
    // 4. Description with advanced word animation
    if (descRef.current) {
      const descSplit = new SplitText(descRef.current, { type: "words" });
      gsap.set(descSplit.words, {
        opacity: 0,
        y: 50,
        rotationX: -45
      });
      
      masterTl.to(descSplit.words, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "elastic.out(1, 0.3)"
      }, 2);
    }
    
    // 5. Buttons with advanced hover physics
    if (buttonsRef.current) {
      const buttons = buttonsRef.current.querySelectorAll('button');
      gsap.set(buttons, {
        opacity: 0,
        y: 50,
        scale: 0.8
      });
      
      masterTl.to(buttons, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)"
      }, 2.5);
      
      // Advanced button interactions
      buttons.forEach(button => {
        gsapUtils.magnetic(button, 1.5);
        
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.05,
            boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)",
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            boxShadow: "0 4px 15px rgba(139, 92, 246, 0.2)",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }
    
    // 6. Chevron with physics and floating
    if (chevronRef.current) {
      gsap.set(chevronRef.current, {
        opacity: 0,
        y: 30
      });
      
      masterTl.to(chevronRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, 3);
      
      // Continuous floating with physics
      gsap.to(chevronRef.current, {
        y: "15px",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
      
      gsapUtils.magnetic(chevronRef.current, 1);
    }
    
    // 7. Advanced particle system
    if (particlesRef.current) {
      gsapUtils.createParticles(particlesRef.current, 150);
    }
    
    // 8. Scroll-triggered animations
    gsap.to(heroRef.current, {
      y: "-20%",
      opacity: 0.8,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });
    
  }, []);
  
  // Role changing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3500);
    
    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: element, offsetY: 80 },
        ease: "power2.inOut"
      });
    }
  };

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Advanced particle container */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Ultra-Advanced 3D SVG Background with ALL GSAP Features */}
      <div className="absolute inset-0">
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox="0 0 1920 1080"
          className="opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            
            <filter id="heroGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            <linearGradient id="cubeTopFace" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#6D28D9" />
            </linearGradient>
            
            <linearGradient id="cubeFrontFace" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#BE185D" />
            </linearGradient>
            
            <linearGradient id="cubeSideFace" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          
          {/* Center Platform with morphing */}
          <circle
            id="centerPlatform"
            cx="960"
            cy="540"
            r="400"
            fill="url(#centerGlow)"
          />

          {/* Advanced Grid System with DrawSVG */}
          <g opacity="0.6">
            {[...Array(20)].map((_, i) => (
              <path
                key={`h-grid-${i}`}
                className="grid-line"
                d={`M0,${300 + i * 30} C${640},${300 + i * 30 + (i % 2 === 0 ? 40 : -40)} ${1280},${300 + i * 30 + (i % 2 === 0 ? -30 : 30)} 1920,${300 + i * 30}`}
                stroke="url(#heroGradient)"
                strokeWidth="1"
                strokeOpacity="0.3"
                fill="none"
              />
            ))}

            {[...Array(30)].map((_, i) => (
              <path
                key={`v-grid-${i}`}
                className="grid-line"
                d={`M${300 + i * 50},0 C${300 + i * 50 + (i % 2 === 0 ? 50 : -50)},${540} ${300 + i * 50 + (i % 2 === 0 ? -30 : 30)},${800} ${300 + i * 50},1080`}
                stroke="url(#heroGradient)"
                strokeWidth="1"
                strokeOpacity="0.2"
                fill="none"
              />
            ))}
          </g>

          {/* 3D Cubes with Physics */}
          {[...Array(8)].map((_, i) => {
            const x = 200 + i * 220;
            const y = 300 + ((i % 3) * 200);
            const size = 40 + Math.random() * 30;
            
            return (
              <g 
                key={`cube-${i}`}
                className="hero-cube"
                style={{
                  transformOrigin: `${x}px ${y}px`
                }}
              >
                <path 
                  d={`M${x-size/2},${y-size/2} l${size},${-size/2} l${size},${size/2} l${-size},${size/2} Z`}
                  fill="url(#cubeTopFace)" 
                  opacity="0.9"
                  stroke="white"
                  strokeWidth="0.5"
                />
                <path 
                  d={`M${x-size/2},${y-size/2} l${-size},${size/2} l0,${size} l${size},${-size/2} Z`}
                  fill="url(#cubeFrontFace)" 
                  opacity="0.7"
                  stroke="white"
                  strokeWidth="0.5"
                />
                <path 
                  d={`M${x-size/2},${y-size/2} l${size},${-size/2} l0,${size} l${-size},${size/2} Z`}
                  fill="url(#cubeSideFace)" 
                  opacity="0.8"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </g>
            );
          })}

          {/* Floating Code Elements with MotionPath */}
          {[...Array(25)].map((_, i) => (
            <text
              key={`code-${i}`}
              className="code-element"
              x={Math.random() * 1920}
              y={Math.random() * 1080}
              fontFamily="JetBrains Mono, monospace"
              fontSize="12"
              fill="url(#heroGradient)"
              opacity="0.7"
              filter="url(#heroGlow)"
            >
              {['function()', 'const app = {}', '<React />', 'import', 'export', '{code}', 'useState()', '=>'][Math.floor(Math.random() * 8)]}
            </text>
          ))}

          {/* 3D Orbitals with Morphing */}
          {[...Array(3)].map((_, i) => (
            <g key={`orbital-${i}`}>
              <ellipse
                className="orbital"
                cx="960"
                cy="540"
                rx={150 + i * 100}
                ry={50 + i * 30}
                fill="none"
                stroke="url(#heroGradient)"
                strokeWidth="1"
                strokeOpacity="0.3"
                style={{
                  transformOrigin: "960px 540px"
                }}
              />
              
              {[...Array(6)].map((_, j) => {
                const angle = j * 60;
                const radius = 150 + i * 100;
                const x = 960 + radius * Math.cos(angle * Math.PI / 180);
                const y = 540 + (50 + i * 30) * Math.sin(angle * Math.PI / 180);
                
                return (
                  <circle
                    key={`orbital-particle-${i}-${j}`}
                    className="orbital-particle"
                    cx={x}
                    cy={y}
                    r="4"
                    fill="url(#heroGradient)"
                    filter="url(#heroGlow)"
                    style={{
                      transformOrigin: "960px 540px"
                    }}
                  />
                );
              })}
            </g>
          ))}

          {/* Glowing Central Core */}
          <circle
            id="centralCore"
            cx="960"
            cy="540"
            r="30"
            fill="url(#heroGradient)"
            filter="url(#heroGlow)"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="space-y-8">
          <h1 
            ref={nameRef}
            className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent bg-200%"
            style={{ backgroundSize: '200% 200%' }}
          >
            Romil Patel
          </h1>
          
          <div 
            ref={roleRef}
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 h-16 flex items-center justify-center font-medium font-mono bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden"
            }}
          >
            {roles[currentRoleIndex]}
          </div>

          <p
            ref={descRef}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Passionate about web development and modern technologies. 
            Currently studying Computer Science at ASU while building exceptional digital experiences 
            with React, TypeScript, and cutting-edge design principles.
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
          >
            <Button
              onClick={scrollToAbout}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              Explore My Work
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open('mailto:romilpatel2007@gmail.com')}
              className="border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              Get In Touch
            </Button>
          </div>
        </div>

        <div
          ref={chevronRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={scrollToAbout}
            className="text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
          >
            <ChevronDown className="h-8 w-8" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;