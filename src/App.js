import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import DebatePage from './pages/DebatePage';
import TeamSelectionPage from './pages/TeamSelectionPage';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/admin" component={AdminPage} />
                <Route path="/debate" component={DebatePage} />
                <Route path="/team-selection" component={TeamSelectionPage} />
            </Switch>
            <Footer />
        </Router>
    );
};

export default App;