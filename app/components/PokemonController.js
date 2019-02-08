import PokemonService from "./PokemonService.js";

let _pokemonService = new PokemonService(draw)

function draw() {
    let template = ''
    let pokemons = _pokemonService.Pokemons
    pokemons.forEach(pokemon => {
        template += `<button class="col-2 btn btn-outline-info btn-dark m-1" onclick="app.controllers.pokemonController.getPokemonDetails('${pokemon.name}')">${pokemon.name}</button>`
    })

    document.querySelector("#pokemons").innerHTML = template;
}

function drawPokemonDetails(pokemon) {
    let template = `
        <div class="col-2 border border-dark rounded m-1">
            <h3>${pokemon.name}</h3>
            <img src="${pokemon.sprites["front_default"]}" alt="" srcset="">
            <p>Weight: ${pokemon.weight}</p>
        </div>
    `
    document.querySelector("#pokemon").innerHTML = template;
}

export default class PokemonController {
    constructor() {
    }

    getPokemonDetails(name) {
        _pokemonService.getPokemonDetails(name, drawPokemonDetails)
    }
}