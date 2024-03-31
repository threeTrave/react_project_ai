import { useRef } from 'react'
import { Footer } from '../components/Footer'
import { ZxxrForm, ZxxrFormItem } from '../components/ZxxrForm.tsx'
export const RegisterPage = () => {
	const modelRef = useRef({ name: '', pwd: '', pwdReapt: '', phone: '' })
	// const [modelRef, model, setModel] = useZxxrState({ name: '', pwd: '', pwdReapt: '', phone: '' })
	const rules = {
		name: {
			required: true,
			type: 'string',
		},
		pwd: {
			required: true,
			type: 'string',
		},
		pwdReapt: {
			required: true,
			type: 'string',
		},
		phone: {
			required: true,
			type: 'string',
		},
	}
	return (
		<div className="flex flex-col h-screen">
			<div className="border-solid border-2  flex-1 flex flex-row items-center justify-center">
				<div className="w-4/5 h-2/3 bg-white flex">
					{/* 表单 */}
					<ZxxrForm className="w-4/5 mr-12  text-black border-2 border-black" model={modelRef} rules={rules}>
						<ZxxrFormItem className="pb-5" prop="name">
							<input
								className="border-2 border-black"
								onChange={e => (modelRef.current.name = e.target.value)}
								type="text"
							/>
						</ZxxrFormItem>
						<ZxxrFormItem className="pb-5" prop="pwd">
							<input
								className="border-2 border-black"
								onChange={e => (modelRef.current.pwd = e.target.value)}
								type="text"
							/>
						</ZxxrFormItem>
						<ZxxrFormItem className="pb-5" prop="pwdReapt">
							<input
								className="border-2 border-black"
								onChange={e => (modelRef.current.pwdReapt = e.target.value)}
								type="text"
							/>
						</ZxxrFormItem>
						<ZxxrFormItem className="pb-5" prop="phone">
							<input
								className="border-2 border-black"
								onChange={e => (modelRef.current.phone = e.target.value)}
								type="text"
							/>
						</ZxxrFormItem>
						<ZxxrFormItem>
							<button type="submit">提交</button>
						</ZxxrFormItem>
					</ZxxrForm>
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
