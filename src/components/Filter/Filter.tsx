import { FC } from "react";
import { possibleFilterValues } from "../../types";
import { possibleFilters } from "../../constants";

interface FilterProps {
	setFilter: (val: possibleFilterValues) => void;
	selectedFilter: possibleFilterValues;
}

const Filter: FC<FilterProps> = ({ setFilter, selectedFilter }) => {
	return (
		<div className="widget-options-filter">
			<p>Filter</p>
			<select
				name="elementFilter"
				value={selectedFilter}
				onChange={(e) => {
					setFilter(e.target.value as possibleFilterValues);
				}}
			>
				<option
					value={possibleFilters.noFilter}
					selected={selectedFilter === possibleFilters.noFilter}
				>
					No filter
				</option>
				<option
					value={possibleFilters.gt10}
					selected={selectedFilter === possibleFilters.gt10}
				>
					<span>&#62;</span>10
				</option>
				<option
					value={possibleFilters.gt100}
					selected={selectedFilter === possibleFilters.gt100}
				>
					<span>&#62;</span>100
				</option>
				<option
					value={possibleFilters.gt200}
					selected={selectedFilter === possibleFilters.gt200}
				>
					<span>&#62;</span>200
				</option>
			</select>
		</div>
	);
};

export default Filter;
