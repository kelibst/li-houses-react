import '../App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/layouts/Header';
import Houses from './Houses';

const App = () => (
    <BrowserRouter>
      <div className="App">

        <Header />
        <Switch>
          <Route exact path="/" component={Houses} />
        </Switch>
      </div>
    </BrowserRouter>
  );

export default App;
