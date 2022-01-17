// //  menu toggle nav desktop
// let navidation = document.querySelector('#navDesktop')
// let main = document.querySelector('.main')

// toggle.onclick = function () {
//     navidation.classList.toggle('active')
//     main.classList.toggle('active')
// }


// add active class in selected list item
let list = document.querySelectorAll('#navDesktop ul .list')

function activeLink() {
    list.forEach(item => {
        item.classList.remove('active');
        this.classList.add('active');
    })
    // this.classList.add('active');
}
list.forEach(item => item.addEventListener('click', activeLink));

activeLink()