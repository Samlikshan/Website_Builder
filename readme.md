# AI Website Builder

An AI-powered website builder that allows users to visually build web pages using a drag-and-drop editor powered by [GrapesJS](https://grapesjs.com/), and generate content using LLMs like OpenAI and Groq. It supports multi-provider switching, project saving, and full website code export.

## ✨ Features

- ⚙️ Full-stack MERN-based architecture
- 🎨 Drag & drop editor with [GrapesJS](https://grapesjs.com/)
- 🤖 AI content generation using LLMs (Groq's LLaMA 3.3 or OpenAI's GPT-4.1)
- 🔁 Choose AI provider (OpenAI or Groq) dynamically from the frontend UI

---

## 🧱 Tech Stack

| Layer       | Technology              |
| ----------- | ----------------------- |
| Frontend    | React, GrapesJS, Redux  |
| Backend     | Node.js, Express        |
| AI Provider | OpenAI GPT / Groq LLaMA |
| Hosting     | Vercel (Frontend)       |
| Server      | AWS EC2 (Backend)       |

---

## 📁 Project Structure

```bash
ai-website-builder/
├── server/        # Node.js + Express API
│   └── ...
├── client/       # React + GrapesJS UI
│   └── ...
└── README.md
```

## 🛠️ Tech Stack

- **Frontend:** React, GrapesJS, TailwindCSS
- **Backend:** Node.js, Express
- **AI Integration:** OpenAI (GPT-4.1), Groq (LLaMA 3.3)
- **Database (Future):** MongoDB (for project persistence)

## 🔄 Switching Between AI Providers

You can now select your preferred AI provider (OpenAI or Groq) directly from the frontend UI.  

## 🔐 Backend Environment Setup

Create a `.env` file in your `backend/` directory:

```env
PORT=3000
CORS_WHITELIST=http://localhost:5173
NODE_ENV=production

# GROQ Config
GROQ_API_KEY=your_groq_api_key
GROQ_API_URL=https://api.groq.com/openai/v1
LLM_MODEL=llama-3.3-70b-versatile

# OPENAI Config
OPENAI_API_KEY=your_openai_api_key
OPENAI_API_URL=https://api.openai.com/v1
OPENAI_LLM_MODEL=openai/gpt-4.1
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Samlikshan/Website_Builder.git
cd Website_Builder
```

### 2. Install Backend

```bash
cd server
npm install
npm run dev
```

### 3. Install Frontend

```bash
cd client
npm install
npm run dev
```

## ⚙️ Usage

- Use the AI sidebar to generate content using OpenAI or Groq.
- After generating initial content with AI, you can edit and refine the layout using the GrapesJS builder interface.
- Drag and drop components from the GrapesJS editor.

## 🔜 Upcoming Features

- 🔒 User authentication and project saving
- 💾 Backend project persistence with MongoDB
- 📦 Export as ZIP/HTML
- 🧱 Component templates and reusable sections
- 💾 Save and reload editor data
- 🚀 Export generated websites as downloadable HTML ZIP (in progress)
- 🧩 Prebuilt templates/components (in progress)

## 🧠 AI Switching Logic

The AI provider is now chosen through the frontend, passed with the prompt, and handled dynamically in the backend.  
This setup allows easy expansion to more providers like Claude or Gemini in the future.

## 📄 License

MIT License
