import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface Coupon {
    code: string;
    title: string;
    description: string;
    copied?: boolean;
    expirationDate: string;
}

const CouponCard: React.FC<{
    coupon: Coupon;
    onCopy: () => void;
    copied: boolean;
}> = ({ coupon, onCopy, copied }) => (
    <Card className="p-4 flex justify-between items-center bg-card text-card-foreground">
        <div>
            <p className="font-bold text-primary">{coupon.code}</p>
            <p className="text-sm text-muted-foreground">{coupon.title}</p>
            {coupon.expirationDate && (
                <p className="text-sm text-muted-foreground text-orange-400">
                    Expires: {coupon.expirationDate}
                </p>
            )}
        </div>
        <Button onClick={onCopy} className="bg-primary text-primary-foreground">
            {copied ? "Copied!" : "Copy"}
        </Button>
    </Card>
);

export default CouponCard;
