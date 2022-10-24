//  Javascript - Promises
const clickBtn = document.querySelector('.btn')

clickBtn.addEventListener('click', () => {
colorEvent(1000, '.first', 'red') // one second
.then(()=> colorEvent(3000, '.second', 'blanchedalmond')) // three seconds
.then(()=> colorEvent(2000, '.third', 'green')) // two seconds
.catch((err) => console.log(log))
})

// Function for the colors
function colorEvent(time, styleSelector, color) {
  const elementAction = document.querySelector(styleSelector)
  return new Promise((resolve, reject) => {
    if (elementAction) {
      setTimeout(() => {
        elementAction.style.color = color
        resolve()
      }, time)
    } else {
      reject(`${styleSelector}`)
    }
  })
}