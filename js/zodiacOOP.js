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
    this.charDiv = document.getElementById('char')
    this.scoreBox = document.getElementById('score')
    this.bigPicDiv = document.getElementById('bigPic')
    this.toggleQuiz = document.getElementById('quizMe')
    this.quizResponse = document.getElementById('quizResponse')
    this.toggleQuiz.addEventListener('click', this.startQuiz.bind(this))
    this.sound = new Audio()
    this.isQuiz = false
    this.quizAnimal = {}
    this.renderThumbnails()
  }
// function myFunc(){}
// () => {}
  renderThumbnails () {
    this.animals.map((a, i) => {
      let thumb = new Image()
      thumb.src = `images/${a.eng}.jpg`
      thumb.eng = a.eng
      thumb.chi = a.chi
      thumb.pin = a.pin
      thumb.indx = i
      thumb.style.backgroundColor = 'white'
      thumb.style.marginTop = '10px'
      this.isQuiz ? thumb.addEventListener('click', this.checkAnswer.bind(this)) : thumb.addEventListener('click', this.practiceWords.bind(this))
      this.thumbsDiv.appendChild(thumb)
    })
  }

  practiceWords (e) {
    let clickedAnimal = e.target
    this.sound.pause()
    this.sound.src = `audio/${clickedAnimal.eng}.mp3`
    this.sound.play()
    let bigPic = new Image()
    bigPic.src = `images/${clickedAnimal.eng}.jpg`
    this.bigPicDiv.innerHTML = ''
    this.charDiv.innerHTML = ''
    // let bigPic = `<img src="images/${clickedAnimal.eng}.jpg" width="100%" height="auto"><br>${clickedAnimal.eng} - ${clickedAnimal.pin}`
    this.bigPicDiv.appendChild(bigPic)
    let charPic = new Image()
    charPic.src = `images/char-${clickedAnimal.chi}.jpg`
    // let charPic = `<img src="images/char-${clickedAnimal.chi}.jpg" width="65%" height="auto">`
    this.charDiv.appendChild(charPic)
  }

  checkAnswer (e) {
    let clickedAnimal = e.target
    if (clickedAnimal.chi == this.quizAnimal.chi) {
      this.quizResponse.innerHTML = 'Correct! Good Job!'
      this.thumbsDiv.removeChild(e.target)
      this.animals = this.animals.filter(a => a.chi != clickedAnimal.chi)
      this.startQuiz()
    } else {
      this.quizResponse.innerHTML = 'Sorry! Try again!'
      this.startQuiz()
    }
  }

  startQuiz () {
    this.isQuiz = true
    this.thumbsDiv.innerHTML = ''
    this.renderThumbnails()
    this.sound.pause()
    let randNum = Math.floor(Math.random() * this.animals.length)
    this.quizAnimal = this.animals[randNum]
    this.sound.src = `audio/${this.quizAnimal.chi}.mp3`
    this.sound.play()
    this.bigPicDiv.innerHTML = 'What animal name did I say in Chinese?<br>Click the correct thumb pic!'
    let charPic = `<img src="images/char-${this.quizAnimal.chi}.jpg">`
    this.charDiv.innerHTML = charPic
    this.scoreBox.style.display = 'block'
    this.charDiv.style.display = 'block'
    console.log(this.quizAnimal)
  }

}
