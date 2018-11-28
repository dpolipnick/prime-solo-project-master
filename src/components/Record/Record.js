// Vendors
import { connect } from 'react-redux';
import React, { Component } from 'react';
// Styles
import './Record.css';

emptyState = {
  notes : [],
  noteContent: '',
  instructions: 'Press the <strong>Start Recognition</strong> button and allow access.',
}

class Record extends Component {

  state = emptyState;

  // handles the textarea changes to update state
  handleChange = event => {
    console.log(event.target.name,':', event.target.value);
    this.setState({
        [event.target.name]: event.target.value,
    });
  }

  componentDidMount = () => {
    try {
      let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      let recognition = new SpeechRecognition();
      /*-----------------------------
            Voice Recognition 
      ------------------------------*/

      // If false, the recording will stop after a few seconds of silence.
      // When true, the silence period is longer (about 15 seconds),
      // allowing us to keep recording even when the user pauses. 
      recognition.continuous = true;

      // This block is called every time the Speech APi captures a line. 
      recognition.onresult = function(event) {

        // event is a SpeechRecognitionEvent object.
        // It holds all the lines we have captured so far. 
        // We only need the current one.
        let current = event.resultIndex;

        // Get a transcript of what was said.
        let transcript = event.results[current][0].transcript;

        // Add the current transcript to the contents of our Note.
        // There is a weird bug on mobile, where everything is repeated twice.
        // There is no official solution so far so we have to handle an edge case.
        let mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

        if(!mobileRepeatBug) {
          noteContent += transcript;
          noteTextarea.val(noteContent);
        }
      };

      recognition.onstart = function() { 
        instructions.text('Voice recognition activated. Try speaking into the microphone.');
      }

      recognition.onspeechend = function() {
        instructions.text('You were quiet for a while so voice recognition turned itself off.');
      }

      recognition.onerror = function(event) {
        if(event.error == 'no-speech') {
          instructions.text('No speech was detected. Try again.');  
        };
      }
      getAllNotes();
    }
    catch(e) {
      console.error(`This browser doesn't support the Web Speech API, please open it in Google Chrome. Your error is:`, e);
      alert(`Sorry, Your Browser Doesn't Support the Web Speech API. Try Opening This App In Google Chrome.`);
    }
  }

  // Get all notes from previous sessions and display them.

  renderNotes(notes);


  /*-----------------------------
        Helper Functions 
  ------------------------------*/

  saveNote = (dateTime, content) => {
    localStorage.setItem('note-' + dateTime, content);
  }


  getAllNotes = () => {
    let key;
    for (let i = 0; i < localStorage.length; i++) {
      key = localStorage.key(i);

      if(key.substring(0,5) == 'note-') {
        notes.push({
          date: key.replace('note-',''),
          content: localStorage.getItem(localStorage.key(i))
        });
      } 
    }
    return notes;
  }

  //-----------------Needed?----------------//
  // deleteNote = (dateTime) => {
  //   localStorage.removeItem('note-' + dateTime); 
  // }
  //-------------------------------------//

  //-----My custom jQuery to React fucntions-------//

  // Call this when the start recording button is clicked to start recording
  startRecord = (event) => {
    if (this.state.noteContent.length) {
      this.setState({
        noteContent: this.state.noteContent + ' '
      })
    }
    recognition.start();
  }

  // Call this when the pause button is clicked to stop recording
  pauseRecord = (event) => {
    recognition.stop();
    this.setState({
      instructions: 'Voice recognition paused.',
    })
  }

  saveNote = () => {
    recognition.stop();

    if(!this.state.noteContent.length) {
      this.setState({
        instructions: 'Could not save empty note. Please add a message to your note.',
      })
    }
    else {
      // Save note to localStorage.
      // The key is the dateTime with seconds, the value is the content of the note.
      saveNote(new Date().toLocaleString(), this.state.noteContent);

      // Reset variables and update UI.
      this.state.noteContent = '';
      renderNotes(getAllNotes());
      noteTextarea.val('');
      this.setState({
        instructions: 'Note saved successfully.',
      })
    }
  }

  /*-----------------------------
        React App Render 
  ------------------------------*/

  render() {

    return (
      <div>
          
        <h1>Record yourself and view your habit counts!</h1>
        <br/>

        <div class="app">

          <h3>Add New Note</h3>

          <div class="input-single">
              <textarea value={this.state.noteContent} name="noteContent" onChange={this.handleChange} id="note-textarea" placeholder="Create a new note by typing or using voice recognition." rows="6"></textarea>
          </div>

          <button onClick={this.startRecord} id="start-record-btn" title="Start Recording">Start Recognition</button>
          <button onClick={this.pauseRecord} id="pause-record-btn" title="Pause Recording">Pause Recognition</button>
          <button onClick={this.saveNote} id="save-note-btn" title="Save Note">Save Note</button>   
          
          <p id="recording-instructions">{this.state.instructions}</p>
          
          <h3>My Notes</h3>
          <ul id="notes">
              <li>
                {this.state.notes.map((note) => {
                  return (
                    <li class="note">
                      <p class="header">
                        <span class="date">${note.date}</span>
                        <a href="#" class="listen-note" title="Listen to Note">Listen to Note</a>
                        <a href="#" class="delete-note" title="Delete">Delete</a>
                      </p>
                      <p class="content">${note.content}</p>
                    </li>  
                  );
                })}
                  });
                }
                else {
                  html = '<li><p class="content">You don\'t have any notes yet.</p></li>';
                }
                notesList.html(html);
              }

                  <p class="no-notes">You don't have any notes.</p>
              </li>
          </ul>

        </div>

        {/* notesList.on('click', function(e) {
          e.preventDefault();
          let target = $(e.target);

          // Listen to the selected note.
          if(target.hasClass('listen-note')) {
            let content = target.closest('.note').find('.content').text();
            readOutLoud(content);
          }

          // Delete note.
          if(target.hasClass('delete-note')) {
            let dateTime = target.siblings('.date').text();  
            deleteNote(dateTime);
            target.closest('.note').remove();
          }
        }); */}

      </div>
    );
  }
}

const mapStateToProps = reduxState => ({reduxState});

export default connect(mapStateToProps)(Record);

/*-----------------------------
jQuery Variables from original 
------------------------------*/

// let noteTextarea = $('#note-textarea');
// let instructions = $('#recording-instructions');
// let notesList = $('ul#notes');

// let noteContent = '';




/*-----------------------------
      Speech Synthesis 
------------------------------*/

// function readOutLoud(message) {
// 	let speech = new SpeechSynthesisUtterance();

//   // Set the text and voice attributes.
// 	speech.text = message;
// 	speech.volume = 1;
// 	speech.rate = 1;
// 	speech.pitch = 1;
  
// 	window.speechSynthesis.speak(speech);
// }
