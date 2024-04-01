import { Rules } from 'async-validator'
import { Footer } from '../components/Footer'
import { ZxxrForm } from '../components/ZxxrForm'
import { useState } from 'react'
{
	/* <input ref={myRef} className=" border-2 border-black" onChange={onInput} type="text"></input> */
}

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
		pwdReapt: [
			{
				required: true,
				type: 'string',
				message: '请输入确认密码'
			},
			{
				required: true,
				type: 'string',
				validator: (rule, value) => {
					return value === model.pwd
				},
				message: '前后密码不一致'
			}
		],
		phone: {
			required: true,
			type: 'string',
			message: '请输入手机号'
		}
	}
	const [model, setModel] = useState({ name: '', pwd: '', pwdReapt: '', phone: '' })
	return (
		<div className='flex flex-col  h-screen'>
			<div className='w-full self-center border-solid border-2 border-yellow-500 flex-1 flex flex-row items-center justify-center'>
				<div className='w-3/4 h-72 flex flex-row'>
					<div className='flex-col flex-1 border-2 border-blue-500 mr-16'>
						<p>新用户注册</p>
						<ZxxrForm className=' text-black flex-1' rules={rules} model={model}>
							<ZxxrForm.Item rulesKey='name'>
								<input className='border-2 border-black' onChange={e => setModel({ ...model, name: e.target.value })} type='text'></input>
							</ZxxrForm.Item>
							<ZxxrForm.Item rulesKey='pwd'>
								<input className='border-2 border-black' onChange={e => setModel({ ...model, pwd: e.target.value })} type='password'></input>
							</ZxxrForm.Item>
							<ZxxrForm.Item rulesKey='pwdReapt'>
								<input className='border-2 border-black' onChange={e => setModel({ ...model, pwdReapt: e.target.value })} type='password'></input>
							</ZxxrForm.Item>
							<ZxxrForm.Item rulesKey='phone'>
								<input className='border-2 border-black' onChange={e => setModel({ ...model, phone: e.target.value })} type='text'></input>
							</ZxxrForm.Item>
							<input type='submit' value={'注册'}></input>
						</ZxxrForm>
					</div>
					<img className='h-full' src='https://img.zcool.cn/community/010d5c5b9d17c9a8012099c8781b7e.jpg@1280w_1l_2o_100sh.jpg' alt='' />
				</div>
			</div>
			<Footer></Footer>
		</div>
	)
}
