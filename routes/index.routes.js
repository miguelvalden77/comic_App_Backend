const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRoutes = require("./auth.routes ")
router.use("/auth", authRoutes)

const CharRoutes = require("./characters.routes")
router.use("/character", CharRoutes)

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router;
