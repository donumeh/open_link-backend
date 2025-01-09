const brevo = require('./brevo');

const sendWelcomeEmail = async (userEmail, userName) => {
    const sender = { email: 'asapnino01@gmail.com', name: 'OpenLinks Team'};
    const receivers = [{ email: userEmail }];
    const subject = "Welcome to OpenLinks 🎉";
    const htmlContent = `
        <h2>Hi ${userName}, welcome to OpenLinks!</h2>
    <p>We're excited to have you on board. Start exploring our amazing products now!</p>
    <p>Best regards,</p>
    <p><b>OpenLinks Team</b></p>
    `;

    try {
        await brevo.sendTransacEmail({ sender, to: receivers, subject, htmlContent });
        console.log(`Welcome email sent to ${userEmail}`);
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
};

const sendOrderConfirmationEmail = async (userEmail, orderId, orderTotal) => {
    const sender = { email: 'asapnino01@gmail.com', name: 'OpenLinks Team'};
    const receivers = [{ email: userEmail }];
    const subject = `Order Confirmation #${orderId}`;

    // format order total properly
    const formattedTotal = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(orderTotal);

    const htmlContent = `
        <h2>Thank you for your order!</h2>
        <p>Your order <b>#${orderId}</b> has been received.</p>
        <p>Total Amount: <b>${formattedTotal}</b></p>
        <p>We'll notify you once your order is shipped.</p>
        <p>You can track your order <a href="https://openlinks.com/orders/${orderId}">here</a>.</p>
        <p>If you have any questions, reply to this email or <a href="https://openlinks.com/support">contact our support</a>.</p>
        <p>Best regards,</p>
        <p><b>OpenLinks Team</b></p>
    `;

    try {
        await brevo.sendTransacEmail({ sender, to: receivers, subject, htmlContent });
        console.log(`Order confirmation email sent to ${userEmail}`);
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
    }
};

module.exports = { sendWelcomeEmail, sendOrderConfirmationEmail };