const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end('Method Not Allowed');
    }

    const { name, email, phone, eventDate, sessionType, heardFrom, message } = req.body;

    const msg = {
        to: 'info@livisuals.co.uk',
        from: 'livingstonpirabakaran@hotmail.com',
        subject: `New Enquiry from ${name}`,
        html: `
      <b>Name:</b> ${name}<br>
      <b>Email:</b> ${email}<br>
      <b>Phone:</b> ${phone}<br>
      <b>Session Type:</b> ${sessionType}<br>
      <b>Event Date:</b> ${eventDate}<br>
      <b>Heard About Us From:</b> ${heardFrom}<br><br>
      <b>Message:</b><br>${message}
    `
    };

    try {
        await sgMail.send(msg);
        res.status(200).json({ sent: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
