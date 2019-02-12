
let _pokemon = []
let _selectedPokemon = {}
let _myTeam = []

let pokeAPI = axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
    timeout: 3000
})


export default class PokemonService {
    constructor(drawWhenDone) {
        this.getPokemon(drawWhenDone)
    }

    get Pokemons() {
        return _pokemon.filter(p => p)
    }
    
    // get MyTeam() {
    //     return [..._myTeam]
    // }

    getPokemon(drawAfterGettingPokemon) {
        pokeAPI.get("pokemon")
            .then(res => {
                console.log(res.data)
                _pokemon = res.data.results
                drawAfterGettingPokemon()
            })
            .catch(function (err) {
                console.error(err)
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

    addToTeam(drawTeamCallback) {
        let teamMember = _myTeam.find(poke => poke.name == _selectedPokemon.name)
        if(teamMember) {
            return
        }
        _myTeam.unshift(_selectedPokemon)
        drawTeamCallback([..._myTeam])
    }

    removeFromTeam(name, cb) {
        let indexToRemove = _myTeam.findIndex(p => p.name == name)
        _myTeam.splice(indexToRemove, 1)
        cb([..._myTeam])
    }
}
