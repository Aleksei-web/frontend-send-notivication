import React, { FC, useState } from 'react';
import { api, IUser } from './users';

type FormProps = {
	users: IUser[];
};

export const Form: FC<FormProps> = ({ users }: FormProps) => {
	const [formData, setFormData] = useState({ to: '', title: '', body: '' });

	console.log(formData);

	const changeFormData = (e: string, name: string) => {
		setFormData((prev) => ({ ...prev, [name]: e }));
	};

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const isEmptyInput = Object.entries(formData).some(
			([key, val]) => !val.length || val === 'null'
		);
		if (isEmptyInput) {
			alert('Заполни все поля!');
			return;
		}

		const { data } = await api.post('/send_notification', { ...formData });
		if (data.status === 'success') {
			alert('Сообщение отправлено');
		}
		setFormData({ to: '', title: '', body: '' });
	};

	return (
		<div>
			<form className="w-full flex center flex-col">
				<h2 className="m-auto mt-2">Выберите пользователя</h2>
				<select
					onChange={(e) => changeFormData(e.target.value, 'to')}
					name="to"
					className="bg-slate-200 w-96 mt-2 m-auto rounded p-1"
					value={formData['to']}
				>
					<option value={'null'}>-</option>
					{users.map((el) => (
						<option key={el._id} value={el.value}>
							{el.login}
						</option>
					))}
				</select>
				<h2 className="m-auto mt-2">Тема сообщения</h2>
				<input
					name="title"
					className="bg-slate-200 w-96 mt-2 m-auto rounded p-1"
					onChange={(e) => changeFormData(e.target.value, 'title')}
					value={formData['title']}
				/>
				<h2 className="m-auto mt-2">Текст сообщения</h2>
				<textarea
					name="body"
					className="bg-slate-200 w-96 mt-2 m-auto rounded p-1"
					onChange={(e) => changeFormData(e.target.value, 'body')}
					value={formData['body']}
				/>

				<button
					onClick={handleSubmit}
					className="bg-slate-300 w-80 p-2 rounded m-auto mt-10"
				>
					Отправить
				</button>
			</form>
		</div>
	);
};
