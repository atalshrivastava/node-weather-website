console.log('started');

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const errorMessage = document.querySelector('#errorMessage');
const message = document.querySelector('#message')
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    message.textContent = '';
    errorMessage.textContent = '';
    message.textContent = 'loading';
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(response.error)
                errorMessage.textContent = data.error
            } else {
                message.textContent = data.forecast
                console.log(data)
            }
        })
    })

})