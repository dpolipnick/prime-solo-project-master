

**See the final presentation video and live demo: https://youtu.be/HHVFd79JYWM**

# Habit Breaker

A full-stack React application built to help users eliminate their bad habits. This software uses the Browser Voice Transcription API to monitor a user's speech throughout their day (or perhaps set up to just track a portion of it) to track, manage, and assist in removing undesired words from the user's vocabulary.

## Built With

- React
- Redux
- Redux-Sagas
- SQL
- Moment.js
- Browser Voice Transcription API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- Express
- This application's Browser Voice Transcription API only works with the Google Chrome Browser


### Installing

Steps to get the development environment running.

1. Download this project.
2. Create a database named `habit_breaker`
3. Run the SQL code from the file named `database.sql` in the project
4. In terminal, type: `npm install`
5. In terminal, type: `npm run client`
6. In terminal, type: `npm run server`

## Video Demo

See the final presentation video and live demo: https://youtu.be/HHVFd79JYWM


### Completed Features

High level list of items completed.

- [x] Integrate Browser Voice Transcription API to record and analyze user's speech
- [x] Build analytics for users to view day, month, and year's frequency
- [x] Build custom search for deeper analytics

### Next Steps

Features I would like to add in the future.

- [ ] Integrate a graph API to show analytics data
- [ ] Change the profanity settings to pick up more swear words
- [ ] Customize the Browser Voice Transcription API to also hear speech disabilities (use case for children in speech therapy)

## Deployment

You can deploy this application as long as you also have the database side deployed.
**This application's Browser Voice Transcription API only works with the Google Chrome Browser**

## Authors

* [Dick Polipnick](https://onlinegrowthsystems.com)


## Acknowledgments

* Thank you to Prime Academy
