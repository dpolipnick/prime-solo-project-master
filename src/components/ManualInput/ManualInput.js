// Vendors
import { connect } from 'react-redux';
import React, { Component } from 'react';
import swal from 'sweetalert';

const newOccurrence = {
  habit_id: 0,
  date: '',
  time: '',
}

class ManualInput extends Component {

  state = newOccurrence;

  // handles the form changes to update state
  handleChange = event => {
    console.log(event.target.name,':', event.target.value);
    this.setState({
        [event.target.name]: event.target.value,
    });
  }

  addNewOccurrence = event => {
    // this will prevent the page from refreshing
    event.preventDefault();
    console.log('addNewOccurrence button clicked.');
    // this will prevent the POST request until the user has filled the entire form
    if (this.state.habit_id === 0 || this.state.date === '' || this.state.time === '') {
        swal("WARNING!", "You need to complete each field in the form.", "warning");
    }
    else{
    // this will send a dispatch to redux to add the Occurrence to our DB
    this.props.dispatch({type: 'ADD_OCCURRENCE', payload: this.state});
    // this will clear the input fields
    this.setState(newOccurrence);
    swal("Done!", "Your occurrence of that bad habit has been added to your history.", "success");
    }
  }

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
              <h3>Manually track your recent progress.</h3>

                {/* Drop Down Menu tied in with the user's habits via DB table */}
                <label className="newHabitForm">habit:
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

                <form>

                <label className="newHabitForm">Select Date:</label>
                <input type='date' id="date" placeholder="date" value={this.state.date} name="date" onChange={this.handleChange} />
                
                <br/>

                <label className="newHabitForm">Select Time:</label>
                <input type='time' id="time" placeholder="time" value={this.state.time} name="time" onChange={this.handleChange} />
                
                <br/>
                
                <button onClick={this.addNewOccurrence}>Add this occurrence to your history.</button>
              </form>
          </div>
    );
  }
}

const mapStateToProps = reduxState => ({reduxState});

export default connect(mapStateToProps)(ManualInput);