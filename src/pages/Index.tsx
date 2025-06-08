
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Heart, CheckCircle } from "lucide-react";
import SelfAssessmentForm from "@/components/SelfAssessmentForm";
import AssessOtherForm from "@/components/AssessOtherForm";
import LanguageToggle from "@/components/LanguageToggle";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'self' | 'other'>('home');
  const [language, setLanguage] = useState<'en' | 'zh' | 'es'>('en');

  const content = {
    en: {
      title: "Outer Sunset Mutual Aid",
      subtitle: "Needs Assessment Tool",
      welcome: "Welcome to the Outer Sunset Mutual Aid Needs Assessment. This simple tool helps us care for each other by surfacing needs in our community. Your privacy matters. Only share what you feel comfortable sharing.",
      selfAssess: "Share Your Needs",
      assessOther: "Share Someone's Needs (With Permission)",
      selfDescription: "Let us know how we can support you this week",
      otherDescription: "Help coordinate care for someone who has given you permission"
    },
    zh: {
      title: "外日落互助",
      subtitle: "需求评估工具",
      welcome: "欢迎使用外日落互助需求评估。这个简单的工具帮助我们通过了解社区需求来相互关怀。您的隐私很重要。只分享您感到舒适的内容。",
      selfAssess: "分享您的需求",
      assessOther: "分享他人需求（获得许可）",
      selfDescription: "让我们知道本周如何支持您",
      otherDescription: "帮助协调对已获得许可的人的关怀"
    },
    es: {
      title: "Ayuda Mutua Outer Sunset",
      subtitle: "Herramienta de Evaluación de Necesidades",
      welcome: "Bienvenido a la Evaluación de Necesidades de Ayuda Mutua de Outer Sunset. Esta herramienta simple nos ayuda a cuidarnos mutuamente identificando las necesidades en nuestra comunidad. Su privacidad importa. Solo comparta lo que se sienta cómodo compartiendo.",
      selfAssess: "Comparte Tus Necesidades",
      assessOther: "Comparte las Necesidades de Alguien (Con Permiso)",
      selfDescription: "Déjanos saber cómo podemos apoyarte esta semana",
      otherDescription: "Ayuda a coordinar el cuidado para alguien que te ha dado permiso"
    }
  };

  const t = content[language];

  if (currentView === 'self') {
    return <SelfAssessmentForm onBack={() => setCurrentView('home')} language={language} />;
  }

  if (currentView === 'other') {
    return <AssessOtherForm onBack={() => setCurrentView('home')} language={language} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <LanguageToggle language={language} onLanguageChange={setLanguage} />
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="text-orange-500" size={32} />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">{t.title}</h1>
              <p className="text-lg text-muted-foreground">{t.subtitle}</p>
            </div>
          </div>
          
          <Card className="bg-white/80 backdrop-blur-sm border-orange-200 mb-8">
            <CardContent className="p-6">
              <p className="text-foreground leading-relaxed">{t.welcome}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white/90 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-3 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Heart className="text-orange-600" size={24} />
              </div>
              <CardTitle className="text-xl text-foreground">{t.selfAssess}</CardTitle>
              <p className="text-muted-foreground text-sm">{t.selfDescription}</p>
            </CardHeader>
            <CardContent className="pt-0">
              <Button 
                onClick={() => setCurrentView('self')}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-colors duration-200"
                size="lg"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-3 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Plus className="text-amber-600" size={24} />
              </div>
              <CardTitle className="text-xl text-foreground">{t.assessOther}</CardTitle>
              <p className="text-muted-foreground text-sm">{t.otherDescription}</p>
            </CardHeader>
            <CardContent className="pt-0">
              <Button 
                onClick={() => setCurrentView('other')}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 rounded-lg transition-colors duration-200"
                size="lg"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <CheckCircle size={16} />
            <span>Privacy-first • No tracking • Community care</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
