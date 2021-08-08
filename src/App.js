import './App.css';
import SignIn from './components/SignIn';
import User from './components/User';
import { Switch, Route } from 'react-router-dom';

import { Provider } from "react-redux";
import store from "./store";


function App() {
  return (
    <Provider store={store}>
			<div className="App">
				<Switch>
					<Route path="/" exact component={SignIn} />
					<Route path="/user" component={User} />
				</Switch>
			</div>
    </Provider>
  );
}

export default App;
