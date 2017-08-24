console.log('oop.js is running')

// Object literal syntax
let drink = { name: 'Gin N Tonic', bac: 1.5 }
drink.name // => "Gin N Tonic"

// Constructor function
function Drink (n, b) {
  this.name = n
  this.bac = b
}
// function Drink(n, b){
//   return {
//     name: n
//     bac: b
//   }
// }

let budLight = new Drink('Budlight', 0.5)
budLight.name // => "Budlight"

// JS Classes
class Cocktail {
  constructor (n, b) {
    this.name = n
    this.bac = b
    this.full = true
  }
  consume () {
    this.full = false
    console.log(`Your drink is empty: ${this.name}`)
  }
  // create a method called refill that changes this.full to true and logs your drink is now full
  refill () {
    this.full = true
    console.log(`Your ${this.name} is full ${this.full} `)
  }
}

let bourbon = new Cocktail('The Burbs', 2.5)
bourbon.consume()
bourbon.refill()
