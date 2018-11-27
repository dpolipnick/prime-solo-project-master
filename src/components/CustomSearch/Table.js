// Vendors
import { connect } from 'react-redux';
import React, { Component } from 'react';
import moment from 'moment';

class Table extends Component {

  render() {

    return (
        <div>
              
            <h3>Your Data:</h3>

            <table>
                <thead>
                    <tr>
                        <th>Habit</th>
                        <th>Date Occurred</th>
                        <th>Time Occured</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.reduxState.occurrencesReducer.map(occurrence => (
                    <tr key={occurrence.id}>
                        <td>{occurrence.habit}</td>
                        <td>{moment(occurrence.date).format('ddd M[/]D, YYYY')}</td>
                        <td>{moment(occurrence.time, "HH:mm:ss").format("hh:mm:ss A")}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
  }
}

const mapStateToProps = reduxState => ({reduxState});

export default connect(mapStateToProps)(Table);