import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MarketPriceCardProps {
  cropName: string;
  marketPrice: string;
  msp: string;
  trend: 'up' | 'down' | 'stable';
  change: string;
}

export const MarketPriceCard = ({
  cropName,
  marketPrice,
  msp,
  trend,
  change
}: MarketPriceCardProps) => {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground';

  return (
    <Card className="p-4 bg-gradient-primary border-primary/20 shadow-crop">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-lg text-accent">{cropName}</h3>
        <div className={`flex items-center space-x-1 ${trendColor}`}>
          <TrendIcon className="h-4 w-4" />
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">मंडी भाव:</span>
          <span className="text-xl font-bold text-warning">{marketPrice}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">सरकारी MSP:</span>
          <span className="text-lg font-semibold text-success">{msp}</span>
        </div>

        <div className="pt-2 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">स्थिति:</span>
            <Badge 
              variant={marketPrice > msp ? "default" : "destructive"}
              className="text-xs"
            >
              {marketPrice > msp ? "MSP से ऊपर" : "MSP से नीचे"}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};