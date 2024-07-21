import { useEffect, useState } from "react";
import useDebounce from "./hooks/useDebounce";
import "./App.scss";

function App() {
	const baseArray = [...Array(300).keys()].map((i) => i + 1);
	const [isWidgetOpen, setIsWidgetOpen] = useState<boolean>(false);
	const [mainSelectedItems, setMainSelectedItems] = useState<number[]>([]);
	const [selectedItems, setSelectedItems] = useState<number[]>([]);
	const [initialElements, setInitialElements] = useState<number[]>(baseArray);
	const [searchField, setSearchField] = useState<string>("");
	const debouncedValue = useDebounce(searchField, 600);

	useEffect(() => {
		if (debouncedValue !== "") {
			setInitialElements(
				baseArray.filter((element) =>
					element.toString().includes(debouncedValue)
				)
			);
		} else {
			setInitialElements(baseArray);
		}
	}, [debouncedValue, baseArray]);

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
							<div className="widget-options-search">
								<p>Search</p>
								<input
									type="text"
									onChange={(e) => setSearchField(e.target.value)}
								/>
							</div>
							<div className="widget-options-filter">
								<p>Filter</p>
								<select name="elementFilter">
									<option value="noFilter">No filter</option>
									<option value="gt10">
										<span>&#62;</span>10
									</option>
									<option value="gt100">
										<span>&#62;</span>100
									</option>
									<option value="gt200">
										<span>&#62;</span>200
									</option>
								</select>
							</div>
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
