import express from "express";

const app = express();

const coupons: {
    storeName: string;
    storeDomain: string;
    coupons: string[];
}[] = require("../coupons.json");

app.get("/coupons/:domain", (req, res) => {
    const domain = req.params.domain;

    const store = coupons.find((store) => store.storeDomain === domain);

    if (!store) {
        res.status(404).send("Store not found");
        return;
    }

    res.json(store.coupons);
});

app.post("/coupons/:domain", (req, res) => {
    const domain = req.params.domain;
    const coupon = req.body.coupon;

    const store = coupons.find((store) => store.storeDomain === domain);

    if (!store) {
        res.status(404).send("Store not found");
        return;
    }

    // TODO: save suggested coupon
    res.send("Coupon saved");
});

app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
});
