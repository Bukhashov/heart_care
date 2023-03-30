const { Router } = require('express');
const router = Router();
const { check, validationResult } = require('express-validator');
const auth = require("../controllers/auth");

// auth users
router.post('/auth/singin', [
    check('email', "Email is required").isEmail(),
    check('password', 'Password is requried').isLength({ min: 1 })
], auth.userSingin);
router.post('/auth/singup', [
    check('lastname').not().isEmpty().withMessage("lastname is required"),
    check('firstname').not().isEmpty().withMessage("firstname is required"),
    check('email', "Email is required").isEmail(),
    check('password', 'Password is requried').isLength({ min: 8 })
], auth.userSingup);
router.delete('/auth/user/:id', passport.authenticate('jwt', {session: false}), function(req, res) {
    console.log("end point delete user")
    
    res.status(200).json({
        "massage": "this endpoint test version"
    })
})
// auth med es
router.post('/auth/med/singin', [
    check('email', "Email is required").isEmail(),
    check('password', 'Password is requried').isLength({ min: 1 })
], auth.medSingin);
router.post('/auth/med/singup', [
    check('lastname').not().isEmpty().withMessage("lastname is required"),
    check('firstname').not().isEmpty().withMessage("firstname is required"),
    check('email', "Email is required").isEmail(),
    check('password', 'Password is requried').isLength({ min: 8 })
], auth.medSingup);

