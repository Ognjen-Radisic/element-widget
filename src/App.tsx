import { useEffect, useState } from "react";
import useDebounce from "./hooks/useDebounce";

import { baseArray, filterMapper } from "./constants";
import { filterMapperType } from "./types";

import Search from "./components/Search/Search";
import Filter from "./components/Filter/Filter";
import SelectedItem from "./components/SelectedItem/SelectedItem";
import WidgetItem from "./components/WidgetItem/WidgetItem";

import "./App.scss";

function App() {
	const [isWidgetOpen, setIsWidgetOpen] = useState<boolean>(false);
	const [mainSelectedItems, setMainSelectedItems] = useState<string[]>([]);
	const [widgetSelectedItems, setWidgetSelectedItems] = useState<string[]>([]);
	const [initialElements, setInitialElements] = useState<string[]>(baseArray);
	const [searchField, setSearchField] = useState<string>("");
	const debouncedValue = useDebounce(searchField, 400);
	const [filter, setFilter] = useState<"noFilter" | "gt10" | "gt100" | "gt200">(
		"noFilter"
	);

	useEffect(() => {
		const arrFilterApplied = baseArray.filter(
			(i) =>
				parseInt(i.split(" ")[1]) > (filterMapper as filterMapperType)[filter]
		);
		if (debouncedValue !== "") {
			setInitialElements(
				arrFilterApplied.filter((element) =>
					element.toString().includes(debouncedValue)
				)
			);
		} else {
			setInitialElements(arrFilterApplied);
		}
	}, [debouncedValue, filter]);

	const onWidgetInit = () => {
		setInitialElements(baseArray);
		setWidgetSelectedItems(mainSelectedItems);
		setFilter("noFilter");
		setSearchField("");
		setIsWidgetOpen(!isWidgetOpen);
	};

	const onWidgetSave = () => {
		setIsWidgetOpen(false);
		setSearchField("");
		setFilter("noFilter");
		setMainSelectedItems(widgetSelectedItems);
	};

	const onWidgetCancel = () => {
		setIsWidgetOpen(false);
		setSearchField("");
		setFilter("noFilter");
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
				{mainSelectedItems.map((item) => (
					<SelectedItem
						displayItem={item}
						removeAction={setMainSelectedItems}
						removeFrom={mainSelectedItems}
					/>
				))}
				<button onClick={onWidgetInit}>Change my choice</button>
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
							{initialElements.map((item) => (
								<WidgetItem
									onCheckboxClick={setWidgetSelectedItems}
									allWidgetItems={widgetSelectedItems}
									oneWidgetItem={item}
								/>
							))}
						</div>
						<div className="widget-selected-title">
							<h5>Current selected items:</h5>
						</div>
						<div className="widget-selected-items">
							{widgetSelectedItems.map((item) => (
								<SelectedItem
									displayItem={item}
									removeAction={setWidgetSelectedItems}
									removeFrom={widgetSelectedItems}
								/>
							))}
						</div>
						<div className="widget-ctas">
							<button onClick={onWidgetSave}>Save</button>
							<button onClick={onWidgetCancel}>Cancel</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default App;
