import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Popup from '../../views/Popup/Popup';
import Options from '../../views/Options/Options';
import Login from '../../views/Auth/Login';
import SignUp from '../../views/Auth/SignUp';
import { getTheme } from '../../theme';
import { sGetDarkMode } from '../../store/reducers/settings';

const App = ({ darkMode }) => (
  <MuiThemeProvider theme={createMuiTheme(getTheme(darkMode))}>
    <CssBaseline>
      <Router>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <SignUp />
          </Route>
          <Route path="/popup">
            <Popup />
          </Route>
          <Route path="/options">
            <Options />
          </Route>
        </Switch>
      </Router>
    </CssBaseline>
  </MuiThemeProvider>
);

App.propTypes = { darkMode: PropTypes.bool.isRequired };

const mapStateToProps = state => ({ darkMode: sGetDarkMode(state) });

export default connect(mapStateToProps, {})(App);
