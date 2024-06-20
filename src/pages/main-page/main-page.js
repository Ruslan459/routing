import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, ControlPanel } from '../../components';
import { Search, Sorting } from './components';
import { readTodos, updateTodo } from '../../api';
import { setTodoInTodos } from '../../utils';
import styles from './main-page.module.css';

export const MainPage = () => {
	const [todos, setTodos] = useState([]);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [isAlphabetSorting, setIsAlphabetSorting] = useState(false);

	const onTodoCompletedChange = (id, newCompleted) => {
		updateTodo({ id, completed: newCompleted }).then(() => {
			setTodos(setTodoInTodos(todos, { id, completed: newCompleted }));
		});
	};

	useEffect(() => {
		readTodos(searchPhrase, isAlphabetSorting).then((todosData) =>
			setTodos(todosData),
		);
	}, [searchPhrase, isAlphabetSorting]);

	return (
		<>
			<ControlPanel>
				<Search onSearch={setSearchPhrase} />
				<Sorting onSorting={setIsAlphabetSorting} />
				<Button>
					<Link to="/task">&#43;</Link>
				</Button>
			</ControlPanel>
			<div className={styles.todos}>
				{todos.map(({ id, title, completed }) => (
					<div className={styles.todo}>
						<input
							className={styles.checkbox}
							type="checkbox"
							checked={completed}
							onChange={({ target }) =>
								onTodoCompletedChange(id, target.checked)
							}
						/>
						<Link to={`/task/${id}`} className={styles.title}>
							{title}
						</Link>
					</div>
				))}
			</div>
		</>
	);
};
