import React, { useState } from 'react'
import Schema, { RuleItem, Rules } from 'async-validator'

type ZxxrFormProps = {
	children?: JSX.Element | JSX.Element[]
	rules: Rules
	className?: string
}
type ZxxrFormInputProps = {
	rulesKey: string
	rule?: RuleItem
	className?: string
}
enum ValidateState {
	NotValidate,
	Error,
	Validating,
	Success
}

export const ZxxrForm = ({ children, rules, className }: ZxxrFormProps) => {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		console.log('on Submit')
		e.preventDefault()
	}
	return (
		<form className={className} onSubmit={handleSubmit}>
			{React.Children.map(children, child => {
				if (child !== undefined && child.type.displayName === 'ZxxrForm.Input') {
					child.props.rule = rules[child.props.rulesKey]
				}
				return child
			})}
		</form>
	)
}

ZxxrForm.Input = ({ rulesKey, rule, className }: ZxxrFormInputProps) => {
	const [validateState, setValidateState] = useState(ValidateState.NotValidate)
	const [validateMessage, setValidateMessage] = useState('')
	const [inputValue, setInputValue] = useState('')
	const doValidate = () => {
		if (rule !== undefined) {
			const validator = new Schema({ rulesKey: rule })
			return validator.validate({ rulesKey: inputValue }, { firstFields: true })
		}
	}
	const onValidationFailed = (error: unknown) => {
		console.error(error)
		setValidateState(ValidateState.Error)
		// const errorMsg = errors ? errors?.[0]?.message ?? `${rulesKey} is required` : ''
		const errorMsg = `${rulesKey} is required`
		setValidateMessage(errorMsg)
	}
	const onValidationSucceeded = () => {
		setValidateState(ValidateState.Success)
		console.log(rulesKey + ':' + 'ok')
	}
	const validate = async (trigger: string) => {
		// console.log('validate : ' + trigger)
		try {
			doValidate()
			onValidationSucceeded()
		} catch (error) {
			onValidationFailed(error)
		}
	}
	const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
		validate('change')
	}
	return (
		<div className={className} onBlur={() => validate('blur')}>
			<div className='relative inline-block'>
				<input className='border-2 border-black' onChange={onInput} type='text'></input>
				{validateState === ValidateState.Error ? <></> : <ZxxrForm.Label message={validateMessage} />}
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

ZxxrForm.Submit = () => {
	return <input className='border-2 border-black' type='submit' value={'提交'}></input>
}
