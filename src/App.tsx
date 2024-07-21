import { useState } from "react";
import "./App.scss";

function App() {
	const [count, setCount] = useState(10);
	const [isWidgetOpen, setIsWidgetOpen] = useState(false);

	return (
		<>
			<div className="app-container">
				<h1>Select items</h1>
				<h5>You currently have {count} selected items</h5>
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<button onClick={() => setIsWidgetOpen(!isWidgetOpen)}>
					Change my choice
				</button>
				{isWidgetOpen && (
					<div className="widget-container">
						<div className="widget-header">
							<h5>Selected items</h5>
							<button onClick={() => setIsWidgetOpen(!isWidgetOpen)}>X</button>
						</div>
						<div className="widget-options">
							<div className="widget-options-search">
								<p>Search</p>
								<input type="text" />
							</div>
							<div className="widget-options-filter">
								<p>Filter</p>
								<select name="elementFilter">
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
							{[...Array(300).keys()]
								.map((i) => `Element ${i + 1}`)
								.map((e) => {
									return (
										<div>
											<input type="checkbox" id="scales" name="scales" />
											<label>{e}</label>
										</div>
									);
								})}
						</div>
						<div className="widget-selected-title">
							<h5>Current selected items:</h5>
						</div>
						<div className="widget-selected-items">
							<h5>You currently have {count} selected items</h5>
						</div>
						<div className="widget-ctas">
							<button>Save</button>
							<button onClick={() => setIsWidgetOpen(!isWidgetOpen)}>
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
