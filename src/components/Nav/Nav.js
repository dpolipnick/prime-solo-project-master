import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

const Nav = (props) => (
  <div>
    <div className="nav">
      <Link to="/">
        <img alt="" className="nav-title" src={require('./logo.png')}/>
      </Link>
      <div>
        <Link className="Mynav-link" to="/profile">
          {/* Show this link if they are logged in or not,
          but call this link 'profile' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          {props.user.id ? 'Your Profile' : 'Login / Register'}
        </Link>
        {/* Show the user's pages if they are logged in: */}
        {props.user.id && (
          <>
            <Link className="Mynav-link" to="/dashboard">
              Dashboard
            </Link>
            <Link className="Mynav-link" to="/newhabit">
              Create New Habit
            </Link>
            <Link className="Mynav-link" to="/habits">
              Your Habits
            </Link>
            <Link className="Mynav-link" to="/manual-input">
              Manual Input
            </Link>
            <Link className="Mynav-link" to="/analytics">
              Analytics
            </Link>
            {/* <LogOutButton className="Mynav-link"/> */}
          </>
        )}
        {/* Always show this link since the Home page is not protected */}
        <Link className="Mynav-link" to="/">
          About
        </Link>
      </div>
    </div>
    <br />
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
