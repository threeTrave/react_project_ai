import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { Root } from './pages/Root';
import { ErrorPage } from './pages/ErrorPage';
import { RegisterPage } from './pages/RegisterPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />
	},
	{
		path: '/register',
		element: <RegisterPage />
	}
]);

const App = () => {
	return (
		<div className='content'>
			<RouterProvider router={router} />
		</div>
	);
};

export default App;
