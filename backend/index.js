const cors = require("cors"); // Import the cors package
const express = require("express");
const session = require("express-session"); // Import express-session
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true, // Allow cookies to be sent with requests
  })
);

app.use(express.json()); // To parse JSON bodies

// Setup express-session
app.use(
  session({
    secret: "yourSecretKey", // Replace with a strong secret key
    resave: false,           // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something stored
    cookie: { secure: false, httpOnly: true } // 'secure: true' requires HTTPS
  })
);

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Signup Route
app.post("/signup", async (req, res) => {
  const { first_name, last_name, email, username, password, access_level } = req.body;
  try {
    const newUser = new User({
      first_name,
      last_name,
      email,
      username,
      password,
      access_level,
    });
    await newUser.save();
    res.status(201).send(`User ${username} signed up successfully!`);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

//Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ username });

    if (!user) {
      // If the user doesn't exist
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Check if the password matches
    if (user.password !== password) {
      // If the password is incorrect
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }

    // If the username and password are correct
    // Store user information in the session
    req.session.user = {
      username: user.username,
      access_level: user.access_level,
    };

    res.json({ success: true, username: user.username, access_level: user.access_level });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ success: false, message: error.message });
  }
});


// check session route
app.get('/check-session', (req, res) => {
  if (req.session.user) {
    res.json({
      success: true,
      username: req.session.user.username,
      access_level: req.session.user.access_level,
    });
  } else {
    res.json({ success: false, message: "Not logged in" });
  }
});


// Logout Route
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error: " + err.message);
    }
    res.send("Logged out successfully!");
  });
});

mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});
