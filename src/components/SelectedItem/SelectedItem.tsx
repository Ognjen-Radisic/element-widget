import { FC } from "react";
import "./SelectedItem.scss";

interface SelectedItemProps {
	displayItem: string;
	removeAction: (val: string[]) => void;
	removeFrom: string[];
}

const SelectedItem: FC<SelectedItemProps> = ({
	displayItem,
	removeAction,
	removeFrom,
}) => {
	return (
		<div className="select_item">
			<span className="select_item_element">{displayItem}</span>
			<span
				className="select_item_cancel"
				onClick={() =>
					removeAction(removeFrom.filter((i) => i !== displayItem))
				}
			>
				X
			</span>
		</div>
	);
};

export default SelectedItem;
