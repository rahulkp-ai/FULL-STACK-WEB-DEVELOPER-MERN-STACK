## Spin it up with one command:

```bash
docker compose up --build

```

- **Access your app:** Open `http://localhost:5000`
- **Stop containers:** Press `Ctrl + C` or run `docker compose down`

---

### Local Node.js & MongoDB

If you prefer running everything natively on your machine:

#### Prerequisites

- Node.js installed (`node -v`)
- MongoDB installed locally and running service, or a MongoDB Atlas URI.

#### 1. Update your `.env` file for local connections

Make sure your `.env` points to your local MongoDB service:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_task_db

```

#### 2. Start your local MongoDB service

- **macOS (Homebrew):**

```bash
brew services start mongodb-community

```

- **Linux (systemd):**

```bash
sudo systemctl start mongod

```

#### 3. Install dependencies and start the server

Run these commands inside your project root directory:

```bash
npm install
npm start

```

- **Access your app:** Open `
