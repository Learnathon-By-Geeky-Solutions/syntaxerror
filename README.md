# iKrishak 🌱

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.1-blue)](https://nextjs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.21.2-brightgreen)](https://expressjs.com/)

A platform bridging farmers and consumers for fresh agricultural products. Built with modern web technologies for scalability and security.

### iKrishak Demo: [https://ikrishak.vercel.app](https://ikrishak.vercel.app) 

### iKrishak Admin Demo: [https://ikrishak-admin.vercel.app/login](https://ikrishak-admin.vercel.app/login) 
## Team: SyntaxError
**Team Members**
- [8ad40n](https://github.com/8ad40n) (Team Leader)
- [nadim45448](https://github.com/nadim45448)
- [codeesh](https://github.com/codeesh)

**Mentor**
- [siam456](https://github.com/Siam456)
## 🛠️ Tech Stack 
### **Frontend**  
- **Framework**: Next.js  
- **Styling**: Tailwind CSS  
- **Component Library**: ShadCN/ui

---
### **Backend**  
- **Framework**: Express.js  
- **Database**: MongoDB (Atlas)  
- **ORM**: Mongoose  

---
### **Services**  
- Authentication: JWT, Google OAuth
- Payments: Stripe API
- Email: Nodemailer

## 🚀 Project Setup

To run the iKrishak project locally, follow these steps for each part of the application: the backend (`/server`), the admin dashboard (`/admin-dashboard`), and the client frontend (`/client`).

---

### ✅ 1. Clone the Repository

```bash
git clone https://github.com/Learnathon-By-Geeky-Solutions/syntaxerror.git
```
```bash
cd syntaxerror
```
---
### ✅ 2. Backend Setup (/server)
The backend is built using Express.js and connected to MongoDB.
```bash
cd server
```
```bash
npm install
```
#### 📄 Environment Variables
Create a .env file in the /server directory with the following variables:
```bash
PORT=
DB_URI=
BYCRYPT_SALT=
JWT_SECRET=
EMAIL_ID=
EMAIL_PASSWORD=
EMAIL_HOST=
EMAIL_PORT=
EMAIL_SECURE=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
FRONTEND_URL=
BACKEND_URL=
```
#### ▶️ Start the Server
```bash
npm run start:dev
```
---
### ✅ 3. Client Frontend Setup (/client)
This is the consumer-facing frontend, built with Next.js, TailwindCSS, and ShadCN UI.
```bash
cd client
```
```bash
npm install
```
#### 📄 Environment Variables
Create a .env file in the /client directory with the following variables:
```bash
NEXT_PUBLIC_BASE_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_PASSWORD=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
```
#### ▶️ Start the Server
```bash
npm run dev
```
---
### ✅ 4. Admin Dashboard Setup (/admin-dashboard)
The admin panel is built using Next.js, TailwindCSS, and ShadCN UI.
```bash
cd admin-dashboard
```
```bash
npm install
```
#### 📄 Environment Variables
Create a .env file in the /admin-dashboard directory with the following variables:
```bash
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
```
#### ▶️ Start the Server
```bash
npm run dev
```
---
## 👤 User Flow
![alt text](/resources/image.png)

## 🧑‍💼 Admin Dashboard
#### ✅ Admin Login
JWT-based authentication has been implemented, allowing only users with the 'admin' role to log in.
![alt text](/resources/image-2.png)


#### ✅ Admin Dashboard
The admin dashboard provides a comprehensive summary including total revenue, total orders, total active users, and stock status. It also features visual representations such as sales overview charts, category-wise performance analytics, and recent activity insights.
![alt text](/resources/image-3.png)
![alt text](/resources/image-5.png)


#### ✅ Products Management
The admin has the ability to manage products by viewing all available items. They can edit, add, and delete products, as well as filter by categories. Additionally, a real-time search functionality is provided for quick product lookup. Pagination is implemented to efficiently handle product listings when the total exceeds 10 items.
![alt text](/resources/image-7.png)
![alt text](/resources/image-8.png)
![alt text](/resources/image-9.png)


#### ✅ Users Management
The admin has the ability to manage users by viewing all available users. They can edit, add, and delete users, as well as filter by roles. Additionally, a real-time search functionality is provided for quick user lookup. Pagination is implemented to efficiently handle user listings when the total exceeds 10 items.
![alt text](/resources/image-10.png)



#### ✅ Categories Management
The admin has the ability to manage categories by viewing all available items. They can edit, add, and delete categories, as well as filter by categories. Additionally, a real-time search functionality is provided for quick category lookup. Pagination is implemented to efficiently handle category listings when the total exceeds 10 items.
![alt text](/resources/image-11.png)



#### ✅ Orders Management
The admin can view all orders and filter them based on their status. A real-time search feature is available to quickly locate orders by their order ID. The admin can also access detailed order information and mark orders as "Completed." Pagination is implemented to efficiently manage large order lists.
![alt text](/resources/image-12.png)



## 🌐 Deployment Plan
- **Frontend**: Vercel
- **Admin Dashboard**: Vercel
- **Backend API**: Vercel
- **Database**: MongoDB Atlas


## 📖 Resources
- [Project Documentation](https://docs.google.com/document/d/1JJoQEqUjDCGsn5zY_JTCineFpa0qVziD6ytiXhV6rdo/edit?usp=sharing)

