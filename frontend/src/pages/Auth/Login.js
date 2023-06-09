import React, { useState } from "react";
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
				} else {
					navigate("/user");
				}
				console.log(res)
			})
			.catch((err) => console.log(err.response));
	};
	return (
		<form onSubmit={onSubmit} className="loginform">
			<div className="group">
				<label htmlFor="email">Adresse E-mail</label>
				<input
					type="email"
					name="email"
					id="email"
					value={credentials.email}
					onChange={onChange}
					autoComplete="off"
				/>
			</div>
			<div className="group">
				<label htmlFor="password">Mot de passe</label>
				<input
					type="password"
					name="password"
					id="password"
					value={credentials.password}
					onChange={onChange}
					autoComplete="off"
				/>
			</div>
			<div className="group">
				<button>Connexion</button>
			</div>
		</form>
	);
};

export default Login;
