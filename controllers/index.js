// DEPENDENCIES AND VARIABLES
// ===============================================
const express = require("express");
const router = express.Router();
const userRoutes = require("./user")
const kitchenRoutes = require("./kitchen")
// const kitchenAccessTableRoutes = require("./kitchenAccessTable")


// SUBROUTES
// ===============================================
router.use("/api/users",userRoutes)
router.use("/api/kitchen",kitchenRoutes)
// router.use("/api/kitchen",kitchenAccessTableRoutes)


// EXPORT
// ===============================================
module.exports = router