// src/pages/api/send-email.js
// Using Next.js API route or you can use any backend

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { to, subject, body, from } = req.body

  try {
    // Option 1: Using EmailJS
    // Option 2: Using SendGrid
    // Option 3: Using Nodemailer
    // Option 4: Using Formspree
    
    // Example with EmailJS (you need to install @emailjs/browser)
    /*
    const emailjs = require('@emailjs/nodejs')
    
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        to_email: to,
        subject: subject,
        message: body,
        from_email: from,
      },
      'YOUR_PUBLIC_KEY'
    )
    */

    // Example with SendGrid
    /*
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    
    await sgMail.send({
      to,
      from: 'your-verified-sender@example.com',
      subject,
      text: body,
    })
    */

    // For now, log to console (replace with actual email service)
    console.log('Email to send:', { to, subject, body, from })
    
    res.status(200).json({ success: true, message: 'Email sent successfully' })
  } catch (error) {
    console.error('Email error:', error)
    res.status(500).json({ success: false, message: 'Failed to send email' })
  }
}