// DEPENDENCIES
// ======================================================
const db = require("../models");
const router = require("express").Router();
const bcrypt = require('bcrypt');


// All USER routes are prefixed by: '/API/users'
// All CLASS routes are prefixed by: '/API/classes'
// All SHOPPING routes are prefixed by: '/shop'


// ROUTES
// ======================================================
// READS SESSION COOKIE
router.get('/readsessions', ({ session: { user } } = req, res) => { (!user) ? res.status(403).end() : res.json(user) })

// LOGOUT
router.get("/logout", ({ session } = req, res) => {
    if (!session.user) res.status(403).end()
    session.destroy();
    res.send("logout complete!")
})

// LOGIN
router.post('/login', async ({ session, body: { email, password } } = req, res) => {
    try {
        const userData = await db.user.findOne({ where: { email: email }, include: [db.cart] })
        if (!userData) res.status(404).send("No such user exists")
        if (!bcrypt.compareSync(password, userData.password)) res.status(401).send("Incorrect password")
        const cartData = await db.cart.findOne({ where: { id: userData.cartId }, include: [db.item] })
        session.user = userData
        session.cart = cartData
        res.json(session)
    }

    catch (err) {
        console.error(err)
        res.status(500).end()
    }
})

// REGISTER. NEEDS TO CREATE A CART ASSOCIATED WITH THE USER.
router.post("/register", async ({ body } = req, res) => {
    try {
        const userData = await db.user.create(body)
        const newCart = await db.cart.create({ userId: userData.id })
        await db.user.update({ cartId: newCart.id }, { where: { id: userData.id } })
        userWithCart = await db.user.findOne({ where: { id: userData.id } })
        res.json(userWithCart)
    }

    catch (err) {
        console.error(err)
        res.status(500).end()
    }
})

// UPDATE
router.put('/update/:id', async ({ session, body, params: { id } } = req, res) => {
    if (session.user.id !== id) res.status(403).end()
    try {
        await db.user.update(body, { where: { id: id } })
        session.user = await db.user.findOne({ where: { id: id }, include: [db.cart] })
        res.json(session)
    }

    catch (err) {
        console.error(err)
        res.status(500).end()
    }
})

// DELETE USER
router.delete('/delete/:id', async ({ session, params: { id } } = req, res) => {
    if (session.user.id !== id) res.status(403).end()
    try {
        const userData = await db.user.destroy({ where: { id: id } })
        session.destroy()
        res.json(userData)
    }

    catch (err) {
        console.error(err)
        res.status(500).end()
    }
})


// EXPORT
// ======================================================
module.exports = router;