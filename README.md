# 🎬 CineScope - Pure Movie Discovery Platform

<div align="center">
  <img src="./public/images/cinescope-banner.png" alt="CineStack Banner" style="max-width: 100%;">
  
  [![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://reactjs.org/)
  [![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux)](https://redux-toolkit.js.org/)
  [![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap)](https://getbootstrap.com/)
  [![TMDB](https://img.shields.io/badge/API-TMDB-01B4E4?logo=themoviedatabase)](https://www.themoviedatabase.org/)
  [![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?logo=netlify)](https://www.netlify.com/)
  [![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel)](https://vercel.com/)
</div>

  

---

## 🌟 Live Demo

https://cinescope-pro.netlify.app/

https://cinescope-pro.vercel.app/
> ⚠️ **Note:** TMDB API may be restricted in some regions (India - Jio/Airtel/Vi). Use VPN if needed.

---
## 📸 Screenshots

<div align="center">
  
### 🏠 Home Page
| Light Mode | Dark Mode |
|:-:|:-:|
| ![Light Mode](./public/images/home-light.png) | ![Dark Mode](./public/images/home-dark.png) |

### 🎬 Movie Pages
| Popular Movies | Upcoming Movies | Top Rated Movies |
|:-:|:-:|:-:|
| ![Popular](./public/images/popular-movies.png) | ![Upcoming](./public/images/upcoming-movies.png) | ![Top Rated](./public/images/toprated-movies.png) |

### 🔍 Search & Movie Details
| Search Results | Movie Details | Cast Info |
|:-:|:-:|:-:|
| ![Search](./public/images/search-results.png) | ![Details](./public/images/movie-details.png) | ![Cast](./public/images/cast-section.png) |

### ⚠️ Error Handling (VPN Required)
| Troubleshooting Message |
|:-:|
| ![Error Message](./public/images/error-message.png) |

</div>

---

## ✨ Features

* 🎨 Light/Dark Mode (with localStorage persistence)
* 🔍 Movie Search (real-time)
* 📊 Categories: Popular, Upcoming, Top Rated
* 🎭 Full Cast Information with images
* 📱 Fully Responsive Design
* ⚡ Fast API handling with loaders
* 🌐 Error handling with helpful messages

---

## 🛠️ Tech Stack

| Technology       | Purpose            |
| ---------------- | ------------------ |
| React 18         | Frontend Framework |
| Redux Toolkit    | State Management   |
| React Router DOM | Routing            |
| Axios            | API Calls          |
| Bootstrap 5      | UI & Layout        |
| React Icons      | Icons              |
| CSS Variables    | Theme Management   |

---

## 🚀 Getting Started

### 📌 Prerequisites

* Node.js (v14 or higher)
* npm or yarn
* TMDB API Key (Free)

---

### 📥 Installation

```bash
# Clone repository
git clone https://github.com/yourusername/cinestack.git

# Move into project
cd cinestack

# Install dependencies
npm install
```

---

### 🔐 Environment Setup

Create a `.env` file in root:

```env
REACT_APP_TMDB_API_KEY=your_api_key_here
```

---

### ▶️ Run Project

```bash
npm start
```

---

### 📦 Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
cinescope/
├── public/
│   ├── index.html
│   └── favicon.png
├── src/
│   ├── components/
│   │   ├── App.js
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── Home.js
│   │   ├── Movie.js
│   │   ├── Image.js
│   │   ├── SingleMovie.js
│   │   ├── SearchMovie.js
│   │   ├── Popular.js
│   │   ├── Upcoming.js
│   │   ├── Toprated.js
│   │   ├── ApiError.js
│   │   └── ErrorBoundary.js
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── redux/
│   │   ├── mystore.js
│   │   └── slices/
│   ├── utils/
│   │   └── apiHelper.js
│   ├── css/
│   │   └── style.css
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

---

## 🎯 Feature Details

### 🎨 Theme Toggle

* Light/Dark mode switching
* Stored in localStorage
* Smooth transitions

---

### 🔍 Search System

* Real-time search
* Handles empty / failed results
* VPN hint for restricted regions

---

### 🎭 Movie Details

* Poster, rating, runtime
* Genres and overview
* Full cast with profile images

---

### 📱 Responsive UI

* Mobile-first layout
* Adaptive grid system
* Clean and modern design

---

## 🌍 Deployment

### 🚀 Netlify

https://cinescope-pro.netlify.app/

### ⚡ Vercel

https://cinescope-pro.vercel.app/

---

### 🧩 Manual Deployment

```bash
npm run build
```

Deploy the **build/** folder to your hosting service.

---

## 🐛 Known Issues & Fixes

| Issue                   | Solution              |
| ----------------------- | --------------------- |
| API not loading (India) | Use VPN               |
| Images not loading      | Check network         |
| No search results       | Try different keyword |

---

## 🔮 Future Enhancements

* 🎬 Movie trailers (YouTube integration)
* ⭐ Watchlist feature
* 🔁 Infinite scrolling
* 🎯 Genre filters
* 📝 User reviews & ratings

---

## 📄 License

This project is for **educational purposes only**.
Movie data provided by TMDB.

---

## 👨‍💻 Developer

**Nadeer Ansari**
Software Engineer | DevOps & Web Developer

* 🌐 Portfolio
* 💻 GitHub
* 🔗 LinkedIn

---

## 🙏 Acknowledgments

* TMDB for API
* React ecosystem
* Bootstrap for UI

---

⭐ If you like this project, don't forget to **star the repo!**
