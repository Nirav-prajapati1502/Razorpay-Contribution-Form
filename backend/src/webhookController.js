const crypto = require('crypto');
const Contribution = require('./contributionModel');

const handleWebhook = async (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];
    const rawBody = req.body;
    try {
        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(rawBody)
            .digest('hex');

        if (signature !== expectedSignature) {
            console.log("Invalid webhook signature");
            return res.status(400).send("Invalid signature");
        }

        const parsedBody = JSON.parse(rawBody.toString());
        console.log("📝 Parsed Body Event:", parsedBody.event);

        if (parsedBody.event === 'payment.captured') {
            const payment = parsedBody.payload.payment.entity;
            console.log("Payment Captured:", payment);
            console.log("Looking for orderId:", payment.order_id);

            const [updated] = await Contribution.update(
                { status: 'success' },
                { where: { orderId: payment.order_id } }
            );

            if (updated === 0) {
                console.log("No matching orderId found in DB");
            } else {
                console.log("Contribution updated in DB");
            }
        }
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        console.log("Webhook Error:", err);
        res.status(500).send("Webhook failed");
    }
};

module.exports = {
    handleWebhook
};