const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});


const CharRoutes = require("./characters.routes")
router.use("/character", CharRoutes)

const ComicRoutes = require("./comic.route")
router.use("/comic", ComicRoutes)

const SerieRoutes = require("./serie.route")
router.use("/serie", SerieRoutes)

module.exports = router;
