import React from 'react';
import './footer.css'
import footerimage from '../../assets/images/FooterImage.png'
const Footer = () => {
    return (
        <footer className='pfooter'>
            <img className='image' src={footerimage}  alt="footer background"/>
            <div className='container'>
                <p className='text'>Concepteur & Développeur : Anthony Bauchet</p>
                <p className='text'>Designer Graphique : Tony Myrtil</p>
                <p className='text'>© All Rights Reserved</p>
            </div>

        </footer>
    );
};

export default Footer;