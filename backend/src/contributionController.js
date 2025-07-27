const Razorpay = require('razorpay');
const Contribution = require('./contributionModel');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
    const { name, email, phone, amount, tip, anonymous, address } = req.body;

    try {
        const tipValue = Math.round((tip / 100) * amount);
        const totalAmount = amount + tipValue;

        const order = await razorpay.orders.create({
            amount: totalAmount * 100,
            currency: 'INR',
            receipt: `rcptid_${Math.floor(Math.random() * 10000)}`,
        });

        await Contribution.create({
            name,
            email,
            phone,
            amount,
            tip,
            totalAmount,
            anonymous,
            address,
            orderId: order.id,
        });

        res.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            key: process.env.RAZORPAY_KEY_ID,
            name: "Contribution Point",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to create order' });
    }
};

module.exports = {
    createOrder
}