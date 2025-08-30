import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { VoiceAgent } from "@/components/VoiceAgent";
import { CropCard } from "@/components/CropCard";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Search, MapPin, Crown, Zap, User } from "lucide-react";
import { Link } from "react-router-dom";

const BuyerDashboard = () => {
  const [requirement, setRequirement] = useState({
    crop: "",
    quantity: "",
    maxPrice: ""
  });

  const [isSubscribed, setIsSubscribed] = useState(false);

  const nearbyFarmers = [
    {
      farmerName: "राम कुमार",
      cropName: "टमाटर",
      quantity: "50 क्विंटल",
      price: "₹70/किलो",
      phone: "9876543210",
      location: "गुड़गांव, हरियाणा",
      distance: "2 किमी",
      isHighlighted: true
    },
    {
      farmerName: "श्याम पाटिल",
      cropName: "टमाटर", 
      quantity: "30 क्विंटल",
      price: "₹75/किलो",
      phone: "9876543211",
      location: "फरीदाबाद, हरियाणा",
      distance: "5 किमी"
    },
    {
      farmerName: "गोपाल सिंह",
      cropName: "टमाटर",
      quantity: "40 क्विंटल", 
      price: "₹65/किलो",
      phone: "9876543212",
      location: "नोएडा, उत्तर प्रदेश",
      distance: "8 किमी"
    }
  ];

  const handleSearch = () => {
    // Simulate search functionality
    console.log("Searching for:", requirement);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary border-b border-primary/20 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                वापस
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-accent">खरीदार डैशबोर्ड</h1>
          </div>
          <div className="flex items-center space-x-4">
            {isSubscribed && (
              <Badge className="bg-accent text-accent-foreground">
                <Crown className="h-3 w-3 mr-1" />
                प्रीमियम सदस्य
              </Badge>
            )}
            <div className="flex items-center space-x-2 text-primary-foreground">
              <User className="h-5 w-5" />
             <span>{localStorage.getItem("buyerName") || "राजू"}</span>

            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search & Requirements */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 bg-gradient-earth border-primary/20 shadow-earth">
              <h2 className="text-xl font-bold text-accent mb-4">आवश्यकता दर्ज करें</h2>
              
              <div className="space-y-4">
                <div>
                  <Label>फसल चुनें</Label>
                  <Select value={requirement.crop} onValueChange={(value) => setRequirement({...requirement, crop: value})}>
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
                  <Label>कितनी मात्रा चाहिए</Label>
                  <Input 
                    placeholder="जैसे: 50 किलो या 2 क्विंटल"
                    value={requirement.quantity}
                    onChange={(e) => setRequirement({...requirement, quantity: e.target.value})}
                  />
                </div>

                <div>
                  <Label>अधिकतम कीमत</Label>
                  <Input 
                    placeholder="जैसे: ₹70/किलो"
                    value={requirement.maxPrice}
                    onChange={(e) => setRequirement({...requirement, maxPrice: e.target.value})}
                  />
                </div>

                <Button onClick={handleSearch} className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  किसान खोजें
                </Button>
              </div>
            </Card>

            {/* Voice Agent */}
            <VoiceAgent type="buyer" />

            {/* Subscription Card */}
            {!isSubscribed && (
              <Card className="p-6 bg-gradient-harvest/20 border-accent/30 shadow-glow">
                <div className="text-center space-y-4">
                  <Crown className="h-12 w-12 text-accent mx-auto" />
                  <h3 className="text-lg font-bold text-accent">प्रीमियम सब्सक्रिप्शन</h3>
                  <p className="text-sm text-muted-foreground">
                    असीमित किसानों से संपर्क करें
                  </p>
                  <div className="text-2xl font-bold text-accent">₹200/महीना</div>
                  <Button 
                    className="w-full bg-accent hover:bg-accent/90"
                    onClick={() => setIsSubscribed(true)}
                  >
                    अभी सब्स्क्राइब करें
                  </Button>
                </div>
              </Card>
            )}

            {/* Highlight Option */}
            <Card className="p-4 bg-warning/10 border-warning/30">
              <div className="flex items-center space-x-3">
                <Zap className="h-8 w-8 text-warning" />
                <div className="flex-1">
                  <h4 className="font-bold text-warning">आवश्यकता हाइलाइट करें</h4>
                  <p className="text-xs text-muted-foreground">₹100 में अपनी जरूरत ऊपर दिखाएं</p>
                </div>
                <Button size="sm" variant="outline" className="border-warning text-warning">
                  हाइलाइट करें
                </Button>
              </div>
            </Card>
          </div>

          {/* Nearby Farmers */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-accent">नजदीकी किसान (10 किमी के अंदर)</h2>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">गुड़गांव, हरियाणा</span>
              </div>
            </div>

            <div className="space-y-4">
              {nearbyFarmers.map((farmer, index) => (
                <CropCard key={index} {...farmer} />
              ))}
            </div>

            {nearbyFarmers.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  अभी तक कोई किसान नहीं मिला। कृपया अपनी आवश्यकता दर्ज करें।
                </p>
              </Card>
            )}
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Ads Section */}
        <Card className="p-6 bg-gradient-harvest/20 border-accent/30 shadow-glow">
          <h3 className="text-xl font-bold text-accent mb-4">🛒 व्यापारिक सेवाएं</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-background/50 rounded-lg text-center">
              <h4 className="font-bold">🚛 परिवहन सेवा</h4>
              <p className="text-sm text-muted-foreground">घर तक डिलीवरी</p>
            </div>
            <div className="p-4 bg-background/50 rounded-lg text-center">
              <h4 className="font-bold">🏪 थोक खरीदारी</h4>
              <p className="text-sm text-muted-foreground">बेहतर दरों पर</p>
            </div>
            <div className="p-4 bg-background/50 rounded-lg text-center">
              <h4 className="font-bold">📱 मोबाइल ऐप</h4>
              <p className="text-sm text-muted-foreground">डाउनलोड करें</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BuyerDashboard;