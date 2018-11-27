// Vendors
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

const emptyObject = {
  today: [],
  week: [],
  month: [],
  notToday: []
}

class Graph extends Component {

  state = emptyObject;

  // occurrences = this.props.reduxState.historyReducer;
  // now = Date.now();


  history = () => {
    this.setState(emptyObject);
    let now = Date.now();
    this.props.reduxState.historyReducer.map((occurrence) => {
      // if the occurrence was within the last 24 hours, add to todayArray
      if (Date.parse(occurrence.date) > now-86400000) {
        this.setState({
          today: [...this.state.today, occurrence]
        });
      }
      // week
      if (Date.parse(occurrence.date) > now-604800000) {
        this.setState({
          week: [...this.state.week, occurrence]
        });
      }
      // month
      if (Date.parse(occurrence.date) > now-2592000000) {
        this.setState({
          month: [...this.state.month, occurrence]
      });
      }
      // other
      else {
        this.setState({
          notToday: [...this.state.notToday, occurrence]
        });
      }
    })
  }

  componentDidMount = () => {
    this.history();
  }

  // searchHistory = (string) => {
  //   console.log(`Searching through ${string} searchHistory.`)
  //   switch(string){
  //     case 'day':
  //       let dayArray = [];
  //       let dayArrayN = this.occurrences.filter(item => Date.parse(item.date) > this.now-86400000);
  //       console.log('dayArrayN:', dayArrayN);
  //       return [dayArrayN];
      // case 'week':
      //   let weekArray = occurrences.filter(item => Date.parse(item.date) > now-604800000)
      //   let weekCorrect = weekArray.filter(item => item.correct == 1)
      //   let weekIncorrect = weekArray.filter(item => item.incorrect == 1)
      //   return [weekCorrect.length,weekIncorrect.length]; 
      // case 'month':
      //   let monthArray = occurrences.filter(item => Date.parse(item.date) > now-2592000000)
      //   let monthCorrect = monthArray.filter(item => item.correct == 1)
      //   let monthIncorrect = monthArray.filter(item => item.incorrect == 1)
      //   return [monthCorrect.length,monthIncorrect.length]; 
      // case 'total':
      //   let totalCorrect = occurrences.filter(item => item.correct ==1)  
      //   let totalIncorrect = occurrences.filter(item => item.incorrect ==1) 
      //   return [totalCorrect.length, totalIncorrect.length]
  //   }
  // }

  // today = {
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

  sample = 3;


  render() {

    return (

        <div>
              
            <h2>Your Data:</h2>
            <button onClick={this.history}>Show History</button>

              {/* {this.occurrences.map((occurrence) => {
                return (
                <p key={occurrence.id} value={occurrence.id}>Habit:{occurrence.habit} Date:{occurrence.date} Time:{occurrence.time}</p>
                );
                })} */}
            
            <p>{JSON.stringify(this.state)}</p>

            <h3>Today</h3>
            <p>Total: {this.state.today.length}</p>

            <h3>This Week</h3>
            <p>Total: {this.state.week.length}</p>

            <h3>This Month</h3>
            <p>Total: {this.state.month.length}</p>

            <h3>All Time</h3>
            <p>Total: {this.props.reduxState.historyReducer.length}</p>

            <h3>Not Today</h3>
            <p>Total: {this.state.notToday}</p>

            {/* <Line data={this.today} /> */}

            <h3>This Week</h3>
            <p>Monday: </p>
            <p>Tuesday: </p>
            <p>Wednesday: </p>
            <p>Thursday: </p>
            <p>Friday: </p>
            <p>Saturday: </p>
            <p>Sunday: </p>

            <h3>This Month</h3>

        </div>
    );
  }
}

const mapStateToProps = reduxState => ({reduxState});

export default connect(mapStateToProps)(Graph);