const express = require('express')
const router = express.Router()
const User = require('../models/user')
const { body, validationResult } = require('express-validator');

router.post("/creatuser",
    [body('email', 'provide an appropriate email format').isEmail(),
    body('password', 'Min length of password should be 5').isLength({ min: 5 })]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                location: req.body.location,

            })
            res.json({ success: true });
        }
        catch (error) {
            console.log(error)
            res.json({ success: false });

        }
    })


router.post("/loginuser",
    [body('email', 'incorrect email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 5 })], async (req, res) => {
        let email = req.body.email;

        try {
            let userdata = await User.findOne({email})
            if (!userdata) {
                return res.status(400).json({ errors: "try logging with correct credentials" });
            }
            if (req.body.password !== userdata.password) {
                return res.status(400).json({ errors: "try logging with correct credentials" });

            }
            return res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.json({ success: false });

        }
    })


module.exports = router