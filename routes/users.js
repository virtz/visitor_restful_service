const auth = require('../middleware/auth');
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');
const validator = require('../middleware/validate');
const admin = require('../middleware/admin');
const express = require('express');
const _ = require('lodash')
const router = express.Router();



router.get('/me',auth,async(req,res)=>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);

});

router.get('/:id',async(req,res)=>{
    const user = await User.findById(req.params.id).select('-password');
    if(!user) return res.status(404).send('The user with the given ID was not found');

    res.send(user);
});
router.get('/',async(req,res)=>{
    const user = await User.find().sort('name');
    res.send(user);
});

router.post('/', validator(validate),async (req, res) => {

    let user = await User.findOne({ email: req.body.email });

    if (user) return res.status(400).send("User already registered");

   
    user =  new User({
        name: req.body.name,
        email:req.body.email,
        password:req.body.password,
        isAdmin:req.body.isAdmin
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['id', 'name', 'email','status','isAdmin']))

});

router.put('/:id',validator(validate),async(req,res)=>{

    const user = await User.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            email:req.body.email,
            password:req.body.password,
            isAdmin:req.body.isAdmin,
            status:req.body.status
        },{new:true,useFindAndModify:false});
        if(!user) return res.status(404).send('The visitor with the given ID was not found');

        res.send(user);
});


router.delete('/:id',[auth,admin],async(req,res)=>{

    const user = await User.findByIdAndRemove(req.params.id);
    if(!user) return res.status(404).send('The user with the given ID was not found');

    res.send(user);
});

module.exports = router;