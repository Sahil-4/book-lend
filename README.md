# 📚 Book-Lend

**Book-Lend** is a full-stack web application that allows users to lend, borrow, and manage books while facilitating real-time chat and notifications. The project is structured as a monorepo containing both frontend (Next.js) and backend (Node.js/Express) services.

## 🚀 Monorepo Structure

```
book-lend/
│   README.md (Root)
│   docker-compose.yml
│
├── backend/ (Node.js/Express, Prisma, PostgreSQL, Redis)
│   └── README.md
│
└── frontend/ (Next.js, Redux Toolkit, Tailwind CSS)
    └── README.md
```

## 🛠️ Tech Stack

**Frontend:**

- Next.js
- Redux Toolkit

**Backend:**

- Node.js with Express.js
- Prisma ORM
- PostgreSQL
- Redis
- Docker

**Others:**

- Postman (API testing)
- Docker Compose (for container orchestration)

## 🔥 Quick Start

Ensure you have Docker installed, then run the following command to spin up both frontend and backend:

```bash
docker-compose up --build
```

Access the services:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)

## 📁 Directory Overview

```
book-lend/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── prisma/
│   │
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── lib/
│   │
│   └── Dockerfile
│
└── docker-compose.yml
```
