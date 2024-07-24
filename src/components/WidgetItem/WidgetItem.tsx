import { FC } from "react";

interface WidgetItemProps {
	onCheckboxClick: (val: number[]) => void;
	allWidgetItems: number[];
	oneWidgetItem: number;
}

const WidgetItem: FC<WidgetItemProps> = ({
	onCheckboxClick,
	allWidgetItems,
	oneWidgetItem,
}) => {
	return (
		<div>
			<input
				type="checkbox"
				id="scales"
				name="scales"
				onChange={() => onCheckboxClick([...allWidgetItems, oneWidgetItem])}
				checked={
					allWidgetItems.length ? allWidgetItems.includes(oneWidgetItem) : false
				}
				disabled={allWidgetItems.length === 3}
			/>
			<label>Element {oneWidgetItem}</label>
		</div>
	);
};

export default WidgetItem;
