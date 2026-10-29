# EdTech CRM & Inquiry System - Backend

A clean and robust backend for an EdTech CRM & Inquiry System built for the full-stack assessment using **Java 21**, **Spring Boot 3**, and **Supabase PostgreSQL**.

---

## Architecture & Features

- **Layered Architecture:** Controller → Service → Repository → Entity / DTO
- **Database:** Supabase PostgreSQL
- **Security & Authentication:** Custom JWT-based authentication from scratch using BCrypt password hashing and custom Spring Security filter middleware (Supabase Auth is intentionally not used as per assessment instructions).
- **Public Inquiry Endpoint:** Form submission open to the public without authentication.
- **Admin Dashboard APIs:** Protected by custom JWT token. Includes dynamic filtering by `Category` and `User Type`, and search by `Name` or `Phone number`.

---

## Tech Stack

- **Language:** Java 21
- **Framework:** Spring Boot 3.3.5
- **Build Tool:** Maven
- **Database:** PostgreSQL (Supabase)
- **Security:** Spring Security + JJWT 0.12.6 + BCrypt

---

## Database Setup (Supabase)

1. Open your **Supabase Dashboard** and go to **SQL Editor**.
2. Run the queries from `schema.sql`:
   - It will create the `admins` and `inquiries` tables along with performance indexes.
3. Obtain your PostgreSQL connection parameters from **Project Settings > Database**:
   - Connection URL: `jdbc:postgresql://<db.xxx.supabase.co>:5432/postgres?sslmode=require`
   - User: `postgres`
   - Password: `[YOUR_PASSWORD]`

---

## Environment Variables

Copy `.env.example` or export the following environment variables:

| Variable | Description | Example |
|---|---|---|
| `SPRING_DATASOURCE_URL` | Supabase JDBC URL | `jdbc:postgresql://db.xxx.supabase.co:5432/postgres?sslmode=require` |
| `SPRING_DATASOURCE_USERNAME` | Supabase DB User | `postgres` |
| `SPRING_DATASOURCE_PASSWORD` | Supabase DB Password | `your_secret_password` |
| `JWT_SECRET` | 256-bit Base64 Secret | `404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970` |
| `JWT_EXPIRATION_MS` | Token Expiry in ms | `86400000` (24 Hours) |

---

## How to Run Locally

### 1. Build the project
```bash
mvn clean package -DskipTests
```

### 2. Run the application
```bash
mvn spring-boot:run
```
The server will start on port `8080` (`http://localhost:8080`).

---

## API Documentation & Testing Guide

### 1. Submit Public Inquiry (Public - No Token Required)
**Endpoint:** `POST /api/inquiries`  
**Request Body:**
```json
{
  "name": "Aman Sharma",
  "email": "aman@example.com",
  "phone": "+919876543210",
  "userType": "STUDENT",
  "category": "SCHOLARSHIP",
  "message": "I would like to know about scholarship criteria."
}
```

---

### 2. Admin Registration (Public)
**Endpoint:** `POST /api/auth/register`  
**Request Body:**
```json
{
  "name": "Admin User",
  "email": "admin@edtech.com",
  "password": "AdminPassword123"
}
```

---

### 3. Admin Login (Public)
**Endpoint:** `POST /api/auth/login`  
**Request Body:**
```json
{
  "email": "premsonbs@gmail.com",
  "password": "Prem@1234"
}
```
**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "email": "premsonbs@gmail.com",
  "name": "Prem",
  "role": "ADMIN"
}
```

---

### 4. Admin Dashboard - Get Inquiries with Filters & Search (Protected)
**Endpoint:** `GET /api/inquiries`  
**Header:** `Authorization: Bearer <token>`  
**Query Parameters (Optional):**
- `category`: `SCHOLARSHIP` | `CONCERT` | `ADMISSION` | `GENERAL_QUERY`
- `userType`: `PARENT` | `STUDENT` | `SCHOOL`
- `search`: Search string matching `name` or `phone`

---

### 5. Get Single Inquiry by ID (Protected)
**Endpoint:** `GET /api/inquiries/{id}`  
**Header:** `Authorization: Bearer <token>`

---

### 6. Update Inquiry Status (Protected)
**Endpoint:** `PATCH /api/inquiries/{id}/status`  
**Header:** `Authorization: Bearer <token>`  
**Request Body:**
```json
{
  "status": "CONTACTED"
}
```
*(Available statuses: `NEW`, `CONTACTED`, `IN_PROGRESS`, `RESOLVED`)*
