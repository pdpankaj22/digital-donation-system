// KindFund API Configuration
// When running locally, it connects to http://localhost:8080
// When deployed, you can set your cloud backend URL here or via localStorage
const API_BASE_URL = (() => {
    // 1. Check if user configured a custom backend URL in localStorage
    const savedUrl = localStorage.getItem("KINDFUND_API_URL");
    if (savedUrl) {
        return savedUrl.replace(/\/+$/, "");
    }

    // 2. If running locally (localhost, 127.0.0.1, or local file)
    if (
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.protocol === "file:"
    ) {
        return "http://localhost:8080";
    }

    // 3. Production backend URL:
    // Once you deploy your Spring Boot backend (e.g. on Render, Railway, or Fly.io),
    // update this URL with your live backend URL (e.g. "https://kindfund-backend.onrender.com").
    return "http://localhost:8080";
})();

window.API_BASE_URL = API_BASE_URL;
