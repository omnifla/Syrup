import { Coupon } from "@/components/CouponCard";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const fetchCoupons = async (
    domain: string,
    setCoupons: React.Dispatch<React.SetStateAction<Coupon[] | null>>
) => {
    type CouponGetResponse = {
        coupons: {
            code: string,
            description: string,
            id: string,
            merchant_name: string,
            score: number,
            title: string
        }[],
        total: number
    };
    try {
        const response = await fetch(
            `https://api.discountdb.ch/api/v1/syrup/coupons?domain=${domain.toLocaleLowerCase()}`
        );
        const cachedCoupons = await chrome.storage.local.get(['coupons']);
        console.error(JSON.stringify(cachedCoupons));

        if (response.ok) {
            const data: CouponGetResponse = await response.json();

            const coupons: Coupon[] = data.coupons.map(
                (coupon) => ({
                    code: coupon.code,
                    title: coupon.title,
                    description: coupon.description,
                    score: coupon.score
                })
            );

            setCoupons(coupons);
        } else {
            setCoupons([]);
        }
    } catch (error) {
        console.error("Error fetching coupons:", error);
        setCoupons([]);
    }
};
