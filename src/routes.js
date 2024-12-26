import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import DebatePage from './pages/DebatePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TeamSelectionPage from './pages/TeamSelectionPage';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/admin" component={AdminPage} />
                <Route path="/debate" component={DebatePage} />
                <Route path="/team-selection" component={TeamSelectionPage} />
            </Switch>
        </Router>
    );
};

export default Routes;