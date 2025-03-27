# School Management System

This is a Next.js-based School Management System with authentication, role-based access control, and seamless navigation across admin and school-specific routes.

## Usage Test Credentials

```bash
credentials.email === "admin@school.com" && credentials.password === "adminpassword"
```

## 🚀 Features Implemented

✅ **Home Page at `/`** - Accessible directly at `localhost:3000` without requiring `www.`.  
✅ **Admin Dashboard** - Accessible via `/admin/dashboard` after successful login.  
✅ **Authentication Flow** - Unauthenticated users attempting to access admin routes are redirected to `/login`.  
✅ **Seamless Navigation** - Smooth transition between `/admin/schools` and `/admin/schools/create`.  
✅ **Dynamic Subdomain Routing** - Each school has its own subdomain, e.g., `school1.localhost:3000`.  
✅ **Middleware for Enhanced Routing Logic** - Ensures proper redirection for various edge cases.

---

## 🛠️ Setup and Running Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-link>
cd scoolmain
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the project root and configure the following:
domain name should be like xyz.com | abc.in | qwerty.tech

```
DATABASE_URL=<your-database-url>
NEXTAUTH_SECRET=<your-auth-secret>
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_DOMAIN_NAME=localhost:3000
```

### 4. Run Database Migrations

```bash
npm run prisma:gen
npm run prisma:mig
npm run prisma:seed  # Optional for sample data
```

### 5. Start Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### 6. Testing

To run tests using Vitest:

```bash
npm run test
```

---

## 📋 Assumptions and Limitations

- **Authentication Assumption:** Authentication logic assumes `next-auth` with session-based validation. Ensure session persistence is properly configured.
- **Admin Panel Navigation:** Navigating to `/admin/dashboard` directly follows the authentication flow, preventing unauthenticated access.
- **School Subdomain Logic:** Each school should have a unique subdomain for proper routing (e.g., `school1.localhost`).
- **Local Development:** Subdomain routing may require additional configuration when testing on `localhost`.

---

## 📂 Folder Structure Overview

```
/app
  └── admin
      ├── dashboard
      ├── schools
      │   ├── page.tsx
      │   └── create
      │       └── page.tsx
      └── layout.tsx
/components
  ├── admin
  │   └── sidebar.tsx
  └── ui
      ├── button.tsx
      ├── card.tsx
      ├── input.tsx
      └── label.tsx
/lib
  ├── auth.ts
  └── prisma.ts
/src
  ├── middleware.ts
  └── pages
      ├── _app.tsx
      ├── index.tsx
      └── login.tsx
```

---

## 🤝 Contribution Guidelines

1. Fork the repository.
2. Create a new branch with a meaningful name.
3. Commit changes with clear messages.
4. Submit a pull request with a detailed description of your changes.

For questions or issues, please raise an issue on GitHub. 🚀
