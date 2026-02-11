document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('forgotPasswordForm');
    const emailInput = document.getElementById('userEmail');
    const otpSection = document.getElementById('otpSection');
    const otpInput = document.getElementById('userOtp');
    const sendOtpButton = document.getElementById('sendOtpButton');
    const submitOtpButton = document.getElementById('submitOTP');

    if (!form || !emailInput || !sendOtpButton) {
        console.error('Forgot password form elements not found.');
        return;
    }

    // Ensure OTP section is hidden initially (in case server-side flag is not set)
    if (otpSection) {
        otpSection.style.display = 'none';
    }

    // Handle "Send OTP" click
    sendOtpButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();
        if (!email) {
            alert('Please enter your email.');
            return;
        }

        try {
            const response = await fetch('/send-password-reset-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const resultText = await response.text();
            if (response.ok) {
                alert(resultText || 'OTP sent successfully to your email.');
                if (otpSection) {
                    otpSection.style.display = 'flex';
                }
            } else {
                alert(resultText || 'Failed to send OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error sending password reset OTP:', error);
            alert('An error occurred. Please try again later.');
        }
    });

    // Handle "Verify" OTP click
    if (submitOtpButton) {
        submitOtpButton.addEventListener('click', async (event) => {
            event.preventDefault();

            const email = emailInput.value.trim();
            const otp = otpInput ? otpInput.value.trim() : '';

            if (!email) {
                alert('Email is missing.');
                return;
            }
            if (!otp) {
                alert('Please enter the OTP.');
                return;
            }

            try {
                const response = await fetch('/verify-password-reset-otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ otp }),
                });

                const resultText = await response.text();
                if (response.ok) {
                    alert(resultText || 'OTP verified. You can now reset your password.');
                    // Redirect to reset password page with email in query param
                    window.location.href = `/reset-password?email=${encodeURIComponent(email)}`;
                } else {
                    alert(resultText || 'Invalid OTP. Please try again.');
                }
            } catch (error) {
                console.error('Error verifying password reset OTP:', error);
                alert('An error occurred while verifying OTP. Please try again later.');
            }
        });
    }
});

