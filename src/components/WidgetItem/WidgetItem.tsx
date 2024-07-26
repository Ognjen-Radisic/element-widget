import { FC } from "react";
import "./WidgetItem.scss";

interface WidgetItemProps {
	onCheckboxClick: (val: string[]) => void;
	checkedWidgetItems: string[];
	widgetItem: string;
}

const WidgetItem: FC<WidgetItemProps> = ({
	onCheckboxClick,
	checkedWidgetItems,
	widgetItem,
}) => {
	return (
		<div className="widget_item_wrapper">
			<label className="widget_item_label">
				<input
					type="checkbox"
					className="widget_item_checkbox"
					onChange={() => {
						if (checkedWidgetItems.includes(widgetItem))
							onCheckboxClick(
								checkedWidgetItems.filter((i) => i !== widgetItem)
							);
						else {
							onCheckboxClick([...checkedWidgetItems, widgetItem]);
						}
					}}
					checked={
						checkedWidgetItems.length
							? checkedWidgetItems.includes(widgetItem)
							: false
					}
					disabled={
						!checkedWidgetItems.includes(widgetItem) &&
						checkedWidgetItems.length === 3
					}
				/>
				{widgetItem}
			</label>
		</div>
	);
};

export default WidgetItem;
