# 🏢 Book-Lend Backend

This is the backend service for **Book-Lend**, built with **Node.js** and **Express.js**. It handles authentication, book management, chat functionality, and real-time events using Redis pub/sub.

## 🏗️ Project Structure

```
backend/
│
├── prisma/             # Prisma schema and migrations
├── src/
│   ├── controllers/    # Request handlers (auth, book, chat, etc.)
│   ├── models/         # Prisma models
│   ├── routes/         # Express routes
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   └── config/         # Config files (env, db, etc.)
│
├── .env                # Environment variables
├── Dockerfile          # Docker config
└── server.js           # Entry point
```

## 🚀 Running the Backend

### Development

Ensure Docker is running and PostgreSQL is set up, then start the server:

```bash
cd backend
npm install
npm run build
npm run start
```

API will be live at [http://localhost:5000](http://localhost:5000).

### Environment Variables

Create a `.env` file using the `.env.example` as a reference:

```
DATABASE_URL=postgresql://user:password@localhost:5432/book-lend
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
```

## 📡 API Endpoints

Key routes:

- **Auth**
  - `POST /api/v1/users/signup`
  - `POST /api/v1/users/login`
- **Books**
  - `GET /api/v1/books/all?page=${page}&limit=${limit}`
  - `POST /api/v1/books`
- **Chat**
  - `GET /api/v1/chats?page=${page}&limit=${limit}`
  - `POST /api/v1/chats`

## 📬 Postman API Collection

To test the APIs, import the Postman collection:

1. Open Postman
2. Click **Import**
3. Paste this link: [Book-Lend Postman Collection](https://www.postman.com/research-participant-681279/workspace/book-lend/collection/15916357-8e98c5bd-dfa7-4bcf-9994-ced965de875e)

The collection includes requests for authentication, book management, and chat.

## 🛢️ Database

The backend uses Prisma ORM with PostgreSQL. To run migrations:

```bash
npx prisma migrate dev
```

To view the Prisma Studio (DB GUI):

```bash
npx prisma studio
```

## 🏃 Running with Docker

To run the backend in a Docker container:

```bash
docker build -t book-lend-backend .
docker run -p 5000:5000 book-lend-backend
```

## 📜 License

This project is licensed under the MIT License.
