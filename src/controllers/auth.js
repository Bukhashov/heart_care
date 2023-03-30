const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { Hash, Compare } = require('../../utils/hash');
const userModel = require('../models/user');
const medModel = require('../models/med');

const TOKEN_KEY = process.env.TOKEN_KEY

class Auth {
    medSingin = async (req, res) => {
        var errors = validationResult(req).array();
        if(errors.length >= 1){ 
            res.status(400).json({
                "massage" : "email and password indicated incorrectly"
            })
            return
        }
        const {email, password} = req.body;
        const med = await medModel.findOne({email: email});
        if(!med){
            res.status(400).json({
                "massage" : "email and password indicated incorrectly"
            })
            return
        }
        let passwordControl = await Compare(password, med.password);
        if(!passwordControl){
            res.status(400).json({
                "massage" : "email and password indicated incorrectly"
            })
            return
        }
        const token = jwt.sign({
            email: med.email,
            uid: med._id,
        }, TOKEN_KEY, { 
            expiresIn: (2*60)*60
        })

        res.status(200).json({
            "uid" : med.id,
            "lastname" : med.lastname,
            "firstname" : med.firstnaem,
            "token" : token
        })
    }
    medSingup = async (req, res) => {
        var errors = validationResult(req).array();
        if(errors.length >= 1){
            res.status(400).json({
                "massage" : "bad req"
            })
            return
        }
        const {lastname, firstname, email, password} = req.body;
        let emailControl = await medModel.find({email: email})
        if(emailControl.length >= 1) {
            res.status(400).json({
                "massage" : `${email} already exists`
            })
            return 
        }
        const hashPassword = await Hash(password, 8)
        
        const newMed = new userModel({
            lastname: lastname,
            firstnaem: firstname,
            email: email,
            password: hashPassword
        }).save();

        res.status(201).json({
            "massage" : "user created"
        })
    }
    userSingin = async (req, res) => {
        var errors = validationResult(req).array();
        if(errors.length >= 1){ 
            res.status(400).json({
                "massage" : "email and password indicated incorrectly"
            })
            return
        }
        const {email, password} = req.body;

        const user = await userModel.findOne({email: email});
        if(!user){
            res.status(400).json({
                "massage" : "email and password indicated incorrectly"
            })
            return
        }
        
        let passwordControl = await Compare(password, user.password);
        
        if(!passwordControl){
            res.status(400).json({
                "massage" : "email and password indicated incorrectly"
            })
            return
        }

        const token = jwt.sign({
            email: user.email,
            uid: user._id,
        }, TOKEN_KEY, { 
            expiresIn: (2*60)*60
        })

        res.status(200).json({
            "uid" : user.id,
            "lastname" : user.lastname,
            "firstname" : user.firstnaem,
            "token" : token
        })
    }
    userSingup = async (req, res) => {
        var errors = validationResult(req).array();
        if(errors.length >= 1){
            res.status(400).json({
                "massage" : "bad req"
            })
            return
        }

        const {lastname, firstname, email, password} = req.body;

        let emailControl = await userModel.find({email: email})
        if(emailControl.length >= 1) {
            res.status(400).json({
                "massage" : `${email} already exists`
            })
            return 
        }
        
        const hashPassword = await Hash(password, 8)
        
        console.log(hashPassword);
        const newUser = new userModel({
            lastname: lastname,
            firstnaem: firstname,
            email: email,
            password: hashPassword
        }).save();

        res.status(201).json({
            "massage" : "user created"
        })
    }
}

module.exports = new Auth
