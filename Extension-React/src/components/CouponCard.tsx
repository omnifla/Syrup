import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export interface Coupon {
    code: string;
    title: string;
    description: string;
    copied?: boolean;
    expirationDate: number;
}

const colorRanges = [
    { min: 70, color: "text-green-500" },
    { min: 55, color: "text-lime-500" },
    { min: 40, color: "text-yellow-500" },
    { min: 25, color: "text-orange-500" },
    { min: 0, color: "text-red-500" }
] as const;

const getPercentageColor = (percentage: number): string => {
    return colorRanges.find(range => percentage >= range.min)?.color || "text-red-500";
};

function round(value: number, precision: number) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

const CouponCard: React.FC<{
    coupon: Coupon;
    onCopy: () => void;
    copied: boolean;
}> = ({ coupon, onCopy, copied }) => {
    const { t } = useTranslation();
    const percentage = Math.round(coupon.expirationDate * 100);

    return (
        <Card className="p-4 pt-2 pb-2 flex justify-between items-center bg-card text-card-foreground">
            <div>
                <p className="text-sm font-bold text-primary">{coupon.code}</p>
                <p className="text-sm text-muted-foreground">{coupon.title}</p>
                {coupon.expirationDate && (
                    <p className={`text-sm ${getPercentageColor(percentage)}`}>
                        {t(round(percentage, 1) + "% chance to work")}
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
