import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { push } from 'connected-react-router';
import cn from '@sindresorhus/class-names';
import styles from './Header-styles';
import HeaderDialog from './LoginDialog';

class Header extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      dialogTitle: '',
      dialogContent: '',
    };
  }

  clickHeaderSubmit = () => {
    const { auth, dispatch } = this.props;
    if (auth.isLogged) {
      dispatch(push('/submit'));
    } else {
      this.setState({ openDialog: true, dialogTitle: 'Auth', dialogContent: 'You must login before submit a proposal' });
    }
  }

  closeDialog = () => {
    const { dispatch } = this.props;
    this.setState({ openDialog: false });
    dispatch(push('/login'));
  }

  render() {
    const { classes, auth } = this.props;
    const {
      openDialog, dialogTitle, dialogContent,
    } = this.state;
    return (
      <header className="header">
        <HeaderDialog
          open={openDialog}
          title={dialogTitle}
          content={dialogContent}
          onClose={this.closeDialog}
        />
        <div className="uk-container">
          <div className="row">
            <div className={classes.logoContainer}>
              <Link to="/">Uncommons</Link>
            </div>
            <div className={classes.searchBar}>
              <div className={classes.grow} />
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <Input
                  placeholder="Search anything here..."
                  disableUnderline
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
            </div>
            <div className={cn('header-menu-bar', classes.menuBar)}>
              <ul>
                <li>
                  <Link to="/discover">Discover</Link>
                </li>
                <li>
                  <Link to="/faqs">FAQs</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/more">More</Link>
                </li>
                <li>
                  {!auth.isLogged ? <Link to="/login">Login</Link> : <Link to={`/profile/${auth.address}`}>Profile</Link>}
                </li>
              </ul>
              <Button className="button-app-1" onClick={this.clickHeaderSubmit}>
                Submit a proposal
              </Button>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default connect(
  state => ({ auth: state.auth }), dispatch => ({ dispatch }),
)(withStyles(styles)(Header));
