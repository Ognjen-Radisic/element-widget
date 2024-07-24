import { FC } from "react";

interface ItemProps {
	displayItem: number;
	removeAction: (val: number[]) => void;
	removeFrom: number[];
}

const Item: FC<ItemProps> = ({ displayItem, removeAction, removeFrom }) => {
	return (
		<div>
			Element {displayItem}{" "}
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
