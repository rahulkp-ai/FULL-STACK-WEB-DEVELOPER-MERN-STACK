# Project Setup & Execution Guide

This guide covers two ways to run the project: using **Docker Compose** or running **locally on macOS** with Node.js and MongoDB Community Server.

---

## Method 1: Running with Docker Compose

If you have Docker installed, you can build and start the entire stack (Node.js app + MongoDB container) with a single command:

```bash
docker-compose up --build
```

---

## Method 2: Running Locally (Without Docker)

### 1. Prerequisites Check

Before starting, ensure **Node.js** and **MongoDB** are installed on your machine. Run the following commands in your terminal:

```bash
node -v          # Should print v18 or higher
mongod --version # Checks if MongoDB server is installed

```

If MongoDB is not installed on your Mac, install it via Homebrew:

```bash
brew tap mongodb/brew
brew install mongodb-community@7.0

```

---

### 2. Step-by-Step Local Execution

#### Step 1: Start the MongoDB Service

Start the background MongoDB daemon on your Mac via Homebrew:

```bash
brew services start mongodb-community@7.0

```

To verify that MongoDB is running on its default port (`27017`):

```bash
mongosh

```

_(Type `exit` to exit the MongoDB shell)._

---

#### Step 2: Navigate to the Project Directory

From your root folder (`FULL-STACK-WEB-DEVELOPER-MERN-STACK`), move into the project directory:

```bash
cd MongoDB/university-mongodb-project

```

---

#### Step 3: Install Node.js Dependencies

Install the required packages defined in `package.json` (creates `node_modules`):

```bash
npm install

```

---

#### Step 4: Run the Application

Execute the application script. By default, `index.js` falls back to `mongodb://localhost:27017` if `MONGO_URI` is not explicitly set:

```bash
npm start

```

---
