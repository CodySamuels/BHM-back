// DEPENDENCIES
// ======================================================
const db = require("../models");
const router = require("express").Router();


// ROUTES
// ======================================================
// GET ALL CLASS INFO. FOR DEVELOPER USE
router.get("/getAll", async (req, res) => {
    try {
        const classData = await db.item.findAll({})
        res.json(classData)
    }

    catch (err) {
        console.error(err)
        res.status(500).end()
    }
})

// GETS A SINGLE CLASS' INFO
router.get("/:id", async (req, res) => {
    try {
        const classData = await db.class.findOne({ where: { id: req.params.id } })
        res.json(classData)
    }

    catch (err) {
        console.error(err)
        res.status(500).end()
    }
})

// CREATES A CLASS
router.post("/create", async (req, res) => {
    try {
        const classData = await db.class.create(req.body)
        res.json(classData)
    }

    catch (err) {
        console.error(err)
        res.status(500).end()
    }
})

// UPDATE A CLASS
router.put("/:id", async (req, res) => {
    try {
        const classData = await db.class.update(req.body, { where: { id: req.params.id } })
        res.json(classData)
    }

    catch (err) {
        console.error(err)
        res.status(500).end()
    }
})

// DELETE A CLASS
router.delete('/delete/:id', async (req, res) => {
    try {
        const classData = await db.Animal.destroy({ where: { id: req.params.id } })
        res.json(classData)
    }

    catch (err) {
        console.error(err)
        res.status(500).end()
    }
})


// EXPORT
// ======================================================
module.exports = router;