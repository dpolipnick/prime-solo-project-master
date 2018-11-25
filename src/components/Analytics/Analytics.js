// Vendors
import { connect } from 'react-redux';
import React, { Component } from 'react';
import swal from 'sweetalert';
// Components
import Graph from './Graph';

const graph = {
  habit_id: 0,
  date: '',
  time: '',
}

class Analytics extends Component {

  state = graph;

  // handles the form changes to update state
  handleChange = event => {
    console.log(event.target.name,':', event.target.value);
    this.setState({
        [event.target.name]: event.target.value,
    });
  }

//   addNewOccurrence = event => {
//     // this will prevent the page from refreshing
//     event.preventDefault();
//     console.log('addNewOccurrence button clicked.');
//     // this will prevent the POST request until the user has filled the entire form
//     if (this.state.habit_id === 0 || this.state.date === '' || this.state.time === '') {
//         swal("WARNING!", "You need to complete each field in the form.", "warning");
//     }
//     else{
//     // this will send a dispatch to redux to add the Occurrence to our DB
//     this.props.dispatch({type: 'ADD_OCCURRENCE', payload: this.state});
//     // this will clear the input fields
//     this.setState(newOccurrence);
//     }
//   }

  fetchHabits = () => {
    // Dispatch action to fetch the Habits from the server
    this.props.dispatch( { type: 'FETCH_HABITS' } );
  }

  // This renders the Categories right away in the drop down menu
  componentDidMount() {
    this.fetchHabits();
  }

  render() {

    return (
          <div>
              
              <h3>View your progress!</h3>

                <form>

                {/* Drop Down Menu tied in with the user's habits via DB table */}
                <label className="newHabitForm">Habit:
                  <select defaultValue='-- Select Habit --' onChange={this.handleChange} name="habit_id">
                    <option key='default' disabled={true}>
                        -- Select Habit --
                    </option>
                    {this.props.reduxState.habitsReducer.map((habit) => {
                      return (
                        <option key={habit.id} value={habit.id}>{habit.habit}</option>
                      );
                    })}
                  </select>
                </label>

                <br/>

                <label className="newHabitForm">Select Start Date:</label>
                <input type='date' id="startDate" placeholder="date" value={this.state.startDate} name="startDate" onChange={this.handleChange} />
                
                <br/>
                <label className="newHabitForm">through</label>
                <br/>

                <label className="newHabitForm">Select End Date:</label>
                <input type='date' id="endDate" placeholder="date" value={this.state.endDate} name="endDate" onChange={this.handleChange} />
                
                <br/>
                
                <button onClick={this.addNewOccurrence}>Show history.</button>
              </form>

            <br/>

            <Graph />

          </div>
    );
  }
}

const mapStateToProps = reduxState => ({reduxState});

export default connect(mapStateToProps)(Analytics);