// Vendors
import { connect } from 'react-redux';
import React, { Component } from 'react';

const newHabit = {
  name: '',
  description: '',
  thumbnail: 'images/.jpg',
  website: '',
  github: '',
  date_completed: '',
  tag_id: 1
}

class NewHabitForm extends Component {
  state = newHabit;

  handleChange = event => {
    console.log('this.state.tag_id:', event.target.value);
    this.setState({
        [event.target.name]: event.target.value,
    });
  }

  addNewHabit = event => {
    // this will prevent the page from refreshing
    event.preventDefault();
    // this will send a dispatch to redux to add the Habit to our DB
    this.props.dispatch({type: 'ADD_Habit', payload: this.state});
    // this will clear the input fields
    this.setState(newHabit);
  }

  fetchTags = () => {
    // Dispatch action to fetch the Tags from the server
    this.props.dispatch( { type: 'FETCH_TAGS' } );

  }

  // This renders the Tags right away in the drop down menu
  componentDidMount() {
  this.fetchTags();
  }

  render() {
      return (
          <section>
              <h3>Create your Habit!</h3>
              <form onSubmit={this.addNewHabit}>
                <label>Name
                <input type='text' id="name" placeholder="Name" value={this.state.name} name="name" onChange={this.handleChange} />
                </label>

                <label>Description
                <input type='text' id="Description" placeholder="Description" value={this.state.description} name="description" onChange={this.handleChange} />
                </label>

                <label>Thumbnail
                <input type='text' id="Thumbnail" placeholder="Thumbnail" value={this.state.thumbnail} name="thumbnail" onChange={this.handleChange} />
                </label>

                <label>Website
                <input type='text' id="Website" placeholder="http://example.com" value={this.state.website} name="website" onChange={this.handleChange} />
                </label>

                <label>Github
                <input type='text' id="Github" placeholder="http://example.com" value={this.state.github} name="github" onChange={this.handleChange} />
                </label>

                <label>Date Completed
                <input type='text' id="Date Completed" placeholder="mm/dd/yyyy" value={this.state.date_completed} name="date_completed" onChange={this.handleChange} />
                </label>

                {/* Drop Down Menu tied in with the tags DB table */}
                <label>Technology Used:
                  <select value={this.state.tag_id} onChange={this.handleChange} name="tag_id">
                    {this.props.reduxState.tagReducer.map((tag) => {
                      // console.log('tag:', tag);
                      return (
                        <option key={tag.id} value={tag.id}>{tag.name}</option>
                      );
                    })}
                  </select>
                {/* <input type='number' id="Tag" placeholder="Tags" value={this.state.tag_id} name="tag_id" onChange={this.handleChange} /> */}
                </label>

                <input type='submit' value='Add New Habit' />
              </form>
          </section>
    );
  }
}

const mapStateToProps = reduxState => ({reduxState,});

export default connect(mapStateToProps)(NewHabitForm);