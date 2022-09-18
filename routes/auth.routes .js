const router = require("express").Router();
const User = require("../models/User.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


router.post("/register", async (req, res, next)=>{

    const {username, password} = req.body
    const usernameLower = username.trim().toLowerCase()

    try{

        if(!username || !password){
            res.status(400).json("Deben rellenarse todos los campos")
            return
        }
        
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/
        if(passwordRegex.test(password) == false){
            res.status(400).json("La contraseña debe contener entre 8-20 caracteres y al menos 1 minúscula, 1 mayúscula y un número")
            return
        }

        const foundUser = await User.findOne({username: usernameLower})
        if(foundUser){
            res.status(400).json("Nombre de usuario ya registrado")
            return
        }

        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)

        await User.create({username: usernameLower, password: hashedPassword})

        res.json("Usuario creado")

    }
    catch(error){
        next(error)
    }

})


router.post("/login", async (req, res, next)=>{

    const {username, password} = req.body
    const usernameLower = username.trim().toLowerCase()

    try{

        if(!username || !password){
            res.status(400).json("Deben rellenarse todos los campos")
            return
        }

        const foundUser = await User.findOne({username: usernameLower})
        if(foundUser == null){
            res.status(400).json("No existe ese username")
            return
        }

        const isPasswordValid = await bcrypt.compare(password, foundUser.password)
        if(!isPasswordValid){
            res.json({errorMessage: "Contraseña incorrecta"})
            return
        }

        res.json({usuario: usernameLower})
    }
    catch(error){
        console.log(error)
    }

})


module.exports = router