document.addEventListener("DOMContentLoaded", () => {
    const adminLoginForm = document.getElementById("adminLoginForm");

    adminLoginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const restaurantEmail = document.getElementById("restaurantEmail").value;
        const adminEmail = document.getElementById("adminEmail").value;
        const password = document.getElementById("adminPassword").value;

        // Prepare the request payload
        const requestBody = {
            rEmail: restaurantEmail,
            aEmail: adminEmail,
            password: password,
        };

        try {
            // Send a POST request to the backend
            const response = await fetch("/authenticate-admin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const responseData = await response.json();

                localStorage.setItem("restaurantIdAdmin", responseData.restaurantId);
                localStorage.setItem("isLoggedInAdmin", "true");
                localStorage.setItem("emailAdmin", adminEmail);
                localStorage.setItem("usernameAdmin", responseData.botName);

                alert("Login successful.");
                window.location.href = "/dashboard";
            } else {
                // Try to show a friendly error message from the backend
                let message = "Login failed. Please check your restaurant email, admin email, and password.";
                try {
                    const data = await response.json();
                    if (data && data.message) {
                        message = data.message;
                    }
                } catch (_) {
                    // Fallback: ignore JSON parse errors and use default message
                }
                alert(message);
            }
        } catch (error) {
            console.error("Error occurred during login:", error);
            alert("An unexpected error occurred. Please try again later.");
        }
    });
});
