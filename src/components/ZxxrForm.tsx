import React, { useState, useRef, useEffect } from 'react'
import Schema, { Rule, Rules } from 'async-validator'

type ZxxrFormProps = {
	children?: JSX.Element | JSX.Element[]
	rules: Rules
	className?: string
	model?: Object
}
type ZxxrFormInputProps = {
	rulesKey?: string
	rule?: Rule
	className?: string
	children?: JSX.Element | JSX.Element[]
	model?: Record<string, Object>
}
enum ValidateState {
	NotValidate,
	Error,
	Validating,
	Success
}

export const ZxxrForm = ({ children, rules, className, model }: ZxxrFormProps) => {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		console.log('on Submit')
		e.preventDefault()
	}
	return (
		<form className={className} onSubmit={handleSubmit}>
			{React.Children.map(children, child => {
				if (child !== undefined && child.props.rulesKey) {
					return React.cloneElement(child, { key: child.props.rulesKey, rule: rules[child.props.rulesKey], model })
				}
				return child
			})}
		</form>
	)
}

ZxxrForm.Item = ({ rulesKey, rule, className, children, model }: ZxxrFormInputProps) => {
	const [validateState, setValidateState] = useState(ValidateState.NotValidate)
	const [validateMessage, setValidateMessage] = useState('')
	const initState = useRef<boolean>(true)
	const doValidate = async () => {
		if (rule !== undefined && model !== undefined && rulesKey !== undefined) {
			const validator = new Schema({ rulesKey: rule })
			return validator.validate({ rulesKey: model[rulesKey] }, { firstFields: true })
		}
	}
	const onValidationFailed = ({ errors, fields }: any) => {
		setValidateState(ValidateState.Error)
		const errorMsg = errors ? errors?.[0]?.message ?? `${rulesKey} is required` : ''
		// const errorMsg = `${rulesKey} is required`
		setValidateMessage(errorMsg)
	}
	const onValidationSucceeded = () => {
		setValidateState(ValidateState.Success)
		// console.log(rulesKey + ':' + 'ok')
	}

	const validate = async () => {
		// console.log('validate : ' + trigger)
		try {
			await doValidate()
			console.log(rulesKey + 'Success')

			onValidationSucceeded()
		} catch (error) {
			console.log(rulesKey + 'error')

			onValidationFailed(error)
		}
	}
	useEffect(() => {
		if (initState.current) {
			setTimeout(() => {
				initState.current = false
			}, 50)
			return
		}
		validate()
	}, [model![rulesKey!]])

	// const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	// setInputValue(e.target.value)
	// 	validate('change')
	// }
	return (
		<div className={className + ' mb-5'}>
			<div className='relative inline-block'>
				{children}
				{validateState === ValidateState.Error ? <ZxxrForm.Label message={validateMessage} /> : <></>}
			</div>
		</div>
	)
}

type ZxxrFormLabelProps = {
	message: string
}

ZxxrForm.Label = ({ message }: ZxxrFormLabelProps) => {
	return <span className={'absolute left-0 top-full'}>{message}</span>
}

// /**
//  * 确保返回是数组
//  */
// const ensureArr = (arr: any) => {
// 	if (Array.isArray(arr)) return arr
// 	if (!arr) return []
// 	return [arr]
// }
// /**
//  *  取prop交集
//  * @param fields
//  * @param props
//  * @returns
//  */
// const filterFields = (fields, props) => {
// 	const normalized = ensureArr(props)
// 	return normalized.length > 0 ? fields.filter(field => field.prop && normalized.includes(field.prop)) : fields
// }
