import React from 'react';
import { Footer } from '../components/Footer';

export const Root = () => {
	return (
		<div className='flex flex-col h-screen'>
			<div className='border-solid border-2 border-yellow-500 flex-1 flex flex-row' >
				<div className='border-solid border-2 border-white w-64'>left</div>
				<div className='flex-1'>right</div>
			</div>
			<Footer></Footer>
		</div>
	);
};
