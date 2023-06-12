import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { accountService } from "@/_services";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const Register = () => {
    let navigate = useNavigate();

	const [user, setUser] = useState([]);

    const onChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

    const onSubmit = (e) => {
		e.preventDefault();
		accountService
			.register(user)
			.then((res) => {
                navigate("/auth/login");
			})
			.catch((err) => {
            });
	};

    return (
        <>
            <form className='registerform' onSubmit={onSubmit}>
                <div className="group title">
                    <Link to="/auth/login" className='registerlogin'>                    
                        <IconButton>
                            <KeyboardArrowLeftIcon />
                        </IconButton>
                        Connexion
                    </Link>
                    <h1>                    
                        Inscrivez-vous
                    </h1>
                </div>
                <div className='fullname'>
                    <div className='group'>
                        <label htmlFor="name">Nom *</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="off"
                            placeholder="Nom"
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className='group'>
                        <label htmlFor="firstname">Prénom *</label>
                        <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            autoComplete="off"
                            placeholder="Prénom"
                            onChange={onChange}
                            required
                        />
                    </div>
                </div>

                <div className="group">
                    <label htmlFor="username">Pseudo *</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="off"
                        placeholder="Pseudo"
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="group">
                    <label htmlFor="telephone">Téléphone</label>
                    <input
                        type="tel"
                        name="telephone"
                        id="telephone"
                        autoComplete="off"
                        placeholder="ex : +33689542678"
                        onChange={onChange}
                    />
                </div>
                <div className="group">
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="off"
                        placeholder="Email"
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="group">
                    <label htmlFor="password">Mot de passe *</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="off"
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="group">
                    <label htmlFor="confirmedPassword">Confirmation du Mot de passe *</label>
                    <input
                        type="password"
                        name="confirmedPassword"
                        id="confirmedPassword"
                        autoComplete="off"
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="group">
                    <button className='submitbtn'>S'inscrire</button>
                </div>
            </form>
        </>
    );
};

export default Register;