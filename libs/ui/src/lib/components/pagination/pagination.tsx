import { classNames } from "@console/utils"
import { ButtonIcon, ButtonIconStyle } from "../buttons/button-icon/button-icon"
import { IconAwesomeEnum } from "@console/enums"
import { ButtonSize } from "../buttons"
import { InputSelectSmall } from "../inputs/input-select-small"

export interface PaginationProps {
	nextDisabled?: boolean
	previousDisabled?: boolean
	className?: string
	onNext: () => void
	onPrevious: () => void
	pageSize?: string
	onpageSizeChange?: (pageSize: string) => void
}

export function Pagination ({ nextDisabled, previousDisabled, className, onNext, onPrevious, pageSize, onpageSizeChange }: PaginationProps) {
	return (
		<div className={classNames('flex justify-between', className || '' )}>
			<div className="flex gap-0.5 items-center">
				<ButtonIcon
          dataTestId="button-previous-page"
          icon={IconAwesomeEnum.CHEVRON_LEFT}
          style={ButtonIconStyle.STROKED}
          size={ButtonSize.SMALL}
          className="!w-8"
          disabled={previousDisabled}
          onClick={() => onPrevious()}
          iconClassName="!text-xs"
        />
        <ButtonIcon
          dataTestId="button-next-page"
          icon={IconAwesomeEnum.CHEVRON_RIGHT}
          style={ButtonIconStyle.STROKED}
          size={ButtonSize.SMALL}
          className="!w-8"
          disabled={nextDisabled}
          onClick={() => onNext()}
          iconClassName="!text-xs"
        />
			</div>

			<div className="flex gap-3 items-center">
				<InputSelectSmall
					dataTestId="select-page-size"
					name="pageSize"
					className="!w-16"
					defaultValue={pageSize || '30'}
					onChange={(e) => onpageSizeChange && onpageSizeChange(e || '')}
					items={[
						{
              label: '10',
              value: '10',
            },
            {
              label: '30',
              value: '30',
            },
            {
              label: '50',
              value: '50',
            },
            {
              label: '100',
              value: '100',
            },
					]}
				/>
			</div>
		</div>
	)

}