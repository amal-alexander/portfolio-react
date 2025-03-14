// index.js (Backend)
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/postDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Mongoose schema
const postSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Post = mongoose.model("Post", postSchema);

// ✅ CRUD Routes for /posts
app.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const newPost = new Post(req.body);
  await newPost.save();
  res.json(newPost);
});

app.put("/posts/:id", async (req, res) => {
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedPost);
});

app.delete("/posts/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted successfully" });
});

// ✅ Optional: /crawl route if needed
app.post("/crawl", async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "URL is required." });

  try {
    const response = await fetch(url);
    const html = await response.text();

    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const descriptionMatch = html.match(/<meta name="description" content="(.*?)"/);

    res.json({
      title: titleMatch ? titleMatch[1] : null,
      description: descriptionMatch ? descriptionMatch[1] : null,
      url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch or parse the URL." });
  }
});

// ✅ Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
