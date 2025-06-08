
import React from 'react';
import { Button } from "@/components/ui/button";

interface LanguageToggleProps {
  language: 'en' | 'zh' | 'es';
  onLanguageChange: (lang: 'en' | 'zh' | 'es') => void;
}

const LanguageToggle = ({ language, onLanguageChange }: LanguageToggleProps) => {
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'zh', label: '中文' },
    { code: 'es', label: 'Español' }
  ];

  return (
    <div className="flex justify-center gap-2 mb-6">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={language === lang.code ? "default" : "outline"}
          size="sm"
          onClick={() => onLanguageChange(lang.code as 'en' | 'zh' | 'es')}
          className={`${
            language === lang.code 
              ? 'bg-orange-500 hover:bg-orange-600 text-white' 
              : 'border-orange-200 text-orange-700 hover:bg-orange-50'
          } transition-colors duration-200`}
        >
          {lang.label}
        </Button>
      ))}
    </div>
  );
};

export default LanguageToggle;
