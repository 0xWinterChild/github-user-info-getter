document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const errorElement = document.getElementById("error-message"); // Assuming there's an element to display error messages

    form.addEventListener("click", (event) => {
        event.preventDefault();
        if (event.target.tagName === "BUTTON") {
            const input = document.getElementById("github-username");
            const username = input.value.trim();
            if (!username) {
                errorElement.textContent = "Please enter a GitHub username."; // Display error message
                return; // Stop execution if validation fails
            }
            console.log(username);
            input.value = "";
            input.focus();
            fetchUserInfo(username, errorElement); // Pass the errorElement to display errors
        }
    })
})

const fetchUserInfo = async (username, errorElement) => {
    try {
        let response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            if (response.status === 404) {
                errorElement.textContent = "User not found."; // Display user not found error message
            } else {
                errorElement.textContent = "An error occurred. Please try again."; // Display generic error message for other errors
            }
            return; // Exit the function if there's an error
        }
        let user = await response.json();
        const ul = document.querySelector("ul");
        ul.innerHTML = "";
        for (let key in user) {
            if (user.hasOwnProperty(key)) {
                let li = document.createElement("li");
                li.textContent = `${key}: ${user[key]}`;
                ul.appendChild(li);
            }
        }
        errorElement.textContent = ""; // Clear any previous error messages
    } catch (error) {
        console.error("Fetch error:", error);
        errorElement.textContent = "Failed to fetch user information. Please check your internet connection."; // Display network error message
    }
}