import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText } from 'gsap/SplitText';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { useGSAP, gsapUtils } from '@/hooks/useGSAP';

const Projects = () => {
  const projectsRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const { projects } = useData();

  // PROFESSIONAL GSAP ANIMATIONS WITH ALL FEATURES
  useGSAP(() => {
    // 1. ADVANCED SVG BACKGROUND with all GSAP features
    if (svgRef.current) {
      const svg = svgRef.current;
      
      // Animated geometric patterns with MorphSVG
      const patterns = svg.querySelectorAll('.geometric-pattern');
      patterns.forEach((pattern, i) => {
        const morphTargets = [
          "M50,50 L150,50 L200,100 L150,150 L50,150 L0,100 Z",
          "M75,25 L175,75 L175,175 L75,225 L25,175 L25,75 Z",
          "M100,0 L200,50 L200,150 L100,200 L0,150 L0,50 Z"
        ];
        
        gsap.to(pattern, {
          morphSVG: morphTargets[(i + 1) % morphTargets.length],
          duration: 6 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
        
        // Rotation with physics
        gsap.to(pattern, {
          rotation: 360,
          duration: 20 + i * 5,
          repeat: -1,
          ease: "none"
        });
      });

      // Code flow lines with DrawSVG
      const codeLines = svg.querySelectorAll('.code-flow');
      codeLines.forEach((line, i) => {
        gsap.set(line, { drawSVG: "0%" });
        
        gsap.to(line, {
          drawSVG: "100%",
          duration: 2,
          delay: i * 0.3,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
        
        // Continuous data flow
        gsap.to(line, {
          drawSVG: "20% 40%",
          duration: 4,
          repeat: -1,
          ease: "none"
        });
      });

      // Floating code elements with MotionPath
      const codeElements = svg.querySelectorAll('.floating-code');
      codeElements.forEach((element, i) => {
        const paths = [
          "M100,500 Q300,300 500,500 Q700,700 900,500",
          "M200,400 Q400,200 600,400 Q800,600 1000,400",
          "M150,600 Q350,400 550,600 Q750,800 950,600"
        ];
        
        gsap.to(element, {
          motionPath: {
            path: paths[i % paths.length],
            autoRotate: true
          },
          duration: 12 + i * 3,
          repeat: -1,
          ease: "none"
        });

        // Pulsing effect
        gsap.to(element, {
          scale: 1.2,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      });
    }

    // 2. ADVANCED TITLE with SplitText and physics
    if (titleRef.current) {
      const titleSplit = new SplitText(titleRef.current, { type: "chars,words" });
      gsap.set(titleSplit.chars, {
        opacity: 0,
        y: 100,
        rotationX: -90,
        transformOrigin: "0% 50% -50px"
      });

      gsap.to(titleSplit.chars, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Magnetic effect and shimmer
      gsapUtils.magnetic(titleRef.current, 1.2);
      
      gsap.fromTo(titleRef.current, 
        { backgroundPosition: "-200% center" },
        {
          backgroundPosition: "200% center",
          duration: 3,
          repeat: -1,
          ease: "none"
        }
      );
    }

    // 3. PROJECT CARDS with advanced 3D effects
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.project-card');
      cards.forEach((card, i) => {
        gsap.set(card, {
          opacity: 0,
          y: 100,
          rotationY: 45,
          scale: 0.8,
          transformOrigin: "center center"
        });

        gsap.to(card, {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 1,
          delay: i * 0.15,
          ease: "elastic.out(1, 0.3)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });

        // Advanced hover interactions with physics
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            rotationY: -5,
            z: 100,
            boxShadow: "0 25px 50px rgba(139, 92, 246, 0.4)",
            duration: 0.4,
            ease: "power2.out"
          });
          
          // Magnetic pull effect
          gsap.to(card, {
            physics2D: {
              velocity: 20,
              angle: 45,
              gravity: 100
            },
            duration: 0.8,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            rotationY: 0,
            z: 0,
            boxShadow: "0 4px 15px rgba(139, 92, 246, 0.1)",
            duration: 0.4,
            ease: "power2.out"
          });
        });

        // Continuous floating animation
        gsap.to(card, {
          y: "15px",
          duration: 3 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });

        // Magnetic effect
        gsapUtils.magnetic(card, 0.6);

        // Advanced button animations
        const buttons = card.querySelectorAll('button');
        buttons.forEach(button => {
          gsapUtils.magnetic(button, 1.2);
          
          button.addEventListener('mouseenter', () => {
            gsap.to(button, {
              scale: 1.1,
              rotationZ: 2,
              duration: 0.3,
              ease: "back.out(1.7)"
            });
          });
          
          button.addEventListener('mouseleave', () => {
            gsap.to(button, {
              scale: 1,
              rotationZ: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        });

        // Image reveal effect
        const image = card.querySelector('img');
        if (image) {
          gsap.set(image, { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" });
          
          gsap.to(image, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          });
        }

        // Tech badges animation
        const techBadges = card.querySelectorAll('.tech-badge');
        techBadges.forEach((badge, badgeIndex) => {
          gsap.set(badge, {
            opacity: 0,
            scale: 0,
            rotation: 180
          });
          
          gsap.to(badge, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.5,
            delay: (i * 0.15) + (badgeIndex * 0.05) + 0.3,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          });
        });
      });
    }

    // 4. Parallax effects
    gsap.to(projectsRef.current, {
      y: "-5%",
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    // 5. Advanced particle system
    if (particlesRef.current) {
      gsapUtils.createParticles(particlesRef.current, 80);
    }

  }, []);

  return (
    <section 
      ref={projectsRef}
      id="projects" 
      className="py-20 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-gray-900 dark:to-purple-950 relative overflow-hidden"
    >
      {/* Advanced Particle System */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Ultra-Advanced Background SVG */}
      <div className="absolute inset-0 opacity-10">
        <svg 
          ref={svgRef}
          width="100%" 
          height="100%" 
          viewBox="0 0 1200 800" 
          className="absolute"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="projectsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            
            <filter id="projectsGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Geometric Patterns with MorphSVG */}
          {[...Array(6)].map((_, i) => (
            <path
              key={`pattern-${i}`}
              className="geometric-pattern"
              d="M50,50 L150,50 L200,100 L150,150 L50,150 L0,100 Z"
              fill="url(#projectsGradient)"
              opacity="0.3"
              transform={`translate(${i * 200}, ${(i % 2) * 300})`}
              filter="url(#projectsGlow)"
            />
          ))}
          
          {/* Code Flow Lines with DrawSVG */}
          {[...Array(8)].map((_, i) => (
            <path
              key={`flow-${i}`}
              className="code-flow"
              d={`M0,${200 + i * 80} Q${300 + i * 50},${100 + i * 40} ${600 + i * 100},${200 + i * 80} Q${900 + i * 50},${300 + i * 40} 1200,${200 + i * 80}`}
              stroke="url(#projectsGradient)"
              strokeWidth="2"
              fill="none"
              opacity="0.4"
            />
          ))}
          
          {/* Floating Code Elements with MotionPath */}
          {[...Array(5)].map((_, i) => (
            <g key={`code-${i}`} className="floating-code">
              <rect
                x={100 + i * 200}
                y={400 + (i % 2) * 100}
                width="30"
                height="30"
                fill="url(#projectsGradient)"
                rx="5"
                opacity="0.6"
              />
              <text
                x={115 + i * 200}
                y={420 + (i % 2) * 100}
                fill="white"
                fontSize="12"
                textAnchor="middle"
              >
                {['{}', '<>', '[]', '()', '//'][i]}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Advanced Title */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
            style={{
              backgroundImage: 'linear-gradient(90deg, #8B5CF6, #EC4899, #06B6D4, #8B5CF6)',
              backgroundSize: '200% 100%'
            }}
          >
            Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full" />
        </div>

        {/* Advanced Project Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card group h-full"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-purple-100 dark:border-purple-800 h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {project.title}
                    </h3>
                    {project.status && (
                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                        {project.status}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="tech-badge bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 mt-auto">
                    <Button
                      asChild
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white"
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;