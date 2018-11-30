// Vendors
import { connect } from 'react-redux';
import React, { Component } from 'react';
// Styles
import './Record.css';

const emptyState = {
  noteContent: '',
  recording: false,
  recognition: null,
  instructions: '',
}

class Record extends Component {

  state = emptyState;

  componentDidMount () {
    try {
      let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      let recognition = new SpeechRecognition();
      let component = this;

      // If false, the recording will stop after a few seconds of silence.
      // When true, the silence period is longer (about 15 seconds),
      // allowing us to keep recording even when the user pauses. 
      recognition.continuous = true;

      // This block is called every time the Speech API captures a line. 
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
        let mobileRepeatBug = (current === 1 && transcript === event.results[0][0].transcript);

        if(!mobileRepeatBug) {
          component.setState({
            noteContent: component.noteContent + transcript
          })
        }
      }

      recognition.onstart = function() { 
        component.setState ({
          instructions: 'Voice recognition activated. Try speaking into the microphone.',
        })
      }
      
      recognition.onspeechend = function() {
        component.setState ({
          instructions: 'You were quiet for a while so voice recognition turned itself off.',
        })
      }
      
      recognition.onerror = function(event) {
        if(event.error === 'no-speech') {
          component.setState({
            instructions: 'No speech was detected. Try again.',
          })
        };
      } 
      this.setState({
        recognition: recognition
      })   
      this.getInstructions();  
    }
    catch(e) {
      console.error(e);
    }
  }

  getInstructions = () => {
    console.log('Getting instructions...');
    if (this.state.recording === false) {
      this.setState({
        instructions: 'Press the RECORD button to begin recording. You will have to allow access the first time you use it.',
      })
    }
  }

  startRecording = () => {
    this.setState({
      recording: true,
    })
    if (this.state.noteContent.length) {
      this.setState({
        noteContent: this.state.noteContent + ' '
      })
    }
    this.state.recognition.start();  
  }

  pauseRecording = () => {
    this.setState({
      recording: false,
      instructions: 'Voice recognition paused.',
    })
    this.state.recognition.stop();
    this.getInstructions();
  }

  render() {

    
    return (
      <div>
          
        <h1>Record yourself and view your habit counts!</h1>
        <br/>

        <div className="app">

          <h3>Your Transcript:</h3>
          <p>{this.state.noteContent}</p>
          {/* <div className="input-single">
              <textarea value={this.state.noteContent} id="note-textarea" placeholder="Create a new note by typing or using voice recognition." rows="6"></textarea>
          </div> */}

          <button onClick={this.startRecording} id="start-record-btn" title="Start Recording">Start Recognition</button>
          <button onClick={this.pauseRecording} id="pause-record-btn" title="Pause Recording">Pause Recognition</button>
          <button onClick={this.saveNote} id="save-note-btn" title="Save Note">Save Note</button>   
          
          <p className="testimonial">{this.state.instructions}</p>
          
        </div>


      </div>
    );
  }
}

const mapStateToProps = reduxState => ({reduxState});

export default connect(mapStateToProps)(Record);

