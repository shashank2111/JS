// import logo from './logo.svg';
import './App.css';
import Todo from './components/Todo';

function App() {
  return (
		<div className="App">
			<div className="app-header">
				<p className="todos-text">todos</p>
			</div>
			{/* <div className="app-body">
				input
			</div> */}
			<Todo />
		</div>
  );
}

export default App;
