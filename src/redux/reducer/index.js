import { 
    GET_POKEMONS, 
    GET_POKEMON_BY_NAME, 
    GET_POKEMON_DETAIL,
    GET_TYPES,
    POST_POKEMON, 
    DELETE_POKEMON,
    FILTER_BY_TYPE, 
    FILTER_CREATED, 
    SET_FILTER,
    SET_SORT,
    SET_ORDER,
    CLEAN_FILTER,
    CLEAN_SORT,
    CLEAN_DETAIL,
    CLEAN_ORDER,
    CLEAN_SELECTED_FILTER,
    
} from "../action-types";

const initialState = {
    pokemons: [],
    allPokemons: [],
    detail: [],
    types: [],
    sort: '',
    order: '',
    filter: '',
    selectedFilter: ''
}

const sortPokemons = (pokemons, prop, order) => {
    if (order === 'asc'){
        return (pokemons.sort((a,b) => {
            if (a[prop] > b[prop]) return 1;
            if (a[prop] < b[prop]) return -1;
            return 0;
        }))
    }
    if (order === 'desc'){
        return (pokemons.sort((a,b) => {
            if (a[prop] > b[prop]) return -1;
            if (a[prop] < b[prop]) return 1;
            return 0;
        }))
    }
}

function rootReducer(state=initialState, action){
    
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }

        case GET_POKEMON_BY_NAME:
            return {
                ...state,
                pokemons: action.payload
            }
        case GET_POKEMON_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        case GET_TYPES:
            return{
                ...state,
                types: action.payload
            }
        
        case POST_POKEMON:
            return {
                ...state,
            }
        
        case DELETE_POKEMON:
            return {
                ...state,
            }    
            
        case FILTER_BY_TYPE:
            const allPokemons = state.allPokemons;
            const filterByType = (types) => {
                for(let type of types){
                    if (type.name === action.payload){
                        return true
                    }
                }
            }
            const pokemonsFiltered = allPokemons.filter(e => filterByType(e.types));
            const statusFiltered = action.payload === 'All' ? allPokemons : pokemonsFiltered
            return {
                ...state,
                pokemons: statusFiltered,
                selectedFilter: action.payload
            } 
        
        case FILTER_CREATED:
            const allPokemons2 = state.allPokemons;
            const createdFilter = () => {
                if (action.payload === 'All'){
                    return allPokemons2
                } else if (action.payload === 'created'){
                    return allPokemons2.filter(e => e.createdInDb)
                } else {
                    return allPokemons2.filter(e => !e.createdInDb)
                }
            }
            return {
                ...state,
                pokemons: createdFilter(),
                selectedFilter: action.payload
            }

        case SET_FILTER:
            return {
                ...state,
                filter: action.payload,
            }

        case SET_SORT: 
            return {
                ...state,
                sort: action.payload,
            }

        case SET_ORDER:  
            state.order = action.payload    
            sortPokemons(state.pokemons, state.sort, state.order)
            return {
                ...state,
                order: action.payload,
            }
        
        case CLEAN_FILTER:
            return {
                ...state,
                filter: ''
            }
        
        case CLEAN_SELECTED_FILTER:
            return { 
                ...state,
                selectedFilter: ''
            }
        
        case CLEAN_SORT:
            return {
                ...state,
                sort: ''
            }
        
        case CLEAN_ORDER:
            return { 
                ...state,
                order: ''
            }
        
        case CLEAN_DETAIL:
            return {
                ...state,
                detail: []
            }
        
        default: 
            return state
    }
}

export default rootReducer;