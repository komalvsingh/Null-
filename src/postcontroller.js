import OrphanagePost from "./postmodel.js";

// Add a new post
export const addPost = async (req, res) => {
  try {
    const newPost = new OrphanagePost(req.body);
    await newPost.save();
    res.status(201).json({ message: "Post added successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Error adding post", error });
  }
};

// Edit an existing post
export const editPost = async (req, res) => {
  try {
    const updatedPost = await OrphanagePost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const deletedPost = await OrphanagePost.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await OrphanagePost.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};
