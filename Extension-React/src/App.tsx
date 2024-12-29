import React, { useEffect, useState } from "react";
import { Coupon } from "./components/CouponCard";
import Header from "./components/Header";
import CouponsList from "./components/CouponsList";
import { fetchCoupons } from "./lib/utils";

const Popup: React.FC = () => {
    const [pageDomain, setPageDomain] = useState<string>("");
    const [pageIcon, setPageIcon] = useState<string>("");
    const [coupons, setCoupons] = useState<Coupon[]>([]);

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                const tab = tabs[0];
                if (tab.url) {
                    const url = new URL(tab.url);
                    const domain = url.hostname.replace("www.", "");

                    setPageDomain(domain);
                    setPageIcon(
                        `https://www.google.com/s2/favicons?sz=64&domain=${domain}`
                    );

                    fetchCoupons(domain, setCoupons);
                }
            }
        });
    }, []);

    const handleCopy = (code: string, index: number) => {
        navigator.clipboard.writeText(code);

        const newCoupons = [...coupons];
        newCoupons[index] = { ...newCoupons[index], copied: true };
        setCoupons(newCoupons);

        setTimeout(() => {
            newCoupons[index] = { ...newCoupons[index], copied: false };
            setCoupons([...newCoupons]);
        }, 2000);
    };

    return (
        <div className="w-96 h-[32rem] flex flex-col p-4 bg-background">
            <Header pageIcon={pageIcon} pageDomain={pageDomain} />
            <h2 className="text-lg font-semibold pb-2 mb-2 text-primary text-center border-border border-b-2">
                Coupons
            </h2>
            <CouponsList coupons={coupons} handleCopy={handleCopy} />
        </div>
    );
};

export default Popup;
