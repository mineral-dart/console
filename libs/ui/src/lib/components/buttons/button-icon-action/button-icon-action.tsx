import { ButtonIconActionElement, ButtonIconActionElementProps } from "./button-icon-action-element"
import './button-action.scss'

export interface ButtonIconActionProps {
	actions?: ButtonIconActionElementProps[]
	className?: string
}

export function ButtonIconAction ({ actions, className }: ButtonIconActionProps) {
	return (
		<div>
			{ actions && 
				actions.map((action, index) => (action.menus || action.onClick) && <ButtonIconActionElement key={index} {...action} />)
			}
		</div>
	)
}
