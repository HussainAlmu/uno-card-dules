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
    const newCard = document.createElement("h1");
    const number = Math.floor(Math.random() * 14) + 1;
    if (number < 10) {
        newCard.textContent = number
        newCard.classList.add('user-card');
        UserCardsElm.push(newCard)
        PickColor(newCard)

        contaner.append(newCard);
    } else if (number === 10) {
        newCard.textContent = "2+"
        newCard.classList.add('user-card');
        UserCardsElm.push(newCard)
        PickColor(newCard)
        contaner.append(newCard);
    } else if (number === 11) {
        newCard.textContent = "s"
        newCard.classList.add('user-card');
        UserCardsElm.push(newCard)
        PickColor(newCard)
        contaner.append(newCard);
    } else if (number === 12) {
        newCard.textContent = "⊙"
        newCard.classList.add('user-card');
        UserCardsElm.push(newCard)
        PickColor(newCard)
        contaner.append(newCard);
    }
    else if (number === 13) {
        newCard.textContent = "4+"
        newCard.classList.add('user-card');
        UserCardsElm.push(newCard)
        contaner.append(newCard);
    }
    else if (number === 14) {
        newCard.textContent = "✦"
        newCard.classList.add('user-card');
        UserCardsElm.push(newCard)
        contaner.append(newCard);
    }
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
            if (contanerBotCardsElm.children[index].textContent === discardCardElm.textContent || contanerBotCardsElm.children[index].style.color === discardCardElm.style.color) {
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

function UserColor(event) {
    console.log(event.target.textContent)
    discardCardElm.style.color = event.target.textContent
    colorPickButtonElm.forEach((button) => {
        button.style.display = "none";
    });

}



drawCards(9, 'both')
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
