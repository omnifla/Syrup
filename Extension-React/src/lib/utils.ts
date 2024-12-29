import { Coupon } from "@/components/CouponCard";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const fetchCoupons = async (
    domain: string,
    setCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>
) => {
    try {
        const response = await fetch(
            `https://abdallah-alwarawreh.github.io/Syrup/backend/${domain.toLowerCase()}/coupons.json`
        );

        if (response.ok) {
            const data = await response.json();
            setCoupons(
                data.map(
                    (coupon: {
                        couponCode: string;
                        couponTitle: string;
                        couponDescription: string;
                    }) => ({
                        code: coupon.couponCode,
                        title: coupon.couponTitle,
                        description: coupon.couponDescription,
                    })
                )
            );
        }
    } catch (error) {
        console.error("Error fetching coupons:", error);
    }
};
