const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
  try{
    const posts = await Post.find();
    res.json(posts);
  }catch(err){
    res.json({message: err});
  }
});

router.get('/about', (req, res) => {
    res.send('Hello World we are about!');
});

// post 
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        date: new Date()
    });
    try {
        const savedPost = await post.save();
        console.log(savedPost);
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
}); 

// get specific post
router.get('/:postId', async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.json({message: err});
    }
});

// update
router.patch('/:postId', async (req, res) => {
    try{
      const updatedPost = await Post.updateOne(
        {_id: req.params.postId},
        {$set: {title: req.body.title}}
      )
      res.json(updatedPost)
      console.log(updatedPost)
    }catch(err){
      res.json({message: err})
    }
  })

// delete
router.delete('/:postId', async (req, res) => {
    try{
      const post = await Post.findByIdAndDelete(req.params.postId)
      res.json(post)
      console.log(post)
    }catch(err){
      res.json({message: err})
    }
  })

module.exports = router;