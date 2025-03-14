let links = document.getElementsByClassName("navigate-link")
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", () => {
        links[i].classList.add("active")
    })
}