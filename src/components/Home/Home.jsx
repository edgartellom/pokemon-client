import React from "react";
import { Link } from 'react-router-dom';
//import hooks gonna use from react
import { useEffect, useState } from "react";
//import hooks from react-redux (previously install it --> npm i react-redux)
import { useDispatch, useSelector } from "react-redux";
//import actions gonna use in this component
import { cleanFilter, cleanSort, getPokemons} from "../../redux/actions";
//import components gonna use
import Cards from "../Cards/Cards";
import Paginated from "../Paginated/Paginated"
import SortFilter from "../SortFilter/SortFilter";
import SearchBar from "../SearchBar/SearchBar";
//import styles from module.css
import { homeBg } from "./Home.module.css";


function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.pokemons);
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const order = useSelector(state => state.order);
    const sort = useSelector(state => state.sort);
    const filter = useSelector(state => state.filter);
    const selectedFilter = useSelector(state => state.selectedFilter)
    const indexOfLastPokemon = currentPage * pokemonsPerPage; //12
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; //0
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

    const paginated = (pagNumber) => {
        setCurrentPage(pagNumber)
    }

    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
        dispatch(cleanSort());
        dispatch(cleanFilter());
    }

    return(
        <div className={homeBg}>
            <Link to='/pokemon'><button>Create pokemon</button></Link>
            <h1>Pokemon App</h1>
            <h3>Gotta Catch 'Em All!</h3>
            <button onClick={e => handleClick(e)}>
                Reload all pokemons
            </button>
            <SearchBar 
                setCurrentPage={setCurrentPage}
            />
            <SortFilter
                setCurrentPage={setCurrentPage}
                order={order}
                sort={sort}
                filter={filter}
                selectedFilter={selectedFilter}
            />
            <Paginated 
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allPokemons.length}
                paginated={paginated}
                currentPage={currentPage}
            />
            <Cards pokemons={currentPokemons} />
        </div>
    )
}

export default Home