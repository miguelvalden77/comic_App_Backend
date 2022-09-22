const router = require("express").Router()
const axios = require("axios").default

router.get("/:comicId/details", async (req, res, next)=>{

    const {comicId} = req.params

    try{

        const response = await axios.get(`https://gateway.marvel.com:443/v1/public/comics/${comicId}?ts=1&apikey=2d3b4b21d8dda3426c90436e794f2d61&hash=${process.env.HASH}`)

        res.json(response.data.data.results[0])

    }
    catch(error){
        next(error)
    }

})

module.exports = router