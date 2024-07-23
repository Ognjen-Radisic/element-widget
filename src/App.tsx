import { useEffect, useState } from "react";
import useDebounce from "./hooks/useDebounce";
import "./App.scss";
import Search from "./components/Search/Search";
import Filter from "./components/Filter/Filter";
import { baseArray, filterMapper } from "./constants";
import { filterMapperType } from "./types";

function App() {
	const [isWidgetOpen, setIsWidgetOpen] = useState<boolean>(false);
	const [mainSelectedItems, setMainSelectedItems] = useState<number[]>([]);
	const [selectedItems, setSelectedItems] = useState<number[]>([]);
	const [initialElements, setInitialElements] = useState<number[]>(baseArray);
	const [searchField, setSearchField] = useState<string>("");
	const debouncedValue = useDebounce(searchField, 600);
	const [filter, setFilter] = useState<"noFilter" | "gt10" | "gt100" | "gt200">(
		"noFilter"
	);

	useEffect(() => {
		const arrFilterApplied = baseArray.filter(
			(i) => i > (filterMapper as filterMapperType)[filter]
		);
		console.log(arrFilterApplied);
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

	return (
		<>
			<div className="app-container">
				<h1>Select items</h1>
				<h5>You currently have {mainSelectedItems.length} selected items</h5>
				{mainSelectedItems.map((item) => {
					return (
						<div>
							Element {item}{" "}
							<span
								onClick={() =>
									setMainSelectedItems(
										mainSelectedItems.filter((i) => i !== item)
									)
								}
							>
								X
							</span>
						</div>
					);
				})}
				<button
					onClick={() => {
						setInitialElements(baseArray);
						setSelectedItems(mainSelectedItems);
						setIsWidgetOpen(!isWidgetOpen);
					}}
				>
					Change my choice
				</button>
				{isWidgetOpen && (
					<div className="widget-container">
						<div className="widget-header">
							<h5>Select items</h5>
							<button onClick={() => setIsWidgetOpen(!isWidgetOpen)}>X</button>
						</div>
						<div className="widget-options">
							<Search onSearch={setSearchField} />
							<Filter setFilter={setFilter} selectedFilter={filter} />
						</div>
						<div className="widget-body">
							{initialElements.map((e) => {
								return (
									<div>
										<input
											type="checkbox"
											id="scales"
											name="scales"
											onChange={() => setSelectedItems([...selectedItems, e])}
											checked={
												selectedItems.length ? selectedItems.includes(e) : false
											}
											disabled={selectedItems.length === 3}
										/>
										<label>Element {e}</label>
									</div>
								);
							})}
						</div>
						<div className="widget-selected-title">
							<h5>Current selected items:</h5>
						</div>
						<div className="widget-selected-items">
							{selectedItems.map((item) => {
								return (
									<div>
										Element {item}{" "}
										<span
											onClick={() =>
												setSelectedItems(
													selectedItems.filter((i) => i !== item)
												)
											}
										>
											X
										</span>
									</div>
								);
							})}
						</div>
						<div className="widget-ctas">
							<button
								onClick={() => {
									setIsWidgetOpen(!isWidgetOpen);
									setMainSelectedItems(selectedItems);
								}}
							>
								Save
							</button>
							<button
								onClick={() => {
									setSelectedItems([]);
									setIsWidgetOpen(!isWidgetOpen);
									setSearchField("");
									setFilter("noFilter");
								}}
							>
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
