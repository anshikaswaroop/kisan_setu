import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tractor, ShoppingCart, Wheat, Users, TrendingUp, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import agriculturalHero1 from "../assets/setu1.jpg";
import agriculturalHero2 from "../assets/setu2.png";
import agriculturalHero3 from "../assets/setu8.png";


// import agriculturalHero3 from "@/assets/agricultural-hero3.jpg";


const HomePage = () => {
  const features = [
    {
      icon: <Wheat className="h-8 w-8 text-success" />,
      title: "सीधे किसान से खरीदें",
      description: "बिना बिचौलिए के सीधे किसानों से फसल खरीदें"
    },
    {
      icon: <Users className="h-8 w-8 text-accent" />,
      title: "स्थानीय नेटवर्क",
      description: "अपने आसपास के किसानों से जुड़ें"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-warning" />,
      title: "बेहतर कीमत",
      description: "MSP और मंडी भाव की जानकारी"
    },
    {
      icon: <Phone className="h-8 w-8 text-success" />,
      title: "आसान संपर्क",
      description: "वॉयस एजेंट के साथ आसान इस्तेमाल"
    }
  ];

  const stats = [
    { number: 1000, suffix: "+", label: "पंजीकृत किसान" },
    { number: 500, suffix: "+", label: "खरीदार" },
    { number: 50, suffix: "+", label: "किस्म की फसलें" },
    { number: 10, suffix: "L+", label: "मासिक व्यापार", prefix: "₹" }
  ];

  // 🌟 Background swap logic
  const images = [agriculturalHero1, agriculturalHero2, agriculturalHero3];
  const [currentImage, setCurrentImage] = useState(0);

  // 🎯 Counter animation states
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // हर 5 सेकंड में बदलेगी
    return () => clearInterval(interval);
  }, [images.length]);

  // 🎯 Counter animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      const targetValue = stat.number;
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepValue = targetValue / steps;
      const stepDuration = duration / steps;

      let currentValue = 0;
      const timer = setInterval(() => {
        currentValue += stepValue;
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(timer);
        }
        
        setCounters(prev => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(currentValue);
          return newCounters;
        });
      }, stepDuration);
    });
  };

  const formatNumber = (value, stat) => {
    const prefix = stat.prefix || "";
    const suffix = stat.suffix || "";
    return `${prefix}${value}${suffix}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-gradient-primary border-b border-primary/20 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Tractor className="h-8 w-8 text-accent" />
            <h1 className="text-2xl font-bold text-accent">किसान सेतु</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-success text-success-foreground">
              बीटा वर्जन
            </Badge>
          </div>
        </div>
      </nav>

      {/* Hero Section with fading images */}
      <section className="relative overflow-hidden">
        <div className="relative h-[550px]">
          {images.map((src, idx) => (
            <div
              key={src}
              className={`absolute inset-0 bg-cover bg-[center_top_25%] transition-opacity duration-1000 ${
                idx === currentImage ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent"></div>

          {/* Content */}
          <div className="container mx-auto h-full flex items-center relative z-10">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-5xl font-bold leading-tight">
                <span className="text-accent">किसान</span> और{" "}
                <span className="text-warning">खरीदार</span> को जोड़ने वाला{" "}
                <span className="text-success">सेतु</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                बिना बिचौलिए के सीधे किसानों से जुड़ें। बेहतर कीमत पाएं, गुणवत्ता की गारंटी।
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/farmer-login">
                  <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-teal-500 hover:to-teal-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0">
                    मैं किसान हूं
                  </Button>
                </Link>

                <Link to="/buyer-login">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    मैं खरीदार हूं
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-accent mb-4">हमारी विशेषताएं</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              आधुनिक तकनीक के साथ पारंपरिक खेती को जोड़कर सबके लिए फायदेमंद समाधान
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-crop transition-all duration-300">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats with Animation */}
      <section ref={statsRef} className="py-16 bg-gradient-primary">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-accent mb-4">हमारी सफलता के आंकड़े</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">
                  {formatNumber(counters[index], stat)}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-harvest/20">
        <div className="container mx-auto text-center">
          <Card className="max-w-4xl mx-auto p-8 bg-gradient-earth border-primary/20 shadow-earth">
            <h2 className="text-3xl font-bold text-accent mb-4">
              आज ही शुरू करें अपना कृषि व्यापार
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              चाहे आप किसान हों या खरीदार, हमारा प्लेटफॉर्म आपको सबसे अच्छे अवसर प्रदान करता है।
              वॉयस एजेंट की सुविधा के साथ आसान इस्तेमाल।
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/farmer">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-teal-500 hover:to-teal-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0">
                  <Tractor className="h-5 w-5 mr-2" />
                  किसान के रूप में जुड़ें
                </Button>
              </Link>
              <Link to="/buyer">
                <Button size="lg" className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  खरीदार के रूप में जुड़ें
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary border-t border-primary/20 py-8">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Tractor className="h-6 w-6 text-accent" />
            <span className="text-lg font-bold text-accent">किसान सेतु</span>
          </div>
          <p className="text-muted-foreground text-sm">
            किसान और खरीदार को जोड़ने वाला विश्वसनीय मंच
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © 2025 किसान सेतु। सभी अधिकार सुरक्षित।
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;