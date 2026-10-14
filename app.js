/*---------------------------- Variables (state) ----------------------------*/
let UserCardsElm = []
let turn
/*------------------------ Cached Element References ------------------------*/
const contanerUserCardsElm = document.querySelector("#user-card-contaner")
const discardCardElm = document.querySelector("#DiscardCard")
const drawCardButtonElm = document.querySelector("#draw-card")
const contanerBotCardsElm = document.querySelector("#bot-card-contaner")


/*-------------------------------- Functions --------------------------------*/
function drawCards(amount, side) {
    if (side === 'both') {
        for (let index = 0; index < amount; index++) {
            const newCard = document.createElement("h1");
            newCard.textContent = Math.floor(Math.random() * 9) + 1;
            newCard.classList.add('user-card');
            UserCardsElm.push(newCard)
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
            contanerUserCardsElm.append(newCard);
        }
        for (let index = 0; index < amount; index++) {
            const newCard = document.createElement("h1");
            newCard.textContent = Math.floor(Math.random() * 9) + 1;
            newCard.classList.add('user-card');
            UserCardsElm.push(newCard)
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
            contanerBotCardsElm.append(newCard);
        }
    }
    else if (side === 'user') {
        for (let index = 0; index < amount; index++) {
            const newCard = document.createElement("h1");
            newCard.textContent = Math.floor(Math.random() * 9) + 1;
            newCard.classList.add('user-card');
            UserCardsElm.push(newCard)
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
            contanerUserCardsElm.append(newCard);
        }
    } else if (side === 'bot') {
        for (let index = 0; index < amount; index++) {
            const newCard = document.createElement("h1");
            newCard.textContent = Math.floor(Math.random() * 9) + 1;
            newCard.classList.add('user-card');
            UserCardsElm.push(newCard)
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
            contanerBotCardsElm.append(newCard);
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
        if (event.target.textContent === discardCardElm.textContent || event.target.style.color === discardCardElm.style.color) {
            console.log(true)
            event.target.remove()
            discardCardElm.textContent = event.target.textContent
            discardCardElm.style.color = event.target.style.color
            turn = "bot"
        }
    }

    let botPlayedCard = false
    if (turn === 'bot') {
        for (let index = 0; index < contanerBotCardsElm.children.length; index++) {
            if (contanerBotCardsElm.children[index].textContent === discardCardElm.textContent || contanerBotCardsElm.children[index].style.color === discardCardElm.style.color) {
                discardCardElm.textContent = contanerBotCardsElm.children[index].textContent
                discardCardElm.style.color = contanerBotCardsElm.children[index].style.color
                contanerBotCardsElm.children[index].remove()
                turn = 'user'
                botPlayedCard = true
                break
            }
        }
        if (!botPlayedCard) {
            drawCards(1, "bot")
        }
    }
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

