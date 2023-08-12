import React from "react";
import {pageNumber, currentNumber} from './Paginated.module.css'

function Paginado ({pokemonsPerPage, allPokemons, paginated, currentPage}) {
    const pageNumbers = [];

    for (let i=1; i<=Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul>
                { 
                    pageNumbers?.map(number => (
                        <li className={pageNumber} key={number}>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a className={currentPage===number?currentNumber:''} onClick={() => paginated(number)}>{number}</a>
                        </li>
                    
                    ))
                }
            </ul>
        </nav>
    )
}

export default Paginado