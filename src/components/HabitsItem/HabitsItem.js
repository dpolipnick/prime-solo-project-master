// Vendors
import { connect } from 'react-redux';
import React, { Component } from 'react';
// Styles
import { Delete, Create} from '@material-ui/icons';

class HabitsItem extends Component {

    render() {

        const habit = this.props.habitObject;

        return (
            <div>
                <h3>{habit.habit}</h3>
                <p className="text-black">Category: {habit.category}</p>
                <Delete />
                <Create />
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({reduxState});

export default connect(mapStateToProps)(HabitsItem);