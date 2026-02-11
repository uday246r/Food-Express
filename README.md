# 🍽️ Food Express

**Food Express** is a full-stack web-based food ordering application developed as part of the **Infosys Springboard Internship Program**.
The application enables customers to browse restaurant menus, place and manage food orders, and provide feedback, while empowering restaurants to efficiently manage menus, orders, and reports through a centralized system.

---

## 📌 Project Overview

### Problem Statement

Traditional food ordering processes lack centralized management, real-time updates, and seamless interaction between customers and restaurants. Manual handling of menus, orders, and feedback leads to inefficiencies, delays, and poor customer experience.

### Objective

To design and develop a **scalable, user-friendly online food ordering platform** that:

* Simplifies food ordering for customers
* Enables restaurants to manage menus and orders efficiently
* Provides structured feedback and reporting mechanisms
* Demonstrates real-world application of **Java Spring Boot & MVC architecture**

---

## 🧩 Modules Implemented

1. User Management
2. Restaurant Menu Management
3. Order Management
4. Feedback Management
5. Reports Management

---

## 🚀 Features

### 👤 User Management

* User registration with automatic unique user ID generation
* Update personal details (address, contact information)
* Deactivate user accounts
* View order history and manage account preferences

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
* Restaurant-side order processing:

  * Accept
  * Prepare
  * Dispatch
* Order cancellation/modification under allowed conditions

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

* Create a MySQL database:

```sql
CREATE DATABASE food_express;
```

* Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/food_express
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

### 3️⃣ Run the Application

```bash
mvn clean install
mvn spring-boot:run
```

* Access the app at:

```
http://localhost:8080
```

---

## 🔐 Environment Configuration

| Property                        | Description        |
| ------------------------------- | ------------------ |
| `spring.datasource.url`         | MySQL database URL |
| `spring.datasource.username`    | Database username  |
| `spring.datasource.password`    | Database password  |
| `spring.jpa.hibernate.ddl-auto` | Auto schema update |
| `server.port`                   | Application port   |

---

## 📡 API Endpoints (Sample)

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| POST   | `/users/register`     | Register new user   |
| PUT    | `/users/update`       | Update user details |
| GET    | `/users/orders`       | View order history  |
| POST   | `/orders/create`      | Place new order     |
| PUT    | `/orders/update/{id}` | Modify order        |
| POST   | `/feedback/add`       | Add feedback        |
| GET    | `/reports/orders`     | View reports        |

---

Here’s a **clean, professional, recruiter-friendly Screenshots section** with proper headings, captions, and consistent formatting.


## 🖼️ Screenshots

### 🏠 Home Page

*Landing page displaying restaurants, navigation, and featured dishes* <img src="https://github.com/user-attachments/assets/e73ae76b-ca18-4d95-9788-2f7dfbcb4533" alt="Food Express Home Page" width="100%"/>

---

### 🍽️ Dish Listing Page

*View available dishes with pricing and details* <img src="https://github.com/user-attachments/assets/460e1f47-8db0-49d4-80af-33fc00724ff9" alt="Dish Listing Page" width="100%"/>

---

### 🏪 Add Restaurant (Admin)

*Admin interface to register and manage restaurants* <img src="https://github.com/user-attachments/assets/1bb2d1ab-b534-42e9-875d-4ecbed84e656" alt="Add Restaurant Page" width="100%"/>

---

### 🛒 Cart Page

*Customer cart showing selected items before checkout* <img src="https://github.com/user-attachments/assets/4b28b807-86da-43b0-ac3f-9de4fcdf541b" alt="Cart Page" width="100%"/>

---

### 📦 Customer Order Section

*Customer order history with status tracking* <img src="https://github.com/user-attachments/assets/164ece33-34da-441d-b11d-258fece7ec32" alt="Customer Orders Section" width="100%"/>

---

### 🧑‍💼 Admin Dashboard

*Centralized admin panel for managing users, orders, and restaurants* <img src="https://github.com/user-attachments/assets/4a104c09-4db8-45b6-b3b7-1247062b7f63" alt="Admin Dashboard" width="100%"/>

---

### 📊 Order Report Analysis

*Graphical and tabular reports for order analytics* <img src="https://github.com/user-attachments/assets/f678fd87-6a0a-4c4d-8c6e-4e3d47821004" alt="Order Report Analysis" width="100%"/>

---

### ➕ Add Items (Admin Panel)

*Admin feature to add and manage menu items* <img src="https://github.com/user-attachments/assets/22cafe56-11e3-4b81-87b5-02f83136f54e" alt="Add Items Admin Page" width="100%"/>

---

### 🤝 Partner Dashboard

*Restaurant partner dashboard to manage orders and menus* <img src="https://github.com/user-attachments/assets/fedd287c-3eab-4a74-b553-916e4427248a" alt="Partner Dashboard" width="100%"/>

---

## 🧪 Project Artifacts (As Per Internship)

✔ Wireframes
✔ Database Design
✔ Use Case Diagram
✔ Class Diagram

---

## 🚀 Future Enhancements

* Online payment gateway integration
* Real-time order status updates
* Role-based access control (Admin/User/Restaurant)
* Mobile-responsive UI improvements
* Analytics dashboard with charts
* Cloud deployment

---

## 📄 License

This project is developed for **educational purposes** under the **Infosys Springboard Internship Program**.
You may reuse or modify it with proper attribution.

---

## 👨‍💻 Team & Acknowledgment

Developed by a team of **4 members** under the guidance of **Infosys Springboard Mentor**.
Special thanks to Infosys Springboard for providing real-world case studies and mentorship.
