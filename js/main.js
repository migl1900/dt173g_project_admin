// Menu toggle function. Toggle class active on nav elements
function toggleMenu() {
    let newHamburgerMenuEl = document.getElementById("hamburgerMenu");
    let newcloseMenuEl = document.getElementById("closeMenu");
    let newnavMenuEl = document.getElementById("navMenu");
    newHamburgerMenuEl.classList.toggle("active");
    newcloseMenuEl.classList.toggle("active");
    newnavMenuEl.classList.toggle("active");
}