import React from "react";
import { useDispatch } from "react-redux";
import { cleanOrder, cleanSelectedFilter, filterByType, filterCreated, setFilter, setSort, setSortOrder } from "../../redux/actions"

function SortFilter({setCurrentPage, order, sort, filter, selectedFilter}){
    const dispatch = useDispatch();
    
    

    function handleSort(e){
        dispatch(cleanOrder());
        dispatch(setSort(e.target.value));
    } 

    function handleSortOrder(e){
        dispatch(setSortOrder(e.target.value));
        setCurrentPage(1);
    }
    
    function handleFilter(e){
        dispatch(cleanSelectedFilter());
        dispatch(setFilter(e.target.value));
    }
    
    function handleFilterByType(e){
        dispatch(filterByType(e.target.value));
        setCurrentPage(1);
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value));
        setCurrentPage(1);
    }

    return (
            <div>
                <div>
                    <label>Sort: 
                        <select value={sort} onChange={e => handleSort(e)}>
                            <option value="" disabled>Select a prop</option>
                            <option value='name'>Name</option>
                            <option value='attack'>Attack</option>
                        </select>
                    
                    
                    {
                        sort &&
                            <select value={order} onChange={e => handleSortOrder(e)}>
                                <option value="" disabled>Select order</option>
                                <option value='asc'>Ascendant</option>
                                <option value='desc'>Descendant</option>
                            </select>
                    }
                    </label>
                </div>
                <div>
                    <label>Filter:
                        <select value={filter} onChange={e => handleFilter(e)}>
                            <option value="" disabled>Select a filter</option>
                            <option value='type'>By type</option>
                            <option value='source'>By source</option>
                        </select>
                    </label>
                    {
                        filter && (
                            (filter === "type") ? 
                            <select value={selectedFilter} onChange={e => handleFilterByType(e)}>
                                <option value="" disabled>Select type</option>
                                <option value ='All'>All</option>
                                <option value ='normal'>Normal</option>
                                <option value='fighting'>Fighting</option>
                                <option value ='flying'>Flying</option>
                                <option value ='poison'>Poison</option>
                                <option value='ground'>Ground</option>
                                <option value ='rock'>Rock</option>
                                <option value ='bug'>Bug</option>
                                <option value='ghost'>Ghost</option>
                                <option value ='steel'>Steel</option>
                                <option value ='fire'>Fire</option>
                                <option value='water'>Water</option>
                                <option value ='grass'>Grass</option>
                                <option value ='electric'>Electric</option>
                                <option value='psychic'>Psychic</option>
                                <option value ='ice'>Ice</option>
                                <option value ='dragon'>Dragon</option>
                                <option value='dark'>Dark</option>
                                <option value ='fairy'>Fairy</option>
                                <option value ='unknown'>Unknown</option>
                                <option value='shadow'>Shadow</option>
                            </select> :
                            <select value={selectedFilter} onChange={e => handleFilterCreated(e)}>
                                <option value="" disabled>Select source</option>
                                <option value ='All'>All</option>
                                <option value='created'>Created</option>
                                <option value ='api'>Existing</option>
                            </select>
                        )
                    }
                    
                    
                </div>
            </div>
    )
}

export default SortFilter;