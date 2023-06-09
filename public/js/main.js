document.querySelector('h1').addEventListener('click', turnGreen)

function turnGreen() {
    document.querySelector('h1').classList.toggle('makeGreen')
    console.log('Greenified')
}




// Delete Function

// const deleteBtn = document.querySelectorAll('.del')

// Array.from(deleteBtn).forEach((el)=>{
//     el.addEventListener('click', deleteHero)
// })



// async function deleteHero(){
//     const heroId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('heroes/deleteHero', {
//             method: 'delete',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'heroIdFromJSFile': heroId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }