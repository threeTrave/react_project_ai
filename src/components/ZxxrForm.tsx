import React, { useEffect, useRef, useState } from 'react'
import Schema from 'async-validator'

type formItemValidateState = '' | 'error' | 'validating' | 'success'

export const ZxxrForm = ({ children, rules, model, className }) => {
	children = ensureArr(children)
	const fields = useRef([]) // 每个子元素及其方法
	const addField = field => {
		fields.current.push(field)
	}
	const obtainValidateFields = props => {
		if (fields.current.length === 0) return []

		const filteredFields = filterFields(fields.current, props)

		if (!filteredFields.length) {
			console.log('ZxxrForm: please pass correct props!')
			return []
		}
		return filteredFields
	}
	const handleSubmit = async e => {
		e.preventDefault()
		await doValidate()
			.then(() => {
				console.log('ok')
			})
			.catch(() => {
				console.log('error')
			})
	}
	const doValidate = async () => {
		return doValidateField(undefined)
	}
	const doValidateField = async props => {
		const fields = obtainValidateFields(props)
		if (fields.length === 0) return true
		let validationErrors = {}
		for (const field of fields) {
			try {
				await field.validate('', true)
			} catch (fields) {
				validationErrors = {
					...validationErrors,
					...fields,
				}
			}
		}
		// console.log(validationErrors)

		if (Object.keys(validationErrors).length === 0) return true
		return Promise.reject(validationErrors)
	}
	return (
		<form className={className} onSubmit={handleSubmit} action="">
			{React.Children.map(children, child => {
				const prop = child.props?.prop
				const _rules = ensureArr(rules?.[prop])
				return React.cloneElement(child, { addField, _rules, model })
			})}
		</form>
	)
}

export const ZxxrFormItem = ({ prop, addField, _rules: rules, model, children, className }) => {
	const [validateState, setValidateState] = useState<formItemValidateState>('')
	const [validateMessage, setValidateMessage] = useState('')
	const validateEnabled = rules.length > 0
	const doValidate = rules => {
		const modelName = prop
		const validator = new Schema({ [modelName]: rules })
		const _model = model.current?.[prop]
		return validator
			.validate({ [prop]: _model }, { firstFields: true })
			.then(() => {
				return true
			})
			.catch(error => {
				return Promise.reject(error)
			})
	}
	const getFilteredRule = trigger => {
		const _rules = rules
		return (
			_rules
				.filter(rule => {
					if (!rule.trigger || !trigger) return true
					return rule.trigger === trigger
				})
				// exclude trigger
				.map(({ trigger, ...rule }) => rule)
		)
	}
	const onValidationFailed = error => {
		const { errors, fields } = error
		if (!errors || !fields) {
			console.error(error)
		}

		setValidateState('error')
		const errorMsg = errors ? errors?.[0]?.message ?? `${prop} is required` : ''
		setValidateMessage(errorMsg)
	}
	const onValidationSucceeded = () => {
		setValidateState('success')
	}
	const validate = async (trigger, shouldThrow?) => {
		if (!validateEnabled) return
		try {
			const rules = getFilteredRule(trigger)
			await doValidate(rules)
			onValidationSucceeded()
			console.log(prop + ':' + 'ok')
		} catch (error) {
			onValidationFailed(error)
			console.log(prop + ':' + error.message)
			const { fields } = error
			return shouldThrow && Promise.reject(fields)
		}
	}
	useEffect(() => {
		addField({ prop, validate })
	}, [])
	return (
		<div className={className} onBlur={() => validate('blur')} onChange={() => validate('change')}>
			<div className="relative inline-block">
				{children}
				<span className={(validateState === 'error' ? '' : 'hidden ') + 'absolute left-0 top-full'}>
					{validateMessage}
				</span>
			</div>
		</div>
	)
}
/**
 * 确保返回是数组
 */
const ensureArr = arr => {
	if (Array.isArray(arr)) return arr
	if (!arr) return []
	return [arr]
}
/**
 *  取prop交集
 * @param fields
 * @param props
 * @returns
 */
const filterFields = (fields, props) => {
	const normalized = ensureArr(props)
	return normalized.length > 0 ? fields.filter(field => field.prop && normalized.includes(field.prop)) : fields
}
