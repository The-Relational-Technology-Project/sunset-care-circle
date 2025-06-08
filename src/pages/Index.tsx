
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Heart, CheckCircle, Users } from "lucide-react";
import ConversationalWizard from "@/components/ConversationalWizard";
import LanguageToggle from "@/components/LanguageToggle";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'self' | 'other'>('home');
  const [language, setLanguage] = useState<'en' | 'zh' | 'es'>('en');

  const content = {
    en: {
      title: "Outer Sunset Mutual Aid",
      subtitle: "Community Care Circle",
      welcome: "We all need support sometimes - it's what makes us human and builds strong communities. This simple tool helps us look out for each other by sharing what we need this week.",
      privacy: "Your privacy matters. We're neighborhood folks caring for neighborhood folks. Only share what feels right to you.",
      selfAssess: "Share what you need",
      assessOther: "Share for someone else",
      selfDescription: "Let us know how we can support you this week",
      otherDescription: "Help coordinate care with their permission",
      community: "We practice mutual aid, not charity",
      principles: "Everyone has something to offer • We care for each other • All needs are valid"
    },
    zh: {
      title: "外日落互助",
      subtitle: "社区关怀圈",
      welcome: "我们都有时需要支持 - 这是人之常情，也是建设强大社区的方式。这个简单的工具通过分享我们本周的需求来帮助我们互相照顾。",
      privacy: "您的隐私很重要。我们是邻居关爱邻居。只分享您感觉合适的内容。",
      selfAssess: "分享您的需求",
      assessOther: "为他人分享",
      selfDescription: "让我们知道本周如何支持您",
      otherDescription: "在获得许可的情况下帮助协调关怀",
      community: "我们实践互助，而非慈善",
      principles: "每个人都有所贡献 • 我们互相关怀 • 所有需求都是有效的"
    },
    es: {
      title: "Ayuda Mutua Outer Sunset",
      subtitle: "Círculo de Cuidado Comunitario",
      welcome: "Todos necesitamos apoyo a veces - es lo que nos hace humanos y construye comunidades fuertes. Esta herramienta simple nos ayuda a cuidarnos mutuamente compartiendo lo que necesitamos esta semana.",
      privacy: "Tu privacidad importa. Somos vecinos cuidando de vecinos. Solo comparte lo que se sienta bien para ti.",
      selfAssess: "Comparte lo que necesitas",
      assessOther: "Comparte por alguien más",
      selfDescription: "Déjanos saber cómo podemos apoyarte esta semana",
      otherDescription: "Ayuda a coordinar el cuidado con su permiso",
      community: "Practicamos ayuda mutua, no caridad",
      principles: "Todos tienen algo que ofrecer • Nos cuidamos mutuamente • Todas las necesidades son válidas"
    }
  };

  const t = content[language];

  if (currentView === 'self') {
    return <ConversationalWizard onBack={() => setCurrentView('home')} language={language} type="self" />;
  }

  if (currentView === 'other') {
    return <ConversationalWizard onBack={() => setCurrentView('home')} language={language} type="other" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <div className="text-center mb-8">
          <LanguageToggle language={language} onLanguageChange={setLanguage} />
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Heart className="text-orange-600" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
              <p className="text-lg text-muted-foreground">{t.subtitle}</p>
            </div>
          </div>
          
          <Card className="bg-white/90 backdrop-blur-sm border-orange-200 mb-6">
            <CardContent className="p-6 space-y-4">
              <p className="text-foreground leading-relaxed">{t.welcome}</p>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <p className="text-orange-800 text-sm leading-relaxed">{t.privacy}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-white/95 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-3 w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                <Heart className="text-orange-600" size={28} />
              </div>
              <CardTitle className="text-xl text-foreground">{t.selfAssess}</CardTitle>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.selfDescription}</p>
            </CardHeader>
            <CardContent className="pt-0">
              <Button 
                onClick={() => setCurrentView('self')}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-6 rounded-lg transition-colors duration-200 text-base"
                size="lg"
              >
                Let's start
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-3 w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center">
                <Users className="text-amber-600" size={28} />
              </div>
              <CardTitle className="text-xl text-foreground">{t.assessOther}</CardTitle>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.otherDescription}</p>
            </CardHeader>
            <CardContent className="pt-0">
              <Button 
                onClick={() => setCurrentView('other')}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-6 rounded-lg transition-colors duration-200 text-base"
                size="lg"
              >
                Let's start
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-4">
          <Card className="bg-green-50/80 backdrop-blur-sm border-green-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Users className="text-green-600" size={20} />
                <span className="font-medium text-green-800">{t.community}</span>
              </div>
              <p className="text-green-700 text-sm leading-relaxed">{t.principles}</p>
            </CardContent>
          </Card>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <CheckCircle size={16} />
              <span>Privacy-first • No tracking • Neighborhood care</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
