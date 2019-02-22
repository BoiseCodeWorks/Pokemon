import Pokemon from "../models/Pokemon.js";

let _pokemon = []
let _selectedPokemon = {}
let _myTeam = []

let pokeAPI = axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
    timeout: 10000
})



export default class PokemonService {
    constructor(drawWhenDone) {
        this.getPokemon(drawWhenDone)
    }

    get Pokemons() {
        return _pokemon.filter(p => p)
    }

    // getPokemon(drawAfterGettingPokemon) {
    //     pokeAPI.get("pokemon")
    //         .then(res => {
    //             console.log(res.data)
    //             _pokemon = res.data.results
    //             drawAfterGettingPokemon()
    //         })
    //         .catch(function (err) {
    //             console.error(err)
    //         })
    // }
    getPokemon(cb) {
        let endpoints = []
        for (let i = 1; i < 151; i++) {
            endpoints.push("/pokemon/"+i)
        }
        let promises = endpoints.map(endPoint => {
            return pokeAPI.get(endPoint)
                .then(res => res.data) 
        })
        Promise.all(promises)
            .then(res => {
                let pokemons = res.map(p => new Pokemon(p))
                _pokemon = pokemons
                setInterval(cb, 1000)
            })
    }

    //callback here refers to drawPokemonDetails from the controller
    getPokemonDetails(name, callback) {
        pokeAPI.get("pokemon/" + name)
            .then(res => {
                console.log(res)
                _selectedPokemon = res.data
                callback(res.data)
            })
            .catch(function (err) {
                console.error(err)
            })
    }

    addToTeam(drawMyTeamCallback) {
        let teamMember = _myTeam.find(poke => poke.name == _selectedPokemon.name)
        if (teamMember) {
            return
        }
        _myTeam.unshift(_selectedPokemon)
        drawMyTeamCallback([..._myTeam])
    }

    removeFromTeam(name, cb) {
        let index = _myTeam.findIndex(p => p.name == name)
        _myTeam.splice(index, 1)
        cb([..._myTeam])
    }
}
