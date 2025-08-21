# 📝 Text Summarizer Web App

A web-based text summarization tool that uses **Natural Language Processing (NLP)** to generate concise and meaningful summaries from large text inputs. Built with **Python** for the backend logic and **React.js** for the frontend.

---

## 🚀 Features
- **Machine Learning Powered** – Uses NLP algorithms (TextRank) for accurate extractive summarization.
- **Interactive UI** – Built with React.js for a smooth user experience.
- **Progress Indicator** – Shows summarization status in real time.
- **Dark/Light Mode** – Toggle between themes with animations.
- **Toast Notifications** – Instant feedback for success/error messages.
- **Responsive Design** – Works on mobile, tablet, and desktop.

---

## 🛠 Tech Stack
**Frontend**
- React.js
- Tailwind CSS
- React-Toastify

**Backend**
- Python
- Flask / FastAPI (choose based on your implementation)
- NLTK / spaCy
- TextRank Algorithm

---

## 📦 Installation & Setup

# 1. Clone the repository
git clone https://github.com/pratham468/Text-summarizer.git
cd Text-summarizer

# 2. (Optional) Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install backend dependencies
pip install -r requirements.txt

# 4. Install frontend dependencies (if any)
cd text-summarizer-client
npm install

# 5. Run the backend server
cd ..
python app.py  # or: uvicorn app:app --reload (if using FastAPI)

# 6. Run the frontend
cd text-summarizer-client
npm start



📄 License

This project is licensed under the MIT License – you are free to use and modify it.

🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
