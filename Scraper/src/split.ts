import fs from "fs";
import path from "path";

const coupons: {
    storeName: string;
    storeDomain: string;
    coupons: string[];
}[] = require("./coupons.json");

coupons.forEach((store) => {
    if (store.coupons) {
        // create a folder in ../../backend with the store.storeDomain
        const folderPath = path.join(
            __dirname,
            "../../backend",
            store.storeDomain
        );
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        // create a file in the folder with the coupons.json
        fs.writeFile(
            `${folderPath}/coupons.json`,
            JSON.stringify(store.coupons, null, 4),
            (err) => {
                if (err) {
                    console.log(err);
                }
            }
        );
    }
    console.log(store.storeName);
    console.log(store.storeDomain);
    console.log(store.coupons);
});
