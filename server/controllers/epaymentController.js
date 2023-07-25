async function khaltiPaymentInitiate(req, res) {
    const payload = req.body;

    try {
        const response = await fetch(
            "https://a.khalti.com/api/v2/epayment/initiate/",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Key ${process.env.KHALTI_LIVE_SECRET_KEY}`,
                },
                body: JSON.stringify(payload),
            }
        );

        const data = await response.json();

        res.status(200).json(data);
        return data;
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { khaltiPaymentInitiate }
