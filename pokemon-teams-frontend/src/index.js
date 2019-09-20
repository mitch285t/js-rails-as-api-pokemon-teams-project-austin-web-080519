const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


{/* <div class="card" data-id="1"><p>Prince</p>
  <button data-trainer-id="1">Add Pokemon</button>
  <ul>
    <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
  </ul>
</div> */}

document.addEventListener('DOMContentLoaded', (event) => {
    function addListen(button) {
        button.addEventListener("click", (event) => {
            let trainerId = event.target.dataset.trainerId
           
            fetch("http://localhost:3000/pokemons", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'trainer_id': `${trainerId}`
                }),
                
                    
            })
            .then(function(response){
                return response.json();
            })
            .then(function(response){
              let reply =  response
                let list = document.getElementById(trainerId)
                let newlist = document.createElement("li")
                let newbutton = document.createElement("button")
                let newname = reply.nickname
                let newspecies = reply.species
                let newId = reply.id
                newlist.innerText = `${newname} (${newspecies})`
                newbutton.setAttribute("class", "release")
                newbutton.setAttribute("data-pokemon-id", newId)
                newbutton.innerText = "Release"
                newlist.appendChild(newbutton)
                list.appendChild(newlist)
            })

            
        })
    }
    function release (button){
        button.addEventListener("click", (event) =>{
            let id = event.target.dataset.pokemonId
        fetch(`http://localhost:3000/pokemons/${id}`, {
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            }
        })
    
        .then(function(response){
            return response.json();
        })
        .then(function(pokemons){
            event.target.parentNode.remove()
        })    
        })
        
    }
    fetch("http://localhost:3000/trainers")
    .then(function(response){
        return response.json();
         })
         .then(function(trainer) {
             let mainDiv = document.querySelector("main")
              for(let i = 0; i < trainer.length; i++) {
              const trainerName = trainer[i].name
              const trainerDiv = document.createElement("div")
              const divclass = trainerDiv.setAttribute("class", "card")
              const dataName = trainerDiv.setAttribute("data-id", trainer[i].id)
              const makeP = document.createElement("p")
              const makeButton = document.createElement("button")
              const ul = document.createElement("ul")
              ul.setAttribute("id", trainer[i].id)
              const buttonId = makeButton.setAttribute("data-trainer-id", trainer[i].id)
              makeButton.innerText = "add Pokemon"
              addListen(makeButton)
              makeP.innerText = trainerName
              mainDiv.appendChild(trainerDiv)
              trainerDiv.appendChild(makeP)
              trainerDiv.appendChild(makeButton)
              trainerDiv.appendChild(ul)

            for(let j = 0; j< trainer[i].pokemons.length; j++) {
                const pokeNickName = trainer[i].pokemons[j].nickname 
                const pokeSpecies= trainer[i].pokemons[j].species
                const pokeId = trainer[i].pokemons[j].id
                const li = document.createElement("li")
                li.innerText = `${pokeNickName} (${pokeSpecies})`
                ul.appendChild(li)
                const relButton = document.createElement("button")
                relButton.setAttribute("class", "release")
                relButton.setAttribute("data-pokemon-id", pokeId)
                relButton.innerText = "Release"
                li.appendChild(relButton)
                release(relButton)

            }

         }
        })


})