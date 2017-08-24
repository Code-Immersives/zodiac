console.log('App is running')

class Zodiac {
  constructor () {
    this.animals = [
    	{eng: 'chicken', chi: 'ji', pin: 'ji&#772;' },
    	{eng: 'cow', chi: 'niu', pin: 'niu&#769;' },
    	{eng: 'dog', chi: 'gou', pin: 'gou&#780;' },
    	{eng: 'dragon', chi: 'long', pin: 'lo&#769;ng' },
    	{eng: 'goat', chi: 'yang', pin: 'ya&#769;ng' },
    	{eng: 'horse', chi: 'ma', pin: 'ma&#780;' },
    	{eng: 'monkey', chi: 'hou', pin: 'ho&#769;uzi' },
    	{eng: 'pig', chi: 'zhu', pin: 'zhu&#772;' },
    	{eng: 'rabbit', chi: 'tu', pin: 'tu&#768;zi' },
    	{eng: 'rat', chi: 'shu', pin: 'la&#780;oshu&#780;' },
    	{eng: 'snake', chi: 'she', pin: 'she&#769;' },
    	{eng: 'tiger', chi: 'hu', pin: 'la&#780;ohu&#780;' }
    ]
    this.thumbsDiv = document.getElementById('thumbnails')
    this.sound = new Audio()
    this.bigPicDiv = document.getElementById('bigPic')
    this.charDiv = document.getElementById('char')
    this.quizButton = document.getElementById('quizMe')
    this.scoreBox = document.getElementById('score')
    this.quizMode = false
    this.quizButton.addEventListener('click', this.startQuiz.bind(this))
    this.randomAnimal = {}
    this.clicks = 0
    this.rawScore = 0
    this.avgScore = 0
  }
  // function(){}
  // () => {}

  renderThumbnails () {
    this.animals.map((a, i) => {
      let thumb = new Image()
      thumb.src = `images/${a.eng}.jpg`
      thumb.eng = a.eng
      thumb.chi = a.chi
      thumb.pin = a.pin
      thumb.style.backgroundColor = 'white'
      thumb.style.marginTop = '10px'
      this.quizMode ? thumb.addEventListener('click', this.takeQuiz.bind(this)) : thumb.addEventListener('click', this.practiceZodiac.bind(this))
      this.thumbsDiv.appendChild(thumb)
    })
  }

  practiceZodiac (event) {
    let animal = event.target
    this.sound.pause()
    this.sound.src = `audio/${animal.eng}.mp3`
    this.sound.play()
    let bigPic = '<img src="images/' + animal.eng + '.jpg" width="100%" height="auto">'
    bigPic += '<br>' + animal.eng + ' - ' + animal.pin
    this.bigPicDiv.innerHTML = bigPic
    this.displayChar(animal)
  }
  takeQuiz (event) {
    let clickedAnimal = event.target
    this.clicks++
    console.log('taking quiz', clickedAnimal, this.randomAnimal)
    if (this.randomAnimal.eng == clickedAnimal.eng) {
      console.log('correct answer')
    } else {
      console.log('wrong answer')
      this.sound.play()
      this.bigPicDiv.innerHTML = 'Wrong answer, please select another thumb pic.'
      this.bigPicDiv.innerHTML += `<br> <br> <h1>${this.randomAnimal.pin}</h1>`
      this.avgScore = this.rawScore / this.clicks
      let scoreReport = 'Total Clicks: ' + this.clicks + '<br>' + 'Raw Score: ' + this.rawScore + '<br>' + 'Avg Score: ' + this.avgScore.toFixed(3)
      this.scoreBox.innerHTML = scoreReport
    }
  }
  startQuiz () {
    this.quizMode = true
    this.scoreBox.style.display = 'block'
    this.thumbsDiv.innerHTML = ''
    this.renderThumbnails()
    let randomNum = Math.floor(Math.random() * this.animals.length)
    this.randomAnimal = this.animals[randomNum]
    this.sound.pause()
    this.sound.src = `audio/${this.randomAnimal.chi}.mp3`
    this.sound.play()
    this.displayChar(this.randomAnimal)
    this.bigPicDiv.innerHTML = 'What animal name did I say in Chinese?<br>Click the correct thumb pic!'
    this.bigPicDiv.innerHTML += `<br> <br> <h1>${this.randomAnimal.pin}</h1>`
  }
  displayChar (animal) {
    let charPic = '<img src="images/char-' + animal.chi + '.jpg" width="65%" height="auto">'
    this.charDiv.innerHTML = charPic
    this.charDiv.style.display = 'block'
  }

}

let myZodiac = new Zodiac()
myZodiac.renderThumbnails()
