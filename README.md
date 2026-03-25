# 🚀 AssetFlow

A full-stack **Asset Management System** built to manage organizational assets, user roles, assignments, and issue tracking.

---

## 🧩 Features

### 👤 Authentication
- JWT-based login & registration
- Role-based access (Admin / Employee)

### 🛠️ Admin Features
- Manage products (CRUD)
- Manage users
- Approve/reject asset requests
- Assign assets to employees
- Track assigned assets
- Monitor reported issues

### 👨‍💼 Employee Features
- Request assets
- View assigned assets
- Report issues

---

## 🏗️ Tech Stack

### Backend
- Java + Spring Boot
- Spring Security (JWT)
- JPA / Hibernate
- PostgreSQL

### Frontend
- React
- Axios
- Tailwind CSS / Custom UI

---

## 📂 Project Structure


ProductSpring/
├── backend (Spring Boot)
├── frontend (React)


---

## ⚙️ Setup Instructions

### 🔧 Backend

```bash
cd backend
./mvnw spring-boot:run
💻 Frontend
cd frontend
npm install
npm start
🔐 Environment Variables

Update your backend application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/your_db
spring.datasource.username=root
spring.datasource.password=your_password
📊 API Overview
/auth/register → Register user
/auth/login → Login
/products → Manage products
/requests → Asset requests
/issues → Issue tracking
/asset-assignments → Assign assets
🧠 Key Concepts Implemented
REST API design
JWT Authentication
Role-based authorization
Full CRUD operations
Dashboard analytics
Real-world admin panel UI
📸 Screenshots (Add Later)

Add UI screenshots here for better portfolio impact

🚀 Future Improvements
File/image upload (Cloudinary)
Notifications system
Audit logs
Pagination & search optimization
👨‍💻 Author

Mahmud Hasan Shanto
