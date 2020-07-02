const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#location')
const messageTwo = document.querySelector('#summary')
const message3 = document.querySelector('#max')
const message4 = document.querySelector('#min')



weatherform.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent='Fetching Data.......'
    messageTwo.textContent = ''
    message3.textContent = ''
    message4.textContent = ''


    fetch('/weather?address='+location).then((response) => {
    response.json().then((data)=>{
        if(data.error){
            //console.log(data.error)
            //document.getElementById('error').innerHTML=data.error
            messageOne.textContent=data.error
            messageTwo.textContent = ''
            message3.textContent = ''
            message4.textContent = ''
        }
        else{
            // console.log(data.location)
            // console.log(data.summary)
            // document.getElementById('location').innerHTML=data.location
            // document.getElementById('summary').innerHTML=data.summary
            messageOne.textContent= data.location
            messageTwo.textContent = data.summary
            message3.textContent = "max temp "+data.max+" F"
            message4.textContent = "min temp "+data.min+" F"
        }
        
    })
})


})