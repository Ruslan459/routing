import { Link } from 'react-router-dom';
import { Button, ControlPanel } from '../../components';
import styles from './not-found.module.css';

export const NotFound = () => (
	<>
		<ControlPanel>
			<Button>
				<Link to="/">
					<b>&larr;</b>
				</Link>
			</Button>
		</ControlPanel>
		<div className={styles.error404}>Такая страница не найдена 404</div>
	</>
);
