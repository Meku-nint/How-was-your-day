export const htmlContent = `
<html>
    <body style="font-family: Arial, sans-serif; margin: 20px; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
        <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); text-align: center;">
            <h1 style="color: #333;">Verify Your Email Address</h1>
            <p style="color: #555;">Thank you for signing up! Please verify your email address using the verification code below:</p>
            <div style="display: inline-block; margin: 20px 0; padding: 10px 15px; background-color: #007bff; color: white; font-size: 18px; font-weight: bold; border-radius: 5px; letter-spacing: 1px;">
                {verificationCode}
            </div>
            <p style="color: #555;">If you did not create an account, no action is required.</p>
            <p style="color: #555;">Thank you!</p>
        </div>
    </body>
</html>
`;
