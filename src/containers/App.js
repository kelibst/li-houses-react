import '../App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/layouts/Header';
import HomePage from '../components/HomePage';

const App = () => (
    <BrowserRouter>
      <div className="App">

        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );

export default App;
