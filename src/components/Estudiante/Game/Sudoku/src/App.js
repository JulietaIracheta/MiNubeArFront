import React from 'react';
import Grid from './components/Grid';
import { solver, isSolvable, isComplete } from './utils/sudoku';
import { solve, clear, undo} from './actions/grid';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import './css.css'

const finalCreateStore = compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = finalCreateStore(rootReducer);

/* Application Container Component */
var createReactClass = require('create-react-class');
const App = createReactClass({
	componentDidMount(){
		this.unsubscribe = this.props.store.subscribe(() => {
			this.forceUpdate();
		})
	},
	componentWillUnmount() {
		this.unsubscribe();
	},
	render() {
		const {store} = this.props;
		const {grid, status} = store.getState();
		const {isSolved, isEdited} = status;
		return (
			<div className="rootSudoku">
				<button
					className='undo'
					disabled={window.gridHistory && !window.gridHistory.length}
					onClick={() => store.dispatch(undo())}
				>
					⤺ Deshacer
				</button>
				<button
					className='clear'
					disabled={!isEdited}
					onClick={() => store.dispatch(clear())}
				>
					⟲ Limpiar
				</button>

				<Grid grid={grid} status={status} {...this.props}/>

				<button
					className='check'
					disabled={isSolved}
					onClick={() => {
						if (isSolvable(grid)) {
							if (isComplete(grid)) {
								return alert('Felicitaciones, lo resolviste!!');
							}
							alert('Este Sudoku todavía tiene resolución, seguí intentándolo !!');
						} else {
							alert('Este Sudoku no tiene resolución');
						}					
					}}
				>
					Chequear
				</button>
				<button
					className='solve'
					onClick={() => store.dispatch(solve())}
				>
					Resolver
				</button>			
			</div>

		);
	}
});

export default App;
