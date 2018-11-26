// // Vendors
// import { connect } from 'react-redux';
// import React, { Component } from 'react';
// import Chart from 'chart.js';
// import {Line} from 'react-chartjs-2';
// // let myChart = new Chart(ctx, {...});

// class Graph extends Component {

//   render() {

//     const data = {
//       labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//       datasets: [
//         {
//           label: 'My First dataset',
//           fill: false,
//           lineTension: 0.1,
//           backgroundColor: 'rgba(75,192,192,0.4)',
//           borderColor: 'rgba(75,192,192,1)',
//           borderCapStyle: 'butt',
//           borderDash: [],
//           borderDashOffset: 0.0,
//           borderJoinStyle: 'miter',
//           pointBorderColor: 'rgba(75,192,192,1)',
//           pointBackgroundColor: '#fff',
//           pointBorderWidth: 1,
//           pointHoverRadius: 5,
//           pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//           pointHoverBorderColor: 'rgba(220,220,220,1)',
//           pointHoverBorderWidth: 4,
//           pointRadius: 2,
//           pointHitRadius: 10,
//           data: [65, 59, 80, 81, 56, 55, 40]
//         }
//       ]
//     };

//     insertData = () => {
//       this.props.reduxState.occurrencesReducer.map((occurrence) => {
//         this.data.labels.push(occurrence.)
//       key={occurrence.id} value={occurrence.id}>Habit:{occurrence.habit} Date:{occurrence.date} Time:{occurrence.time}
//       })
//     }

//     // Load the data right away
//     componentDidMount = () => {
//       insertData();
//     }

//     return (
//         <div>
              
//             <h3>Your Data:</h3>

//             {/* <p> */}
//               {this.props.reduxState.occurrencesReducer.map((occurrence) => {
//                 return (
//                 <p key={occurrence.id} value={occurrence.id}>Habit:{occurrence.habit} Date:{occurrence.date} Time:{occurrence.time}</p>
//                 );
//                 })}
//             {/* </p> */}

//             <Line data={data} />

//         </div>
//     );
//   }
// }

// const mapStateToProps = reduxState => ({reduxState});

// export default connect(mapStateToProps)(Graph);