import { FC } from "react";

interface ItemProps {
	displayItem: string;
	removeAction: (val: string[]) => void;
	removeFrom: string[];
}

const Item: FC<ItemProps> = ({ displayItem, removeAction, removeFrom }) => {
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

export default Item;
