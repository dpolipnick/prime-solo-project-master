// Vendors
import { connect } from 'react-redux';
import React, { Component } from 'react';
import swal from 'sweetalert';

const habit = {
  user_id: 0,
  habit: '',
  category_id: 0,
  mute_status: false,
}

class EditHabit extends Component {

  state = {
    user_id: 0,
    habit: '',
    category_id: 0,
    mute_status: false,
  }

  establishUser = () =>{
    this.setState({
        user_id: this.props.reduxState.user.id
    })
  }

  // handles the form changes to update state
  handleChange = event => {
    console.log(event.target.name,':', event.target.value);
    this.setState({
        [event.target.name]: event.target.value,
    });
  }

  editHabit = event => {
    // this will prevent the page from refreshing
    event.preventDefault();
    console.log('editHabit button clicked.');
    // this will prevent the POST request until the user has chosen a category
    if (this.state.category_id === 0) {
        swal("WARNING!", "You need to select a category.", "warning");
    }
    else{
    // this will send a dispatch to redux to add the Habit to our DB
    this.props.dispatch({type: 'ADD_HABIT', payload: this.state});
    // this will clear the input fields
    this.setState(habit);
    this.establishUser();
    swal("Great job!", "You've taken the first step towards breaking that habit!", "success");
    }
  }

  fetchCategories = () => {
    // Dispatch action to fetch the Categories from the server
    this.props.dispatch( { type: 'FETCH_CATEGORIES' } );
  }

  // This renders the Categories right away in the drop down menu
  componentDidMount() {
    this.fetchCategories();
    this.establishUser();
  }

    // changes the mute button from active or muted
    // status: (true = muted) (false = active)
    toggleMute = (event) => {
        event.preventDefault();
        console.log('toggleMute button clicked.');
        this.setState({
        ...this.state, mute_status: !this.state.mute_status
        });
    }

  render() {

    let muteButton = '';

    if (this.state.mute_status === false) {
      muteButton = (
        <button className="habitForm" onClick={this.toggleMute}>
        Active
        </button>
      );
    }
    else {
      muteButton = (
        <button className="habitForm" onClick={this.toggleMute}>
        Muted
        </button>      
        );
    }

      return (
          <div>
              <h3>Create your Habit!</h3>

                <form>

                <label className="habitForm">Verbal Habit:</label>
                <input type='text' id="habit" placeholder="word or phrase" value={this.state.habit} name="habit" onChange={this.handleChange} />
                
                <br/>

                {muteButton}

                <br/>

                {/* Drop Down Menu tied in with the categories DB table */}
                <label className="habitForm">Category:
                  <select defaultValue='-- Select Category --' onChange={this.handleChange} name="category_id">
                    <option key='default' disabled={true}>
                        -- Select Category --
                    </option>
                    {this.props.reduxState.categoriesReducer.map((category) => {
                      return (
                        <option key={category.id} value={category.id}>{category.category}</option>
                      );
                    })}
                  </select>
                </label>

                <br/>
                
                <button onClick={this.editHabit}>Save Changes</button>
              </form>
          </div>
    );
  }
}

const mapStateToProps = reduxState => ({reduxState});

export default connect(mapStateToProps)(EditHabit);