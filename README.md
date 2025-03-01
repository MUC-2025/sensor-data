# Simple Dancing Game with Node.js and Home Assistant Integration

## Overview
This project is a simple 3x3 dancing game. The game fetches data from Home Assistant's API and displays it on the frontend.

## Features
- A 3x3 interactive grid where tiles change colors.
- Users press keys (`q w e / a s d / z x c`) or tap tiles to interact.
- Score tracking for correct inputs.
- Fetches real-time data from Home Assistant's API.
- Hosted with Node.js using Express.js.

## Setup Instructions

### 1️⃣ Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14+ recommended)
- npm (comes with Node.js)

### 2️⃣ Clone the Repository
```sh
git clone git@github.com:MUC-2025/sensor-data.git
cd dancing-game
```

### 3️⃣ Install Dependencies
```sh
npm install
```

### 4️⃣ Configure Home Assistant API
Edit `server.js` and update the API token:
```js
const HOME_ASSISTANT_TOKEN = "your_api_token_here";
```

### 5️⃣ Run the Server
```sh
node server.js
```
You should see:
```
Server running at http://localhost:3000
```

### 6️⃣ Open the Game in Browser
Go to:
```
http://localhost:3000/
```

## Project Structure
```
dancing-game/
│── public/
│   ├── index.html    # Frontend UI
│   ├── styles.css    # Styling
│   ├── script.js     # Game logic & API calls
│── server.js         # Node.js backend
│── package.json      # Dependencies
│── node_modules/     # Installed packages
```

## Troubleshooting
- **Cannot GET /**: Ensure `server.js` is running and serving `public/` correctly.
- **CORS issues**: Ensure the frontend is making requests to `http://localhost:3000/`.
- **API errors**: Check Home Assistant API token and connectivity.


