// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// router logic will go here - will be built later on in the lab
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id); 
        const currentPantries = currentUser.pantry
        res.render('foods/index.ejs', {
            currentPantries,
        })
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
});

router.get("/new", (req,res) => {
    res.render('foods/new.ejs')
})

router.post("/", async (req, res)=>{
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.push(req.body);
        await currentUser.save();
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
})


module.exports = router;
