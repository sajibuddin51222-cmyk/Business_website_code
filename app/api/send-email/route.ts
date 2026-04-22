import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, message, projectType, budget, timeline, services, company } = body;

        // Create a transporter using Gmail
        // Note: User needs to use an App Password if using Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Construct email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'sajibuddin729@gmail.com', // Send to admin
            subject: `New Project Request from ${name}`,
            html: `
        <h2>New Project Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        
        ${projectType ? `<h3>Project Details</h3>
        <p><strong>Type:</strong> ${projectType}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Timeline:</strong> ${timeline}</p>
        <p><strong>Services:</strong> ${services?.join(', ')}</p>` : ''}
        
        <h3>Message</h3>
        <p>${message || 'No message provided'}</p>
      `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to send email' },
            { status: 500 }
        );
    }
}
