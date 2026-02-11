document.addEventListener("DOMContentLoaded", () => {
    const partnerId = localStorage.getItem("deliveryPartnerIdPartner");
    let intervalId;

    if (!partnerId) {
        alert("You must be logged in as a delivery partner.");
        return;
    }

    // --------- Table loading helpers ---------

    const loadAllTables = () => {
      console.log("partnerId from localStorage:", partnerId);

      // Available orders
      fetch("get-pending-order")
        .then(response => response.json())
        .then(data => {
          console.log("Available orders:", data);
          populateAvailableOrders(data);
        })
        .catch(error => console.error("Error fetching available orders:", error));

      // Pending orders
      fetch(`get-partner-pending-orders/${partnerId}`)
        .then(response => {
          console.log("Pending status:", response.status);
          return response.json();
        })
        .then(data => {
          console.log("Pending orders data:", data);
          populatePendingOrders(data);
        })
        .catch(error => console.error("Error fetching pending orders:", error));

      // Completed orders
      fetch(`get-partner-completed-orders/${partnerId}`)
        .then(response => response.json())
        .then(data => {
          console.log("Completed orders:", data);
          populateCompletedOrders(data);
        })
        .catch(error => console.error("Error fetching completed orders:", error));
    };

    // Initial load
    loadAllTables();

    // --------- Table population functions ---------

    function populateAvailableOrders(orders) {
        const table = document.getElementById("availableOrdersTable");
        const tbody = document.createElement("tbody");
        table.querySelector("tbody")?.remove(); // Remove existing tbody if any

        orders.forEach(order => {
            const row = document.createElement("tr");
            row.id = `row${order.orderId}`;
            row.innerHTML = `
                <td>${order.orderId}</td>
                <td>${order.userId}</td>
                <td>${order.address}</td>
                <td><button class="accept-order" data-order-id="${order.orderId}">Accept</button></td>
            `;
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
    }

    function populatePendingOrders(orders) {
        const table = document.getElementById("pendingOrdersTable");
        const tbody = document.createElement("tbody");
        table.querySelector("tbody")?.remove(); // Remove existing tbody if any

        // Ensure only one row per orderId
        const seenOrderIds = new Set();

        orders.forEach(order => {
            if (seenOrderIds.has(order.orderId)) {
                return; // Skip duplicate entries for the same order
            }
            seenOrderIds.add(order.orderId);

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${order.orderId}</td>
                <td>${order.userId}</td>
                <td>${order.userName}</td>
                <td>${order.phoneNo}</td>
                <td>${order.address}</td>
                <td>${order.totalAmount}</td>
                <td>${order.paymentOption}</td>
                <td>Pending</td>
                <td>
                    <button
                        class="mark-complete"
                        data-order-id="${order.orderId}"
                        data-user-id="${order.userId}"
                        data-delivery-id="${order.deliveryId || ''}">
                        Send OTP
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
    }

    function populateCompletedOrders(orders) {
        const table = document.getElementById("completedOrdersTable");
        const tbody = document.createElement("tbody");
        table.querySelector("tbody")?.remove(); // Remove existing tbody if any

        orders.forEach(order => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${order.orderId}</td>
                <td>${order.userId}</td>
                <td>${order.userName}</td>
                <td>${order.phoneNo}</td>
                <td>${order.address}</td>
                <td>${order.totalAmount}</td>
                <td>${order.paymentOption}</td>
                <td>Completed</td>
            `;
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
    }

    // --------- Event delegation for buttons ---------

    document.body.addEventListener("click", event => {
        // Accept order
        if (event.target.classList.contains("accept-order")) {
            const orderId = event.target.dataset.orderId;
            const storedPartnerId = localStorage.getItem("deliveryPartnerIdPartner");

            if (!storedPartnerId || isNaN(storedPartnerId)) {
                alert("You must be logged in to accept an order.");
                return;
            }

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const longitude = position.coords.longitude.toString();
                        const latitude = position.coords.latitude.toString();

                        fetch("select-delivery-order", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                partnerId: parseInt(storedPartnerId),
                                orderId: parseInt(orderId),
                                longitude: longitude,
                                latitude: latitude
                            })
                        })
                            .then(async response => {
                                if (!response.ok) {
                                    const errorText = await response.text();
                                    throw new Error(errorText || "Failed to accept order.");
                                }
                                return response.json();
                            })
                            .then((isAccepted) => {
                                if (isAccepted) {
                                    alert("Order Accepted Successfully!");
                                    console.log(`Order with ID: ${orderId} accepted.`);

                                    // Optionally remove the row immediately
                                    const orderRow = document.getElementById(`row${orderId}`);
                                    if (orderRow) {
                                        orderRow.remove();
                                    }

                                    // Reload all tables to reflect new state
                                    loadAllTables();
                                }
                            })
                            .catch(error => {
                                console.error("Error accepting order:", error);
                                alert(error.message);
                            });
                    },
                    (error) => {
                        console.error("Error fetching location:", error.message);
                        alert("Error fetching location: " + error.message);
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        }

        // Mark order as complete (send OTP + verify)
        if (event.target.classList.contains("mark-complete")) {
            const orderId = event.target.dataset.orderId;
            const userId = event.target.dataset.userId;
            const deliveryId = event.target.dataset.deliveryId;

            const btn = event.target;
            const originalText = btn.innerText;

            btn.innerText = "Sending OTP...";
            btn.disabled = true;

            fetch(`send-delivery-otp/${userId}`, { method: "POST" })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to send OTP.");
                    }
                    return response.text();
                })
                .then(() => {
                    console.log(`OTP sent to user with ID: ${userId}.`);

                    // Modal
                    const modal = document.createElement("div");
                    modal.id = "otpModal";
                    modal.style.cssText = `
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background-color: white;
                        border: 1px solid #ccc;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                        padding: 20px;
                        z-index: 1000;
                        width: 300px;
                        text-align: center;
                        border-radius: 10px;
                    `;

                    modal.innerHTML = `
                        <input type="text" id="otpInput" placeholder="Enter OTP"
                            style="width: 90%; margin-bottom: 10px; padding: 8px; border: 1px solid #ccc; border-radius: 5px;">
                        <button class="verify-otp"
                            style="margin: 5px; padding: 8px 16px; border: none; border-radius: 5px; background-color: #1E712A; color: white;">
                            Verify
                        </button>
                        <button class="close-modal"
                            style="margin: 5px; padding: 8px 16px; border: none; border-radius: 5px; background-color: #233040; color: white;">
                            Close
                        </button>
                    `;

                    const overlay = document.createElement("div");
                    overlay.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.5);
                        z-index: 999;
                    `;
                    document.body.appendChild(overlay);
                    document.body.appendChild(modal);

                    const closeModal = () => {
                        modal.remove();
                        overlay.remove();
                    };

                    modal.querySelector(".close-modal").addEventListener("click", closeModal);

                    modal.querySelector(".verify-otp").addEventListener("click", () => {
                        const otp = modal.querySelector("#otpInput").value.trim();

                        if (!otp) {
                            alert("Please enter the OTP.");
                            return;
                        }

                        fetch(`verify-otp/${deliveryId}/${userId}/${otp}/${orderId}`, { method: "PUT" })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error("Invalid OTP or verification failed.");
                                }
                                return response.text();
                            })
                            .then((message) => {
                                console.log(message);
                                closeModal();

                                // Reload tables to reflect delivery completion
                                loadAllTables();
                            })
                            .catch(error => {
                                console.error("Error verifying OTP:", error);
                                alert("Error verifying OTP: " + error.message);
                            });
                    });
                })
                .catch(error => {
                    console.error("Error sending OTP:", error);
                    alert("Error sending OTP: " + error.message);
                })
                .finally(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                });
        }
    });

    // --------- Background location updates & logout ---------

    const isLoggedIn = localStorage.getItem("isLoggedInPartner");

    if (isLoggedIn === "true") {
        const updateLocation = (longitude, latitude) => {
            const locationData = {
                partnerId: parseInt(partnerId),
                longitude: longitude.toString(),
                latitude: latitude.toString()
            };

            fetch("update-location", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(locationData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to update location");
                    }
                    return response.json();
                })
                .then(result => {
                    console.log("Location updated:", result);
                })
                .catch(error => {
                    console.error("Error updating location:", error);
                });
        };

        const getCurrentLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const longitude = position.coords.longitude;
                        const latitude = position.coords.latitude;
                        updateLocation(longitude, latitude);
                    },
                    error => {
                        console.warn("Geolocation error:", error.message);
                        if (error.code === error.PERMISSION_DENIED || error.code === error.POSITION_UNAVAILABLE) {
                            clearInterval(intervalId);
                            console.log("Stopped background location updates due to permission denial.");
                        }
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
                clearInterval(intervalId);
            }
        };

        intervalId = setInterval(getCurrentLocation, 10000);

        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                localStorage.removeItem("isLoggedInPartner");
                localStorage.removeItem("deliveryPartnerIdPartner");
                localStorage.removeItem("emailPartner");

                clearInterval(intervalId);
                window.location.href = "/";
            });
        }
    }
});