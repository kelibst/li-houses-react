import '../App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/layouts/Header';
import Houses from './Houses';
import HouseDetails from '../components/HouseDetails';
import SignIn from './auths/SignIn';
import SignUp from './auths/SignUp';

const App = () => (
    <BrowserRouter>
      <div className="App">

        <Header />
        <Switch>
          <Route exact path="/" component={Houses} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/houses/:house_id" component={HouseDetails} />
          
        </Switch>
      </div>
    </BrowserRouter>
  );

export default App;
