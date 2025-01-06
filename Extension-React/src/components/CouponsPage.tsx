import CouponsEntry from "@/components/CouponsEntry";
import { useTranslation } from "react-i18next";
import { Coupon } from "@/components/CouponCard";

export interface CouponData {
    pageIcon: string;
    pageDomain: string;
    pageSubDomain: string;
    isSubDomain: boolean;
    couponsDomain: Coupon[] | null;
    couponsSubDomain: Coupon[] | null;
    handleCopy: (code: string, index: number) => void;
    errorMsg: string;
}

const CouponsPage: React.FC<CouponData> = ({pageIcon, pageDomain, pageSubDomain, isSubDomain, couponsDomain, couponsSubDomain, handleCopy, errorMsg}) => {
    const { t } = useTranslation();

    return (
        <div className="w-screen h-screen flex flex-col pt-2">
                <h2 className="text-lg font-semibold pb-2 mb-2 text-primary text-center border-border border-b-2">
                    { t('Coupons') }
                </h2>
            {errorMsg ? (
                <p className="text-sm text-center text-red-500 dark:text-red-300">
                    {t(errorMsg)}
                </p>
            ) : (
                <>
                    <CouponsEntry
                        pageIcon={pageIcon}
                        pageDomain={pageDomain}
                        couponsDomain={couponsDomain}
                        handleCopy={handleCopy}
                        isSubDomain={isSubDomain} />
                    {isSubDomain && (
                        <CouponsEntry
                            pageIcon={pageIcon}
                            pageDomain={pageSubDomain}
                            couponsDomain={couponsSubDomain}
                            handleCopy={handleCopy}
                            isSubDomain={isSubDomain} />
                    )}
                </>
            )}
        </div>
    );
}

export default CouponsPage;
