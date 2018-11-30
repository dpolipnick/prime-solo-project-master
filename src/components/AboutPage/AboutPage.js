import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <header className="homeHeader">
      <br/>
      <img alt="" className="nav-title" src={require('./logo.png')}/>
      <br/>
      <h2>An interactive way to be who you want to be</h2>
      <br/>
    </header>
    <h2>Testimonial</h2>
    <img alt="" className="testimonialPic" src={require('./before.png')}/>
    <div className="testimonial">
      <p>"I had a really hard time trying to stop swearing... Habit Breaker&trade; changed my life! I owe it all to you!"</p>
      <p className="signature">-Trevor</p>
    </div>
    <img alt="" className="testimonialPic" src={require('./after.png')}/>
    <br/>
    <h2 className="funColors">Our Mission</h2>
    <p>We developed Habit Breaker&trade; to help the helpless. 
      To bring happiness to those who are in sorrow. 
      To be a beacon of light and empower those trapped in darkness 
      to achieve their destiny. We change lives.</p>
  </div>
);

export default AboutPage;
