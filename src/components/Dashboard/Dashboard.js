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
  <div>

    <h1>Your Dashboard</h1>

    <Link to="/">
        <section className="dashboard">
            <Lock className="icon"/>
            <p className="dashboard-p">Create New Habit</p>
        </section>
    </Link>

    <Link to="">
        <section className="dashboard">
            <TrendingUp className="icon"/>
            <p className="dashboard-p">Track Your Habits</p>
        </section>
    </Link>

    <Link to="">
        <section className="dashboard">
            <ViewList className="icon"/>
            <p>Your Habits</p>
        </section>
    </Link>

    <Link to="">
        <section className="dashboard">
            <Restore className="icon"/>
            <p>Manual Record</p>
        </section>
    </Link>
  </div>
);

export default Dashboard;
