import { type MouseEvent } from "react"
import { IconEnum } from "@console/enums";
import { ButtonSize, ButtonStyle } from "../button";
import { classNames } from "@console/utils";
import { LoaderSpinner } from "../../loader-spinner/loader-spinner";
import { Icon } from "../../icons/icon";
import { Link } from "react-router-dom";

export enum ButtonIconStyle {
  BASIC = 'basic',
  RAISED = 'raised',
  STROKED = 'stroked',
  FLAT = 'flat',
  ALT = 'alt',
  DARK = 'dark',
}

export interface ButtonIconProps {
	size?: ButtonSize
	style?: ButtonIconStyle
	icon: IconEnum | string
	link?: string
	disabled?: boolean
	className?: string
	onClick?: (e: MouseEvent) => void
	loading?: boolean
	notification?: boolean
	active?: boolean
	iconClassName?: string
	external?: boolean
	dataTestId?: string
	type?: 'button' | 'submit' | 'reset'
}

export function ButtonIcon ({
	icon,
	style = ButtonIconStyle.BASIC,
	size = ButtonSize.REGULAR,
	disabled = false,
	dataTestId,
	loading = false,
	className = '',
	onClick,
	notification = false,
	link,
	external = false,
	active = false,
	iconClassName = '',
	type = 'button',
}: ButtonIconProps) {


	const defineClass = `btn btn-icon group ${size ? `btn--${size}` : ''} ${style ? `btn-icon--${style}` : ''} ${
    disabled || loading ? 'btn--disabled' : ''
  } ${active ? 'btn--active' : ''} ${className}`

	return (
		<>
			{!link && 
				<button
					type={type}
					data-testid={dataTestId}
					className={defineClass}
				>
					{ loading ?
						<LoaderSpinner />
						: <>
							{ notification && <span className="btn__notification w-2 h-2 rounded-lg bg-red-500 absolute -top-0.5 -right-0.5"></span>}
							<Icon name={icon} className={iconClassName} />
						</>
					}
				</button>
			}

			{ link && !external &&
				<Link data-testid={dataTestId} to={link} className={defineClass} onClick={onClick}>
					{notification && (
						<span className="btn__notification w-2 h-2 rounded-lg bg-red-500 absolute -top-0.5 -right-0.5"></span>
					)}
					<Icon name={icon} className={iconClassName} />
				</Link>
			}

			{ link && external &&
				<a
					data-testid={dataTestId}
					href={link}
					target="_blank"
					rel="noreferrer"
					className={defineClass}
					onClick={onClick}
				>
					{notification && (
						<span className="btn__notification w-2 h-2 rounded-lg bg-red-500 absolute -top-0.5 -right-0.5"></span>
					)}
					<Icon name={icon} className={iconClassName} />
				</a>
			}
		</>
	)
}

