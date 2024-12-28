import { writeFile } from "fs";
import path from "path";
import fs from "fs";
import ProgressBar from "progress";

const stores: {
    storeName: string;
    storeDomain: string;
}[] = JSON.parse(fs.readFileSync(path.join(__dirname, "stores.json"), "utf-8"));

const USER_AGENT =
    "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.3";

const COUPON_API_URL = "https://couponfollow.com/portalapi/coupon/popup";
const WEBSITE_LINK = "https://couponfollow.com/site/";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const retry = async <T>(
    fn: () => Promise<T>,
    retries = 3,
    delayMs = 3000
): Promise<T> => {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt < retries - 1) {
                console.warn(`Retrying... (${attempt + 1}/${retries})`);
                await delay(delayMs);
            } else {
                console.error(`Failed after ${retries} attempts.`);
                throw error;
            }
        }
    }
    throw new Error("Function failed after all retries");
};

const GetCouponIds = async (domain: string) => {
    const res = await retry(() =>
        fetch(WEBSITE_LINK + domain, {
            headers: {
                "User-Agent": USER_AGENT,
            },
            method: "GET",
        })
    );

    const data = await res.text();

    const regex = /data-cid="(\d+)"/g;
    const matches = data.matchAll(regex);
    const couponIds: string[] = [];
    for (const match of matches) {
        couponIds.push(match[1]);
    }

    return couponIds;
};

const GetCouponData = async (couponId: string, domain: string) => {
    const res = await retry(() =>
        fetch(COUPON_API_URL, {
            headers: {
                "User-Agent": USER_AGENT,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: couponId, domainName: domain }),
            method: "POST",
        })
    );

    const data: {
        code: string;
        popupDesc: string;
        title: string;
        desc: string;
        outUrl: string;
        emailOutUrl: string;
        verified: boolean;
        exclusive: boolean;
    } = await res.json();

    return {
        code: data.code,
        title: data.title,
        description: data.desc,
    };
};

const SaveCoupons = async (coupons: any) => {
    writeFile(
        path.join(__dirname, "coupons.json"),
        JSON.stringify(coupons, null, 4),
        (err) => {
            if (err) {
                console.error(err);
            }
        }
    );
};

(async () => {
    const coupons: {
        storeName: string;
        storeDomain: string;
        coupons: {
            couponCode: string;
            couponTitle: string;
            couponDescription: string;
        }[];
    }[] = [];

    if (fs.existsSync(path.join(__dirname, "coupons.json"))) {
        coupons.push(
            ...JSON.parse(
                fs.readFileSync(path.join(__dirname, "coupons.json"), "utf-8")
            )
        );
    }

    const bar = new ProgressBar(":bar :current/:total", {
        total: stores.length,
    });

    for (const store of stores) {
        if (
            coupons.some((coupon) => coupon.storeDomain === store.storeDomain)
        ) {
            bar.tick();
            continue;
        }

        const storeCoupons = [];

        const couponIds = await GetCouponIds(store.storeDomain);
        for (const couponId of couponIds) {
            const couponData = await GetCouponData(couponId, store.storeDomain);
            console.log(`
                Store: ${store.storeName}
                \tCoupon: ${couponData.code}
                \tTitle: ${couponData.title}
                \tDescription: ${couponData.description}`);

            storeCoupons.push({
                couponCode: couponData.code,
                couponTitle: couponData.title,
                couponDescription: couponData.description,
            });
        }

        coupons.push({
            storeName: store.storeName,
            storeDomain: store.storeDomain,
            coupons: storeCoupons,
        });
        SaveCoupons(coupons);

        bar.tick();
    }

    SaveCoupons(coupons);
})();
