import React from 'react';
import './footer.css';
import footerimage from '../../assets/images/FooterImage.png';
import mealMateLogo from '../../assets/images/MealMateLogoDark.png';
import IconButton from "@mui/material/IconButton";
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <footer className='pfooter'>
            <img className='image' src={footerimage} alt="footer background" />
            <div className='footer_content'>
                <div className='mealmate_infos'>
                    <img src={mealMateLogo} alt="Mealmate logo"/>
                    <div className='infos_text'>
                        <p>MealMate est votre assistant de cuisine !</p>
                        <p>Recherchez, et cuisinez les plats qui vous font envie en toute simplicité.</p>
                        <p>Créez des recettes et partagez les sur MealMate.</p>
                    </div>
                    <div className='iconbuttons'>
                    <IconButton>
                        <TwitterIcon/>
                    </IconButton>
                    <IconButton>
                        <FacebookIcon/>
                    </IconButton>
                    <IconButton>
                        <InstagramIcon/>
                    </IconButton>
                    </div>
                </div>
                <nav>
                    <h3>Navigation</h3>
                    <ul>
                        <li>Accueil</li>
                        <li>Recettes</li>
                        <li>Favoris</li>
                        <li>Nous contacter</li>
                        <li>Qui sommes-nous?</li>
                    </ul>
                </nav>
                <address className='makers'>
                    <h3>Créateurs</h3>
                    <p>Concepteur & Développeur : Anthony Bauchet</p>
                    <p>Designer Graphique : Tony Myrtil</p>
                    <p>© All Rights Reserved</p>
                </address>

            </div>

        </footer>
    );
};

export default Footer;