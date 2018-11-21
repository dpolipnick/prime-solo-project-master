// Vendors
import { connect } from 'react-redux';
import React, { Component } from 'react';
// Components
import HabitsItem from './HabitsItem';

class HabitsList extends Component {

    fetchHabits = () => {
        // Dispatch action to fetch the habits from the server
        this.props.dispatch( { type: 'FETCH_HABITS' } );
    }

    // This renders the habits right away
    componentDidMount() {
        this.fetchHabits();
    }

    render() {
        return (
            <div>
                {this.props.reduxState.habitsReducer.map((habit) => {
                    return (
                        <section className="habit" key={habit.id}>
                        <HabitsItem  habitObject={habit}/>
                        </section>
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({reduxState});

export default connect(mapStateToProps)(HabitsList);
