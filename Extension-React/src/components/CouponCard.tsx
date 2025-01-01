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
    <Card className="p-4 pt-2 pb-2 flex justify-between items-center bg-card text-card-foreground dark:bg-slate-800 dark:border-slate-700">
        <div>
            <p className="text-sm font-bold text-primary dark:text-white">
                {coupon.code}
            </p>
            <p className="text-sm text-muted-foreground dark:text-slate-400">
                {coupon.title}
            </p>
            {coupon.expirationDate && (
                <p className="text-sm text-muted-foreground text-orange-400">
                    Expires: {coupon.expirationDate}
                </p>
            )}
        </div>
        <Button
            onClick={onCopy}
            className="bg-primary text-primary-foreground dark:bg-slate-700"
        >
            {copied ? "Copied!" : "Copy"}
        </Button>
    </Card>
);

export default CouponCard;
