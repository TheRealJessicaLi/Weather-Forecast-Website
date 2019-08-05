console.log('Client side JS file')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const firstMessage = document.querySelector('#firstMessage')
const secondMessage = document.querySelector('#secondMessage')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    firstMessage.textContent = "Loading..."
    secondMessage.textContent = ""
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                firstMessage.textContent = data.error
                secondMessage.textContent = ""
                return
            }
            firstMessage.textContent = data.location
            secondMessage.textContent = data.forecast
        })
    })
})