/* eslint-disable react/react-in-jsx-scope */
import '../App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HouseDetails from '../components/HouseDetails';
import SignIn from './auths/SignIn';
import SignUp from './auths/SignUp';
import HomePage from '../components/HomePage';
import Dashboard from './Dashboard';
import Users from './Users';
import Favorites from './Favorites';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Switch>      

        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />

        <Route path="/" component={Dashboard} />
        
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
