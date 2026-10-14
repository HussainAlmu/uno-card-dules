/*---------------------------- Variables (state) ----------------------------*/

/*------------------------ Cached Element References ------------------------*/
 let userCardsElm = document.querySelector("#user-cards")
/*-------------------------------- Functions --------------------------------*/
function drawCards(){
    userCardsElm.textContent = Math.floor(Math.random() * 9) + 1
    let cardColor = Math.floor(Math.random() * 4) + 1
    if (cardColor === 1){
         userCardsElm.style.color = "blue";
    }else if(cardColor === 2){
        userCardsElm.style.color = "red";
    }else if(cardColor === 3){
        userCardsElm.style.color = "green";
    }else if(cardColor === 4){
        userCardsElm.style.color = "yellow";
    }
    
   
}
drawCards()

/*----------------------------- Event Listeners -----------------------------*/
