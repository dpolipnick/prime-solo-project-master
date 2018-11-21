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
                {this.props.reduxState.categoriesReducer.map((category) => {
                    if (category.id === habit.category_id) {
                        return(
                            <p>Category: {category.category}</p>
                        );
                    }
                })}
                <p>Category: {habit.tag_id}</p>
                <Delete />
                <Create />
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({reduxState});

export default connect(mapStateToProps)(HabitsItem);