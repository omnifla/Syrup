import React, { useEffect, useState } from "react";
import { Coupon } from "./components/CouponCard";
import Header from "./components/Header";
import CouponsList from "./components/CouponsList";
import { fetchCoupons } from "./lib/utils";
import { ThemeToggle } from "./components/ThemeToggle";
import { parseDomain } from "parse-domain";

const domainReplacements: any = {
    "nordcheckout.com": "nordvpn.com",
};

const Popup: React.FC = () => {
    const [pageDomain, setPageDomain] = useState<string>("");
    const [pageSubDomain, setPageSubDomain] = useState<string>("");
    const [isSubDomain, setIsSubDomain] = useState<boolean>(false);
    const [pageIcon, setPageIcon] = useState<string>("");
    const [couponsDomain, setCouponsDomain] = useState<Coupon[] | null>(null);
    const [couponsSubDomain, setCouponsSubDomain] = useState<Coupon[] | null>(
        null
    );
    const [errorMsg, setErrorMsg] = useState<string>("");

    useEffect(() => {
        if (!chrome.tabs) {
            let fullDomain = window.location.hostname.replace("www.", "");
            const searchParams = new URLSearchParams(window.location.search);
            if (searchParams.has("domain")) {
                fullDomain = searchParams.get("domain") || "";
            }

            const parseResult: any = parseDomain(
                domainReplacements[fullDomain] || fullDomain
            );
            try {
                const domain = `${
                    parseResult.domain
                }.${parseResult.topLevelDomains.join(".")}`;

                if (parseResult.subDomains.length > 0) {
                    setIsSubDomain(true);
                    setPageSubDomain(parseResult.hostname);
                } else {
                    setIsSubDomain(false);
                    setPageSubDomain("");
                }

                setPageDomain(domain);
                setPageIcon(
                    `https://www.google.com/s2/favicons?sz=64&domain=${domain}`
                );

                fetchCoupons(domain, setCouponsDomain);
                fetchCoupons(fullDomain, setCouponsSubDomain);

                setErrorMsg("");
            } catch (error) {
                console.error("Error parsing domain:", error);
                setErrorMsg("Domain seems to be invalid?");
            }

            return;
        }

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                const tab = tabs[0];
                if (tab.url) {
                    const url = new URL(tab.url);
                    const fullDomain = url.hostname.replace("www.", "");

                    const parseResult: any = parseDomain(
                        domainReplacements[fullDomain] || fullDomain
                    );
                    try {
                        const domain = `${
                            parseResult.domain
                        }.${parseResult.topLevelDomains.join(".")}`;

                        if (parseResult.subDomains.length > 0) {
                            setIsSubDomain(true);
                            setPageSubDomain(fullDomain);
                        } else {
                            setIsSubDomain(false);
                            setPageSubDomain("");
                        }

                        setPageDomain(domain);
                        setPageIcon(
                            `https://www.google.com/s2/favicons?sz=64&domain=${domain}`
                        );

                        fetchCoupons(domain, setCouponsDomain);
                        fetchCoupons(fullDomain, setCouponsSubDomain);

                        setErrorMsg("");
                    } catch (error) {
                        console.error("Error parsing domain:", error);
                        setErrorMsg("Domain seems to be invalid?");
                    }
                }
            }
        });
    }, []);

    const handleCopy: (code: string, index: number) => void = (
        code: string,
        index: number
    ) => {
        navigator.clipboard.writeText(code);

        const newCoupons = [...(couponsDomain || [])];
        newCoupons[index] = { ...newCoupons[index], copied: true };
        setCouponsDomain(newCoupons);

        setTimeout(() => {
            newCoupons[index] = { ...newCoupons[index], copied: false };
            setCouponsDomain([...newCoupons]);
        }, 2000);
    };

    return (
        <div className="w-96 h-[32rem] flex flex-col p-4 pt-2">
            <h2 className="text-lg font-semibold pb-2 mb-2 text-primary text-center border-border border-b-2">
                Coupons
            </h2>
            {errorMsg ? (
                <p className="text-sm text-center text-red-500 dark:text-red-300">
                    {errorMsg}
                </p>
            ) : (
                <>
                    <Header pageIcon={pageIcon} pageDomain={pageDomain} />
                    <CouponsList
                        coupons={couponsDomain}
                        handleCopy={handleCopy}
                    />

                    {isSubDomain && (
                        <div className="h-[50%] pt-2">
                            <Header
                                pageIcon={pageIcon}
                                pageDomain={pageSubDomain}
                            />
                            <CouponsList
                                coupons={couponsSubDomain}
                                handleCopy={handleCopy}
                            />
                        </div>
                    )}
                </>
            )}

            <div className="flex items-center absolute top-1 right-1">
                <ThemeToggle />
            </div>
        </div>
    );
};

export default Popup;
