// DEPENDENCIES
// ======================================================
const express = require("express");
const router = express.Router();
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const db = require("../models/");


// ROUTES
// ======================================================
// CHECKOUT SESSION INFO
router.get('/checkout-session', async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});

// GETS SHOPPING CART INFO
router.get("/:id", async (req, res) => {
  try {
    const shopData = await db.cart.findOne({ where: { id: req.params.id }, include: [db.item] })
    res.json(shopData);
  }

  catch (err) {
    console.error(err)
    res.status(500).end()
  }
})

// ADD ITEMS TO CART INFO
router.post("/add", async (req, res) => {
  try {
    const shopData = await db.cart.findOne({ where: { id: req.body.cartId } })
    shopData.addItem(req.body.classId)
    res.json(shopData);
  }
  catch (err) {
    console.error(err)
    res.status(500).end()
  }
})

// CHECKOUT ROUTE
router.post('/create-checkout-session/:id', async (req, res) => {
  try {
    const domainURL = process.env.DOMAIN;
    const cartInfo = await db.cart.findOne({
      where: {
        id: req.params.id
      }, include: [db.item]
    })

    let cartObj = {
      payment_method_types: ['card'],
      line_items: [],
      mode: 'payment',
      success_url: `${domainURL}success`,
      cancel_url: `${domainURL}failure`,
    }

    for (let i = 0; i < cartInfo.items.length; i++) {
      cartObj.line_items.push(
        {
          price_data: {
            currency: 'usd',
            product_data: { name: cartInfo.items[i].name },
            unit_amount: cartInfo.items[i].prices_amountMax * 100,
          },
          quantity: 1,
        })
    }

    const session = await stripe.checkout.sessions.create(cartObj)
    res.send({ sessionId: session.id });
  }

  catch (err) {
    console.error(err)
    res.status(500).end()
  }
})

// WEBHOOK
router.post('/webhook', async (req, res) => {
  let data;
  let eventType;
  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers['stripe-signature'];

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  if (eventType === 'checkout.session.completed') {
    console.log(`🔔  Payment received!`);
  }

  res.sendStatus(200);
});

// ROUTE TO DELETE ITEMS FROM CART
router.delete("/delete/:cartId/:itemId", async (req, res) => {
  try {
    const shopData = await db.cart.findOne({ where: { id: req.params.cartId } })
    shopData.removeItem(req.params.itemId)
    res.send(shopData)
  }

  catch (err) {
    console.error(err)
    res.status(500).end()
  }
})


// EXPORT
// ===============================================================
module.exports = router;