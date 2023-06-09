import React from 'react';
import { accountService } from '../../_services/account.service';
import { useNavigate } from 'react-router-dom';
import mealMateLogo from '../../assets/images/MealMateLogoDark.png';

const Header = () => {
    let navigate = useNavigate();
    const logout = () => {
        accountService.logout()
        navigate("/")
    }
    return (
        <div className='AHeader'>
            <h1>Espace administrateur</h1>
            <img src={mealMateLogo} alt="Mealmate logo"/>
            <button onClick={logout}>Quitter l'espace administrateur</button>
        </div>
    );
};

export default Header;