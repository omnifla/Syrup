import CouponsList from "@/components/CouponsList";

export interface CouponData {
    pageIcon: string;
    pageDomain: string;
    couponsDomain: Coupon[] | null;
    handleCopy: (code: string, index: number) => void;
}

export interface Coupon {
    code: string;
    title: string;
    description: string;
    copied?: boolean;
    expirationDate: string;
}

const CouponsEntry: React.FC<CouponData> = ({pageIcon, pageDomain, couponsDomain, handleCopy}) => {

    return (
        <div className="h-[60vh] flex flex-col pt-2">
            <div className="flex items-center gap-4 pb-2 mb-2 pt-1 border-border border-b-2 border-t-2">
                <img src={pageIcon} alt="Page Icon" className="w-8 h-8" />
                <p className="text-lg font-bold text-primary">{pageDomain}</p>
            </div>
            <CouponsList
                coupons={couponsDomain}
                handleCopy={handleCopy} />
        </div>
    );
}

export default CouponsEntry;