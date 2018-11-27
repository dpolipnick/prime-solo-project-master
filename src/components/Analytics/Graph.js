// Vendors
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import swal from 'sweetalert';

const emptyObject = {
  todayArray: [],
  weekArray: [],
  monthArray: [],
  allTimeArray: []
}

class Graph extends Component {

  state = emptyObject;

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
    // this.sortHistory();
    }
  }

  // occurrences = this.props.reduxState.historyReducer;
  // now = Date.now();

  // sortHistory = () => {
  //   this.setState(emptyObject);
  //   let now = Date.now();
  //   let today = this.props.reduxState.historyReducer.filter(occurrence => Date.parse(occurrence.date) > now-86400000);
  //   this.setState({
  //     todayArray: today,
  //   });
  //   let week = this.props.reduxState.historyReducer.filter(occurrence => Date.parse(occurrence.date) > now-604800000);
  //   this.setState({
  //     weekArray: week,
  //   });
  //   let month = this.props.reduxState.historyReducer.filter(occurrence => Date.parse(occurrence.date) > now-2592000000);
  //   this.setState({
  //     monthArray: month,
  //   });
  //   let allTime = this.props.reduxState.historyReducer.filter(occurrence => Date.parse(occurrence.date) < now);
  //   this.setState({
  //     allTimeArray: allTime,
  //   });
  //   console.log('newToday:', today);
  //   console.log('this.state.todayArray:', this.state.todayArray);
  //   console.log('newWeek:', week);
  //   console.log('newMonth:', month);
  //   console.log('newallTime:', allTime);
  // }

  // history = () => {
  //   this.setState(emptyObject);
  //   let now = Date.now();
  //   this.props.reduxState.historyReducer.map((occurrence) => {
  //     // if the occurrence was within the last 24 hours, add to todayArray
  //     if (Date.parse(occurrence.date) > now-86400000) {
  //       this.setState({
  //         today: [...this.state.today, occurrence]
  //       });
  //     }
  //     // week
  //     if (Date.parse(occurrence.date) > now-604800000) {
  //       this.setState({
  //         week: [...this.state.week, occurrence]
  //       });
  //     }
  //     // month
  //     if (Date.parse(occurrence.date) > now-2592000000) {
  //       this.setState({
  //         month: [...this.state.month, occurrence]
  //     });
  //     }
  //     // other
  //     else {
  //       this.setState({
  //         notToday: [...this.state.notToday, occurrence]
  //       });
  //     }
  //   })
  // }

  // componentDidMount = () => {
    // this.sortHistory();
  // }

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

              {/* {this.occurrences.map((occurrence) => {
                return (
                <p key={occurrence.id} value={occurrence.id}>Habit:{occurrence.habit} Date:{occurrence.date} Time:{occurrence.time}</p>
                );
                })} */}
            
            {/* <p>{JSON.stringify(this.state)}</p> */}

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