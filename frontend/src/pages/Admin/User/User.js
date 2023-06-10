import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { userService } from "@/_services/admin/user.service";
import defaultuserimage from "../../../assets/images/DefaultUserImage.png";
const User = () => {
	const [users, setUsers] = useState([]);
	const flag = useRef(false);

	useEffect(() => {
		if (flag.current === false) {
			userService
				.getAllUsers()
				.then((res) => {
					setUsers(res.data.data);
				})
				.catch((err) => console.log(err));
		}

		return () => (flag.current = true);
	}, []);

	const delUser = (userId) => {
		userService
			.deleteUser(userId)
			.then((res) => {
				setUsers((current) => current.filter((user) => user.id !== userId));
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="list_table">
			liste des utilisateurs
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Email</th>
						<th>Prénom</th>
						<th>Nom</th>
						<th>Pseudo</th>
						<th>Telephone</th>
						<th>Role</th>
						<th>Image</th>
						<th>Date de création</th>
						<th>Date d'édition</th>
						<th>Date de suppression</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td>
								<Link to={`../edit/${user.id}`}>{user.id}</Link>
							</td>
							<td>{user.email}</td>
							<td>{user.firstname}</td>
							<td>{user.name}</td>
							<td>{user.username}</td>
							<td>{user.telephone || "pas de numéro"}</td>
							<td>{user.roles}</td>
							<td>
								<img
									src={user.image ? "/" + user.image : defaultuserimage}
									alt={"Utilisateur:" + user.name}
								/>
							</td>
							<td>{user.createdAt}</td>
							<td>{user.updatedAt}</td>
							<td>{user.deletedAt}</td>
							<td>
								<span
									className="del_ubtn"
									onClick={() => delUser(user.id)}
								>
									Supprimer
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default User;
