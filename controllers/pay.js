const router = require('express').Router()
const stripe = require('stripe')(`${process.env.STRIPE_SK}`)

router.post('/', (req, res) => {
	console.log(req.body)
	stripe.charges
		.create({
			amount: 100,
			currency: 'usd',
			description: 'Premium Account',
			source: req.body.token.id
		})
		.then(data => {
			res.send(data)
		})
		.catch(err => res.send(err))
})

module.exports = router
