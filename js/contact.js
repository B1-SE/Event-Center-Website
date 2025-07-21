document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const successMessage = document.getElementById("form-submission-message");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Stop actual form submission

        // Clear any previous messages
        document.querySelectorAll(".error-message").forEach(el => el.textContent = "");
        successMessage.textContent = "";

        let isValid = true;

        // Validate fields
        const fields = ["name", "email", "subject", "message"];
        fields.forEach(fieldId => {
            const input = document.getElementById(fieldId);
            const error = document.getElementById(`${fieldId}-error`);
            if (!input.value.trim()) {
                error.textContent = `${capitalize(fieldId)} is required.`;
                isValid = false;
            } else {
                error.textContent = "";
            }

            // Extra email format check
            if (fieldId === "email" && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    error.textContent = "Please enter a valid email address.";
                    isValid = false;
                }
            }
        });

        if (!isValid) return;

        // Simulate form submission (client-side only)
        const sampleData = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            subject: form.subject.value.trim(),
            message: form.message.value.trim()
        };

        console.log("Simulated form submission:", sampleData);

        // Show success message
        successMessage.textContent = "Thank you! Your message has been sent (simulated).";
        successMessage.style.color = "green";

        // Optionally reset form
        form.reset();
    });

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
});
