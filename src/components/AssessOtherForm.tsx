
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Copy, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AssessOtherFormProps {
  onBack: () => void;
  language: 'en' | 'zh' | 'es';
}

const AssessOtherForm = ({ onBack, language }: AssessOtherFormProps) => {
  const { toast } = useToast();
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
      title: "Share Someone's Needs",
      permissionQuestion: "Do you have the person's permission to share this information?",
      permissionRequired: "Permission is required to proceed",
      supportQuestion: "What kinds of support do they need this week?",
      needs: {
        groceries: "Groceries",
        rides: "Rides/Transportation",
        childcare: "Childcare",
        emotional: "Emotional Support",
        medical: "Medical Needs",
        housing: "Housing",
        financial: "Financial Support",
        companionship: "Companionship",
        other: "Other"
      },
      otherPlaceholder: "Please specify...",
      shareText: "Anything they'd like to share in their own words?",
      sharePlaceholder: "Optional - share anything else they mentioned...",
      checkInQuestion: "Would they like someone to check in with them?",
      consentText: "I consent to share this information with the Outer Sunset Mutual Aid pod for coordination purposes.",
      submit: "Submit Assessment",
      summary: "Summary to Share",
      copyButton: "Copy to Clipboard",
      updateLink: "Save this link to update or delete this submission:",
      backToHome: "Back to Home"
    },
    zh: {
      title: "分享他人需求",
      permissionQuestion: "您是否得到了该人分享此信息的许可？",
      permissionRequired: "需要获得许可才能继续",
      supportQuestion: "他们本周需要什么样的支持？",
      needs: {
        groceries: "食品杂货",
        rides: "交通/出行",
        childcare: "儿童看护",
        emotional: "情感支持",
        medical: "医疗需求",
        housing: "住房",
        financial: "经济支持",
        companionship: "陪伴",
        other: "其他"
      },
      otherPlaceholder: "请说明...",
      shareText: "他们还想分享什么吗？",
      sharePlaceholder: "可选 - 分享他们提到的任何其他事情...",
      checkInQuestion: "他们希望有人联系他们吗？",
      consentText: "我同意与外日落互助小组分享此信息以进行协调。",
      submit: "提交评估",
      summary: "分享摘要",
      copyButton: "复制到剪贴板",
      updateLink: "保存此链接以更新或删除此提交：",
      backToHome: "返回首页"
    },
    es: {
      title: "Comparte las Necesidades de Alguien",
      permissionQuestion: "¿Tienes el permiso de la persona para compartir esta información?",
      permissionRequired: "Se requiere permiso para proceder",
      supportQuestion: "¿Qué tipo de apoyo necesitan esta semana?",
      needs: {
        groceries: "Comestibles",
        rides: "Transporte",
        childcare: "Cuidado de Niños",
        emotional: "Apoyo Emocional",
        medical: "Necesidades Médicas",
        housing: "Vivienda",
        financial: "Apoyo Financiero",
        companionship: "Compañía",
        other: "Otro"
      },
      otherPlaceholder: "Por favor especifica...",
      shareText: "¿Hay algo más que les gustaría compartir?",
      sharePlaceholder: "Opcional - comparte cualquier otra cosa que mencionaron...",
      checkInQuestion: "¿Les gustaría que alguien los contacte?",
      consentText: "Consiento compartir esta información con el grupo de Ayuda Mutua de Outer Sunset para fines de coordinación.",
      submit: "Enviar Evaluación",
      summary: "Resumen para Compartir",
      copyButton: "Copiar al Portapapeles",
      updateLink: "Guarda este enlace para actualizar o eliminar este envío:",
      backToHome: "Volver al Inicio"
    }
  };

  const t = content[language];

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
    
    summary += " (Shared with permission)";
    
    return summary;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.hasPermission) {
      toast({
        title: "Permission Required",
        description: "You must have permission to share someone else's information.",
        variant: "destructive"
      });
      return;
    }
    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please check the consent box to submit this assessment.",
        variant: "destructive"
      });
      return;
    }
    
    console.log('Submitting other assessment:', formData);
    setShowSummary(true);
    toast({
      title: "Assessment Submitted",
      description: "Thank you for helping coordinate community care.",
    });
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

  if (showSummary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
            <CardHeader>
              <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                <CheckCircle className="text-green-600" size={28} />
                {t.summary}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-foreground leading-relaxed">{generateSummary()}</p>
              </div>
              
              <Button onClick={copyToClipboard} className="w-full bg-green-600 hover:bg-green-700 text-white">
                <Copy className="mr-2" size={16} />
                {t.copyButton}
              </Button>
              
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <p className="text-sm text-muted-foreground mb-2">{t.updateLink}</p>
                <code className="text-xs bg-white p-2 rounded border block">
                  {window.location.origin}/update/{submissionId}
                </code>
              </div>
              
              <Button onClick={onBack} variant="outline" className="w-full border-orange-200 text-orange-700 hover:bg-orange-50">
                <ArrowLeft className="mr-2" size={16} />
                {t.backToHome}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button 
          onClick={onBack} 
          variant="ghost" 
          className="mb-6 text-orange-700 hover:bg-orange-100"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back
        </Button>
        
        <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
          <CardHeader>
            <CardTitle className="text-2xl text-center">{t.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="text-amber-600 mt-1 flex-shrink-0" size={20} />
                  <div className="flex-grow">
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id="permission"
                        checked={formData.hasPermission}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, hasPermission: checked as boolean }))}
                        required
                      />
                      <Label htmlFor="permission" className="cursor-pointer font-medium">
                        {t.permissionQuestion}
                      </Label>
                    </div>
                    {!formData.hasPermission && (
                      <p className="text-sm text-amber-700">{t.permissionRequired}</p>
                    )}
                  </div>
                </div>
              </div>

              {formData.hasPermission && (
                <>
                  <div>
                    <Label className="text-base font-medium mb-4 block">{t.supportQuestion}</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.entries(t.needs).map(([key, label]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Checkbox
                            id={key}
                            checked={formData.needsChecked.includes(key)}
                            onCheckedChange={(checked) => handleNeedChange(key, checked as boolean)}
                          />
                          <Label htmlFor={key} className="text-sm font-normal cursor-pointer">
                            {label}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {formData.needsChecked.includes('other') && (
                      <Input
                        placeholder={t.otherPlaceholder}
                        value={formData.otherNeed}
                        onChange={(e) => setFormData(prev => ({ ...prev, otherNeed: e.target.value }))}
                        className="mt-3"
                      />
                    )}
                  </div>

                  <div>
                    <Label htmlFor="additional" className="text-base font-medium">{t.shareText}</Label>
                    <Textarea
                      id="additional"
                      placeholder={t.sharePlaceholder}
                      value={formData.additionalText}
                      onChange={(e) => setFormData(prev => ({ ...prev, additionalText: e.target.value }))}
                      className="mt-2 min-h-[100px]"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="checkin"
                      checked={formData.wantsCheckIn}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, wantsCheckIn: checked as boolean }))}
                    />
                    <Label htmlFor="checkin" className="cursor-pointer">{t.checkInQuestion}</Label>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent: checked as boolean }))}
                        className="mt-1"
                        required
                      />
                      <Label htmlFor="consent" className="text-sm cursor-pointer leading-relaxed">
                        {t.consentText}
                      </Label>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-colors duration-200"
                    size="lg"
                  >
                    {t.submit}
                  </Button>
                </>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssessOtherForm;
