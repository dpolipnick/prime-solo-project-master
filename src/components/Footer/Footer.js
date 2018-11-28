// Vendors
import { connect } from 'react-redux';
import React, { Component } from 'react';
// Styles
import './Footer.css';

class Footer extends Component {
  render() {
    return (
    <footer className="Myfooter">
        <nav>
            <p className="link" onClick={()=> window.open("http://onlinegrowthsystems.com/blog", "_blank")}>An Online Growth Systems Project</p>
            <p className="link" onClick={()=> window.open("https://github.com/dpolipnick/prime-solo-project-master", "_blank")}>Source Code</p>
            <p className="link" onClick={()=> window.open("http://youtube.com/dickpolipnickvideos", "_blank")}>YouTube Channel</p>
            <p>&copy; Dick Polipnick</p>
        </nav>
    </footer>
    );
  }
}

export default connect()(Footer);



// import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

// const Footer = () => (
//   <footer>
//   </footer>
// );

// export default Footer;
