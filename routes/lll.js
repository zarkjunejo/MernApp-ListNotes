const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchusers = require('../middleware/fetchusers');
const JWT_SECRET = 'harry';
// ROUTE 1 : Create a user using : POST "/api/auth/createuser".NO login required
router.post('/createuser', [
    body("email", "Enter a valid Name").isEmail(),
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("password").isLength({ min: 6 })
], async (req, res) => {
    let success = false;
    //if there are errors ,return bad req and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });

    }
    //Check whethe r user with this email exist already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "SOrry user with email already exist" })
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);



        //Create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        });
        const data = {
            id: user.id,

        }
        console.log(data);
        const authtoken = jwt.sign(data, JWT_SECRET);


        //res.json(user)
        success = true
        res.json({ success, authtoken });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Inernal server error occured");
    }
}


)

// ROUTE :  2 login a user using : POST "/api/auth/login.no login required
router.post('/login', [
    body("email", "Enter a valid Name").isEmail(),
    body("password", "password cannot be blank").exists(),

], async (req, res) => {
    //if there are errors ,return bad req and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });

    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ error: "PLease try to login with correct credentails" });

        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "PLease try to login with correct credentails" });

        }
        const data = {
            user: {
                id: user.id,
            }
        }
        // console.log(data)
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });
    } catch (error) {

        console.error(error.message);
        res.status(500).send("Inernal server error occured");

    }
})

// ROUTE :  2 Get Logged IN User Detail Using  : POST "/api/auth/getUser.login required
router.post('/getuser', fetchusers, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Inernal server error occured");
    }
})
module.exports = router;