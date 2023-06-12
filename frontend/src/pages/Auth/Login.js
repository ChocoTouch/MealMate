import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { accountService } from "@/_services";

const Login = () => {
	let navigate = useNavigate();

	const [credentials, setCredentials] = useState({
		email: "anthony.luu@outlook.fr",
		password: "test",
	});

	const onChange = (e) => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		accountService
			.login(credentials)
			.then((res) => {
				accountService.saveRoles(res.data.roles);
				accountService.saveToken(res.data.access_token);
				if (res.data.roles === "ROLE_ADMIN") {
					navigate("/admin");
					console.log(res.data.roles)
				}
				if (res.data.roles === "ROLE_USER") {
					navigate("/user");
					console.log(res.data.roles)
				}
				else {

				}
				console.log(res)
			})
			.catch((err) => console.log(err.response));
	};
	return (
		<>
		<form onSubmit={onSubmit} className="loginform">
			<div className="group">
				<h1>Connectez-vous</h1>
			</div>
			<div className="group">
				<label htmlFor="email">Renseignez votre adresse Email</label>
				<input
					type="email"
					name="email"
					id="email"
					value={credentials.email}
					onChange={onChange}
					autoComplete="off"
					required
				/>
			</div>
			<div className="group">
				<label htmlFor="password">Renseignez votre mot de passe</label>
				<input
					type="password"
					name="password"
					id="password"
					value={credentials.password}
					onChange={onChange}
					autoComplete="off"
					required
				/>
			</div>
			<div className="group">
				<p>Mot de passe oublié ?</p>
			</div>
			<div className="group">
				<button className='submitbtn'>Connexion</button>
			</div>
		</form>
		<Link to="/auth/register" className="loginregister">Pas encore de compte ?<br/>Inscrivez-vous !</Link>
		</>
	);
};

export default Login;
