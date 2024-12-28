const PageIcon = document.getElementById("PageIcon");
const PageDomain = document.getElementById("PageDomain");

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    const url = new URL(tab.url);
    PageIcon.src = `https://www.google.com/s2/favicons?sz=64&domain=${url.hostname}`;
    PageDomain.textContent = url.hostname.replace("www.", "");

    fetchCoupons();
});

const CouponTemplate = `
<div class="Coupon">
    <div class="CouponInfo">
        <p class="CouponTitle"><COUPONTITLE></p>
        <p class="CouponDescription">COUPONDESCRIPTION</p>
    </div>
    <button class="CouponButton">Copy</button>
</div>
`;

function addCoupon(coupon) {
    const couponElement = document.createElement("div");
    couponElement.innerHTML = CouponTemplate.replace(
        "<COUPONTITLE>",
        coupon.code
    ).replace("COUPONDESCRIPTION", coupon.description);

    couponElement
        .querySelector(".CouponButton")
        .addEventListener("click", () => {
            navigator.clipboard.writeText(coupon.code);

            couponElement.querySelector(".CouponButton").textContent =
                "Copied!";
            setTimeout(() => {
                couponElement.querySelector(".CouponButton").textContent =
                    "Copy";
            }, 2000);
        });

    document.getElementById("CouponList").appendChild(couponElement);
}

function fetchCoupons() {
    fetch(
        `https://abdallah-alwarawreh.github.io/Syrup/backend/${PageDomain.textContent.toLowerCase()}/coupons.json`
    )
        .then((response) => response.json())
        .then((data) => {
            data.forEach((coupon) => {
                addCoupon({
                    code: coupon.couponCode,
                    description: coupon.couponDescription,
                });
            });
        });
}
