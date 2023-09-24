import { dateYearMonthDayHourMinuteSecond, upperCaseFirstLetter } from "@console/utils"
import { TagEvent, Tooltip } from "@console/ui"

export interface RowEventProps {
	event: any
	columnsWidth: string
	isPlaceholder?: boolean
}

export function RowEvent ({ event, columnsWidth, isPlaceholder }: RowEventProps) {
	return (
		<>
			<div
				data-testid="row-event"
				className="grid h-11 py-2.5 items-center text-xs text-neutral-400 font-medium border-b-neutral-200 border-b hover:bg-neutral-100 last:border-b-0"
				style={{ gridTemplateColumns: columnsWidth }}
			>
				<div className="px-4 flex gap-3">

						<span className="truncate">{dateYearMonthDayHourMinuteSecond(new Date(event.timestamp || ''))}</span>

				</div>

				<div className="px-4">
					<TagEvent eventType={event.event_type} />
				</div>

				<div className="px-4">
					{ upperCaseFirstLetter(event.target_type)}
				</div>

				<div className="px-4">
					{ event.target_type }
				</div>

				<div className="px-4">
					<span className="truncate">{upperCaseFirstLetter(event.sub_target_type || '')?.replace('_', ' ')}</span>
				</div>

				<div className="px-4">
					<span className="truncate">{event.triggered_by}</span>
				</div>

				<div className="px-4">
					<div className="truncate">
						<span></span>
						{ upperCaseFirstLetter(event.origin)?.replace('_', ' ')}
					</div>
				</div>
			</div>
		</>
	)

}