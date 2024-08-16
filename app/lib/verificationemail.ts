import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export default async function sendVerificationEmail(email: string, token: string) {
    try {
        const msg = {
            to: email,
            from: 'lmsemailverificacion@gmail.com',
            subject: 'Verificación de Email LabTrack',
            html: `
                <p>Click the link below to verify your email:</p>
                <a href="${process.env.NEXTAUTH_URL}/api/auth/verifyemail?token=${token}">Verify Email</a>
            `,
        };
        
        await sgMail.send(msg);

        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        return { error: true };
    }
}