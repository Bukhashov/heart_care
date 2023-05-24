const { Router } = require('express');
const passport = require('passport');
const { check } = require('express-validator');
const auth = require("../controllers/auth");

const diseases = require('../controllers/diseases');

const router = Router();

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


router.get('/diseses/all', diseases.getAll);
router.get('/diseses/:id', diseases.getById);


module.exports = router

