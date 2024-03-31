import { Rules } from 'async-validator'
import { Footer } from '../components/Footer'
import { ZxxrForm } from '../components/ZxxrForm'
export const RegisterPage = () => {
	const rules: Rules = {
		name: {
			required: true,
			type: 'string',
			message: '请输入用户名'
		},
		pwd: {
			required: true,
			type: 'string',
			message: '请输入密码'
		},
		pwdReapt: {
			required: true,
			type: 'string',
			message: '请输入确认密码'
		},
		phone: {
			required: true,
			type: 'string',
			message: '请输入手机号'
		}
	}
	return (
		<div className='flex flex-col h-screen'>
			<div className='border-solid border-2  flex-1 flex flex-row items-center justify-center'>
				<div className='w-4/5 h-2/3 bg-white flex'>
					{/* 表单 */}
					<ZxxrForm className='w-4/5 mr-12  text-black border-2 border-black' rules={rules} />
					{/* 封面 */}
					<img
						className='object-center object-cover w-1/4'
						src='https://img.zcool.cn/community/010d5c5b9d17c9a8012099c8781b7e.jpg@1280w_1l_2o_100sh.jpg'
						alt=''
					/>
				</div>
			</div>
			<Footer></Footer>
		</div>
	)
}
