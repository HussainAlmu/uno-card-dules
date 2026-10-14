/*---------------------------- Variables (state) ----------------------------*/
let UserCardsElm = []
/*------------------------ Cached Element References ------------------------*/
let contanerUserCardsElm = document.querySelector("#user-card-contaner")


/*-------------------------------- Functions --------------------------------*/
function drawCards() {

    for (let index = 0; index < 9; index++) {
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
}
drawCards()


function printCardElm(event) {
    console.log(event.target)
}



/*----------------------------- Event Listeners -----------------------------*/

UserCardsElm.forEach(element => {
    element.addEventListener('click', printCardElm)
});