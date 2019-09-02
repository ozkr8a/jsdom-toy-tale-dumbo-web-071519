const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
    //ADDED
const card = document.getElementById("toy-collection")
const addToyForm = document.querySelector('.add-toy-form')

// YOUR CODE HERE
function fetchToys() {
    return fetch('http://localhost:3000/toys')
        .then(resp => resp.json())
        .then(showToys)
}

function showToys(jsonToys) {
    card.innerHTML = ""
    console.log(jsonToys);
    jsonToys.forEach(toy => {
        card.innerHTML +=
            `<div class="card" data-id=${toy.id}> 
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar">
        <p>${toy.likes}</p>
        <button class="like-btn">LIKE <3</button>
        <button class="delete-btn">Delete</button>
        </div>`
            //if img tag set to a variable 'img' you can do img.setAttribute('src', toy.image)
            //same with other tags like buttons for this instance
    })
}

addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
        toyForm.style.display = 'block'
    } else {
        toyForm.style.display = 'none'
    }
})

addToyForm.addEventListener("submit", function(e) {
        fetch("http://localhost:3000/toys", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: `${e.target.name.value}`,
                    image: `${e.target.image.value}`,
                    likes: 0
                })
            })
            .then(resp => resp.json())
            .then(console.log("TOYFORM COMPLETED"))
    })
    // OR HERE!

card.addEventListener("click", e => {
    let likeBtnPressed = e.target.className === "like-btn"
    let delBtnPressed = e.target.className === "delete-btn"

    if (likeBtnPressed) {
        let id = e.target.parentElement.dataset.id
        let like = e.target.previousElementSibling
        let likeCount = parseInt(e.target.previousElementSibling.innerText)

        //CHANGE ON THE SERVER
        fetch(`http://localhost:3000/toys/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    likes: likeCount
                })
            }).then(response => response.json())
            .then(function(likeObj) {
                //CHANGE ON THE DOM TO DISPLAY
                like.innerText = `${++likeCount}`
            })
    } else if (delBtnPressed) {
        let id = e.target.parentElement.dataset.id

        fetch(`http://localhost:3000/toys/${id}`, {
                method: 'DELETE'
            })
            .then(resp => resp.json())
            .then(fetchToys)
    }
})

//CALLING FETCHTOYS FUNCTION FOR IT TO SHOW ALL TOYS BY CALLING ON THE FECTCH TO GET ALL DATA FROM OUR JSON FILE/DATABASE
//console.log(fetchToys().then())
fetchToys()