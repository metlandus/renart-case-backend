# Engagement Ring Showcase

A clean, responsive full-stack test case project for displaying engagement rings. Built with:

- **Frontend**: React + Vite + Tailwind CSS v4
- **Fonts**: Local custom fonts (Avenir as default, Montserrat as secondary)
- **Mockup Assets**: AI-generated and optimized banner images
- **Backend**: Express.js RESTful API with real-time gold pricing and dynamic price calculation

---

## 📋 Assignment Description

You will build a product listing application that consists of two main parts: a backend API and a frontend interface. The backend will provide product information to the frontend, which should display the products according to the provided design.

### ✅ Requirements

#### 1. Backend: Mock API Development
- Develop a RESTful API that serves product data from a given JSON file.
- Each product contains:
  - `name`: Name of the product
  - `popularityScore`: Popularity score in the scale of 5
  - `weight`: Weight in grams
  - `images`: Array of 3 image URLs (1 per color)
- **Dynamic Price Calculation**:
  ```js
  price = (popularityScore + 1) * weight * goldPrice
  ```
  - `price` is in USD
  - `goldPrice` is fetched from a real-time gold price API (e.g., Metals-API, GoldAPI, etc.)

#### 2. Frontend: Product Display
- Fetch product data from the backend
- Display product list in the provided layout
- Include the following:
  - Product name, weight, and calculated price
  - Popularity score: converted to a 5-point scale (1 decimal precision)
  - **Color Picker**: change image based on selected color
  - **Image Carousel**: supports both arrows and swipe gestures (mobile & desktop)
  - Responsive design matching given mockup layout

#### 3. Bonus Feature
- **Filtering (via API query parameters)**:
  - By price range (min/max)
  - By popularity score (min)

---

## 🖼 Frontend Features

- Fully responsive and mobile-friendly
- Product grid with:
  - Name, price, weight
  - 5-star rating equivalent of popularity score
  - Color switcher
  - Swipable + arrow-based carousel
- Default font: Avenir
- Utility font: Montserrat via `font-montserrat`

---

## 🔧 Backend: API Development

### 🗂 JSON Structure Example
```json
[
  {
    "name": "Twist Shank Moissanite Ring",
    "popularityScore": 2.5/5,
    "weight": 3.4,
    "images": [
      "/images/ring-gold.jpg",
      "/images/ring-silver.jpg",
      "/images/ring-rose.jpg"
    ]
  }
]
```

### 📈 Dynamic Price Logic
```js
price = (popularityScore + 1) * weight * goldPrice;
```

- `goldPrice` is the current price per gram of 24k gold
- The final price is calculated and returned in USD

### 🔍 Optional Filtering Endpoint
```
GET /products?minPrice=1000&maxPrice=3000&mpoularityScore=2.4
```

---

## 🚀 Getting Started

### 1. Install Frontend
```bash
cd frontend
npm install
npm run dev
```

### 2. Install Backend
```bash
cd backend
npm install
npm run dev
```

Create `.env` in `backend` folder:
```env
GOLD_API_KEY=your_api_key_here
```

---

## 📁 Folder Structure
```
project-root
├── backend
│   ├── server.js
│   ├── routes/products.js
│   ├── data/products.json
│   └── .env
├── frontend
│   ├── src
│   │   ├── App.jsx
│   │   ├── components/
│   │   └── assets/fonts/
│   └── index.css
└── README.md
```

---

## 🌐 Deployment
- Frontend deployed via **Vercel**
- Backend deployed via **Render**

---

## 🔗 Tech Stack
- React + Vite
- Tailwind CSS v4 (CSS-first configuration)
- Node.js + Express
- Custom Fonts via `@layer base` and `@theme` in CSS (no config file)
- AI-generated assets using DALL·E

---

## 📄 License
MIT — Free for use in personal or commercial test cases.
