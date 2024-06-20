import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, ControlPanel } from '../../components';
import { deleteTodo, createTodo, readTodo, updateTodo } from '../../api';
import styles from './todo-page.module.css';

export const TodoPage = () => {
	const [title, setTitle] = useState('');
	const { id } = useParams();
	const navigate = useNavigate();

	const onTitleChange = ({ target }) => setTitle(target.value);

	const onRemove = () => deleteTodo(id).then(() => navigate('/'));

	const onSave = () => {
		if (id === undefined) {
			createTodo({ title, completed: false }).then(() => navigate('/'));
		} else {
			updateTodo({ id: id, title }).then(() => navigate('/'));
		}
	};

	useEffect(() => {
		if (id === undefined) return;

		readTodo(id)
			.then((loadedTodo) => {
				setTitle(loadedTodo.title);
			})
			.catch((error) => {
				navigate('/404');
			});
	}, [id, navigate]);

	return (
		<>
			<ControlPanel>
				<Button>
					<Link to="/task">
						<b>&larr;</b>
					</Link>
				</Button>
				<Button onClick={onRemove}> x </Button>
				<Button onClick={onSave}> 0 </Button>
			</ControlPanel>
			<div className={styles.todos}>
				<textarea
					className={styles.title}
					value={title}
					onChange={onTitleChange}
				/>
			</div>
		</>
	);
};
