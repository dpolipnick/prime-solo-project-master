// Vendors
import React from 'react';
import { Link } from 'react-router-dom';
// Styles
import {Restore, Lock, TrendingUp, ViewList} from '@material-ui/icons';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const Dashboard = () => (
  <div className="CenterPage">

    <h1>Your Dashboard</h1>

    <Link to="/newhabit">
        <section className="dashboard">
            <Lock className="icon"/>
            <br/>
            <span className="dashboard-p">Create New Habit</span>
        </section>
    </Link>

    <Link to="/analytics">
        <section className="dashboard">
            <TrendingUp className="icon"/>
            <br/>
            <span className="dashboard-p">Track Your Habits</span>
        </section>
    </Link>

    <Link to="/habits">
        <section className="dashboard">
            <ViewList className="icon"/>
            <br/>
            <span className="dashboard-p">Your Bad Habits</span>
        </section>
    </Link>

    <Link to="/manual-input">
        <section className="dashboard">
            <Restore className="icon"/>
            <br/>
            <span className="dashboard-p">Manual Input</span>
            <br/>
            <br/>
        </section>
    </Link>
  </div>
);

export default Dashboard;
