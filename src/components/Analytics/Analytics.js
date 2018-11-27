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

  fetchHistory = (event) => {
    // this will prevent the page from refreshing
    // event.preventDefault();
    console.log('fetchHistory button clicked.');
    // this will prevent the GET request until the user has filled the entire form
    if (event.target.value === 0) {
        swal("WARNING!", "You need to choose a habit to see the data.", "warning");
    }
    else{
    // this will send a dispatch to redux to get the occurrences from our DB
    this.props.dispatch({type: 'FETCH_HISTORY', payload: event.target.value});
    }
  }

  // handles the form changes to update state
  handleChange = event => {
    console.log(event.target.name,':', event.target.value);
    this.setState({
        [event.target.name]: event.target.value,
    });
    this.fetchHistory();
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

    let now = Date.now();
    let today = this.props.reduxState.historyReducer.filter(occurrence => Date.parse(occurrence.date) > now-86400000);

    let week = this.props.reduxState.historyReducer.filter(occurrence => Date.parse(occurrence.date) > now-604800000);

    let month = this.props.reduxState.historyReducer.filter(occurrence => Date.parse(occurrence.date) > now-2592000000);

    let allTime = this.props.reduxState.historyReducer.filter(occurrence => Date.parse(occurrence.date) < now);

    return (
          <div>
              
              <h1>View your progress!</h1>

              <br/>

                <form>

                {/* Drop Down Menu tied in with the user's habits via DB table */}
                <label className="newHabitForm">Habit:
                  <select defaultValue='-- Select Habit --' onChange={this.fetchHistory} name="habit_id">
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

              </form>

            <br/>

            {/* <Graph historyToFetch={this.state}/> */}

            <br/>
            <h2>Your Data:</h2>

            <section  className="habit">
            <h3>Today</h3>
            <p>Total: {today.length}</p>
            {/* <Line data={this.todayChart} /> */}
            </section>

            <section  className="habit">
            <h3>This Week</h3>
            <p>Total: {week.length}</p>
            </section>

            <section  className="habit">
            <h3>This Month</h3>
            <p>Total: {month.length}</p>
            </section>

            <section  className="habit">
            <h3>All Time</h3>
            <p>Total: {this.props.reduxState.historyReducer.length}</p>
            </section>

            <button className="analyticsButton" onClick={()=> window.open("/#/customsearch", "_self")}>Switch to Custom Search</button>

          </div>
    );
  }
}

const mapStateToProps = reduxState => ({reduxState});

export default connect(mapStateToProps)(Analytics);