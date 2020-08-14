document.addEventListener('DOMContentLoaded', () =>{
  //Cards detalis
  const cards = [
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    }

  ]

  //placing all the cards in random order
  cards.sort(() => 0.5 - Math.random() )

 //selecting elements
  const scoreboard = document.getElementById("num")
  const stepboard = document.getElementById("step")
  const status = document.getElementById("status")
  const gridd = document.querySelector('.grid')
  //variables
  let cardChosen = []
  let cardChosenId = []
  let cardDone = []
  let points = 0
  let steps = 0

  //createing initial board
  function createBoard() {
    for (let i = 0; i < 12; i++) {
      var cardd = document.createElement('img')
      cardd.setAttribute('src', 'images/blank.png')
      cardd.setAttribute('data-id', i)
      cardd.addEventListener('click', flipCard);
      gridd.appendChild(cardd)
    }
  }

  //Function to check if the two selected cards matched
  function checkIfMatch(){
    let allCards = document.querySelectorAll('img')
    const c1Id = cardChosenId[0]
    const c2Id = cardChosenId[1]

    if(cardChosen[0] === cardChosen[1]){
      points++
      if(points == 6){
        status.innerHTML = "."
      }
      else{
        status.innerHTML = `You got a match!!!`
      }

      //changing the done images to white images
      allCards[c1Id].setAttribute('src', 'images/white.png')
      allCards[c2Id].setAttribute('src', 'images/white.png')
      //removing EventListener from the done images
      allCards[c1Id].removeEventListener('click', flipCard)
      allCards[c2Id].removeEventListener('click', flipCard)
      //pushing the chosen cards to cardDone
      cardDone.push(cardChosen[0])

      scoreboard.innerHTML = `Score: ${points}/6`
      if(cardDone.length === (cards.length)/2){
        var endCard = document.querySelectorAll('img')
        for (let i = 0; i < 12; i++) {
          endCard[i].remove()
        }
          const final = document.getElementById('winner')
          final.innerHTML = `You are a Winner!`
      }
    }
    else{
      status.innerHTML = `Didn't match, try again!`
      allCards[c1Id].setAttribute('src', 'images/blank.png')
      allCards[c2Id].setAttribute('src', 'images/blank.png')
    }
    cardChosen = []
    cardChosenId = []

  }
  //Function to flip a card
  function flipCard(){
    steps++
    stepboard.innerHTML = `Steps: ${steps}`
    let cardId = this.getAttribute('data-id')
    cardChosen.push(cards[cardId].name)
    cardChosenId.push(cardId)
    this.setAttribute('src', cards[cardId].img)
    if(cardChosen.length === 2){
        if(cardChosenId[0] === cardChosenId[1]){
          cardChosenId = []
          cardChosen = []
          cardChosen.push(cards[cardId].name)
          cardChosenId.push(cardId)
          steps--
          stepboard.innerHTML = `Steps: ${steps}`
        }
        else{
          setTimeout(checkIfMatch, 500)
        }
    }
  }
  //Calling the function which creates the whole board
  createBoard()
})
