const startBtn = document.querySelector("#start")
const screens = document.querySelectorAll(".screen")
const timeList = document.querySelector("#time-list")
let time = 0
let score = 0
const timeEl = document.querySelector("#time")
const board = document.querySelector("#board")
 

function random(number1) {
    return Math.floor(Math.random() * (number1+1));
  }

function createRandomRgb(){
    return 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
    
  }

startBtn.addEventListener("click", (event) => {
    event.preventDefault()
    screens[0].classList.add("up")
})

timeList.addEventListener("click", (event) => 
{
if(event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"))
    screens[1].classList.add("up")
    startGame()
}
})

board.addEventListener("click", event => {
    if (event.target.classList.contains("circle")){
        score++
        event.target.remove()
        createRandomCircle()
    }
})




function startGame() {
   setInterval(decreaseTime, 1000)
    timeEl.innerHTML = `00:${time}`
    createRandomCircle()
}

function decreaseTime() {
    if (time === 0){
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
   
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}
function finishGame() {
    timeEl.parentNode.classList.add("hide")
    board.innerHTML = `<h1>Счёт:<span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    let rndCol = createRandomRgb() 
     const circle = document.createElement('div')
     circle.style.backgroundColor = rndCol
     circle.style.boxShadow = `0 0 2px ${rndCol}, 0 0 10px ${rndCol}`
     const size = getRandomNumber(20, 60)
     const {width, height} = board.getBoundingClientRect()
     const x = getRandomNumber(0, width - size)
     const y = getRandomNumber(0, height - size)

     circle.classList.add("circle")
     circle.style.width = `${size}px`
     circle.style.height = `${size}px`
     circle.style.top = `${y}px`
     circle.style.left = `${x}px`

     board.append(circle)
}

function getRandomNumber (min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
