import { Rules } from 'async-validator'
import { Footer } from '../components/Footer'
import { ZxxrForm } from '../components/ZxxrForm'
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
export const RegisterPage = () => {
	const formList = [
		{ rulesKey: 'name', type: 'input' },
		{ rulesKey: 'pwd', type: 'input' },
		{ rulesKey: 'pwdReapt', type: 'input' },
		{ rulesKey: 'phone', type: 'input' },
		{ rulesKey: '', type: 'submit' }
	]
	const FormItems = () =>
		formList.map(item => {
			return item.type === 'submit' ? (
				<ZxxrForm.Submit key={item.rulesKey}></ZxxrForm.Submit>
			) : (
				<ZxxrForm.Input rulesKey={item.rulesKey} key={item.rulesKey}></ZxxrForm.Input>
			)
		})
	return (
		<div className='flex flex-col h-screen'>
			<div className='border-solid border-2  flex-1 flex flex-row items-center justify-center'>
				<div className='w-4/5 h-2/3 bg-white flex'>
					{/* 表单 */}
					<ZxxrForm className='w-4/5 mr-12  text-black border-2 border-black' rules={rules}>
						<FormItems></FormItems>
					</ZxxrForm>
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
