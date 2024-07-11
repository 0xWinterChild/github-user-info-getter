document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("click", (event) => {
        event.preventDefault();
        if (event.target.tagName === "BUTTON") {
            const input = document.getElementById("github-username");
            const username = input.value;
            console.log(username);
            input.value = "";
            input.focus();
            fetchUserInfo(username);
        }
    })
})

const fetchUserInfo = async (username) => {
    let response = await fetch(`https://api.github.com/users/${username}`);
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
}