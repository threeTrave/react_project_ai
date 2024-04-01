import { useState } from 'react'

const SignedContent = () => {
	const contentList = [
		{
			title: '用户名',
			key: 'userName'
		},
		{
			title: '会员状态',
			key: 'vipStatus'
		},
		{
			title: '会员到期时间',
			key: 'vipExpire'
		},
		{
			title: 'chatGPT3.5数量',
			key: 'chatGPT3Num'
		},
		{
			title: 'chatGPT4数量',
			key: 'chatGPT4Num'
		},
		{
			title: 'Midjourney数量',
			key: 'midjourneyNum'
		},
		{
			title: '代币余额',
			key: 'coinBalance'
		}
	]
	return (
		<div className='flex w-full flex-col justify-center items-center h-full border-2 border-red-500'>
			<p>个人中心</p>
			{contentList.map(item => {
				return (
					<div key={item.key} className='flex flex-row items-center'>
						<p>{item.title}</p>
						<p>:</p>
						<p>{item.key}</p>
					</div>
				)
			})}
		</div>
	)
}

const UnSignedContent = () => {
	return (
		<div className='flex w-full flex-col justify-center items-center h-full border-2 border-red-500'>
			<button>登录</button>
			<button>注册</button>
			<button>联系客服</button>
		</div>
	)
}

export const LeftPannel = () => {
	const [isSigned, setIsSigned] = useState(true)
	return (
		<div className='flex flex-col items-center h-full'>
			<div className='h-16 w-full border-2 border-red-500'>LOGO here</div>
			{isSigned ? <SignedContent /> : <UnSignedContent />}
			<div>
				<button>收藏本站</button>
			</div>
		</div>
	)
}
