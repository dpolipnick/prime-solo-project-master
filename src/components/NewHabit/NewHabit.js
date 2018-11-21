// Vendors
import { connect } from 'react-redux';
import React, { Component } from 'react';

const newHabit = {
  user_id: '',
  habit: '',
  mute_status: false,
  category_id: 1
}

class NewHabitForm extends Component {
  state = newHabit;

  handleChange = event => {
    console.log('this.state.category_id:', event.target.value);
    this.setState({
        [event.target.name]: event.target.value,
    });
  }

  addNewHabit = event => {
    // this will prevent the page from refreshing
    event.preventDefault();
    // this will send a dispatch to redux to add the Habit to our DB
    this.props.dispatch({type: 'ADD_HABIT', payload: this.state});
    // this will clear the input fields
    this.setState(newHabit);
  }

  fetchCategories = () => {
    // Dispatch action to fetch the Categories from the server
    this.props.dispatch( { type: 'FETCH_CATEGORIES' } );

  }

  // This renders the Categories right away in the drop down menu
  componentDidMount() {
  this.fetchCategories();
  }

  // changes the mute button from active or muted
  // status: (true = muted) (false = active)
  toggleMute = () => {
    this.setState({
      ...this.state, mute_status: !this.state.mute_status
    });
  }

  render() {

    let muteButton = '';

    if (this.state.mute_status === false) {
      muteButton = (
        <button onClick={this.toggleMute}>
        Active
        </button>
      );
    }
    else {
      muteButton = (
        <button onClick={this.toggleMute}>
        Muted
        </button>      
        );
    }

      return (
          <section>
              <h3>Create your Habit!</h3>
              <form onSubmit={this.addNewHabit}>

                <label>Verbal Habit
                <input type='text' id="habit" placeholder="word or phrase" value={this.state.habit} name="habit" onChange={this.handleChange} />
                </label>

                {muteButton}

                {/* Drop Down Menu tied in with the categories DB table */}
                <label>Category:
                  <select value={this.state.category_id} onChange={this.handleChange} name="category_id">
                    {this.props.reduxState.categoryReducer.map((category) => {
                      // console.log('category:', category);
                      return (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      );
                    })}
                  </select>
                </label>

                <input type='submit' value='Add New Habit' />
              </form>
          </section>
    );
  }
}

const mapStateToProps = reduxState => ({reduxState,});

export default connect(mapStateToProps)(NewHabitForm);