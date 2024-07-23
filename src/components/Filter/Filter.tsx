import { FC } from "react";

interface FilterProps {
	setFilter: (val: "noFilter" | "gt10" | "gt100" | "gt200") => void;
	selectedFilter: "noFilter" | "gt10" | "gt100" | "gt200";
}

const Filter: FC<FilterProps> = ({ setFilter, selectedFilter }) => {
	return (
		<div className="widget-options-filter">
			<p>Filter</p>
			<select
				name="elementFilter"
				value={selectedFilter}
				onChange={(e) => {
					setFilter(e.target.value as "noFilter" | "gt10" | "gt100" | "gt200");
				}}
			>
				<option value="noFilter" selected={selectedFilter === "noFilter"}>
					No filter
				</option>
				<option value="gt10" selected={selectedFilter === "gt10"}>
					<span>&#62;</span>10
				</option>
				<option value="gt100" selected={selectedFilter === "gt100"}>
					<span>&#62;</span>100
				</option>
				<option value="gt200" selected={selectedFilter === "gt200"}>
					<span>&#62;</span>200
				</option>
			</select>
		</div>
	);
};

export default Filter;
