const menu = document.querySelector('#mobile-menu');
const mobilelinks = document.querySelector('.navbar__menu');

// Display the mobile nav
const mobileMenu = () => {
    menu.classList.toggle('is-active');
    mobilelinks.classList.toggle('active')
}

menu.addEventListener('click', mobileMenu);
