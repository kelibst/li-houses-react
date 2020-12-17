/* eslint-disable react/react-in-jsx-scope */
import '../App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './auths/SignIn';
import SignUp from './auths/SignUp';
import Dashboard from './Dashboard';

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
