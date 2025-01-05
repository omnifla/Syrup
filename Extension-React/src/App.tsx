import React, { useEffect, useState } from "react";
import { Coupon } from "@/components/CouponCard";
import { fetchCoupons } from "@/lib/utils";
import { parseDomain } from "parse-domain";
import CouponsPage from "@/components/CouponsPage";
import Header from "@/components/Header";

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

    const browserDomain = [
        "arc://",
        "chrome://",
        'chrome-extension://',
        "edge://",
        "firefox://",
        "opera://",
        "safari://",
        'about:',
        'mozilla:',
        'newtab'
    ]

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
                fetchCoupons(parseResult.hostname, setCouponsSubDomain);

                setErrorMsg("");
            } catch (error) {
                if (browserDomain.some((domain) => fullDomain.includes(domain))) {
                    setErrorMsg("Browser_domain");
                } else {
                    setErrorMsg("Domain_invalid");
                }
                console.error("Error parsing domain:", error);
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
                        fetchCoupons(parseResult.hostname, setCouponsSubDomain);

                        setErrorMsg("");
                    } catch (error) {
                        console.error("Error parsing domain:", error);
                        setErrorMsg("Domain_invalid");
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
        <main className="grid grid-cols-1 grid-rows-[10%,90%] h-screen w-screen overflow-hidden">
            <Header />
            <CouponsPage
                pageIcon={pageIcon}
                pageDomain={pageDomain}
                pageSubDomain={pageSubDomain}
                isSubDomain={isSubDomain}
                couponsDomain={couponsDomain}
                couponsSubDomain={couponsSubDomain}
                handleCopy={handleCopy}
                errorMsg={errorMsg} />
        </main>
    );
};

export default Popup;
