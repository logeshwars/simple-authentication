import React from 'react';
import Lottie from 'react-lottie';
import login from '../lottiefiles/loading.json';

const Loading = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: login,
		rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
	};
	return (
		<div className='loading-container'>
			<div className='flex items-center flex-col'>
				<Lottie options={defaultOptions} height={300} width={300} />
				<label className='text-blue-500 font-bold text-2xl'>Loading</label>
			</div>
		</div>
	);
};

export default Loading;
