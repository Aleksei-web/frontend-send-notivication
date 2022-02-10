import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from './form';

export interface IUser {
	value: string;
	login: string;
	number: string;
	_id: string;
}

const api = axios.create({
	baseURL: "https://send-notificator-server.herokuapp.com/"
})

export const Users = () => {
	const [users, setUsers] = useState<IUser[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await api.get<IUser[]>(`/all_tokens`);
				console.log(data);
				if (data) {
					setUsers((prev) => [...data]);
				}
			} catch (e) {
				console.log(e);
			}
		})();
	}, []);

	return (
		<div className="text-2xl">
			{users.length > 0 ? <Form users={users} /> : <div>Загрузка...</div>}
		</div>
	);
};
