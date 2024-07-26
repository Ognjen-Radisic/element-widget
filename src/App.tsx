import { useEffect, useState } from "react";
import useDebounce from "./hooks/useDebounce";

import { baseArray, filterMapper, possibleFilters } from "./constants";
import { filterMapperType, possibleFilterValues } from "./types";

import Search from "./components/Search/Search";
import Filter from "./components/Filter/Filter";
import SelectedItem from "./components/SelectedItem/SelectedItem";
import WidgetItem from "./components/WidgetItem/WidgetItem";

import "./App.scss";

function App() {
	const [isWidgetOpen, setIsWidgetOpen] = useState<boolean>(false);
	const [mainSelectedItems, setMainSelectedItems] = useState<string[]>([]);
	const [widgetSelectedItems, setWidgetSelectedItems] = useState<string[]>([]);
	const [displayedElements, setDisplayedElements] =
		useState<string[]>(baseArray);
	const [searchField, setSearchField] = useState<string>("");
	const debouncedValue = useDebounce(searchField, 400);
	const [filter, setFilter] = useState<possibleFilterValues>(
		possibleFilters.noFilter as possibleFilterValues
	);

	useEffect(() => {
		const arrFilterApplied = baseArray.filter(
			(i) =>
				parseInt(i.split(" ")[1]) > (filterMapper as filterMapperType)[filter]
		);
		if (debouncedValue !== "") {
			setDisplayedElements(
				arrFilterApplied.filter((element) =>
					element.toString().includes(debouncedValue)
				)
			);
		} else {
			setDisplayedElements(arrFilterApplied);
		}
	}, [debouncedValue, filter]);

	const onWidgetInit = () => {
		setDisplayedElements(baseArray);
		setWidgetSelectedItems(mainSelectedItems);
		setFilter(possibleFilters.noFilter as possibleFilterValues);
		setSearchField("");
		setIsWidgetOpen(!isWidgetOpen);
	};

	const onWidgetSave = () => {
		setIsWidgetOpen(false);
		setSearchField("");
		setFilter(possibleFilters.noFilter as possibleFilterValues);
		setMainSelectedItems(widgetSelectedItems);
	};

	const onWidgetCancel = () => {
		setIsWidgetOpen(false);
		setSearchField("");
		setFilter(possibleFilters.noFilter as possibleFilterValues);
		setWidgetSelectedItems([]);
	};

	return (
		<>
			<div className="app-container">
				<h1>Select items</h1>
				<h5>
					You currently have {mainSelectedItems.length} selected{" "}
					{mainSelectedItems.length === 1 ? "item" : "items"}
				</h5>
				<div className="selected_items_wrapper">
					{mainSelectedItems.map((item) => (
						<SelectedItem
							key={item}
							displayItem={item}
							removeAction={setMainSelectedItems}
							removeFrom={mainSelectedItems}
						/>
					))}
				</div>
				<div>
					<button className="btn_change_choice" onClick={onWidgetInit}>
						Change my choice
					</button>
				</div>
				{isWidgetOpen && (
					<div className="widget-container">
						<div className="widget-header">
							<h5>Select items</h5>
							<button onClick={onWidgetCancel}>X</button>
						</div>
						<div className="widget-options">
							<Search onSearch={setSearchField} />
							<Filter setFilter={setFilter} selectedFilter={filter} />
						</div>
						<div className="widget-body">
							{displayedElements.map((item) => (
								<WidgetItem
									key={item}
									onCheckboxClick={setWidgetSelectedItems}
									checkedWidgetItems={widgetSelectedItems}
									widgetItem={item}
								/>
							))}
						</div>
						<div className="widget-selected-title">
							<h5>Current selected items:</h5>
						</div>
						<div className="widget-selected-items">
							{widgetSelectedItems.map((item) => (
								<SelectedItem
									key={item}
									displayItem={item}
									removeAction={setWidgetSelectedItems}
									removeFrom={widgetSelectedItems}
								/>
							))}
						</div>
						<div className="widget-ctas">
							<button className="btn_change_save" onClick={onWidgetSave}>
								Save
							</button>
							<button className="btn_change_cancel" onClick={onWidgetCancel}>
								Cancel
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default App;
