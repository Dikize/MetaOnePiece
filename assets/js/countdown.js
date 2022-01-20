const MINUTES = 60
const HOURS = 60 * MINUTES
const DAYS = 24 * HOURS
const elements = {
    days: document.querySelector('#days'),
    hours: document.querySelector('#hours'),
    minutes: document.querySelector('#minutes'),
    seconds: document.querySelector('#seconds'),
}
let previousDiff = {}

// Calculer la différence en seconde entre les 2 dates
function refreshCountdown() {
    const countdown = document.querySelector('#countdown')
    const launchDate = Date.parse(countdown.dataset.time) / 1000
    const difference = launchDate - Date.now() / 1000
    const diff = {
        days: Math.floor(difference / DAYS),
        hours: Math.floor(difference % DAYS / HOURS),
        minutes: Math.floor(difference % HOURS / MINUTES),
        seconds: Math.floor(difference % MINUTES),
    }
    updateDoms(diff)
    window.setTimeout(() => {
        window.requestAnimationFrame(refreshCountdown)
        // window.mozRequestAnimationFrame(refreshCountdown)
        // window.webkitRequestAnimationFrame(refreshCountdown)
    }, 1000)
}

/**
 * Met à jours la structure du HTML en fonction d'un nouvel interval
 * @param {{days: number, hours: number, minutes: number, seconds: number}} diff
 */
function updateDoms(diff) {
    Object.keys(diff).forEach((key) => {
        if (previousDiff[key] !== diff[key]) {
            elements[key].innerText = diff[key]
        }
    })

    previousDiff = diff
}

refreshCountdown()

