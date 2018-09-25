import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { logout } from '@/reducers/auth/action';

class Profile extends React.Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { logout: propsLogout, auth } = this.props;
    return (
      <div className="uk-container">
        <div className="profile-page">
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              {auth.isLogged ? <Button onClick={propsLogout}>Logout</Button> : ''}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default connect(state => ({ auth: state.auth }), ({ logout }))(Profile);
