import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Play, Github, Twitter, ExternalLink, Zap, Eye, Brain, Globe, MessageCircle, Search } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [isListening, setIsListening] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fridayMessages = [
    "Hello Sir, FRIDAY is online... Awaiting command.",
    "Your personal AI assistant, inspired by Stark technology.",
    "Ready to revolutionize your digital experience.",
    "Voice interaction, real-time intelligence, infinite possibilities."
  ];

  useEffect(() => {
    const message = fridayMessages[currentTextIndex];
    let index = 0;
    setDisplayText('');
    
    const typeWriter = setInterval(() => {
      if (index < message.length) {
        setDisplayText(message.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typeWriter);
        setTimeout(() => {
          setCurrentTextIndex((prev) => (prev + 1) % fridayMessages.length);
        }, 3000);
      }
    }, 100);

    return () => clearInterval(typeWriter);
  }, [currentTextIndex]);

  const toggleVoice = () => {
    navigate('/knobot');
  };

  const features = [
    {
      icon: Mic,
      title: "Voice Interaction",
      description: "Speak naturally, FRIDAY listens and responds in real-time",
      color: "text-iron-blue"
    },
    {
      icon: Eye,
      title: "Visual Feedback",
      description: "Real-time animated responses with HUD interface",
      color: "text-iron-gold"
    },
    {
      icon: Search,
      title: "Live Google Search",
      description: "Speak a query, get live search results instantly",
      color: "text-iron-red"
    },
    {
      icon: Brain,
      title: "Memory Recall",
      description: "Remembers your tasks, preferences, and conversations",
      color: "text-cyber-purple"
    },
    {
      icon: Globe,
      title: "Multi-language Support",
      description: "Supports Tamil, English, and many more languages",
      color: "text-iron-blue"
    },
    {
      icon: MessageCircle,
      title: "Contextual Responses",
      description: "Understands context for more meaningful interactions",
      color: "text-iron-gold"
    }
  ];

  const testimonials = [
    {
      text: "I replaced Google Assistant with FRIDAY. It's like having a superhero's AI.",
      author: "Student",
      role: "Tech Enthusiast"
    },
    {
      text: "It feels like having Tony Stark's personal assistant. Revolutionary!",
      author: "Developer",
      role: "Software Engineer"
    },
    {
      text: "My meetings, searches, and reminders – all hands-free with FRIDAY.",
      author: "Freelancer",
      role: "Digital Nomad"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 hex-grid pointer-events-none" />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="container mx-auto text-center relative z-10">
          {/* 3D AI Orb */}
          <div className="relative mb-12">
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-iron-blue to-cyber-purple animate-pulse-glow"></div>
              <div className="absolute inset-2 rounded-full bg-background/80 flex items-center justify-center animate-rotate-3d">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-iron-blue via-iron-gold to-iron-red animate-float"></div>
              </div>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-orbitron font-black mb-6 neon-text">
            FRIDAY
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-2xl md:text-3xl font-exo font-light mb-8 text-muted-foreground">
            Your Real-Time Ironman Assistant
          </h2>

          {/* Typewriter Text */}
          <div className="h-16 mb-12">
            <p className="text-lg md:text-xl font-mono text-iron-blue min-h-[1.5em]">
              {displayText}
              <span className="animate-neon-flicker">|</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              onClick={toggleVoice}
              className={`group relative px-8 py-4 text-lg font-semibold transition-all duration-300 ${
                isListening 
                  ? 'bg-iron-red hover:bg-iron-red/80 animate-pulse-glow' 
                  : 'bg-iron-blue hover:bg-iron-blue/80 neon-border'
              }`}
            >
              {isListening ? <MicOff className="mr-2" /> : <Mic className="mr-2" />}
              {isListening ? 'Stop Listening' : 'Talk Now'}
            </Button>
            
            <Button 
              variant="outline" 
              className="px-8 py-4 text-lg font-semibold glass-morphism hover:bg-iron-blue/10 border-iron-blue"
            >
              <Play className="mr-2" />
              See Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 neon-text">
              Your AI Assistant, Always Listening. Always Smart.
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of AI interaction with real-time voice processing and intelligent responses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-morphism hud-element group hover:scale-105 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <feature.icon className={`w-12 h-12 mx-auto mb-4 ${feature.color} group-hover:animate-float`} />
                  <h3 className="text-xl font-orbitron font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 neon-text">
              See FRIDAY in Action
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="glass-morphism border-iron-blue">
              <CardContent className="p-8">
                <div className="bg-black/50 rounded-lg p-6 font-mono text-sm">
                  <div className="text-iron-blue mb-2">$ friday --boot --mode=Stark</div>
                  <div className="text-iron-gold mb-2">FRIDAY: Online. Ready, sir.</div>
                  <div className="text-green-400 mb-2">User: "What's the latest news in Chennai?"</div>
                  <div className="text-iron-blue mb-2">FRIDAY: Searching real-time news for Chennai...</div>
                  <div className="text-white">FRIDAY: I found 15 recent articles about Chennai. The top story is about...</div>
                  <div className="animate-neon-flicker text-iron-blue mt-4">_</div>
                </div>
                
                <div className="mt-8 flex justify-center">
                  <Button className="bg-iron-blue hover:bg-iron-blue/80 neon-border">
                    <Play className="mr-2" />
                    Watch Full Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Iron Man Comparison */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 neon-text">
              Your Own FRIDAY
            </h2>
            <p className="text-xl text-iron-gold">Inspired by Stark. Powered by Red Rivers Labs.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="glass-morphism border-iron-gold">
              <CardContent className="p-8">
                <h3 className="text-2xl font-orbitron font-bold mb-6 text-iron-gold">Tony Stark's HUD</h3>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <Zap className="text-iron-gold" />
                    <span>Arc Reactor Integration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Eye className="text-iron-gold" />
                    <span>Holographic Displays</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Brain className="text-iron-gold" />
                    <span>Advanced AI Processing</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-morphism border-iron-blue">
              <CardContent className="p-8">
                <h3 className="text-2xl font-orbitron font-bold mb-6 text-iron-blue">FRIDAY's HUD</h3>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <Mic className="text-iron-blue" />
                    <span>Real-time Voice Processing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Search className="text-iron-blue" />
                    <span>Live Search Integration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="text-iron-blue" />
                    <span>Multi-language Support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 neon-text">
              What Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-morphism hud-element">
                <CardContent className="p-8">
                  <p className="text-lg mb-6 italic">"{testimonial.text}"</p>
                  <div className="text-iron-blue font-semibold">{testimonial.author}</div>
                  <div className="text-muted-foreground text-sm">{testimonial.role}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 neon-text">
            Ready to Meet FRIDAY?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join the revolution. Experience AI interaction like never before.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button className="bg-iron-blue hover:bg-iron-blue/80 px-8 py-4 text-lg neon-border">
              <ExternalLink className="mr-2" />
              Install FRIDAY
            </Button>
            <Button variant="outline" className="glass-morphism border-iron-blue px-8 py-4 text-lg">
              <Github className="mr-2" />
              View on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <p className="text-muted-foreground mb-4">
              Built with ❤️ by Krishna at <span className="text-iron-blue">Red Rivers Labs</span>
            </p>
            <div className="flex justify-center gap-6">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-iron-blue">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-iron-blue">
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-iron-blue">
                Docs
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-iron-blue">
                Privacy
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-iron-blue font-orbitron font-semibold">
              "Not just an assistant. A revolution."
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
