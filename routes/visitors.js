const express = require('express');
const validator = require('../middleware/validate');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();
const {Visitor,validate} = require('../models/visitor');

router.get('/',async(req,res)=>{
    const visitors = await Visitor.find().sort('name');
    res.send(visitors);
});

router.get('/:id',async (req,res)=>{
    const visitor = await Visitor.findById(req.params.id);
    if(!visitor) return res.status(404).send('The visitor with the given ID was not found');

    res.send(visitor);
});

router.post('/',validator(validate),async (req,res)=>{

   let visitor = new Visitor({
       name:req.body.name,
       address:req.body.address,
       phone:req.body.phone,
       purpose:req.body.purpose,
        who:req.body.who,
   });
   visitor = await visitor.save();
   res.send(visitor);
});

router.put('/:id',validator(validate),async(req,res)=>{

    const visitor = await Visitor.findByIdAndUpdate(req.params.id,
        {
            name:req.body.name,
            address:req.body.address,
            phone:req.body.phone,
            purpose:req.body.purpose, 
            who:req.body.who
        },{new:true,useFindAndModify:false});
        if(!visitor) return res.status(404).send('The visitor with the given ID was not found');

        res.send(visitor);
});

router.delete('/:id',[auth,admin],async(req,res)=>{

    const visitor = await Visitor.findByIdAndRemove(req.params.id);
    if(!visitor) return res.status(404).send('The visitor with the given ID was not found');

    res.send(visitor);
});

module.exports = router;
