import CouponsList from "@/components/CouponsList";

export interface CouponData {
    couponsDomain: Coupon[] | null;
    handleCopy: (code: string, index: number) => void;
    className: string;
}

export interface Coupon {
    code: string;
    title: string;
    description: string;
    copied?: boolean;
    score: number;
}

const CouponsEntry: React.FC<CouponData> = ({couponsDomain, handleCopy, className}) => {
    
    return (
        <div className={`flex flex-col ${className}`}>
            <CouponsList
                coupons={couponsDomain}
                handleCopy={handleCopy} />
        </div>
    );
}

export default CouponsEntry;
