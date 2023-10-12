import { ReactNode, useState } from "react"
import { Menu, MenuAlign, MenuData } from "../../menu"
import { Tooltip } from "../../tooltip/tooltip"
import { classNames } from "@console/utils"

export interface ButtonIconActionElementProps {
	triggerTooltip?: string
	iconLeft?: ReactNode
	iconRight?: ReactNode
	onClick?: () => void
	menus?: MenuData
	menusClassName?: string
	menuAlign?: MenuAlign
	triggerClassName?: string
}

export function ButtonIconActionElement ({ 
	triggerTooltip, triggerClassName = '',
	iconLeft, iconRight, 
	onClick, 
	menus, menusClassName = '', menuAlign = MenuAlign.START
}: ButtonIconActionElementProps) {
	console.log(menus);
	
	const [open, setOpen] = useState(false)

	function tooltipWrapper (content: ReactNode, withRightBorder = false) {
		if (triggerTooltip) {
			return (
				<Tooltip content={triggerTooltip} delayDuration={100}>
					<span className={classNames(
						'flex',
						withRightBorder ? 'border-r border-r-neutral-250' : ''
					)}>
						{ content }
					</span>
				</Tooltip>
			)
		} else {
			return content
		}
	}

	if (menus) {
		return (
			<Menu
				className={menusClassName}
				menus={menus}
				arrowAlign={menuAlign}
        width={248}
        onOpen={(isOpen) => setOpen(isOpen)}
        trigger={
          <div
            data-testid="element"
						className={classNames('btn-icon-action__element', triggerClassName, open ? 'is-active' : '')}
          >
            {iconLeft}
            {iconRight}
          </div>
        }
        triggerTooltip={triggerTooltip}
			/>
		)
	} else {
		return (
			<>
				{ tooltipWrapper(
					<div data-testid="element" className="btn-icon-action__element" onClick={onClick}>
						{ iconLeft }
						{ iconRight }
					</div>,
					true
				)}
			</>
		)
	}
}