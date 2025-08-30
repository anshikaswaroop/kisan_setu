import { useState, useEffect, useRef } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MarketPriceCard } from "@/components/MarketPriceCard";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Plus, User, Mic } from "lucide-react";   // ✅ single clean import
import { Link } from "react-router-dom";

// --- Fix for SpeechRecognition in TS ---
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const FarmerDashboard = () => {
  const [cropData, setCropData] = useState({
    name: "",
    quantity: "",
    price: "",
    phone: ""
  });

  const [crops, setCrops] = useState([
    { id: 1, name: "टमाटर", quantity: "50 क्विंटल", price: "₹70/किलो" },
    { id: 2, name: "प्याज़", quantity: "30 क्विंटल", price: "₹45/किलो" }
  ]);

  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const marketPrices = [
    { cropName: "टमाटर", marketPrice: "₹70/किलो", msp: "₹75/किलो", trend: "up" as const, change: "+5%" },
    { cropName: "प्याज़", marketPrice: "₹45/किलो", msp: "₹40/किलो", trend: "up" as const, change: "+12%" },
    { cropName: "गेहूं", marketPrice: "₹2100/क्विंटल", msp: "₹2125/क्विंटल", trend: "down" as const, change: "-2%" }
  ];

  const handleAddCrop = () => {
    if (cropData.name && cropData.quantity && cropData.price) {
      const newCrop = {
        id: crops.length + 1,
        name: cropData.name,
        quantity: cropData.quantity,
        price: `₹${cropData.price}/किलो`,
        phone: cropData.phone
      };
      setCrops([...crops, newCrop]);
      setCropData({ name: "", quantity: "", price: "", phone: "" });
    }
  };

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      console.warn("SpeechRecognition not supported in this browser.");
      return;
    }

    const rec = new SR();
    rec.lang = "hi-IN"; 
    rec.interimResults = false;
    rec.continuous = false;

    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);

    rec.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript?.trim();
      if (transcript) {
        setCropData((prev) => ({ ...prev, name: transcript }));
      }
    };

    recognitionRef.current = rec;
  }, []);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert("आपका ब्राउज़र वॉइस इनपुट सपोर्ट नहीं करता।");
      return;
    }
    if (listening) recognitionRef.current.stop();
    else recognitionRef.current.start();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary border-b border-primary/20 p-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                वापस
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-accent">किसान डैशबोर्ड</h1>
          </div>

          {/* Right side (Mic + User Info) */}
          <div className="flex items-center space-x-6 text-primary-foreground">
            <span className="text-lg font-semibold">आवाज़ से जानकारी दर्ज करें</span>
            <button
              onClick={toggleMic}
              className={`p-2 rounded-full transition-all duration-300 ${
                listening
                  ? "bg-yellow-400 shadow-lg shadow-yellow-500"
                  : "bg-white shadow hover:bg-gray-100"
              }`}
            >
              <Mic className={`h-7 w-7 ${listening ? "text-black" : "text-primary"}`} />
            </button>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>{localStorage.getItem("farmerName") || "राजू किसान"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto p-6 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add New Crop Form */}
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-earth border-primary/20 shadow-earth">
              <h2 className="text-xl font-bold text-accent mb-4">नई फसल जोड़ें</h2>
              <div className="space-y-4">
                <div>
                  <Label>फसल का नाम</Label>
                  <Select value={cropData.name} onValueChange={(value) => setCropData({ ...cropData, name: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="फसल चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="टमाटर">टमाटर</SelectItem>
                      <SelectItem value="प्याज़">प्याज़</SelectItem>
                      <SelectItem value="गेहूं">गेहूं</SelectItem>
                      <SelectItem value="चावल">चावल</SelectItem>
                      <SelectItem value="आलू">आलू</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>मात्रा</Label>
                  <Input
                    placeholder="जैसे: 50 क्विंटल या 100 किलो"
                    value={cropData.quantity}
                    onChange={(e) => setCropData({ ...cropData, quantity: e.target.value })}
                  />
                </div>

                <div>
                  <Label>कीमत</Label>
                  <Input
                    type="number"
                    placeholder="जैसे: 70"
                    value={cropData.price}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setCropData({ ...cropData, price: value });
                    }}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    ₹{cropData.price || "0"}/किलो
                  </p>
                </div>

                <div>
                  <Label>फ़ोन नंबर</Label>
                  <Input
                    placeholder="जैसे: 9876543210"
                    value={cropData.phone}
                    onChange={(e) => setCropData({ ...cropData, phone: e.target.value })}
                  />
                </div>

                <Button onClick={handleAddCrop} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  फसल जोड़ें
                </Button>
              </div>
            </Card>
          </div>

          {/* My Crops & Other Sections */}
          <div className="space-y-6">
            {/* My Crops */}
            <Card className="p-6 border-primary/20 shadow-crop">
              <h2 className="text-xl font-bold text-accent mb-4">मेरी फसलें</h2>
              <div className="space-y-3">
                {crops.map((crop) => (
                  <Card key={crop.id} className="p-4 bg-muted/50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{crop.name}</h3>
                        <p className="text-sm text-muted-foreground">{crop.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-accent">{crop.price}</p>
                      </div>
                    </div>
                  </Card>
                ))}
                {crops.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">अभी तक कोई फसल नहीं जोड़ी गई</p>
                )}
              </div>
            </Card>

            <Separator className="bg-border" />

            {/* Market Prices */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-accent mb-6">आज के मंडी भाव</h2>
              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {marketPrices.map((price, index) => (
                    <MarketPriceCard key={index} {...price} />
                  ))}
                </div>
              </div>
            </div>

            {/* Ads Section */}
            <Card className="p-6 bg-gradient-harvest/20 border-accent/30 shadow-glow">
              <h3 className="text-lg font-bold text-accent mb-3">🌾 आपके लिए विशेष</h3>
              <div className="space-y-3">
                <div className="p-3 bg-background/50 rounded-lg">
                  <p className="font-medium">🚜 ट्रैक्टर किराये पर</p>
                  <p className="text-sm text-muted-foreground">सिर्फ ₹800/दिन</p>
                </div>
                <div className="p-3 bg-background/50 rounded-lg">
                  <p className="font-medium">🌱 बीज और खाद</p>
                  <p className="text-sm text-muted-foreground">20% छूट</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
