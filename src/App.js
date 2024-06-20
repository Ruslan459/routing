import { Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import { MainPage, NotFound, TodoPage } from './pages';

export const App = () => (
	<div className={styles.App}>
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path="/task" element={<TodoPage />} />
			<Route path="/task/:id" element={<TodoPage />} />
			<Route path="/404" element={<NotFound />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	</div>
);
