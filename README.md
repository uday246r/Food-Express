# 🍽️ Food Express

**Food Express** is a full-stack web-based food ordering application developed as part of the **Infosys Springboard Internship Program**.
The application enables customers to browse restaurant menus, place and manage food orders (with online payments), verify actions using **Email OTP**, and provide feedback—while empowering restaurants and administrators to efficiently manage menus, orders, and reports through a centralized system.

---

## 📌 Project Overview

### Problem Statement

Traditional food ordering processes lack centralized management, real-time updates, secure online payments, and reliable user verification mechanisms. Manual handling of menus, orders, and feedback leads to inefficiencies, delays, and poor customer experience.

### Objective

To design and develop a **scalable, user-friendly online food ordering platform** that:

* Simplifies food ordering for customers
* Enables restaurants to manage menus and orders efficiently
* Supports secure online payments
* Ensures user verification using **Email-based OTP authentication**
* Provides structured feedback and reporting mechanisms
* Demonstrates real-world application of **Java Spring Boot & MVC architecture**

---

## 🧩 Modules Implemented

1. User Management
2. Restaurant Menu Management
3. Order Management
4. Online Payment Management
5. Email OTP Verification
6. Feedback Management
7. Reports Management

---

## 🚀 Features

### 👤 User Management & Authentication

* User registration with automatic unique user ID generation
* **Email OTP verification for secure actions (registration / validation)**
* Update personal details (address, contact information)
* Deactivate user accounts
* View order history and manage account preferences
* **Role-based access control (User / Restaurant / Admin)**

---

### 🍽️ Restaurant Menu Management

* Add, update, and delete menu items
* Real-time menu updates (price, availability, stock)
* View complete menu with item details
* Remove discontinued or out-of-stock items

---

### 📦 Order Management

* Browse restaurant menus and place orders
* Modify orders before confirmation
* Generate unique order ID for every order
* **Real-time order status updates** (Placed → Accepted → Prepared → Dispatched)
* Restaurant-side order processing:

  * Accept
  * Prepare
  * Dispatch
* Order cancellation/modification under allowed conditions

---

### 💳 Online Payment Integration

* **Razorpay payment gateway integrated (Test Mode)**
* Secure online checkout for orders
* Payment verification before order confirmation
* Ready for production switch with live Razorpay keys

---

### ⭐ Feedback Management

* Customers can provide ratings and written reviews
* Edit submitted feedback
* Restaurants can respond to customer feedback
* Display average restaurant ratings for better decision-making

---

### 📊 Reports Management

* View complete menu list with prices and availability
* Generate:

  * Daily reports
  * Weekly reports
  * Monthly reports
* Reports include:

  * Total orders
  * Order status (completed, pending, canceled)
  * Total order value
* Customer activity analysis
* Popular dishes and customer preference insights

---

## 🛠️ Technology Stack

### Backend

* **Java**
* **Spring Boot**
* **Spring Boot REST Services**
* **Spring Data JPA**
* **MySQL**
* **Maven**

### Frontend

* **Thymeleaf**
* HTML5
* CSS3
* Bootstrap

### Payment Gateway

* **Razorpay (Test Mode Integration)**

### Email Service

* **SMTP Email Service for OTP delivery**

### Tools & Practices

* IntelliJ IDEA / Eclipse
* MySQL Workbench
* Git & GitHub
* MVC Architecture
* RESTful APIs

---

## 🏗️ System Architecture (High-Level)

```
Client (Browser)
     |
     v
Thymeleaf Templates
     |
Spring MVC Controllers
     |
Service Layer
     |
Spring Data JPA
     |
MySQL Database
     |
Razorpay Payment Gateway (Test Mode)
     |
SMTP Email Service (OTP)
```

---

## 📁 Project Folder Structure

```
Food-Express/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com.foodexpress
│   │   │       ├── controller
│   │   │       ├── service
│   │   │       ├── repository
│   │   │       ├── model
│   │   │       └── FoodExpressApplication.java
│   │   └── resources/
│   │       ├── templates/        # Thymeleaf HTML files
│   │       ├── static/           # CSS, JS, Images
│   │       └── application.properties
│   └── test/
├── pom.xml
├── README.md
└── .gitignore
```

---

## ⚙️ Setup & Installation (Local)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/uday246r/Food-Express.git
cd Food-Express
```

---

### 2️⃣ Database Setup

```sql
CREATE DATABASE food_express;
```

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/food_express
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

### 3️⃣ Razorpay Test Mode Configuration

```properties
razorpay.key.id=your_test_key_id
razorpay.key.secret=your_test_key_secret
```

---

### 4️⃣ Email OTP Configuration (SMTP)

```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

> ⚠️ Use **App Passwords** for Gmail. Never commit real credentials.

---

### 5️⃣ Run the Application

```bash
mvn clean install
mvn spring-boot:run
```

Access:

```
http://localhost:8080
```

---

## 🔐 Environment Configuration

| Property                     | Description          |
| ---------------------------- | -------------------- |
| `spring.datasource.url`      | MySQL database URL   |
| `spring.datasource.username` | Database username    |
| `spring.datasource.password` | Database password    |
| `razorpay.key.id`            | Razorpay test key    |
| `razorpay.key.secret`        | Razorpay test secret |
| `spring.mail.username`       | Email sender         |
| `spring.mail.password`       | Email app password   |
| `server.port`                | Application port     |

---

## 📡 API Endpoints (Sample)

| Method | Endpoint              | Description                |
| ------ | --------------------- | -------------------------- |
| POST   | `/users/register`     | Register user              |
| POST   | `/users/send-otp`     | Send email OTP             |
| POST   | `/users/verify-otp`   | Verify email OTP           |
| POST   | `/orders/create`      | Create order               |
| POST   | `/payment/create`     | Initiate Razorpay payment  |
| POST   | `/payment/verify`     | Verify payment             |
| GET    | `/orders/status/{id}` | Get real-time order status |
| GET    | `/reports/orders`     | View reports               |

---

## 🧪 Project Artifacts (As Per Internship)

✔ Wireframes
✔ Database Design
✔ Use Case Diagram
✔ Class Diagram

---

## 🚀 Future Enhancements

* Mobile-responsive UI improvements
* Advanced analytics dashboard with charts
* Cloud deployment (AWS / Azure)
* Push notifications (SMS / WhatsApp)

---

## 📄 License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this software with proper attribution.

---

## 👨‍💻 Team & Acknowledgment

This project was developed by a team of **four members** under the mentorship of **Mr. Anil Buppuri**, Infosys Springboard Mentor.
Special thanks to Infosys Springboard for providing real-world case studies and mentorship.

---
