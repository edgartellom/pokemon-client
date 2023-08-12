import { Link } from 'react-router-dom';
import Card from "../Card/Card";
import { cards } from './Cards.module.css'

function Cards ({pokemons}){
    return (
        <div className={cards}>
            {
                pokemons?.map( p => (
        
                    <Link key={p.id} to={`/home/${p.id}`} style={{textDecoration: 'none'}}>
                        <Card 
                            name={p.name} 
                            image={p.image ? p.image.home : p.img} 
                            types={p.types}
                            id={p.id} 
                        />
                    </Link>
        
                ))

            }
        </div>
    )
}

export default Cards