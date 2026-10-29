# EdTech CRM & Inquiry System

A full-stack CRM inquiry system where anyone can submit a public inquiry form with category and user-type options, and authenticated admins can view, search, filter, and manage all inquiries.

Built for the Full-Stack Assessment Task.

---

## Tech Stack & Architecture

- **Frontend:** React 19 + Vite + Tailwind CSS + Lucide Icons + Axios + React Router
- **Backend:** Java 21 + Spring Boot 3.3.5 + Maven
- **Database:** Supabase PostgreSQL (via standard JDBC connection string)
- **Authentication:** Custom JWT-based authentication from scratch in the backend (BCrypt password hashing, JJWT generation, and Spring Security filter middleware). *Supabase Auth is intentionally not used.*

---

## Directory Structure

```text
edtech-crm/
├── backend/                         # Spring Boot Application
│   ├── src/
│   │   ├── main/java/com/edtech/crm/
│   │   │   ├── controller/          # REST Endpoints (Auth, Inquiries)
│   │   │   ├── service/             # Business Logic
│   │   │   ├── repository/          # JPA Repositories & Criteria Specifications
│   │   │   ├── entity/              # JPA Entities (Admin, Inquiry, Enums)
│   │   │   ├── dto/                 # Request & Response Data Transfer Objects
│   │   │   ├── security/            # JWT Utility, Auth Filter, SecurityConfig
│   │   │   └── exception/           # Centralized Global Exception Handler
│   │   └── main/resources/
│   │       └── application.properties
│   ├── pom.xml
│   └── schema.sql
├── frontend/                        # React + Vite Application
│   ├── src/
│   │   ├── components/              # Navbar, ProtectedRoute
│   │   ├── context/                 # AuthContext (JWT management)
│   │   ├── pages/                   # InquiryForm, Login, Dashboard
│   │   └── services/                # Axios API client
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── schema.sql                       # Database Table Creation Script
├── .env.example                     # Environment Variables Template
└── README.md
```

---

## Core Features Implemented

### 1. Public Inquiry Form
- Clean, responsive UI accessible at `/`.
- Fields:
  - **User Type (Dropdown):** `Parent` / `Student` / `School`
  - **Category (Dropdown):** `Scholarship` / `Concert` / `Admission` / `General Query`
  - **Personal Details:** `Name`, `Email`, `Phone Number`
  - **Message / Query:** Text area
- Submitting the form writes directly into Supabase PostgreSQL.

### 2. Admin Authentication & Dashboard
- **Custom JWT Authentication:** Admin login at `/login` (`POST /api/auth/login`).
- Passwords securely hashed with BCrypt.
- Protected route middleware: `/dashboard` is inaccessible without a valid Bearer JWT.
- **Tabular View:** Shows all inquiries with Name, Email, Phone, User Type, Category, Date, and Status.
- **Status Management:** Admin can update status (`NEW`, `CONTACTED`, `IN_PROGRESS`, `RESOLVED`) directly from the table.
- **Metric Cards:** Real-time summary of Total, New, In Progress, and Resolved inquiries.

### 3. Mandatory Filters & Search
- **Filter by Category:** Filter by Scholarship, Concert, Admission, or General Query.
- **Filter by User Type:** Filter by Parent, Student, or School.
- **Search Bar:** Real-time search by Name or Phone number.

---

## Database Setup (Supabase)

1. Open your **Supabase Dashboard** and navigate to the **SQL Editor**.
2. Run the queries from `schema.sql`:
   ```sql
   -- Creates admins and inquiries tables with indexes
   ```
3. Copy your project connection string from **Project Settings > Database > Connection String (JDBC or URI)**.

---

## Environment Setup

Copy `.env.example` to configure your environment variables:

```bash
# Supabase PostgreSQL Database Configuration
SPRING_DATASOURCE_URL=jdbc:postgresql://db.your-project.supabase.co:5432/postgres?sslmode=require
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
JWT_EXPIRATION_MS=86400000
```

---

## Running Locally

### 1. Start the Backend (Spring Boot)
```bash
cd backend
mvn clean package -DskipTests
mvn spring-boot:run
```
The backend starts on `http://localhost:8080`.

### 2. Start the Frontend (Vite + React)
```bash
cd frontend
npm install
npm run dev
```
The frontend starts on `http://localhost:5173`.

---

## Default Admin Credentials

A default admin account is pre-registered in the system:
- **Email:** `premsonbs@gmail.com`
- **Password:** `Prem@1234`

---

## API Testing Guide

### Submit Public Inquiry
```bash
curl -X POST http://localhost:8080/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Aman Sharma",
    "email": "aman@example.com",
    "phone": "+919876543210",
    "userType": "STUDENT",
    "category": "SCHOLARSHIP",
    "message": "Inquiry regarding eligibility for scholarship."
  }'
```

### Admin Login (Returns JWT)
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@edtech.com",
    "password": "AdminSecret123!"
  }'
```

### Fetch Inquiries with Filters & Search (Protected)
```bash
curl -X GET "http://localhost:8080/api/inquiries?category=SCHOLARSHIP&userType=STUDENT&search=Aman" \
  -H "Authorization: Bearer <TOKEN>"
```

### Update Inquiry Status (Protected)
```bash
curl -X PATCH http://localhost:8080/api/inquiries/1/status \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"status": "CONTACTED"}'
```
