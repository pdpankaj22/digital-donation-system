// KindFund API Configuration & Local Data Fallback Engine
// Seamlessly connects to Spring Boot backend if available, or falls back to
// secure local browser storage so the site works anywhere (Vercel, GitHub Pages, mobile) without errors.

const API_BASE_URL = (() => {
    const savedUrl = localStorage.getItem("KINDFUND_API_URL");
    if (savedUrl) {
        return savedUrl.replace(/\/+$/, "");
    }
    if (
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.protocol === "file:"
    ) {
        return "http://localhost:8080";
    }
    return "http://localhost:8080";
})();

window.API_BASE_URL = API_BASE_URL;

// Reliable fetch with timeout
async function fetchWithTimeout(url, options = {}, timeoutMs = 2000) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(timeout);
        return response;
    } catch (err) {
        clearTimeout(timeout);
        throw err;
    }
}
window.fetchWithTimeout = fetchWithTimeout;

// User Storage Helpers
function getStoredUsers() {
    const defaultUsers = [
        {
            id: 1,
            fullName: "Pankaj",
            email: "fake353@gmail.com",
            password: "test@123",
            phone: "9082906351",
            role: "DONOR"
        },
        {
            id: 2,
            fullName: "Test User",
            email: "testuser@gmail.com",
            password: "test@123",
            phone: "9304272762",
            role: "DONOR"
        }
    ];
    const saved = localStorage.getItem("kindfund_all_users");
    if (!saved) {
        localStorage.setItem("kindfund_all_users", JSON.stringify(defaultUsers));
        return defaultUsers;
    }
    try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
            defaultUsers.forEach(du => {
                if (!parsed.some(u => (u.email || "").toLowerCase() === du.email.toLowerCase())) {
                    parsed.push(du);
                }
            });
            return parsed;
        }
        return defaultUsers;
    } catch (e) {
        return defaultUsers;
    }
}
window.getStoredUsers = getStoredUsers;

function saveStoredUser(user) {
    const users = getStoredUsers();
    user.id = users.length + 1;
    users.push(user);
    localStorage.setItem("kindfund_all_users", JSON.stringify(users));
    return user;
}
window.saveStoredUser = saveStoredUser;

// Donation Storage Helpers
function getStoredDonations() {
    const defaultDonations = [
        {
            id: 1,
            amount: 1000,
            campaignName: "Education for Every Child",
            category: "Education",
            donationDate: new Date(Date.now() - 3600000).toISOString(),
            donorEmail: "fake353@gmail.com",
            paymentMethod: "upi",
            status: "SUCCESSFUL"
        },
        {
            id: 2,
            amount: 1000,
            campaignName: "Home for Families",
            category: "General",
            donationDate: "2026-09-13T17:41:04.160424",
            donorEmail: "testuser@gmail.com",
            paymentMethod: "upi",
            status: "SUCCESSFUL"
        },
        {
            id: 3,
            amount: 1000,
            campaignName: "Education for Every Child",
            category: "General",
            donationDate: "2026-09-13T18:16:46.131784",
            donorEmail: "testuser@gmail.com",
            paymentMethod: "upi",
            status: "SUCCESSFUL"
        },
        {
            id: 4,
            amount: 1000,
            campaignName: "Medical Support for Families",
            category: "General",
            donationDate: "2026-09-13T18:20:53.877938",
            donorEmail: "testuser@gmail.com",
            paymentMethod: "upi",
            status: "SUCCESSFUL"
        },
        {
            id: 5,
            amount: 500,
            campaignName: "Food for the Needy",
            category: "Food",
            donationDate: "2026-09-13T19:02:30.691748",
            donorEmail: "testuser@gmail.com",
            paymentMethod: "upi",
            status: "SUCCESSFUL"
        },
        {
            id: 6,
            amount: 1000,
            campaignName: "Scholarships for Students",
            category: "Education",
            donationDate: "2026-09-13T19:09:40.221675",
            donorEmail: "testuser@gmail.com",
            paymentMethod: "upi",
            status: "SUCCESSFUL"
        }
    ];
    const saved = localStorage.getItem("kindfund_all_donations");
    if (!saved) {
        localStorage.setItem("kindfund_all_donations", JSON.stringify(defaultDonations));
        return defaultDonations;
    }
    try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
            defaultDonations.forEach(dd => {
                if (!parsed.some(d => d.id === dd.id)) {
                    parsed.push(dd);
                }
            });
            return parsed;
        }
        return defaultDonations;
    } catch (e) {
        return defaultDonations;
    }
}
window.getStoredDonations = getStoredDonations;

function saveStoredDonation(donation) {
    const donations = getStoredDonations();
    donation.id = Date.now();
    donation.donationDate = new Date().toISOString();
    donations.unshift(donation);
    localStorage.setItem("kindfund_all_donations", JSON.stringify(donations));
    return donation;
}
window.saveStoredDonation = saveStoredDonation;
