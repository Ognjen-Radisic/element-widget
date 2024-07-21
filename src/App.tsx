import { useState } from "react";
import "./App.scss";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div className="widget-container">
				<h1>Select items</h1>
				<h5>You currently have {count} selected items</h5>
				<div>
					<button onClick={() => setCount((count) => count + 1)}>
						count is {count}
					</button>
					<button>Change my choice</button>
				</div>
			</div>
		</>
	);
}

export default App;
