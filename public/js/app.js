console.log('Client side javascript file is loaded!')

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })



// fetch('https://dps.psx.com.pk/market-watch').then((response) => {
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=Muscat').then((response)=> {
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const address = document.querySelector('input')
const message_1 = document.querySelector('#message-1')
const message_2 = document.querySelector('#message-2')

message_1.textContent = ''
message_2.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = address.value
    //console.log('Testing!' , location)
    message_1.textContent = 'Loading...'
    fetch('http://localhost:3000/weather?address='+location).then((response)=> {
        response.json().then((data) => {
            if(data.error){
                message_1.textContent = data.error
            }else{
                console.log(data)
                message_1.textContent = data.address
                message_2.textContent = data.forecast.weather


            }
        })
    })
})