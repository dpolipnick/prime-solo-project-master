// Vendors
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import swal from 'sweetalert';


class Graph extends Component {

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
    this.props.dispatch({type: 'FETCH_HISTORY', payload: this.props.historyToFetch});
    }
  }

  // todayChart = {
  //   labels: January, Feruary, March, April, May, June, July, August, September, October, November, December,
  //   datasets: [
  //     {
  //       label: `Today`,
  //       fill: false,
  //       lineTension: 0.1,
  //       backgroundColor: 'rgba(75,192,192,0.4)',
  //       borderColor: 'rgba(75,192,192,1)',
  //       borderCapStyle: 'butt',
  //       borderDash: [],
  //       borderDashOffset: 0.0,
  //       borderJoinStyle: 'miter',
  //       pointBorderColor: 'rgba(75,192,192,1)',
  //       pointBackgroundColor: '#fff',
  //       pointBorderWidth: 1,
  //       pointHoverRadius: 5,
  //       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  //       pointHoverBorderColor: 'rgba(220,220,220,1)',
  //       pointHoverBorderWidth: 4,
  //       pointRadius: 2,
  //       pointHitRadius: 10,
  //       data: this.searchHistory('day')
  //     }
  //   ]
  // };


  render() {

  
      let now = Date.now();
      let today = this.props.reduxState.historyReducer.filter(occurrence => Date.parse(occurrence.date) > now-86400000);

      let week = this.props.reduxState.historyReducer.filter(occurrence => Date.parse(occurrence.date) > now-604800000);

      let month = this.props.reduxState.historyReducer.filter(occurrence => Date.parse(occurrence.date) > now-2592000000);

      let allTime = this.props.reduxState.historyReducer.filter(occurrence => Date.parse(occurrence.date) < now);
    
    return (

        <div>
            
            <button onClick={this.fetchHistory}>Show History</button>
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

        </div>
    );
  }
}

const mapStateToProps = reduxState => ({reduxState});

export default connect(mapStateToProps)(Graph);