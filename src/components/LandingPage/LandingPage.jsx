import React from "react";
import { Link } from 'react-router-dom';
import { landingBg } from './LandingPage.module.css';

function LandingPage () {
    return (
        <div className={landingBg}>
            {/* <video className={video} src="https://assets.pokemon.com//assets/cms2/img/misc/virtual-backgrounds/tcg/sun-moon-team-up.mp4" 
                autoplay="true" muted="true" >
            </video> */}
            <h1>Welcome to my Pokemon page!</h1>
            <Link to='/home'>
                <button>Start</button>
            </Link>
        </div>
    )
}

export default LandingPage;