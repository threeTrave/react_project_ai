// TODO axios 配置
import myAxios from './axios';
// TODO 更多接口配置
export const getData = async () => {
	const res = await myAxios.get('/api/getData');
	return res.data;
};
