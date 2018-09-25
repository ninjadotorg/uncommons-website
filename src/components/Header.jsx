import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import styles from './Header-styles';

class Header extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { classes, auth } = this.props;
    return (
      <header className="header">
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
            <div className="header-menu-bar">
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
              <Button className="button-app-1">
                Submit a proposal
              </Button>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default connect(state => ({ auth: state.auth }), null)(withStyles(styles)(Header));
