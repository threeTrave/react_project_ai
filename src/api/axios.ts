import axios from 'axios';

// TODO 替换baseURL和headers
const instance = axios.create({
	baseURL: 'https://XXXXXXX/api/',
	timeout: 1000,
	headers: { 'X-Custom-Header': 'TODO' }
});

// 添加请求拦截器
instance.interceptors.request.use(
	config => {
		console.log(JSON.stringify(config));
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

// 添加响应拦截器
instance.interceptors.response.use(
	response => {
		// TODO 处理响应数据
		console.log(JSON.stringify(response));
		return response;
	},
	error => {
		return Promise.reject(error);
	}
);

export default instance;
