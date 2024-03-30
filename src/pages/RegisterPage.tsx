import React, { useRef, useState } from 'react'
import { Footer } from '../components/Footer'
import Schema from 'async-validator'

export const RegisterPage = () => {
	const [formData, setFormData] = useState({ name: '', pwd: '', pwdReapt: '', phone: '' })
	const descriptor = {
		name: [
			{
				type: 'string',
				required: true,
				message: '用户名不能为空',
			},
		],
		pwd: [
			{
				type: 'string',
				required: true,
				message: '密码不能为空',
			},
		],
		pwdReapt: [
			{
				type: 'string',
				required: true,
				message: '重复密码不能为空',
			},
			{
				type: 'string',
				required: true,
				message: '两次密码必须保持一致',
				validator: (rule: any, value: any) => {
					return value === formData.pwd
				},
			},
		],
		phone: [
			{
				type: 'string',
				required: true,
				// validator: (rule: any, value: any) => value === 'muji',
				message: '手机号不能为空',
			},
		],
	}
	const keyValuePairs_2 = Object.keys(descriptor).map((key: any, index: any) => ({
		[key]: new Schema({ [key]: descriptor[key] }),
	}))
	const singleDescriptor = Object.assign({}, ...keyValuePairs_2)
	const keyValuePairs = Object.keys(descriptor).map((key: any, index: any) => ({ [key]: { res: true, message: '' } }))
	const combinedObject = Object.assign({}, ...keyValuePairs)
	const [valiRes, setValiRes] = useState(combinedObject)
	const initState = useRef(true) // 初始化状态
	const validator = new Schema(descriptor as any)
	// filde: 'name' | 'pwd' | 'pwdReapt' | 'phone' | 'both'
	const handleChange = (v: any, filde: 'name' | 'pwd' | 'pwdReapt' | 'phone' | 'both') => {
		if (initState.current) {
			setTimeout(() => {
				initState.current = false
			}, 50)
			return
		}
		singleDescriptor[filde].validate({ [filde]: v }, (errors: any, fields: any) => {
			if (errors) {
				setValiRes({ ...valiRes, [filde]: { res: false, message: fields[filde][0].message } })
				return console.log('error')
			}
			console.log('ok')
			setValiRes({ ...valiRes, [filde]: { ...valiRes[filde], res: true } })
		})
	}
	const handleSubmit = (e: any) => {
		e.preventDefault()
		validator.validate(formData, (errors: any, fields: any) => {
			if (errors) {
				return console.log('submit error')
			}
			console.log('submit success')
		})
	}
	return (
		<div className="flex flex-col h-screen">
			<div className="border-solid border-2  flex-1 flex flex-row items-center justify-center">
				<div className="w-4/5 h-2/3 bg-white flex">
					{/* 表单 */}
					<form onSubmit={handleSubmit} className="w-4/5 mr-12  text-black border-2 border-black" action="">
						<div className="text-center py-5 text-xl">新用户注册</div>
						<ul>
							<li className="mb-5">
								<label className="inline-block text-right w-32 pr-5 box-border" htmlFor="name">
									用户名
								</label>
								<div className="w-2/3 inline-block relative">
									<input
										onChange={e => {
											setFormData({ ...formData, name: e.target.value })
											handleChange(e.target.value, 'name')
										}}
										className={
											'w-full outline-none transition-all duration-300 ' +
											(valiRes.name.res ? 'shadow-[0_0_0_1px_black_inset]' : 'shadow-[0_0_0_1px_#f56c6c_inset]')
										}
										id="name"
										type="text"
									/>
									<span
										className={'absolute top-full left-0 text-xs text-red-400 ' + (valiRes.name.res ? 'invisible' : '')}
									>
										{valiRes.name.message}
									</span>
								</div>
							</li>
							<li className="mb-5">
								<label className="inline-block text-right w-32 pr-5 box-border" htmlFor="pwd">
									创建密码
								</label>

								<div className="w-2/3 inline-block relative">
									<input
										onChange={e => {
											setFormData({ ...formData, pwd: e.target.value })
											handleChange(e.target.value, 'pwd')
										}}
										className={
											'w-full outline-none transition-all duration-300 ' +
											(valiRes.pwd.res ? 'shadow-[0_0_0_1px_black_inset]' : 'shadow-[0_0_0_1px_#f56c6c_inset]')
										}
										id="pwd"
										type="password"
									/>
									<span
										className={'absolute top-full left-0 text-xs text-red-400 ' + (valiRes.pwd.res ? 'invisible' : '')}
									>
										{valiRes.pwd.message}
									</span>
								</div>
							</li>
							<li className="mb-5">
								<label className="inline-block text-right w-32 pr-5 box-border" htmlFor="pwdReapt">
									再次输入密码
								</label>
								<div className="w-2/3 inline-block relative">
									<input
										onChange={e => {
											setFormData({ ...formData, pwdReapt: e.target.value })
											handleChange(e.target.value, 'pwdReapt')
										}}
										className={
											'w-full outline-none transition-all duration-300 ' +
											(valiRes.pwdReapt.res ? 'shadow-[0_0_0_1px_black_inset]' : 'shadow-[0_0_0_1px_#f56c6c_inset]')
										}
										id="pwdReapt"
										type="password"
									/>
									<span
										className={
											'absolute top-full left-0 text-xs text-red-400 ' + (valiRes.pwdReapt.res ? 'invisible' : '')
										}
									>
										{valiRes.pwdReapt.message}
									</span>
								</div>
								<span
									className={
										'absolute top-full left-0 text-xs text-red-400 ' + (valiRes.pwdReapt.res ? 'invisible' : '')
									}
								>
									{valiRes.pwdReapt.message}
								</span>
							</li>
							<li className="mb-5">
								<label className="inline-block text-right w-32 pr-5 box-border" htmlFor="phone">
									手机号码
								</label>
								<div className="w-2/3 inline-block relative">
									<input
										onChange={e => {
											setFormData({ ...formData, phone: e.target.value })
											handleChange(e.target.value, 'phone')
										}}
										className={
											'w-full outline-none transition-all duration-300 ' +
											(valiRes.phone.res ? 'shadow-[0_0_0_1px_black_inset]' : 'shadow-[0_0_0_1px_#f56c6c_inset]')
										}
										id="phone"
										type="password"
									/>
									<span
										className={
											'absolute top-full left-0 text-xs text-red-400 ' + (valiRes.phone.res ? 'invisible' : '')
										}
									>
										{valiRes.phone.message}
									</span>
									<button className="absolute right-0 h-full px-4 border-l-2 border-black">获取验证码</button>
								</div>
								<button className="absolute right-0 border-l-2 border-black px-4 h-full">发送验证码</button>
							</li>
						</ul>
						<div className="text-center">
							<button className="border-2 py-1 px-12 border-black" type="submit">
								注册
							</button>
						</div>
					</form>
					{/* 封面 */}
					<img
						className="object-center object-cover w-1/4"
						src="https://img.zcool.cn/community/010d5c5b9d17c9a8012099c8781b7e.jpg@1280w_1l_2o_100sh.jpg"
						alt=""
					/>
				</div>
			</div>
			<Footer></Footer>
		</div>
	)
}
