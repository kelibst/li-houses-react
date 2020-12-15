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
        <Route exact path="/" component={HomePage} />

        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />

        <Route exact path="/dashboard/:username" component={Dashboard} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/houses/:house_id" component={HouseDetails} />
        <Route exact path="/dashboard/:username/favorites" component={Favorites} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
