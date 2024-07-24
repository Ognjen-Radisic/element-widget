import { FC } from "react";
import "./WidgetItem.scss";

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
		<div className="widget_item_wrapper">
			<label className="widget_item_label">
				<input
					type="checkbox"
					className="widget_item_checkbox"
					onChange={() => {
						if (allWidgetItems.includes(oneWidgetItem))
							onCheckboxClick(
								allWidgetItems.filter((i) => i !== oneWidgetItem)
							);
						else {
							onCheckboxClick([...allWidgetItems, oneWidgetItem]);
						}
					}}
					checked={
						allWidgetItems.length
							? allWidgetItems.includes(oneWidgetItem)
							: false
					}
					disabled={allWidgetItems.length === 3}
				/>
				{oneWidgetItem}
			</label>
		</div>
	);
};

export default WidgetItem;
