/*---------------------------- Variables (state) ----------------------------*/
let UserCardsElm = []
let turn
/*------------------------ Cached Element References ------------------------*/
const contanerUserCardsElm = document.querySelector("#user-card-contaner")
const discardCardElm = document.querySelector("#DiscardCard")
const drawCardButtonElm = document.querySelector("#draw-card")
const contanerBotCardsElm = document.querySelector("#bot-card-contaner")
const contanerMiddleElm = document.querySelector("#middle-contaner")
const colorPickButtonElm = document.querySelectorAll(".pick-color-button")
/*-------------------------------- Functions --------------------------------*/
function PickColor(newCard) {
    let cardColor = Math.floor(Math.random() * 4) + 1
    if (cardColor === 1) {
        newCard.style.color = "blue";
    } else if (cardColor === 2) {
        newCard.style.color = "red";
    } else if (cardColor === 3) {
        newCard.style.color = "green";
    } else if (cardColor === 4) {
        newCard.style.color = "yellow";
    }
}

function drawCards(amount, side) {
    if (side === 'both') {
        for (let index = 0; index < amount; index++) {
            CardGen(contanerUserCardsElm)
        }


        for (let index = 0; index < amount; index++) {
            CardGen(contanerBotCardsElm)
        }
    }

    else if (side === 'user') {
        for (let index = 0; index < amount; index++) {
            CardGen(contanerUserCardsElm)
        }
    } else if (side === 'bot') {
        for (let index = 0; index < amount; index++) {
            CardGen(contanerBotCardsElm)
        }
    }
}

function CardGen(contaner) {
    const newCard = document.createElement("img");
    const number = Math.floor(Math.random() * 14) + 1;
    if (number < 10) {
        color = PickColor(newCard)
        newCard.src = `image/${color}_${number}.png`
        newCard.classList.add('user-card');
        UserCardsElm.push(newCard)
        newCard.textContent = number
        newCard.style.color = color
        contaner.append(newCard);
    } else if (number === 10) {
        color = PickColor(newCard)
        newCard.src = `image/${color}_draw_2.png`
        newCard.classList.add('user-card');
        UserCardsElm.push(newCard)
        newCard.style.color = color
        newCard.textContent = '2+'
        contaner.append(newCard);
    } else if (number === 11) {
        color = PickColor(newCard)
        newCard.src = `image/${color}_reverse.png`
        newCard.classList.add('user-card');
        UserCardsElm.push(newCard)
       newCard.style.color = color
         newCard.textContent = 's'
        contaner.append(newCard);

    } else if (number === 12) {
        color = PickColor(newCard)
        newCard.src = `image/${color}_skip.png`
        newCard.classList.add('user-card');
        UserCardsElm.push(newCard)
        newCard.style.color = color
        newCard.textContent = '⊙'
        contaner.append(newCard);
    }
    else if (number === 13) {
        color = PickColor(newCard)
        newCard.src = `image/wild_draw_4.png`
        newCard.classList.add('user-card');
        UserCardsElm.push(newCard)
        newCard.style.color = color
        newCard.textContent = '4+'
        contaner.append(newCard);
    }
    else if (number === 14) {
        color = PickColor(newCard)
        newCard.src = `image/wild_change_color.png`
        newCard.classList.add('user-card');
        UserCardsElm.push(newCard)
        newCard.style.color = color
        newCard.textContent = '✦'
        contaner.append(newCard);
    }
    function PickColor(newCard) {
        let cardColor = Math.floor(Math.random() * 4) + 1
        if (cardColor === 1) {
            newCard.style.color = "blue";
            return "blue"
        } else if (cardColor === 2) {
            newCard.style.color = "red";
            return "red"
        } else if (cardColor === 3) {
            newCard.style.color = "green";
            return "green"
        } else if (cardColor === 4) {
            newCard.style.color = "yellow";
            return "yellow"
        }
    }
}

function createDiscardCard() {
    discardCardElm.textContent = Math.floor(Math.random() * 9) + 1
    let cardColor = Math.floor(Math.random() * 4) + 1
    if (cardColor === 1) {
        discardCardElm.style.color = "blue";
    } else if (cardColor === 2) {
        discardCardElm.style.color = "red";
    } else if (cardColor === 3) {
        discardCardElm.style.color = "green";
    } else if (cardColor === 4) {
        discardCardElm.style.color = "yellow";
    }
}

function playCard(event) {
    if (event && event.target) {
        console.log(event.target)
        if (event.target.textContent === discardCardElm.textContent || event.target.style.color === discardCardElm.style.color) {
            event.target.remove()
            discardCardElm.textContent = event.target.textContent
            discardCardElm.style.color = event.target.style.color

            turn = event.target.textContent === "s" || event.target.textContent === "⊙" ? "user" : "bot"
            if (event.target.textContent === '2+') {
                drawCards(2, 'bot')
                turn = 'user'
            }
        }
        if (event.target.textContent === '✦') {
            event.target.remove()
            colorPickButtonElm.forEach((button) => {
                button.style.display = "block";
            });
            discardCardElm.textContent = '✦'
            console.log(event.target)
        }
        if (event.target.textContent === '4+') {
            event.target.remove()
            drawCards(4, 'bot')
            colorPickButtonElm.forEach((button) => {
                button.style.display = "block";
                discardCardElm.textContent = '4+'
            });
        }
    }



    let botPlayedCard = false
    if (turn === 'bot') {
        for (let index = 0; index < contanerBotCardsElm.children.length; index++) {
            if (contanerBotCardsElm.children[index].textContent === '4+') {
                contanerBotCardsElm.children[index].remove()
                discardCardElm.textContent = '4+'
                discardCardElm.style.color = findCommon()
                drawCards(4, 'user')
            }
            if (contanerBotCardsElm.children[index].textContent === '✦') {
                contanerBotCardsElm.children[index].remove()
                discardCardElm.textContent = '✦'
                discardCardElm.style.color = findCommon()
                turn = 'user'
                return
            }
            if (contanerBotCardsElm.children[index].textContent === discardCardElm.textContent || contanerBotCardsElm.children[index].style.color === discardCardElm.style.color || contanerBotCardsElm.children[index].textContent === '4+') {
                const playedCardText = contanerBotCardsElm.children[index].textContent
                discardCardElm.textContent = playedCardText
                discardCardElm.style.color = contanerBotCardsElm.children[index].style.color
                contanerBotCardsElm.children[index].remove()
                turn = playedCardText === "s" || playedCardText === "⊙" ? "bot" : "user"
                if (playedCardText === '2+') {
                    drawCards(2, 'user')
                    turn = 'bot'
                }
                botPlayedCard = true
                break
            }

        }
        if (!botPlayedCard) {
            drawCards(1, "bot")
            turn = "user"
        } else if (turn === "bot") {
            playCard()
        }
    }
}

function renderCards() {

}

function UserColor(event) {
    console.log(event.target.textContent)
    discardCardElm.style.color = event.target.textContent
    colorPickButtonElm.forEach((button) => {
        button.style.display = "none";
    });

}

function findCommon() {
    let listColor = []
    for (let index = 0; index < contanerBotCardsElm.children.length; index++) {
        listColor.push(contanerBotCardsElm.children[index].style.color)
    }
    console.log(listColor)
    const red = listColor.filter(color => color.includes("red"))
    console.log(red.length)
    const green = listColor.filter(color => color.includes("green"))
    console.log(green.length)
    const blue = listColor.filter(color => color.includes("blue"))
    console.log(blue.length)
    const yellow = listColor.filter(color => color.includes("yellow"))
    console.log(yellow.length)

    const colorCounts = { red: red.length, green: green.length, blue: blue.length, yellow: yellow.length }
    let mostCommonColor = "red"
    if (colorCounts.green > colorCounts[mostCommonColor]) mostCommonColor = "green"
    if (colorCounts.blue > colorCounts[mostCommonColor]) mostCommonColor = "blue"
    if (colorCounts.yellow > colorCounts[mostCommonColor]) mostCommonColor = "yellow"
    return mostCommonColor
}

drawCards(9, 'both')
console.log(findCommon())
createDiscardCard()






/*----------------------------- Event Listeners -----------------------------*/


contanerUserCardsElm.addEventListener('click', playCard)
drawCardButtonElm.addEventListener('click', () => drawCards(1, "user"))
drawCardButtonElm.addEventListener("click", () => {
    turn = "bot";
    playCard();
});
colorPickButtonElm.forEach((button) => {
    button.addEventListener('click', UserColor)
})

colorPickButtonElm.forEach((button) => {
    button.addEventListener("click", (event) => {
        if (discardCardElm.textContent === '✦') turn = "bot"

        playCard(event);
    });
});
