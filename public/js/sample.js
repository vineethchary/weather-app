console.log('clientside javascript file loaded')



const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#location')
const messageTwo = document.querySelector('#summary')



weatherform.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent='Fetching Data.......'
    messageTwo.textContent = ''


    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data)=>{
        if(data.error){
            //console.log(data.error)
            //document.getElementById('error').innerHTML=data.error
            messageOne.textContent=data.error
            messageTwo.textContent = ''
        }
        else{
            // console.log(data.location)
            // console.log(data.summary)
            // document.getElementById('location').innerHTML=data.location
            // document.getElementById('summary').innerHTML=data.summary
            messageOne.textContent= data.location
            messageTwo.textContent = data.summary
        }
        
    })
})


})