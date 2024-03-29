import React from 'react';
import { Footer } from '../components/Footer';

export const Root = () => {
	return (
		<div className='flex flex-col h-screen'>
			<div className='border-solid border-2 border-yellow-500 flex-1' >Root</div>
			<Footer></Footer>
		</div>
	);
};
