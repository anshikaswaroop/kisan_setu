import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tractor } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import bgImage from "../assets/setu9.png";

const BuyerLogin = () => {
  const [step, setStep] = useState<"details" | "otp">("details");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    otp: ""
  });

  const navigate = useNavigate();

  const handleSendOTP = () => {
    if (formData.phone.length === 10) {
      alert(`OTP sent to ${formData.phone}`);
      setStep("otp");
    } else {
      alert("Enter a valid 10-digit phone number");
    }
  };

  const handleVerifyOTP = () => {
    if (formData.otp === "1234") {
      alert("Login Successful!");
      // naam ko localStorage me save kar rahe hain taaki Dashboard me dikh sake
      localStorage.setItem("BuyerName", formData.name);
      navigate("/buyer");
    } else {
      alert("Invalid OTP");
    }
  };

 return (
  <div className="relative min-h-screen flex items-center justify-center">
    {/* Background image with overlay */}
    <div
      className="absolute inset-0 bg-cover bg-center"
     style={{
  backgroundImage: "url('/setu55.png')"
}}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
    </div>

    {/* Card container (above overlay) */}
    <div className="relative z-50 p-9">
      <Card className="w-[500px] p-8 shadow-lg">
        <div className="flex items-center space-x-3 mb-6">
          <Tractor className="h-8 w-55 text-accent" />
          <h2 className="text-2xl font-bold text-accent">खरीदार  लॉगिन</h2>
        </div>

        {step === "details" ? (
          <div className="space-y-4">
            <div>
              <Label>नाम</Label>
              <Input
                placeholder="अपना नाम लिखें"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <Label>फ़ोन नंबर</Label>
              <Input
                type="tel"
                placeholder="10 अंकों का नंबर"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <Label>जगह</Label>
              <Input
                placeholder="अपना गाँव/शहर लिखें"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <Button className="w-full bg-success hover:bg-success/90" onClick={handleSendOTP}>
              OTP प्राप्त करें
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Label>OTP दर्ज करें</Label>
            <Input
              placeholder="1234"
              value={formData.otp}
              onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
            />

            <Button className="w-full bg-success hover:bg-success/90" onClick={handleVerifyOTP}>
              OTP सत्यापित करें
            </Button>
          </div>
        )}
      </Card>
    </div>
  </div>
);

};

export default BuyerLogin;
