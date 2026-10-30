# KindFund - Digital Donation System

KindFund is a full-stack digital donation and crowdfunding platform designed to connect donors with meaningful charitable campaigns (Education, Medical Support, Food, Housing, and more).

---

## 🏗️ Project Architecture

```
Digital-donation system-project/
├── Kindfund-Frontend/          # Client-side web application (HTML5, Bootstrap 5, Vanilla JS)
│   ├── css/                    # Stylesheets
│   ├── images/                 # Static images and assets
│   ├── js/
│   │   ├── config.js           # Centralized API configuration (supports local & cloud URLs)
│   │   └── script.js           # Client-side logic, auth, API calls
│   ├── index.html              # Landing page
│   ├── campaign.html           # Campaign explorer & filter
│   ├── donate.html             # Donation checkout page
│   ├── dashboard.html          # Donor dashboard & statistics
│   ├── login.html              # User login
│   ├── register.html           # Donor registration
│   └── vercel.json             # Vercel deployment routing
├── kindfund-Backend/           # REST API Backend (Java 21, Spring Boot 4.x / 3.x, Spring Data JPA)
│   ├── src/main/java/          # Controllers, Models, Repositories
│   └── src/main/resources/     # application.properties (with cloud env var support)
├── kindfund.sql/               # Database SQL dumps
│   ├── kindfund_users.sql      # Users schema & seed data
│   └── kindfund_donations.sql  # Donations schema & seed data
├── vercel.json                 # Root Vercel configuration
└── README.md
```

---

## 🚀 Local Development Setup

### 1. Database Setup
1. Ensure MySQL is running on port `3306`.
2. Create database:
   ```sql
   CREATE DATABASE kindfund;
   ```
3. Import the tables and sample data from `kindfund.sql/kindfund_users.sql` and `kindfund.sql/kindfund_donations.sql`.

### 2. Backend Setup
1. Open `kindfund-Backend/` in IntelliJ IDEA, Eclipse, or VS Code.
2. Verify credentials in `src/main/resources/application.properties` (or set environment variables `SPRING_DATASOURCE_USERNAME` and `SPRING_DATASOURCE_PASSWORD`).
3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend will start at `http://localhost:8080`.

### 3. Frontend Setup
- Open `Kindfund-Frontend/index.html` in your browser (or use VS Code Live Server).
- The frontend will automatically connect to `http://localhost:8080`.

---

## 🌐 Deployment Guide

### Deploying Frontend to Vercel
1. Push your repository to GitHub (see GitHub section below).
2. Go to [Vercel](https://vercel.com) and log in with your GitHub account.
3. Click **Add New...** > **Project** and import your repository.
4. **Root Directory**: Select `Kindfund-Frontend` (or leave as root `/` as `vercel.json` will route to it).
5. Click **Deploy**. Your frontend is live!

> **Note on Full-Stack Live Functionality**:
> Vercel hosts the frontend static files. To enable live login, registration, and donations for visitors across the internet, deploy the Spring Boot backend (`kindfund-Backend`) on a cloud platform such as [Render](https://render.com), [Railway](https://railway.app), or [Fly.io], and host the MySQL database on [TiDB Cloud](https://tidbcloud.com) or [Aiven](https://aiven.io). Once deployed, update the backend URL in `Kindfund-Frontend/js/config.js` or set `localStorage.setItem('KINDFUND_API_URL', 'https://your-backend-url.onrender.com')`.
