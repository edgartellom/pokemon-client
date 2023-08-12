import React, { useState, useEffect }from "react";
import { Link, useHistory} from 'react-router-dom';
import { postPokemon, getTypes, cleanSort, cleanFilter } from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import { createBg, error } from './PokemonCreate.module.css';

function validate(input) {
    let errors = {};
    let stats = ["hp", "attack", "defense", "speed", "height", "weight"]
    if (!input.name){
        errors.name = "Name is required"
    } else if (!/^[a-zA-Z]+$/g.test(input.name)){
        errors.name = "Name can't contain numbers or special characters"
    }
    if (input.name)
    stats.forEach(stat => {
        if (isNaN(Number(input[stat]))){
            errors[stat] = `${stat} must be a number`
        }
        if (input[stat] > 1000) {
            errors[stat] = `${stat} must be less than 1000 points`
        }
    })
        
    return errors;
}

function PokemonCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector((state) => state.types);
    
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "", 
        hp: "", 
        attack: "", 
        defense: "", 
        speed: "", 
        height: "", 
        weight: "",
        img: "",
        type: [] 
    })

    const [selected, setSelected] = useState('');

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
        
        
    }

    const handleSelect = (e) => {
            setInput({
                ...input,
                type: [...input.type, e.target.value]
            })
            setSelected("")
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postPokemon(input))
        dispatch(cleanSort());
        dispatch(cleanFilter());
        alert("Pokemon created succesfully!!!")
        setInput({
            name: "", 
            hp: "", 
            attack: "", 
            defense: "",
            speed: "", 
            height: "", 
            weight: "",
            img: "",
            type: [] 
        })
        history.push('/home')
    }

    const handleDelete = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            type: input.type.filter(t => t !== e.target.value)
        })
    }

    const handleGoHome = (e) => {
        dispatch(cleanSort());
        dispatch(cleanFilter());
    }

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    return (
        <div className={createBg}>
            <h1>Create your pokemon!</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Name: </label>
                    <input
                        type='text'
                        value={input.name}
                        name='name'
                        onChange={e => handleChange(e)}
                    />
                    {errors.name && (
                        <p className={error}>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>HP: </label>
                    <input
                        type='text'
                        value={input.hp}
                        name='hp'
                        onChange={e => handleChange(e)}
                    />
                    {errors.hp && (
                        <p className={error}>{errors.hp}</p>
                    )}
                </div>
                <div>
                    <label>Attack: </label>
                    <input
                        type='text'
                        value={input.attack}
                        name='attack'
                        onChange={e => handleChange(e)}
                    />
                    {errors.attack && (
                        <p className={error}>{errors.attack}</p>
                    )}
                </div>
                <div>
                    <label>Defense: </label>
                    <input
                        type='text'
                        value={input.defense}
                        name='defense'
                        onChange={e => handleChange(e)}
                    />
                    {errors.defense && (
                        <p className={error}>{errors.defense}</p>
                    )}
                </div>
                <div>
                    <label>Speed: </label>
                    <input
                        type='text'
                        value={input.speed}
                        name='speed'
                        onChange={e => handleChange(e)}
                    />
                    {errors.speed && (
                        <p className={error}>{errors.speed}</p>
                    )}
                </div>
                <div>
                    <label>Height: </label>
                    <input
                        type='text'
                        value={input.height}
                        name='height'
                        onChange={e => handleChange(e)}
                    />
                    {errors.height && (
                        <p className={error}>{errors.height}</p>
                    )}
                </div>
                <div>
                    <label>Weight: </label>
                    <input
                        type='text'
                        value={input.weight}
                        name='weight'
                        onChange={e => handleChange(e)}
                    />
                    {errors.weight && (
                        <p className={error}>{errors.weight}</p>
                    )}
                </div>
                <div>
                    <label>Image URL: </label>
                    <input
                        type='text'
                        value={input.img}
                        name='img'
                        onChange={e => handleChange(e)}
                    />
                    {errors.img && (
                        <p className={error}>{errors.img}</p>
                    )}
                </div>

                <div>
                    <label>Type: </label>
                    <select value={selected} onChange={e => handleSelect(e)}>
                        <option value="" disabled>Select a type</option>
                        {types.map((t,i) => (
                            <option key={i} value={t.name}>{t.name}</option>
                        ))

                        }
                    </select>
                </div>
                {input.type.map((t,i) => (<div key={i}>{t} <button name="delete" value={t} onClick={e => handleDelete(e)}>x</button></div>))}
                <div>
                    <input 
                        type="submit"
                        name="submit"
                        value="Create Pokemon"
                        disabled={Object.keys(errors).length !== 0 || !input.name}
                    />
                </div>
            </form>
            <Link to='/home' onClick={handleGoHome}><button>Go Home</button></Link>
        </div>
    )
}

export default PokemonCreate;