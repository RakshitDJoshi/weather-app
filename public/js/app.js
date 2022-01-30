const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    // prevent the page from refreshing on clicking on submitting
    event.preventDefault()

    const location = search.value

    message1.textContent = 'loading...'
    message2.textContent = ''

    fetch('http://localhost:3000/weather?location=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            message1.textContent = data.error
        } else {
            message1.textContent = data.location
            message2.textContent = data.forecast
        }
    })
})

})