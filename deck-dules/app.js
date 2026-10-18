const h1Element = document.querySelector("#cards")
const hitButtonElement = document.querySelector('#hit')
const total = document.querySelector('#total')
const botCards = document.querySelector("#botCards")
const botTotal = document.querySelector('#botTotal')
const stand = document.querySelector('#stand')
const point = document.querySelector('#points')
const input = document.querySelector('#input')
const imgCardElm = document.querySelector("#card-img");
const imgBotCardElm = document.querySelector("#botCard-img");
const matchTextElm = document.querySelector("#match-result");
const streakElm = document.querySelector('#streak')

let wins = 0
let cards = []
let botCard = []

function limitInputToPoints() {
    const points = Number(point.textContent)
    input.max = points
    if (Number(input.value) > points) input.value = points
}

input.addEventListener('input', limitInputToPoints)
limitInputToPoints()

console.log(imgCardElm)


function updateStreak() {

    streakElm.textContent = Number(streakElm.textContent)++
    return
}

function firstCards() {
    if (showGameOver()) return
    cards = []
    botCard = []
    cards.unshift(Math.floor(Math.random() * 12) + 1)
    cards.unshift(Math.floor(Math.random() * 12) + 1)
    h1Element.textContent = cards.join(' ');
    botCard.unshift(Math.floor(Math.random() * 12) + 1)
    botCards.textContent = botCard.join(' ')
    matchTextElm.textContent = ''
    sumTotal()
    botSumTotal()
    numberToImage()
    input.disabled = false
}

function numberToImage() {


    let numbers = h1Element.textContent.trim().split(/\s+/);
    let botNumbers = botCards.textContent.trim().split(/\s+/);
    imgCardElm.textContent = ''
    imgBotCardElm.textContent = ''

    numbers.forEach(number => {
        let img = document.createElement("img");
        img.src = `image${number}.png`;
        img.alt = `Image ${number}`;
        imgCardElm.appendChild(img);
    });

    botNumbers.forEach(number => {
        let img = document.createElement("img");
        img.src = `image${number}.png`;
        img.alt = `Image ${number}`;
        imgBotCardElm.appendChild(img);
    });
}

console.log(cards)

window.addEventListener("load", firstCards)

let hitButton = document.querySelector("#hit")


function sumTotal() {
    const splitNum = h1Element.textContent.split(' ')
    console.log(splitNum)
    let sum = 0

    for (let num of splitNum) {
        sum = Number(num) + sum
    }
    console.log(`Total: ${sum}`)
    total.textContent = (sum)

}
function botSumTotal() {
    const splitNum = botCards.textContent.split(' ')
    console.log(splitNum)
    let sum = 0

    for (let num of splitNum) {
        sum = Number(num) + sum
    }
    console.log(`Total: ${sum}`)
    botTotal.textContent = (sum)
}
window.addEventListener("load", sumTotal)
window.addEventListener("load", botSumTotal)


function showGameOver() {
    if (point.textContent !== '0') return false
    matchTextElm.textContent = 'game over'
    return true
}

function hitFun() {
    limitInputToPoints()
    if (showGameOver()) return
    if (input.value === '') return
    cards.unshift(Math.floor(Math.random() * 12) + 1)
    h1Element.textContent = cards.join(' ')
    sumTotal()
    botSumTotal()
    numberToImage()
    input.disabled = true

    if (Number(total.textContent) > 21) {
        matchTextElm.textContent = 'loss'
        point.textContent = Number(point.textContent) - Number(input.value)
        limitInputToPoints()
        if (showGameOver()) return
        setTimeout(firstCards, 1000)
        streakElm.textContent = 0
    }
}

async function standFun() {
    limitInputToPoints()
    if (showGameOver()) return
    if (input.value === '') return
    while (Number(botTotal.textContent) < Number(total.textContent) && Number(botTotal.textContent) <= 21) {
        console.log("hi")
        await new Promise((resolve) => setTimeout(resolve, 500))
        botCard.unshift(Math.floor(Math.random() * 12) + 1)
        botCards.textContent = botCard.join(' ')
        botSumTotal()
        numberToImage()
    }

    if (Number(botTotal.textContent) > 21) {
        matchTextElm.textContent = 'win'
        point.textContent = Number(point.textContent) + Number(input.value) * 2
        limitInputToPoints()
        setTimeout(() => {
            matchTextElm.textContent = ''
            firstCards()
        }, 1000)
        streakElm.textContent = Number(streakElm.textContent) + 1

        return
    }

    if (Number(botTotal.textContent) === Number(total.textContent)) {
        matchTextElm.textContent = 'draw'
        setTimeout(() => {
            matchTextElm.textContent = ''
            firstCards()
        }, 1000)
        return
    }

    if (Number(botTotal.textContent) < Number(total.textContent)) {
        matchTextElm.textContent = 'loss'
        point.textContent = Number(point.textContent) - Number(input.value)
        limitInputToPoints()
        if (showGameOver()) return
        setTimeout(() => {
            matchTextElm.textContent = ''
            firstCards()
        }, 1000)
        streakElm.textContent = 0
        return
    }

    matchTextElm.textContent = 'loss'
    point.textContent = Number(point.textContent) - Number(input.value)
    limitInputToPoints()
    if (showGameOver()) return
    setTimeout(() => {
        matchTextElm.textContent = ''
        firstCards()
    }, 1000)
    streakElm.textContent = 0

}

stand.addEventListener('click', standFun)
hitButtonElement.addEventListener('click', hitFun)


window.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') hitFun()
});

window.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') standFun()
});

