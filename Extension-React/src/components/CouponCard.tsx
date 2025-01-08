import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export interface Coupon {
    code: string;
    title: string;
    description: string;
    copied?: boolean;
    score: number;
}

/*const colorRanges = [
    { min: 0.7, color: "text-green-500" },
    { min: 0.55, color: "text-lime-500" },
    { min: 0.4, color: "text-yellow-500" },
    { min: 0.25, color: "text-orange-500" },
    { min: 0, color: "text-red-500" }
] as const;*/

function round(value: number, precision: number) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

const interpolateColor = (value: number, min: number, max: number): string => {
    // Normalize value to 0-1 range
    const normalized = (value - min) / (max - min);
    
    // HSL values for red (0) to green (120)
    const hue = normalized * 120;
    
    return `hsl(${hue}, 70%, 45%)`;
};

/*{getColor(score)}*/

const CouponCard: React.FC<{
    coupon: Coupon;
    onCopy: () => void;
    copied: boolean;
    minScore: number;
    maxScore: number;
}> = ({ coupon, onCopy, copied, minScore, maxScore }) => {
    const { t } = useTranslation();
    let score = round(coupon.score, 2);
    const color = interpolateColor(score, minScore, maxScore);

    return (
        <Card className="p-4 pt-2 pb-2 flex justify-between items-center bg-card text-card-foreground">
            <div>
                <p className="text-sm font-bold text-primary">{coupon.code}</p>
                <p className="text-sm text-muted-foreground">{coupon.title}</p>
                {coupon.score && (
                    <p style={{ color }} className={`text-sm`}>
                        {`Score: ${score}`}
                    </p>
                )}
            </div>
            <Button onClick={onCopy} className="bg-primary text-primary-foreground">
                {copied ? t("Copied!") : t("Copy")}
            </Button>
        </Card>
    )
};

export default CouponCard;
