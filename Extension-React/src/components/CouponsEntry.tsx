import CouponsList from "@/components/CouponsList";

export interface CouponData {
    pageIcon: string;
    pageDomain: string;
    couponsDomain: Coupon[] | null;
    handleCopy: (code: string, index: number) => void;
    isSubDomain: boolean;
}

export interface Coupon {
    code: string;
    title: string;
    description: string;
    copied?: boolean;
    score: number;
}

const CouponsEntry: React.FC<CouponData> = ({pageIcon, pageDomain, couponsDomain, handleCopy, isSubDomain}) => {

    let height: string = ""

    if (!isSubDomain) {
        height = "h-[80vh]"
    } else {
        height = "h-[40vh]"
    }
    
    return (
        <div className={`${height} flex flex-col pt-2`}>
            <div className="flex items-center gap-4 pb-2 mb-2 pt-1 border-border border-b-2 border-t-2">
                <img src={pageIcon} alt="Page Icon" className="w-8 h-z" />
                <p className="text-lg font-bold text-primary">{pageDomain}</p>
            </div>
            <CouponsList
                coupons={couponsDomain}
                handleCopy={handleCopy} />
        </div>
    );
}

export default CouponsEntry;
