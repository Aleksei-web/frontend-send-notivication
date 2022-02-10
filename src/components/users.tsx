import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from './form';

export interface IUser {
	value: string;
	login: string;
	number: string;
	_id: string;
}

export const Users = () => {
	const [users, setUsers] = useState<IUser[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get<IUser[]>(`/all_tokens`);
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
