console.log("Javescript file loaded...")
const weatherform = document.querySelector("form")
const search = document.querySelector('input')
const msgone = document.querySelector("#msgone")
const msgtwo = document.querySelector("#msgtwo")

weatherform.addEventListener("submit",(e)=>{
    e.preventDefault()
    const add=search.value
    msgone.textContent="Loading..."
    msgtwo.textContent=" "
    if(!add){
        msgone.textContent="Enter location."
    }else{
    fetch("http://localhost:3000/weather?address="+add).then((res) => {
    res.json().then((data) => {
        if (data.error) {
            msgone.textContent=" "
            msgtwo.textContent=data.error
        } else {
            msgone.textContent=" "
            msgtwo.textContent="Temperature is "+ data.temperature+" and it feelslike "+data.feelslike+" in "+data.address
        }
    })
})}
 
})