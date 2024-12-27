chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getCoupons") {
        fetch("http://localhost:8080/coupons/" + request.domain)
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
});
