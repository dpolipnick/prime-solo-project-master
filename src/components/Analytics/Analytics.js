// Vendors
import { connect } from 'react-redux';
import React, { Component } from 'react';
import swal from 'sweetalert';
// Components
import Graph from './Graph';

const graph = {
  habit_id: 0,
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

  fetchHistory = event => {
    // this will prevent the page from refreshing
    event.preventDefault();
    console.log('fetchHistory button clicked.');
    // this will prevent the GET request until the user has filled the entire form
    if (this.state.habit_id === 0) {
        swal("WARNING!", "You need to choose a habit to see the data.", "warning");
    }
    else{
    // this will send a dispatch to redux to get the occurrences from our DB
    this.props.dispatch({type: 'FETCH_HISTORY', payload: this.state});
    // this.loadGraph();
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

  // loadGraph = () => {
  //   return(
  //     <Graph />
  //   );
  // }

  render() {

    return (
          <div>
              
              <h1>View your progress!</h1>

              <button onClick={()=> window.open("/#/customsearch", "_self")}>Custom Search</button>
              <br/>

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

                {/* <button onClick={this.fetchHistory}>Show this habit's history.</button> */}
              </form>

            <br/>

            {/* {this.loadGraph} */}
            <Graph historyToFetch={this.state}/>

          </div>
    );
  }
}

const mapStateToProps = reduxState => ({reduxState});

export default connect(mapStateToProps)(Analytics);