# AI Caption Generator ✨

> Full-stack AI SaaS app — upload any image and instantly get creative captions with hashtags and emojis powered by Google Gemini API.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen?style=for-the-badge)](https://ai-caption-generator-omega.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-isimrangupta-black?style=for-the-badge&logo=github)](https://github.com/isimrangupta)

---

## 🔗 Live Demo

**[https://ai-caption-generator-omega.vercel.app](https://ai-caption-generator-omega.vercel.app)**

---

## 📌 About This Project

AI Caption Generator is a full-stack SaaS web application that uses **Google Gemini API** to generate creative, engaging captions with hashtags and emojis for any uploaded image — in under 2 seconds.

Users can register, log in, and access their personal dashboard to generate and manage captions. This project helped me learn full-stack development with Next.js, user authentication, MongoDB database integration, and real-world AI API usage.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| AI API | Google Gemini API |
| Auth | JWT / User Authentication |
| Deployment | Vercel |

---

## ✨ Features

- 🤖 AI-powered caption generation using Google Gemini API
- 🔐 User authentication — Register & Login
- 📊 Personal dashboard for each user
- ⚡ Captions generated in ~2 seconds
- #️⃣ Auto hashtags and emojis included
- 📸 Supports JPG, PNG, WEBP image formats
- 📱 Fully responsive — works on mobile and desktop

---

## 🖥️ How to Run Locally

### Prerequisites
- Node.js installed
- MongoDB connection string (MongoDB Atlas — free tier works)
- Google Gemini API key — [Get it here](https://makersuite.google.com/app/apikey)

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/isimrangupta/ai-caption-generator.git
cd ai-caption-generator
```

**2. Setup Backend**
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```
GEMINI_API_KEY=your_gemini_api_key
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start backend:
```bash
node index.js
```

**3. Setup Frontend**
```bash
cd ../frontend
npm install
npm run dev
```

**4. Open in browser**
```
http://localhost:3000
```

---

## 📁 Project Structure

```
ai-caption-generator/
├── backend/
│   ├── index.js          # Express server
│   ├── routes/           # API routes
│   └── package.json
├── frontend/
│   ├── app/              # Next.js app directory
│   │   ├── page.jsx      # Landing page
│   │   ├── login/        # Login page
│   │   ├── register/     # Register page
│   │   └── dashboard/    # User dashboard
│   └── package.json
└── README.md
```

---

## 📸 Screenshots

> _Add screenshots of your landing page, dashboard, and caption output here_
>
> Tip: Take screenshot → drag into GitHub README editor → it auto-uploads!

---

## 🙋‍♀️ Author

**Diksha Gupta**

- 🌐 Portfolio: [diksha-portfolio-omega.vercel.app](https://diksha-portfolio-omega.vercel.app)
- 💻 GitHub: [@isimrangupta](https://github.com/isimrangupta)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
