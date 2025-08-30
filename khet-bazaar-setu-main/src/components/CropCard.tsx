import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Wheat } from "lucide-react";

interface CropCardProps {
  farmerName: string;
  cropName: string;
  quantity: string;
  price: string;
  phone: string;
  location: string;
  distance?: string;
  isHighlighted?: boolean;
}

export const CropCard = ({
  farmerName,
  cropName,
  quantity,
  price,
  phone,
  location,
  distance,
  isHighlighted = false
}: CropCardProps) => {
  return (
    <Card className={`p-4 transition-all duration-300 hover:shadow-crop ${
      isHighlighted 
        ? 'border-accent bg-gradient-harvest/10 shadow-glow' 
        : 'border-primary/20 hover:border-primary/40'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Wheat className="h-5 w-5 text-success" />
          <h3 className="font-bold text-lg">{cropName}</h3>
          {isHighlighted && (
            <Badge className="bg-accent text-accent-foreground">
              प्रमुख
            </Badge>
          )}
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-accent">{price}</p>
          <p className="text-sm text-muted-foreground">{quantity} उपलब्ध</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 bg-success rounded-full"></div>
          <span className="font-medium">{farmerName}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
          {distance && (
            <Badge variant="outline" className="text-xs">
              {distance} दूर
            </Badge>
          )}
        </div>
      </div>

      <div className="flex space-x-2">
        <Button className="flex-1" size="sm">
          <Phone className="h-4 w-4 mr-2" />
          संपर्क करें
        </Button>
        <Button variant="outline" size="sm">
          विवरण देखें
        </Button>
      </div>
    </Card>
  );
};