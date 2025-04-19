# 💸 SpendWise

**SpendWise** is a simple transaction management API built with **Node.js**, **Express**, and **MySQL**. It allows you to track your **income**, **expenses**, and organize them using **tags**. Ideal for building a budget tracking app or learning how to work with MySQL in a backend project.

---

## ✨ Features

- 📊 Track income and expenses
- 🏷️ Add and assign tags to transactions
- 🌐 RESTful API using Express
- 🗄️ MySQL database with relationships
- ⚙️ Environment variable configuration

---

## 📦 Tech Stack

- Node.js
- Express.js
- MySQL (using `mysql2`)
- dotenv
- body-parser
- CORS

---

## 🛠️ Getting Started

### 1. Clone the Project

To get started, clone the project repository and navigate to the project directory:

```bash
git clone https://github.com/your-username/spendwise.git
cd spendwise
```

### 2. Install Dependencies

Next, install the required dependencies by running the following command in the project directory:

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=spendwise
```

### 4. Setup the Database

Ensure that your MySQL server is running.

Then, run the SQL setup script to create the database and tables. The script is located in the `sql` folder:

```bash
mysql -u root -p < sql/setup.sql
```

This script will:

- Create the `spendwise` database
- Create the following tables: `transactions`, `tags`, and `transaction_tags`

---

## ▶️ Running the Server

To start the server, run:

```bash
npm start
```

Or, if you're using **nodemon** for auto-reloading during development:

```bash
npm run dev
```

By default, the server will run at:  
👉 **http://localhost:5000**
