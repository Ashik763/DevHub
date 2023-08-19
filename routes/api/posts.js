const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Post model
const Post = require('../../models/Post');

//Profile model
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/post');


router.get('/test' ,(req,res) => res.json({msg:"Posts works"}));


//get all the posts
router.get('/',(req,res) => {
    Post.find()
    .sort({date: -1})
    .then(posts=>{
        res.json(posts);
    })
    .catch(err => res.status(404).json({NotFound: "No post found"}))
})


// get Post by an id
router.get('/:id',(req,res) => {
    Post.find({_id:req.params.id})
    .then(post=>{
        res.json(post);
    })
    .catch(err => res.status(404).json({NotFound: "No post found"}))
})


//Create a new post
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{

   const {errors, isValid} = validatePostInput(req.body);

   if(!isValid){
    return res.status(400).json(errors);
   }

   
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });
    newPost.save().then(post => res.json(post));
    
})


router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res) => {
    Profile.findOne({user:req.user.id})
    .then(profile => {
        Post.findOne({_id:req.params.id})
        .then(post => {
            
            if(post.user.toString() !== req.user.id){
                console.log(post.user.toString()=== req.user.id);
                return res.status(401).json({notauthorized: "user not authorized"});
            }
            Post.findOneAndRemove({_id:req.params.id})
                .then( () => res.status(200).json({success: true}) )

            // post.remove().then(() =>res.json({success: true}))
           
        })
        .catch(err => {
            res.status(500).json({postnotfound:"No post found"});
        })
    })

})

//handling Like 
router.post('/like/:id',passport.authenticate('jwt',{session:false}),(req,res) => {
    Profile.findOne({user:req.user.id})
    .then(profile => {
        Post.findOne({_id:req.params.id})
        .then(post => {
            if( post.likes.filter( like =>  like.user.toString() === req.user.id ).length>0 ){
                return res.status(400).json({alreadyLiked: "User already liked"});
            }

            post.likes.unshift({user:req.user.id});
            post.save().then(post => res.json(post))
          
        })
        .catch(err => {
            res.status(500).json({postnotfound:"No post found"});
        })
    })

})

//handling removing like 

router.post('/unlike/:id',passport.authenticate('jwt',{session:false}),(req,res) => {
    Profile.findOne({user:req.user.id})
    .then(profile => {
        Post.findOne({_id:req.params.id})
        .then(post => {
            if( post.likes.filter( like =>  like.user.toString() === req.user.id ).length===0 ){
                return res.status(400).json({notLiked: "You haven't  liked this post yet"});
            }

            const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
            post.likes.splice(removeIndex, 1);
             
            post.save().then(post => res.json(post))
          
        })
        .catch(err => {
            res.status(500).json({postnotfound:"No post found"});
        })
    })

})

//comment on a post

router.post('/comment/:id',passport.authenticate('jwt',{session:false}),(req, res) => {
        const {errors,isValid} = validatePostInput(req.body);
        if(!isValid) {
            return res.status(403).json(errors);
        }
        Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }

            post.comments.unshift(newComment);
            post.save()
            .then((post) => res.json(post));



        })
        .catch( err => res.status(404).json({postnotfound:"NO Post found2"}) )
})

//Delete your comment 

router.delete('/comment/:id/:comment_id',passport.authenticate('jwt',{session:false}),(req, res) => {
    
    Post.findById(req.params.id)
    .then(post => {
        if( post.comments.filter ( comment => comment._id.toString() === req.params.comment_id).length === 0 ){
            return res.status(404).json({commentNotFound: "Comment does not exits"});
        }

        const removeIndex = post.comments
                                .map(comment => comment._id.toString())
                                .indexOf(req.params.comment_id);

         post.comments.splice(removeIndex, 1);
         post.save().then(post => res.json(post));                 

       



    })
    .catch( err => res.status(404).json({postnotfound:"NO Post found2"}) )
})




module.exports = router;