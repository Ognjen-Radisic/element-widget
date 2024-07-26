import { FC } from "react";
import "./Search.scss";

interface SearchProps {
	onSearch: (val: string) => void;
}

const Search: FC<SearchProps> = ({ onSearch }) => {
	return (
		<div className="widget-options-search">
			<p>Search</p>
			<input type="text" onChange={(e) => onSearch(e.target.value)} />
		</div>
	);
};

export default Search;
