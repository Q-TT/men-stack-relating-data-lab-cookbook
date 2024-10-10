const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get("/", async(req,res) => {
    try {
        const allUsers = await User.find({});
        const currentUser = await User.findById(req.session.user._id);
        res.render('users/index.ejs', {
            allUsers,
            currentUser,
        })
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
})

router.get("/show", async(req,res) => {
    try {
        
        const currentUser = await User.findById(req.session.user._id); 
        const currentPantries = currentUser.pantry
        
        res.render('users/show.ejs', {
            
            currentUser,
            currentPantries,
        })
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
})



module.exports = router;