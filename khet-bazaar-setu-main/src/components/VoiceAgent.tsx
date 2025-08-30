import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff } from "lucide-react";

interface VoiceAgentProps {
  onVoiceData?: (data: any) => void;
  type: 'farmer' | 'buyer';
}

export const VoiceAgent = ({ onVoiceData, type }: VoiceAgentProps) => {
  const [isListening, setIsListening] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  const handleToggleListening = () => {
    setIsListening(!isListening);
    // Simulate audio levels during listening
    if (!isListening) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      setTimeout(() => {
        clearInterval(interval);
        setIsListening(false);
        setAudioLevel(0);
        // Simulate voice recognition completion
        if (type === 'farmer') {
          onVoiceData?.({
            cropName: "टमाटर",
            quantity: "50 क्विंटल",
            price: "₹70/किलो",
            message: "मंडी में टमाटर का भाव आज ₹70 प्रति किलो है। सरकारी MSP ₹75 प्रति किलो है।"
          });
        }
      }, 3000);
    }
  };

  const farmerTexts = {
    title: "🎤 आवाज़ से जानकारी दर्ज करें",
    subtitle: "अपनी फसल की जानकारी बोलकर दर्ज करें",
    buttonText: isListening ? "सुन रहा हूं..." : "बोलना शुरू करें",
    instructions: [
      "📱 माइक बटन दबाएं",
      "🗣️ फसल का नाम, मात्रा और कीमत बताएं",
      "📊 मंडी का भाव भी पता चल जाएगा"
    ]
  };

  const buyerTexts = {
    title: "🎤 आवाज़ से आवश्यकता बताएं", 
    subtitle: "अपनी जरूरत बोलकर दर्ज करें",
    buttonText: isListening ? "सुन रहा हूं..." : "अपनी जरूरत बताएं",
    instructions: [
      "📱 माइक बटन दबाएं",
      "🛒 क्या चाहिए और कितनी मात्रा में बताएं",
      "📍 नजदीकी किसान खुद ब खुद मिल जाएंगे"
    ]
  };

  const texts = type === 'farmer' ? farmerTexts : buyerTexts;

  return (
    <Card className="p-6 bg-gradient-earth border-primary/20 shadow-earth">
      <div className="text-center space-y-4">
        <h3 className="text-xl font-bold text-accent">{texts.title}</h3>
        <p className="text-muted-foreground">{texts.subtitle}</p>
        
        <div className="relative flex justify-center">
          <Button
            size="lg"
            onClick={handleToggleListening}
            className={`h-20 w-20 rounded-full transition-all duration-300 ${
              isListening
                ? 'bg-warning hover:bg-warning/90 shadow-glow scale-110'
                : 'bg-primary hover:bg-primary/90'
            }`}
          >
            {isListening ? (
              <MicOff className="h-8 w-8" />
            ) : (
              <Mic className="h-8 w-8" />
            )}
          </Button>
          
          {isListening && (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-warning rounded-full animate-pulse"
                    style={{
                      height: `${10 + (audioLevel / 100) * 20}px`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="text-sm font-medium">
          {texts.buttonText}
        </p>

        <div className="text-left space-y-2">
          <p className="text-sm font-medium text-success">निर्देश:</p>
          {texts.instructions.map((instruction, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              {instruction}
            </p>
          ))}
        </div>
      </div>
    </Card>
  );
};