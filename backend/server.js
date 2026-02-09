// import express from "express";
// import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";
// import authRoutes from "./routes/auth.js";
// import notesRoutes from "./routes/notes.js";
// import path from "path";
// dotenv.config();

// const PORT = process.env.PORT || 5000;

// const app = express();

// app.use(express.json());

// app.use("/api/users", authRoutes);
// app.use("/api/notes", notesRoutes);

// const __dirname = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));
//   app.get("/{*splat}", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
// }

// connectDB();

// app.listen(PORT, () => {
//   console.log(`Server started at port ${PORT}`);
// });

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/notes.js";
import path from "path";
import cors from "cors";

dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/users", authRoutes);
app.use("/api/notes", notesRoutes);


// Production Configuration
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // SPA fallback
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

connectDB();

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;