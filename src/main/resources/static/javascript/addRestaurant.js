let lon = null;
let lat = null;
let address = "";

let map;
let marker;
let autocomplete;

function initMap() {
    const mapElement = document.getElementById("map");
    if (!mapElement) {
        console.error("Map container not found.");
        return;
    }

    const defaultLocation = { lat: 20.5937, lng: 78.9629 };

    map = new google.maps.Map(mapElement, {
        center: defaultLocation,
        zoom: 6,
    });

    const input = document.getElementById("searchInput");
    if (!input) {
        console.error("Search input not found.");
        return;
    }

    autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.setFields(["geometry", "formatted_address"]);

    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry) {
            return;
        }

        const location = place.geometry.location;

        lat = location.lat();
        lon = location.lng();
        address = place.formatted_address;

        map.setCenter(location);
        map.setZoom(14);

        if (marker) marker.setMap(null);

        marker = new google.maps.Marker({
            map,
            position: location,
        });
    });
}

// Geocode a manually typed address when user doesn't pick a suggestion
function geocodeAddress(rawAddress) {
    return new Promise((resolve, reject) => {
        if (!window.google || !google.maps || !google.maps.Geocoder) {
            console.error("Google Maps Geocoder not available.");
            resolve(null);
            return;
        }
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: rawAddress }, (results, status) => {
            if (status === "OK" && results && results[0]) {
                const loc = results[0].geometry.location;
                resolve({
                    lat: loc.lat(),
                    lng: loc.lng(),
                    formattedAddress: results[0].formatted_address,
                });
            } else {
                console.error("Geocoding failed:", status);
                resolve(null);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.google && google.maps) {
        initMap();
    }

    const form = document.querySelector(".form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const inputAddress = document.getElementById("searchInput").value.trim();

        if (!inputAddress) {
            alert("Please enter address");
            return;
        }

        // If user did not select from suggestions, try to geocode the typed address
        if (!address) {
            address = inputAddress;
            const geoResult = await geocodeAddress(inputAddress);
            if (geoResult) {
                lat = geoResult.lat;
                lon = geoResult.lng;
                // Prefer formatted address from geocoder
                address = geoResult.formattedAddress || address;
            }
        }

        const restaurantData = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            phoneNo: form.phoneNo.value.trim(),
            registrationDate: form.registrationDate.value,
            startTime: form.startTime.value,
            closeTime: form.closeTime.value,
            address: address,
            location: lat != null && lon != null ? `${lat},${lon}` : null
        };

        try {
            const response = await fetch("/restaurant-register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(restaurantData),
            });

            const result = await response.json();

            if (result > 0) {
                alert("Restaurant registered successfully");
                window.location.href = `add-admin?restaurantId=${result}`;
            } else {
                alert("Failed to register restaurant");
            }
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    });
});


//let lon = "";
//let lat = "";
//let address = "";
//
//let map;
//let marker;
//let autocomplete;
//
//function initMap() {
//    // Default location: India's approximate center
//    const defaultLocation = { lat: 20.5937, lng: 78.9629 };
//    const mapElement = document.getElementById("map");
//    if (!mapElement) {
//        console.error("Map container not found.");
//        return;
//    }
//
//    map = new google.maps.Map(mapElement, {
//        center: defaultLocation,
//        zoom: 6,
//    });
//
//    // Initialize autocomplete
//    const input = document.getElementById("searchInput");
//    if (!input) {
//        console.error("Search input not found.");
//        return;
//    }
//
//    autocomplete = new google.maps.places.Autocomplete(input);
//    autocomplete.setFields(["geometry", "formatted_address"]);
//
//    // Add listener for when the user selects a suggestion
//    autocomplete.addListener("place_changed", function () {
//        const place = autocomplete.getPlace();
//
//        if (!place.geometry) {
//            alert("No details available for address " + place.name);
//            return;
//        }
//
//        // Update map and marker
//        const location = place.geometry.location;
//        map.setCenter(location);
//        map.setZoom(14);
//
//        if (marker) {
//            marker.setMap(null);
//        }
//
//        marker = new google.maps.Marker({
//            map: map,
//            position: location,
//        });
//
//        // Store longitude and latitude
//        lon = location.lng();
//        lat = location.lat();
//
//        // Store the formatted address
//        address = place.formatted_address;
//    });
//}
//
//document.addEventListener("DOMContentLoaded", () => {
//    // Initialize map when DOM is ready and Google Maps script has loaded
//    if (typeof google !== "undefined" && google.maps) {
//        initMap();
//    } else {
//        // Fallback: wait a bit and then try again once
//        setTimeout(() => {
//            if (typeof google !== "undefined" && google.maps) {
//                initMap();
//            } else {
//                console.error("Google Maps API not loaded.");
//            }
//        }, 500);
//    }
//
//    const form = document.querySelector(".form");
//    if (!form) {
//        console.error("Restaurant form not found.");
//        return;
//    }
//
//    form.addEventListener("submit", async (event) => {
//        event.preventDefault(); // Prevent the default form submission behavior
//
//        if (!address || !lat || !lon) {
//            alert("Please search and select an address from the suggestions.");
//            return;
//        }
//
//        // Collect form data
//        const restaurantData = {
//            name: form.querySelector('input[name="name"]').value.trim(),
//            email: form.querySelector('input[name="email"]').value.trim(),
//            phoneNo: form.querySelector('input[name="phoneNo"]').value.trim(),
//            registrationDate: form.querySelector('input[name="registrationDate"]').value,
//            startTime: form.querySelector('input[name="startTime"]').value,
//            closeTime: form.querySelector('input[name="closeTime"]').value,
//            address: address,
//            location: `${lat},${lon}`, // Store as latitude,longitude
//        };
//
//        try {
//            const response = await fetch("/restaurant-register", {
//                method: "POST",
//                headers: {
//                    "Content-Type": "application/json",
//                },
//                body: JSON.stringify(restaurantData),
//            });
//
//            if (!response.ok) {
//                throw new Error(`HTTP error! Status: ${response.status}`);
//            }
//
//            const result = await response.json();
//
//            if (result > 0) {
//                localStorage.setItem("restaurantId", result);
//                alert(`Restaurant registered successfully with ID: ${result}`);
//                window.location.href = `add-admin?restaurantId=${result}`;
//            } else {
//                alert("Failed to register the restaurant. Please try again.");
//            }
//        } catch (error) {
//            console.error("Error registering restaurant:", error);
//            alert("An error occurred while registering the restaurant. Please try again later.");
//        }
//    });
//});