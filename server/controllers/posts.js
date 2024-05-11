import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find();

        //   console.log(postMessage);
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;

    // console.log(_id);

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send(`No post with id: ${_id}`);

    const post = req.body;

    const updatePost = await PostMessage.findByIdAndUpdate(
        _id,
        { ...post, _id },
        {
            new: true,
        }
    );

    res.json(updatePost);
};

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send(`No post with id: ${_id}`);

    // console.log("deletePost ");
    // console.log(_id);

    await PostMessage.findByIdAndDelete(_id);
    res.json({ message: "Deleted Successful!" });
};

export const likePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send(`No post with id: ${_id}`);

    const post = await PostMessage.findById(_id);
    const updatePost = await PostMessage.findByIdAndUpdate(
        _id,
        {
            likeCount: post.likeCount + 1,
        },
        {
            new: true,
        }
    );
    res.json(updatePost);
};
