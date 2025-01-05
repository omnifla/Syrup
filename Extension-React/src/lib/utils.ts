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
    try {
        const response = await fetch(
            `https://api.discountdb.ch/api/v1/coupons/search?q=${domain.toLocaleLowerCase()}`
        );

        if (response.ok) {
            const data = await response.json();
            const parsedData = data.data;
            console.error("data", JSON.stringify(parsedData, null, 2));

            const coupons = parsedData.map(
                (coupon: {
                    code: string;
                    title: string;
                    description: string;
                    score: string;
                }): Coupon => ({
                    code: coupon.code,
                    title: coupon.title,
                    description: coupon.description,
                    expirationDate: coupon.score,
                })
            );
            
            console.error("coupons", JSON.stringify(coupons, null, 2));

            setCoupons(coupons);
        } else {
            setCoupons([]);
        }
    } catch (error) {
        console.error("Error fetching coupons:", error);
        setCoupons([]);
    }
};
