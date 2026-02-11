document.addEventListener("DOMContentLoaded", () => {
    const addAdminForm = document.getElementById("addAdminForm");

    addAdminForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Extract restaurantId from URL query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const restaurantId = urlParams.get("restaurantId");

        if (!restaurantId) {
            alert("Restaurant ID is missing. Please register the restaurant first.");
            return;
        }

        // Get form data
        const email = document.querySelector('input[name="email"]').value.trim();
        const username = document.querySelector('input[name="username"]').value.trim();
        const password = document.querySelector('input[name="password"]').value.trim();

        // Validate inputs
        if (!email || !username || !password) {
            alert("All fields are required.");
            return;
        }

        // Prepare request body
        const adminData = {
            restaurantId,
            email,
            username,
            password
        };

        try {
            const response = await fetch("/add-admin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(adminData),
            });

            // Backend currently returns plain text, not JSON
            const resultText = await response.text();

            if (response.ok) {
                alert(resultText || "Admin added successfully!");
                window.location.href = "/"; // Redirect to home
            } else {
                alert(`Error: ${resultText || "Failed to add admin."}`);
            }
        } catch (error) {
            console.error("Error adding admin:", error);
            alert("An error occurred. Check the console for details.");
        }
    });
});
