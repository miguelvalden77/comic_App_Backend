const router = require("express").Router()
const axios = require("axios").default


router.get("/all", async (req, res, next)=>{

    try{

        const response = await axios.get(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=2d3b4b21d8dda3426c90436e794f2d61&hash=${process.env.HASH}`)

        res.json(response.data.data.results)

    }
    catch(error){
        next(error)
    }

})

router.get("/:charID/details", async (req, res, next)=>{

    const {charID} = req.params

    try{

        const response = await axios.get(`https://gateway.marvel.com:443/v1/public/characters/${charID}?ts=1&apikey=2d3b4b21d8dda3426c90436e794f2d61&hash=${process.env.HASH}`)

        res.json(response.data.data)

    }
    catch(error){
        console.log(error)
    }

})


module.exports = router