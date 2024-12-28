chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getCoupons") {
        fetch(
            "https://abdallah-alwarawreh.github.io/Syrup/backend/" +
                request.domain +
                "/coupons.json"
        )
            .then((response) => response.json())
            .then((data) => {
                sendResponse({ coupons: data });
            })
            .catch((err) => {
                console.error("Failed to fetch coupons", err);
                sendResponse({ coupons: [] });
            });
        return true;
    }

    if (request.action === "openPopup") {
        chrome.action.openPopup();
    }
});
