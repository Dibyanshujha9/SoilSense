import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Leaf, Database, FlaskConical } from 'lucide-react';

const UiElement: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      if (featuresRef.current) {
        const position = featuresRef.current.getBoundingClientRect().top;
        if (position <= window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger visibility check on initial load
    setTimeout(() => setIsVisible(true), 500);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollPosition * 0.3;

  const scrollToHowItWorks = () => {
    if (howItWorksRef.current) {
      howItWorksRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const redirectToApp = () => {
    window.location.href = '/app';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-green-800 to-green-700 text-white overflow-hidden">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-emerald-900/80 backdrop-blur-md border-b border-green-600/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf size={28} className="text-green-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-green-300 via-emerald-400 to-teal-300 text-transparent bg-clip-text">SoilSense</span>
          </div>
          <div className="flex items-center gap-4">
            {/* <button className="text-green-100 hover:text-green-300 transition-colors duration-300">About</button>
            <button className="text-green-100 hover:text-green-300 transition-colors duration-300">Features</button>
            <button className="text-green-100 hover:text-green-300 transition-colors duration-300">Contact</button> */}
          </div>
        </div>
      </div>

      {/* Hero Section with 3D Effect */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0" 
          style={{ 
            transform: `translateY(${parallaxOffset * 0.5}px)`,
            opacity: 0.3
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,128,0.3),transparent_65%)]"></div>
          <div className="grid grid-cols-5 gap-16 opacity-25 absolute inset-0">
            {Array.from({ length: 10 }).map((_, rowIndex) => (
              Array.from({ length: 5 }).map((_, colIndex) => (
                <div 
                  key={`${rowIndex}-${colIndex}`} 
                  className="w-16 h-16 bg-green-400 rounded-full blur-lg"
                  style={{
                    position: 'absolute',
                    top: `${rowIndex * 10 + Math.sin(rowIndex * 0.5) * 5}%`,
                    left: `${colIndex * 20 + Math.cos(colIndex * 0.5) * 5}%`,
                    animation: `float ${2 + Math.random() * 3}s ease-in-out infinite alternate`,
                    animationDelay: `${(rowIndex + colIndex) * 0.2}s`
                  }}
                ></div>
              ))
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center" style={{ 
          transform: `translateY(${-parallaxOffset * 0.2}px)` 
        }}>
          <h1 className="text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-teal-300 text-transparent bg-clip-text">SoilSense</span>
          </h1>
          <h2 className="text-3xl font-semibold mb-8 text-green-100">Intelligent Soil Analysis Powered by AI</h2>
          <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto">
            Analyze your soil's NPK values instantly and receive tailored fertilizer recommendations to optimize crop yield and sustainability.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={scrollToHowItWorks}
              className="bg-gradient-to-r from-emerald-500 to-green-500 px-8 py-4 text-lg font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              Scroll further
            </button>
          </div>
        </div>

        {/* 3D Floating Elements */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-8">
          <div className="w-2 h-16 bg-green-300 rounded-full animate-pulse"></div>
          <div className="w-2 h-16 bg-green-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="w-2 h-16 bg-green-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* How It Works Section */}
      <div ref={howItWorksRef} className="py-24 bg-black/20 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-16 text-center text-green-100">How SoilSense Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Scan Your Soil",
                icon: <FlaskConical size={48} className="text-green-300" />,
                description: "Take a soil sample and scan it with your smartphone camera or upload lab results."
              },
              {
                title: "AI Analysis",
                icon: <Database size={48} className="text-green-300" />,
                description: "Our advanced AI instantly analyzes NPK values and key soil properties."
              },
              {
                title: "Smart Recommendations",
                icon: <Leaf size={48} className="text-green-300" />,
                description: "Receive precise fertilizer recommendations tailored to your soil needs."
              }
            ].map((step, index) => (
              <div 
                key={index}
                className="relative bg-gradient-to-br from-green-900 to-emerald-800 p-8 rounded-2xl hover:shadow-xl hover:shadow-emerald-700/20 transition-all duration-500 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center text-green-100">{step.title}</h3>
                <p className="text-green-200 text-center">{step.description}</p>
                
                {index < 2 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                    <ArrowRight size={24} className="text-green-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section with Animation */}
      <div 
        ref={featuresRef}
        className="py-24 relative overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15),transparent_70%)]"
          style={{ 
            transform: `translateY(${-parallaxOffset * 0.1}px)` 
          }}
        ></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-bold mb-16 text-center text-green-100">Why Choose SoilSense</h2>
          
          <div className="grid md:grid-cols-2 gap-16">
            {[
              {
                title: "Precision Analysis",
                description: "Our AI delivers 98.7% accurate NPK readings compared to traditional lab tests."
              },
              {
                title: "Real-time Results",
                description: "Get instant soil analysis without waiting days for lab reports."
              },
              {
                title: "Custom Recommendations",
                description: "Tailored fertilizer suggestions based on your specific crop and climate needs."
              },
              {
                title: "Sustainable Farming",
                description: "Optimize fertilizer use to reduce waste and environmental impact."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`transform transition-all duration-1000 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : index % 2 === 0 ? 'translate-y-16 opacity-0' : '-translate-y-16 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="h-1 w-16 bg-gradient-to-r from-green-400 to-emerald-300 mb-6 rounded-full"></div>
                <h3 className="text-2xl font-bold mb-4 text-green-100">{feature.title}</h3>
                <p className="text-green-200 text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3D Visualization Demo */}
      <div className="py-24 bg-black/30 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.1),transparent_70%)]"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-green-100">Interactive Soil Analysis</h2>
              <p className="text-xl text-green-200 mb-8">
                Experience our cutting-edge 3D soil visualization technology that breaks down your soil composition and identifies deficiencies with precision.
              </p>
              <ul className="space-y-4 mb-8">
                {["Nitrogen (N) Detection", "Phosphorus (P) Measurement", "Potassium (K) Analysis", "pH Level Assessment"].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-green-100">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-900/60 to-emerald-800/60 p-2 rounded-2xl backdrop-blur-md border border-green-500/30">
              <div className="relative aspect-square w-full bg-black/30 rounded-xl overflow-hidden flex items-center justify-center">
                {/* Simulated 3D Soil Visualization */}
                <div className="w-4/5 h-4/5 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-brown-600 to-amber-800 rounded-full transform-gpu" style={{ 
                    animation: 'spin 20s linear infinite',
                    boxShadow: '0 0 60px rgba(0, 128, 0, 0.3)'
                  }}>
                    {/* Soil Layers Simulation */}
                    {Array.from({ length: 8 }).map((_, index) => (
                      <div 
                        key={index}
                        className="absolute w-full h-full opacity-30"
                        style={{
                          backgroundImage: 'radial-gradient(circle, transparent 30%, rgba(255,255,255,0.1) 70%)',
                          transform: `rotate(${index * 45}deg)`,
                          animation: `pulse 3s ease-in-out infinite alternate`,
                          animationDelay: `${index * 0.25}s`
                        }}
                      ></div>
                    ))}
                    
                    {/* NPK Indicators */}
                    <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-blue-500 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-red-500 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
                    <div className="absolute top-1/2 right-1/4 w-10 h-10 bg-purple-500 rounded-full animate-ping" style={{ animationDuration: '5s' }}></div>
                  </div>
                </div>
                
                {/* Data Points */}
                <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg border border-green-500/30">
                  <div className="text-xs flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="text-blue-300">N: 14.3%</span>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg border border-green-500/30">
                  <div className="text-xs flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span className="text-red-300">P: 8.7%</span>
                  </div>
                </div>
                <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg border border-green-500/30">
                  <div className="text-xs flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <span className="text-purple-300">K: 11.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(16,185,129,0.2),transparent_70%)]"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6 text-green-100">
            Ready to Transform Your Farming Approach?
          </h2>
          <p className="text-xl text-green-200 mb-12 max-w-3xl mx-auto">
            Join thousands of farmers who have already improved crop yields by up to 37% while reducing fertilizer costs with SoilSense.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={redirectToApp}
              className="bg-gradient-to-r from-emerald-500 to-green-500 px-10 py-5 text-xl font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              Get SoilSense Now
            </button>
          </div>
        </div>
      </div>

      {/* Add global styles for animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-20px); }
        }
        
        @keyframes pulse {
          0% { opacity: 0.1; }
          100% { opacity: 0.5; }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default UiElement;

