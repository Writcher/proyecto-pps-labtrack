import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export default async function sendVerificationEmail(email: string, token: string) {
    try {
        const msg = {
            to: email,
            from: 'lmsemailverificacion@gmail.com',
            subject: 'Verificación de Email LabTrack',
            html: `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verificación de Email</title>
                <style>
                    body, html {
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        height: 100%;
                        font-family: Arial, sans-serif;
                        background-color: #f7fafc; /* bg-gray-100 */
                    }
                    .main-container {
                        display: flex;
                        flex-direction: column;
                        height: 100vh;
                        width: 100%;
                        background-color: #f7fafc; /* bg-gray-100 */
                    }
                    .header, .footer {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        color: white;
                        background: linear-gradient(to bottom, #000000, #6c6c6c); /* bg-gradient-to-b from-black to-gray-600 */
                        opacity: 0.8;
                    }
                    .header {
                        height: 8rem; /* h-32 */
                    }
                    .footer {
                        height: 2.5rem; /* h-10 */
                        font-size: 0.875rem; /* text-xs */
                    }
                    .divider-top, .divider-bottom {
                        width: 100%;
                        height: 0.5rem; /* h-2 */
                        background: linear-gradient(to bottom, #f97316, #fbbf24); /* bg-gradient-to-b from-orange-500 to-orange-400 */
                    }
                    .content-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        flex: 1;
                        padding: 1rem;
                    }
                    .content-box {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        width: 80%; /* w-8/10 */
                        max-width: 640px; /* md:w-2/5 */
                        padding: 2rem; /* p-16 */
                        text-align: center;
                    }
                    .welcome-text {
                        font-size: 1.25rem; /* text-xl */
                        color: #4a5568; /* text-gray-700 */
                        font-weight: 500; /* font-medium */
                    }
                    .highlight-text {
                        color: #f97316; /* text-orange-500 */
                    }
                    .verify-link {
                        margin-top: 1.25rem; /* mt-5 */
                        text-align: start;
                    }
                    .verify-link a {
                        color: #1d4ed8; /* text-blue-600 */
                        text-decoration: none;
                    }
                    .verify-link a:hover {
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <main class="main-container">
                    <div class="header">
                    </div>
                    <div class="divider-top"></div>
                    <div class="content-container">
                        <div class="content-box">
                            <p class="welcome-text">
                                <strong class="highlight-text">
                                    Bienvenido a LMS.
                                </strong>
                                Click a continuación para verificar su cuenta.
                            </p>
                        </div>
                    </div>
                    <div class="content-container">
                        <div class="content-box">
                            <div class="verify-link">
                                <strong class="highlight-text">
                                    <a href="${process.env.NEXTAUTH_URL}/api/auth/verifyemail?token=${token}">Verificar Email</a>
                                </strong>
                            </div>
                        </div>
                    </div>
                    <div class="divider-bottom"></div>
                    <div class="footer">
                        <p>Proyecto PPS - Giménez - 2024</p>
                    </div>
                </main>
            </body>
            </html>
            `,
        };
        
        await sgMail.send(msg);

        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        return { error: true };
    }
}