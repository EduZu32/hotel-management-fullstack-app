const express = require("express");
const cors = require("cors");
const hotelRoutes = require("./routes/hotels.routes");
const roomRoutes = require("./routes/rooms.routes");
const employeesRoutes = require("./routes/employees.routes");
const reservationRoutes = require("./routes/reservations.routes");
const clientsRoutes = require("./routes/clients.routes");
const authRoutes = require("./routes/auth.routes");
const db = require("./config/db");
const net = require("net");
const app = express();
const contactRoutes = require("./routes/contact.routes");
const shiftRoutes = require("./routes/shift.routes");

const fs = require("fs");
const path = require("path");

const uploadDir = path.resolve("uploads", "reservations");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  //console.log("Carpeta creada: uploads/reservations");
} else {
  //console.log("Carpeta ya existe: uploads/reservations");
}

app.use(cors());
app.use(express.json()); // Allows JSON requests

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Hotel API. Use the endpoints under /api");
});

// API routes
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

// API route for shifts
app.use("/api/shifts", shiftRoutes);

// API main route to avoid "Cannot GET /api" error
app.get("/api", (req, res) => {
  res.send(
    "Welcome to the API. Use endpoints like /api/rooms, /api/hotels, etc."
  );
});

//
const findAvailablePort = (startPort) => {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(startPort, () => {
      server.once("close", () => resolve(startPort));
      server.close();
    });

    server.on("error", () => {
      console.log(`Port ${startPort} is in use. Trying ${startPort + 1}...`);
      resolve(findAvailablePort(startPort + 1));
    });
  });
};

// Connect to the database
(async () => {
  const PORT = await findAvailablePort(process.env.PORT || 3000);
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
