import { FC } from "react";

interface WidgetItemProps {
	onCheckboxClick: (val: string[]) => void;
	allWidgetItems: string[];
	oneWidgetItem: string;
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
				onChange={() => {
					if (allWidgetItems.includes(oneWidgetItem))
						onCheckboxClick(allWidgetItems.filter((i) => i !== oneWidgetItem));
					else {
						onCheckboxClick([...allWidgetItems, oneWidgetItem]);
					}
				}}
				checked={
					allWidgetItems.length ? allWidgetItems.includes(oneWidgetItem) : false
				}
				disabled={allWidgetItems.length === 3}
			/>
			<label>{oneWidgetItem}</label>
		</div>
	);
};

export default WidgetItem;
