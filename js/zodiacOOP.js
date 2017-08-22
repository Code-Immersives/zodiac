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
    this.sound = new Audio()
    this.isQuiz = false
    this.renderThumbnails()
  }

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
      thumb.addEventListener('click', this.swapPicOrQuiz.bind(this))
      this.thumbsDiv.appendChild(thumb)
    })
  }
  swapPicOrQuiz (e) {
    let clickedAnimal = e.target
    this.sound.pause()
    this.sound.src = `audio/${clickedAnimal.eng}.mp3`
    this.sound.play()
    let bigPic = new Image()
    bigPic.src = `images/${clickedAnimal.eng}.jpg`
    // let bigPic = `<img src="images/${clickedAnimal.eng}.jpg" width="100%" height="auto"><br>${clickedAnimal.eng} - ${clickedAnimal.pin}`
    this.bigPicDiv.appendChild(bigPic)
    let charPic = `<img src="images/char-${clickedAnimal.chi}.jpg" width="65%" height="auto">`
    this.charDiv.appendChild(charPic)
    this.charDiv.style.display = 'block'
  }

}
