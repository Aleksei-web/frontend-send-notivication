import React from 'react';
import './App.css';
import { Users } from './components/users';

function App() {
	return (
		<div className="container m-auto mt-10">
			<h1 className="text-center text-2xl">Отправка уведомлений!</h1>
			<Users />
		</div>
	);
}

export default App;
