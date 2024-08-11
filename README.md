# OrbitOPedia

OrbitOPedia is a web platform designed for space enthusiasts. It offers a variety of features, including live 3D satellite tracking, a comprehensive rocket database, and an AI-powered image classifier for celestial objects. The site also includes a secure login/signup system to personalize the user experience.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)

## Features
1. **Live 3D Satellite Tracking**: Visualize real-time satellite locations using Three.js and Satellite.js.
2. **Rocket Database**: Access detailed information on various launch vehicles.
3. **ML-based Image Classifier**: Upload images to classify celestial objects with the help of a machine learning model.
4. **User Authentication**: Secure login/signup system built with Node.js, Express, and MongoDB.

## Installation
To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JayGor-13/Hackout-24.git
   cd Hackout-24
   ```

2. **Install dependencies**:
   - Navigate to the `backend` directory and install server dependencies:
     ```bash
     cd backend
     npm install
     ```
   - Navigate to the `frontend` directory and install client dependencies:
     ```bash
     cd frontend
     npm install
     ```

3. **Setup MongoDB**:
   - Ensure MongoDB is installed and running on your machine.
   - Create a `.env` file in the root directory and add your MongoDB connection string:
     ```env
     MONGO_URI=mongodb://localhost:27017/orbitopedia
     ```

4. **Run the project**:
   - Start the Node.js server:
     ```bash
     node index.js
     ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```
   - Start the frontend development server:
     ```bash
     python app.py
     ```
   - The application should now be running on `http://localhost:5173`.

## Usage
- **Satellite Tracking**: Navigate to the Satellite Tracker page to see live 3D models of satellites orbiting Earth.
- **Rocket Database**: Visit the Rocket Database section to explore detailed profiles of various rockets.
- **Image Classification**: Upload an image in the Image Classifier section to identify celestial objects using the ML model.
      It can be connected directly to a telescope output to classify the images continuously.

## Technologies Used
- **Frontend**:
  - HTML, CSS, JavaScript
  - [Three.js](https://threejs.org/)
  - [Satellite.js](https://github.com/shashwatak/satellite-js)
  - Vite

- **Backend**:
  - Node.js, Express
  - MongoDB

- **Machine Learning**:
  - Python, Flask
  - Keras, Pickle

## Project Structure
```
Hackout-24/
│
├── backend/                # Express server
│   ├── models/             # MongoDB models
│   └── index.js              # Express app setup
│
├── frontend/               # Frontend code
│   ├── src/
│   │   ├── html/           # HTML files
│   │   ├── css/            # CSS stylesheets
│   │   ├── js/             # JavaScript files
│   │   ├── data/           # Data files for the rockets and TLEs
│   │   ├── Images/         # Images for the website
│
├── ml/                     # Machine learning model and Flask server
│   ├── model/              # Trained ML model
│   └── app.py              # Flask server setup
│
├── .env                    # Environment variables
├── package.json            # Node.js dependencies
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```
