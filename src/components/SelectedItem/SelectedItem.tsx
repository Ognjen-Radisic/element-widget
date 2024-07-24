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
		<div>
			{displayItem}{" "}
			<span
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
