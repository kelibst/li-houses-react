import '../App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Houses from './Houses';
import HouseDetails from '../components/HouseDetails';
import SignIn from './auths/SignIn';
import SignUp from './auths/SignUp';
import HomePage from '../components/HomePage';

const App = () => (
    <BrowserRouter>
      <div className="App">

        
        <Switch>
          <Route exact path="/" component={HomePage} />

          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/houses/:house_id" component={HouseDetails} />
          
        </Switch>
      </div>
    </BrowserRouter>
  );

export default App;
