// Vendors
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Styles
import { Delete, Create} from '@material-ui/icons';
import swal from 'sweetalert';

class HabitsItem extends Component {

    // When the edit icon is clicked, navigate to the editHabit page for that habit
    edithabit = (event) => {
        event.preventDefault();
        window.open(`/edithabit/${this.props.habitObject.id}`,`_self`);
    }

    render() {

        const habit = this.props.habitObject;

        return (
            <div>
                <h3>{habit.habit}</h3>
                <p className="text-black">Category: {habit.category}</p>
                <Delete onClick={() => { 
                    swal({
                        title: "Are you sure?",
                        text: `Once deleted, you will not be able to recover ${habit.habit}!`,
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                        swal(`Awesome! You conquered ${habit.habit} and it's been deleted!`, {
                            icon: "success",
                        });
                        {this.props.dispatch(
                            {type: 'DELETE_HABIT', payload: habit}
                        )}}
                    })
                }}/>
                <Create onClick={this.editHabit}/>
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({reduxState});

export default connect(mapStateToProps)(HabitsItem);