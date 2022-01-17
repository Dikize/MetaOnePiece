

function scrl() {

    var pos = Math.max(0, Math.min(1 ,(window.scrollY / (document.body.scrollHeight - window.innerHeight))));

    let allLines = document.querySelectorAll('.nav_line');
    let allLinks = document.querySelectorAll('.nav_link');
    
    for (let i = 0 ; i < 5 ; i++) {

        if (i == Math.floor(pos * 4 + 0.5)) {
            allLines[i].classList.add('inView');
            allLinks[i].classList.add('inView');
        } else {
            allLines[i].classList.remove('inView');
            allLinks[i].classList.remove('inView');
        }
    }
}

function openMenu() {
    document.querySelector('nav').classList.add('open');
    document.querySelector('.blackBackground').classList.add('open');
}

function closeMenu() {
    document.querySelector('nav').classList.remove('open');
    document.querySelector('.blackBackground').classList.remove('open');
}

scrl();
window.onscroll = function() { scrl(); }