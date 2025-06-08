import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Heart, Copy, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConversationalWizardProps {
  onBack: () => void;
  language: 'en' | 'zh' | 'es';
  type: 'self' | 'other';
}

const ConversationalWizard = ({ onBack, language, type }: ConversationalWizardProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    hasPermission: false,
    needsChecked: [] as string[],
    otherNeed: '',
    additionalText: '',
    wantsCheckIn: false,
    consent: false
  });
  const [showSummary, setShowSummary] = useState(false);
  const [submissionId] = useState(() => Math.random().toString(36).substr(2, 9));

  const content = {
    en: {
      intro: {
        title: type === 'self' ? "Let's check in 💜" : "Sharing for someone else 🤝",
        subtitle: type === 'self' 
          ? "Taking a moment to think about what you need is an act of self-care and community care."
          : "Thank you for helping coordinate care in our community.",
        description: type === 'self'
          ? "We all need support sometimes - it's what makes us human. This week, what kind of support would feel good for you?"
          : "Sharing someone's needs with their permission helps us all look out for each other.",
        examples: type === 'self'
          ? "Maybe you need groceries, a ride somewhere, someone to talk to, or just a friendly check-in. All needs are valid."
          : "Make sure you have their permission first - consent is at the heart of mutual aid."
      },
      permission: {
        title: "First things first 🌟",
        question: "Do you have this person's permission to share their needs?",
        note: "Mutual aid is built on consent and trust. We only share what people want us to share.",
        required: "Permission is required to continue"
      },
      needs: {
        title: type === 'self' ? "What would support you this week?" : "What support do they need?",
        subtitle: type === 'self' 
          ? "Check any that feel right. You don't have to explain or justify - just what would help."
          : "What kind of support would help them this week?",
        options: {
          groceries: "🛒 Groceries or food",
          rides: "🚗 Rides or transportation",
          childcare: "👶 Childcare support",
          emotional: "💙 Someone to talk to",
          medical: "🏥 Medical or health needs",
          housing: "🏠 Housing support",
          financial: "💰 Financial help",
          companionship: "☕ Companionship or hanging out",
          other: "✨ Something else"
        },
        otherPlaceholder: "What other support would help?",
        encouragement: "Remember: asking for what you need is how we build community together."
      },
      details: {
        title: type === 'self' ? "Anything else on your mind?" : "Anything else they'd like to share?",
        subtitle: type === 'self'
          ? "This is your space to share whatever feels important right now."
          : "Any additional context they wanted to share?",
        placeholder: type === 'self'
          ? "Whatever you're comfortable sharing - could be how you're feeling, what's going on, or anything else..."
          : "Any additional details they mentioned...",
        note: "This is completely optional - share only what feels good to share."
      },
      checkin: {
        title: type === 'self' ? "Would a check-in feel good?" : "Would they like someone to reach out?",
        subtitle: type === 'self'
          ? "Sometimes it's nice to know someone is thinking of you."
          : "A simple 'how are you doing?' can mean a lot.",
        yes: "Yes, I'd like someone to check in",
        no: "Not right now, thanks",
        yesOther: "Yes, they'd like a check-in",
        noOther: "They're good for now"
      },
      consent: {
        title: "Almost done! 🌅",
        text: type === 'self'
          ? "I'm comfortable sharing this with the Outer Sunset Mutual Aid pod so we can coordinate support."
          : "I have permission to share this information with the Outer Sunset Mutual Aid pod for coordination.",
        note: "Your information will only be shared within our trusted pod for coordinating care."
      },
      summary: {
        title: "Thank you 💜",
        subtitle: type === 'self' 
          ? "You've taken an important step in caring for yourself and strengthening our community."
          : "Thank you for helping coordinate care in our community.",
        shareTitle: "Summary to share:",
        copyButton: "Copy for group chat",
        updateNote: "Save this link to update your submission:",
        backHome: "Back to home"
      }
    },
    zh: {
      intro: {
        title: type === 'self' ? "让我们聊聊 💜" : "为他人分享 🤝",
        subtitle: type === 'self' 
          ? "花时间思考您需要什么是自我关怀和社区关怀的行为。"
          : "感谢您帮助协调我们社区的关怀。",
        description: type === 'self'
          ? "我们都有时需要支持 - 这是人之常情。这周，什么样的支持对您来说会很好？"
          : "在获得许可的情况下分享某人的需求有助于我们互相照顾。",
        examples: type === 'self'
          ? "也许您需要杂货、搭车、有人交谈，或只是友好的关怀。所有需求都是有效的。"
          : "确保您首先获得他们的许可 - 同意是互助的核心。"
      },
      permission: {
        title: "首先 🌟",
        question: "您是否得到此人分享其需求的许可？",
        note: "互助建立在同意和信任的基础上。我们只分享人们希望我们分享的内容。",
        required: "需要许可才能继续"
      },
      needs: {
        title: type === 'self' ? "本周什么会支持您？" : "他们需要什么支持？",
        subtitle: type === 'self' 
          ? "选择任何感觉合适的。您不必解释或证明 - 只要是有帮助的。"
          : "什么样的支持对他们本周有帮助？",
        options: {
          groceries: "🛒 杂货或食物",
          rides: "🚗 搭车或交通",
          childcare: "👶 儿童看护支持",
          emotional: "💙 有人交谈",
          medical: "🏥 医疗或健康需求",
          housing: "🏠 住房支持",
          financial: "💰 经济帮助",
          companionship: "☕ 陪伴或一起活动",
          other: "✨ 其他"
        },
        otherPlaceholder: "还有什么其他支持会有帮助？",
        encouragement: "记住：询问您需要什么是我们共同建设社区的方式。"
      },
      details: {
        title: type === 'self' ? "还有其他想法吗？" : "他们还想分享什么吗？",
        subtitle: type === 'self'
          ? "这是您分享现在感觉重要的任何事情的空间。"
          : "他们想分享的任何额外背景？",
        placeholder: type === 'self'
          ? "您愿意分享的任何内容 - 可能是您的感受、正在发生的事情或其他任何事情..."
          : "他们提到的任何额外细节...",
        note: "这完全是可选的 - 只分享您感觉良好的内容。"
      },
      checkin: {
        title: type === 'self' ? "关怀联系会感觉好吗？" : "他们希望有人联系吗？",
        subtitle: type === 'self'
          ? "有时知道有人在想念您是很好的。"
          : "简单的'您好吗？'可能意义重大。",
        yes: "是的，我希望有人关怀联系",
        no: "现在不用，谢谢",
        yesOther: "是的，他们希望关怀联系",
        noOther: "他们现在很好"
      },
      consent: {
        title: "快完成了！🌅",
        text: type === 'self'
          ? "我愿意与外日落互助小组分享此信息，以便我们协调支持。"
          : "我有权与外日落互助小组分享此信息进行协调。",
        note: "您的信息只会在我们信任的小组内分享以协调关怀。"
      },
      summary: {
        title: "谢谢 💜",
        subtitle: type === 'self' 
          ? "您已经迈出了关爱自己和加强我们社区的重要一步。"
          : "感谢您帮助协调我们社区的关怀。",
        shareTitle: "分享摘要：",
        copyButton: "复制到群聊",
        updateNote: "保存此链接以更新您的提交：",
        backHome: "返回首页"
      }
    },
    es: {
      intro: {
        title: type === 'self' ? "Hablemos 💜" : "Compartiendo por alguien más 🤝",
        subtitle: type === 'self' 
          ? "Tomarte un momento para pensar en lo que necesitas es un acto de autocuidado y cuidado comunitario."
          : "Gracias por ayudar a coordinar el cuidado en nuestra comunidad.",
        description: type === 'self'
          ? "Todos necesitamos apoyo a veces - es lo que nos hace humanos. Esta semana, ¿qué tipo de apoyo te haría bien?"
          : "Compartir las necesidades de alguien con su permiso nos ayuda a cuidarnos mutuamente.",
        examples: type === 'self'
          ? "Tal vez necesites comestibles, que te lleven a algún lugar, alguien con quien hablar, o solo un saludo amistoso. Todas las necesidades son válidas."
          : "Asegúrate de tener su permiso primero - el consentimiento está en el corazón de la ayuda mutua."
      },
      permission: {
        title: "Primero lo primero 🌟",
        question: "¿Tienes el permiso de esta persona para compartir sus necesidades?",
        note: "La ayuda mutua se basa en el consentimiento y la confianza. Solo compartimos lo que las personas quieren que compartamos.",
        required: "Se requiere permiso para continuar"
      },
      needs: {
        title: type === 'self' ? "¿Qué te apoyaría esta semana?" : "¿Qué apoyo necesitan?",
        subtitle: type === 'self' 
          ? "Marca cualquiera que se sienta bien. No tienes que explicar o justificar - solo lo que ayudaría."
          : "¿Qué tipo de apoyo les ayudaría esta semana?",
        options: {
          groceries: "🛒 Comestibles o comida",
          rides: "🚗 Transporte",
          childcare: "👶 Apoyo con cuidado de niños",
          emotional: "💙 Alguien con quien hablar",
          medical: "🏥 Necesidades médicas o de salud",
          housing: "🏠 Apoyo de vivienda",
          financial: "💰 Ayuda financiera",
          companionship: "☕ Compañía o pasar tiempo juntos",
          other: "✨ Algo más"
        },
        otherPlaceholder: "¿Qué otro apoyo ayudaría?",
        encouragement: "Recuerda: pedir lo que necesitas es cómo construimos comunidad juntos."
      },
      details: {
        title: type === 'self' ? "¿Algo más en tu mente?" : "¿Algo más que les gustaría compartir?",
        subtitle: type === 'self'
          ? "Este es tu espacio para compartir lo que se sienta importante ahora."
          : "¿Cualquier contexto adicional que quisieran compartir?",
        placeholder: type === 'self'
          ? "Lo que te sientas cómodo compartiendo - podría ser cómo te sientes, qué está pasando, o cualquier otra cosa..."
          : "Cualquier detalle adicional que mencionaron...",
        note: "Esto es completamente opcional - comparte solo lo que se sienta bien compartir."
      },
      checkin: {
        title: type === 'self' ? "¿Te haría bien que alguien te contacte?" : "¿Les gustaría que alguien los contacte?",
        subtitle: type === 'self'
          ? "A veces es lindo saber que alguien está pensando en ti."
          : "Un simple '¿cómo estás?' puede significar mucho.",
        yes: "Sí, me gustaría que alguien me contacte",
        no: "No ahora, gracias",
        yesOther: "Sí, les gustaría que los contacten",
        noOther: "Están bien por ahora"
      },
      consent: {
        title: "¡Casi terminamos! 🌅",
        text: type === 'self'
          ? "Me siento cómodo compartiendo esto con el grupo de Ayuda Mutua de Outer Sunset para coordinar apoyo."
          : "Tengo permiso para compartir esta información con el grupo de Ayuda Mutua de Outer Sunset para coordinación.",
        note: "Tu información solo se compartirá dentro de nuestro grupo de confianza para coordinar cuidado."
      },
      summary: {
        title: "Gracias 💜",
        subtitle: type === 'self' 
          ? "Has dado un paso importante en cuidarte a ti mismo y fortalecer nuestra comunidad."
          : "Gracias por ayudar a coordinar el cuidado en nuestra comunidad.",
        shareTitle: "Resumen para compartir:",
        copyButton: "Copiar para chat grupal",
        updateNote: "Guarda este enlace para actualizar tu envío:",
        backHome: "Volver al inicio"
      }
    }
  };

  const t = content[language];
  const totalSteps = type === 'other' ? 6 : 5;

  const handleNeedChange = (need: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        needsChecked: [...prev.needsChecked, need]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        needsChecked: prev.needsChecked.filter(n => n !== need)
      }));
    }
  };

  const generateSummary = () => {
    const needs = [...formData.needsChecked];
    if (formData.otherNeed.trim()) {
      needs.push(formData.otherNeed.trim());
    }
    
    let summary = "One community member";
    if (needs.length > 0) {
      summary += ` needs ${needs.join(', ')} this week.`;
    } else {
      summary += " shared their needs this week.";
    }
    
    if (formData.wantsCheckIn) {
      summary += " They would like a check-in.";
    }
    
    if (formData.additionalText.trim()) {
      summary += ` Additional context: "${formData.additionalText.trim()}"`;
    }
    
    if (type === 'other') {
      summary += " (Shared with permission)";
    }
    
    return summary;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateSummary());
      toast({
        title: "Copied!",
        description: "Summary copied to clipboard for sharing.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the text manually.",
        variant: "destructive"
      });
    }
  };

  const handleNext = () => {
    if (currentStep === 0 && type === 'other' && !formData.hasPermission) {
      toast({
        title: "Permission Required",
        description: "You must have permission to share someone else's information.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep === totalSteps - 1) {
      if (!formData.consent) {
        toast({
          title: "Consent Required",
          description: "Please check the consent box to submit.",
          variant: "destructive"
        });
        return;
      }
      
      console.log('Submitting assessment:', formData);
      setShowSummary(true);
      toast({
        title: "Assessment Submitted",
        description: "Thank you for sharing with the community.",
      });
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      onBack();
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (showSummary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm border-orange-200 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <CardTitle className="text-2xl text-foreground">{t.summary.title}</CardTitle>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.summary.subtitle}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-3">{t.summary.shareTitle}</p>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-foreground leading-relaxed text-sm">{generateSummary()}</p>
                </div>
              </div>
              
              <Button onClick={copyToClipboard} className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-base">
                <Copy className="mr-2" size={18} />
                {t.summary.copyButton}
              </Button>
              
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <p className="text-sm text-muted-foreground mb-2">{t.summary.updateNote}</p>
                <code className="text-xs bg-white p-2 rounded border block break-all">
                  {window.location.origin}/update/{submissionId}
                </code>
              </div>
              
              <Button onClick={onBack} variant="outline" className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 py-6 text-base">
                <ArrowLeft className="mr-2" size={18} />
                {t.summary.backHome}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    const stepIndex = type === 'other' ? currentStep : currentStep + 1;
    
    switch (stepIndex) {
      case 0: // Permission step (only for 'other' type)
        return (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">{t.permission.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{t.permission.note}</p>
            </div>
            
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="permission"
                  checked={formData.hasPermission}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, hasPermission: checked as boolean }))}
                  className="mt-1"
                />
                <label htmlFor="permission" className="text-base cursor-pointer leading-relaxed">
                  {t.permission.question}
                </label>
              </div>
              {!formData.hasPermission && (
                <p className="text-sm text-amber-700 mt-3 ml-7">{t.permission.required}</p>
              )}
            </div>
          </div>
        );
        
      case 1: // Needs step
        return (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">{t.needs.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{t.needs.subtitle}</p>
            </div>
            
            <div className="space-y-3">
              {Object.entries(t.needs.options).map(([key, label]) => (
                <div key={key} className="bg-white p-4 rounded-lg border border-orange-100 hover:border-orange-200 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={key}
                      checked={formData.needsChecked.includes(key)}
                      onCheckedChange={(checked) => handleNeedChange(key, checked as boolean)}
                    />
                    <label htmlFor={key} className="text-base cursor-pointer flex-1">
                      {label}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            
            {formData.needsChecked.includes('other') && (
              <Input
                placeholder={t.needs.otherPlaceholder}
                value={formData.otherNeed}
                onChange={(e) => setFormData(prev => ({ ...prev, otherNeed: e.target.value }))}
                className="text-base py-6"
              />
            )}
            
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <p className="text-sm text-orange-800 italic">{t.needs.encouragement}</p>
            </div>
          </div>
        );
        
      case 2: // Details step
        return (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">{t.details.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{t.details.subtitle}</p>
            </div>
            
            <Textarea
              placeholder={t.details.placeholder}
              value={formData.additionalText}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalText: e.target.value }))}
              className="min-h-[120px] text-base resize-none"
            />
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">{t.details.note}</p>
            </div>
          </div>
        );
        
      case 3: // Check-in step
        return (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">{t.checkin.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{t.checkin.subtitle}</p>
            </div>
            
            <div className="space-y-3">
              <div 
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  formData.wantsCheckIn 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-orange-100 hover:border-orange-200'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, wantsCheckIn: true }))}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    formData.wantsCheckIn ? 'bg-green-500 border-green-500' : 'border-gray-300'
                  }`}>
                    {formData.wantsCheckIn && <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>}
                  </div>
                  <span className="text-base">{type === 'self' ? t.checkin.yes : t.checkin.yesOther}</span>
                </div>
              </div>
              
              <div 
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  !formData.wantsCheckIn 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-orange-100 hover:border-orange-200'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, wantsCheckIn: false }))}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    !formData.wantsCheckIn ? 'bg-green-500 border-green-500' : 'border-gray-300'
                  }`}>
                    {!formData.wantsCheckIn && <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>}
                  </div>
                  <span className="text-base">{type === 'self' ? t.checkin.no : t.checkin.noOther}</span>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 4: // Consent step
        return (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">{t.consent.title}</h2>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent: checked as boolean }))}
                  className="mt-1"
                />
                <div className="space-y-2">
                  <label htmlFor="consent" className="text-base cursor-pointer leading-relaxed block">
                    {t.consent.text}
                  </label>
                  <p className="text-sm text-orange-700">{t.consent.note}</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 px-4 py-8">
      <div className="max-w-md mx-auto">
        {currentStep === 0 && type === 'self' && (
          <Card className="bg-white/95 backdrop-blur-sm border-orange-200 shadow-lg mb-6">
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto mb-4 w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <Heart className="text-orange-600" size={32} />
              </div>
              <h1 className="text-2xl font-semibold text-foreground">{t.intro.title}</h1>
              <p className="text-muted-foreground leading-relaxed">{t.intro.subtitle}</p>
              <p className="text-foreground leading-relaxed">{t.intro.description}</p>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <p className="text-sm text-orange-800">{t.intro.examples}</p>
              </div>
            </CardContent>
          </Card>
        )}
        
        {currentStep === 0 && type === 'other' && (
          <Card className="bg-white/95 backdrop-blur-sm border-orange-200 shadow-lg mb-6">
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto mb-4 w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <Heart className="text-amber-600" size={32} />
              </div>
              <h1 className="text-2xl font-semibold text-foreground">{t.intro.title}</h1>
              <p className="text-muted-foreground leading-relaxed">{t.intro.subtitle}</p>
              <p className="text-foreground leading-relaxed">{t.intro.description}</p>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800">{t.intro.examples}</p>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-orange-500' : 'bg-orange-200'
                }`}
              />
            ))}
          </div>
        </div>
        
        <Card className="bg-white/95 backdrop-blur-sm border-orange-200 shadow-lg">
          <CardContent className="p-6">
            {renderStep()}
            
            <div className="flex gap-3 mt-8">
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1 border-orange-200 text-orange-700 hover:bg-orange-50 py-6 text-base"
              >
                <ArrowLeft className="mr-2" size={18} />
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-6 text-base"
                disabled={currentStep === 0 && type === 'other' && !formData.hasPermission}
              >
                {currentStep === totalSteps - 1 ? 'Submit' : 'Next'}
                {currentStep < totalSteps - 1 && <ArrowRight className="ml-2" size={18} />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConversationalWizard;
