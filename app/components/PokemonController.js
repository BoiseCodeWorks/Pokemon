import PokemonService from "./PokemonService.js";

let _pokemonService = new PokemonService(draw)


//private functions
function draw() {
    let template = ''
    let pokemons = _pokemonService.Pokemons
    pokemons.forEach(pokemon => {
        template += `<button class="col-2 btn btn-outline-info btn-dark m-1" onclick="app.controllers.pokemonController.getPokemonDetails('${pokemon.name}')">${pokemon.name}</button>`
    })

    document.querySelector("#pokemons").innerHTML = template;
}

function drawPokemonDetails(pokemon, templateOnly) {
    let template = `
        <div class="col-2 border border-dark rounded m-1">
            <h3>${pokemon.name}</h3>
            <img src="${pokemon.sprites["front_default"]}" alt="" srcset="">
            <p>Weight: ${pokemon.weight}</p>
            <button class="btn btn-outline-info btn-light" onclick="app.controllers.pokemonController.addToTeam()">Add to my Team</button>
        </div>
    `
    if (templateOnly) {
        return template
    }
    document.querySelector("#pokemon").innerHTML = template;
}

function drawMyTeam(myTeam) {
    let template = ''
    myTeam.forEach(pokemon => {
        template += drawPokemonDetails(pokemon, true)
    })
    document.querySelector('#my-team').innerHTML = template
}

export default class PokemonController {
    constructor() {
    }

    getPokemonDetails(name) {
        _pokemonService.getPokemonDetails(name, drawPokemonDetails)
    }

    addToTeam(){
        _pokemonService.addToTeam(drawMyTeam)
    }
}