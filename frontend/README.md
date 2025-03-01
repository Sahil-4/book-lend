# 🌟 Book-Lend Frontend

This is the frontend for **Book-Lend**, built with **Next.js**. It handles user interaction, book browsing, chat functionality, and profile management.

## 🏗️ Project Structure

```
frontend/
│
├── public/            # Static assets (images, icons, etc.)
│
├── src/
│   ├── api/           # Axios requests (auth, book, chat, etc.)
│   ├── app/           # Page routing and layout
│   ├── components/    # Reusable components (common, layout, etc.)
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Redux store and slices
│   ├── styles/        # Global and component-specific styles
│   └── utils/         # Utility functions
│
├── .env               # Environment variables
├── Dockerfile         # Docker config
└── next.config.ts     # Next.js configuration
```

## 🚀 Running the Frontend

### Development

Ensure you have the backend running, then start the Next.js server:

```bash
cd frontend
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env` file using the `.env.example` as a reference:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🌐 API Integration

The frontend communicates with the backend using Axios. API calls are organized in the `src/api/` folder:

- `auth.ts`: Login, register, etc.
- `book.ts`: Add, browse, edit books
- `chat.ts`: Fetch chats and send messages
- `user.ts`: Fetch/update user profiles

## 📦 State Management

Redux Toolkit is used for global state management. The slices are in `src/lib/features/`:

- `authSlice.ts`: Authentication state
- `booksSlice.ts`: Book-related state
- `chatsSlice.ts`: Chat state

## 🛠️ Building for Production

To build the project for production:

```bash
npm run build
```
