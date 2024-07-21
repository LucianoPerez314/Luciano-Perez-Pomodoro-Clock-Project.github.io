// !! IMPORTANT README:

// You may add additional external JS and CSS as needed to complete the project, however the current external resource MUST remain in place for the tests to work. BABEL must also be left in place. 

/***********
INSTRUCTIONS:
  - Select the project you would 
    like to complete from the dropdown 
    menu.
  - Click the "RUN TESTS" button to
    run the tests against the blank 
    pen.
  - Click the "TESTS" button to see 
    the individual test cases. 
    (should all be failing at first)
  - Start coding! As you fulfill each
    test case, you will see them go   
    from red to green.
  - As you start to build out your 
    project, when tests are failing, 
    you should get helpful errors 
    along the way!
    ************/

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

// Once you have read the above messages, you can delete all comments. 
import React from "https://esm.sh/react@18.3.1";
import ReactDOM from "https://esm.sh/react-dom@18.3.1";

class Length extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { class: "length" }, /*#__PURE__*/
      React.createElement("h2", { id: this.props.label.toLowerCase() + "-label", class: "text-center" }, this.props.label, " Length"), /*#__PURE__*/
      React.createElement("p", { class: "text-center" }, /*#__PURE__*/
      React.createElement("a", { id: this.props.label.toLowerCase() + "-decrement", href: "#", onClick: this.props.onInput }, /*#__PURE__*/React.createElement("i", { class: "bi bi-dash-circle" })), /*#__PURE__*/
      React.createElement("span", { id: this.props.label.toLowerCase() + "-length" }, this.props.len), /*#__PURE__*/
      React.createElement("a", { id: this.props.label.toLowerCase() + "-increment", href: "#", onClick: this.props.onInput }, /*#__PURE__*/React.createElement("i", { class: "bi bi-plus-circle" })))));



  }}


class Timer extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { class: "timer" }, /*#__PURE__*/
      React.createElement("h2", { id: "timer-label", class: "text-center" }, this.props.label), /*#__PURE__*/
      React.createElement("p", { id: "time-left", class: "text-center" }, this.props.minutes < 10 ? "0" + this.props.minutes : this.props.minutes, ":", this.props.seconds < 10 ? "0" + this.props.seconds : this.props.seconds), /*#__PURE__*/
      React.createElement("p", { class: "text-center" }, /*#__PURE__*/
      React.createElement("a", { href: "#", id: "start_stop", onClick: this.props.onInput }, /*#__PURE__*/React.createElement("i", { class: "bi bi-play" }), /*#__PURE__*/React.createElement("i", { class: "bi bi-pause-btn" })), /*#__PURE__*/
      React.createElement("a", { href: "#", id: "reset", onClick: this.props.onInput }, /*#__PURE__*/React.createElement("i", { class: "bi bi-repeat" })))));



  }}


class UI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLen: this.props.breakLen,
      sessionLen: this.props.sessionLen,
      minutes: this.props.sessionLen,
      seconds: 0,
      intervalID: "null",
      onBreak: false };

    this.handleLengthClick = this.handleLengthClick.bind(this);
    this.handleTimerClick = this.handleTimerClick.bind(this);
    this.intervalTimer = this.intervalTimer.bind(this);
  }

  handleLengthClick(event) {
    if (this.state.intervalID === "null") {
      const ID = event.currentTarget.id;
      this.setState(prevState => {
        if (ID === "break-increment" && prevState.breakLen < 60) {
          if (prevState.onBreak) {
            return { breakLen: prevState.breakLen + 1, minutes: prevState.breakLen + 1, seconds: 0 };
          }
          return { breakLen: prevState.breakLen + 1, seconds: 0 };
        } else if (ID === "break-decrement" && prevState.breakLen > 1) {
          if (prevState.onBreak) {
            return { breakLen: prevState.breakLen - 1, minutes: prevState.breakLen - 1, seconds: 0 };
          }
          return { breakLen: prevState.breakLen - 1, seconds: 0 };
        } else if (ID === "session-increment" && prevState.sessionLen < 60) {
          if (!prevState.onBreak) {
            return { sessionLen: prevState.sessionLen + 1, minutes: prevState.sessionLen + 1, seconds: 0 };
          }
          return { sessionLen: prevState.sessionLen + 1, seconds: 0 };
        } else if (ID === "session-decrement" && prevState.sessionLen > 1) {
          if (!prevState.onBreak) {
            return { sessionLen: prevState.sessionLen - 1, minutes: prevState.sessionLen - 1, seconds: 0 };
          }
          return { sessionLen: prevState.sessionLen - 1, seconds: 0 };
        }

      });
    }
  }

  handleTimerClick(event) {
    if (event.currentTarget.id === "start_stop") {
      this.setState(prevState => {
        if (prevState.intervalID === "null") {
          return {
            intervalID: setInterval(this.intervalTimer, 1000) };

        } else {
          this.setState(prevState => {
            clearInterval(prevState.intervalID);
            return { intervalID: "null" };
          });
        }
      });
    } else if (event.currentTarget.id === "reset") {
      document.getElementById("beep").pause();
      document.getElementById("beep").currentTime = 0;
      this.setState(prevState => {
        clearInterval(prevState.intervalID);
        return {
          breakLen: this.props.breakLen,
          sessionLen: this.props.sessionLen,
          minutes: this.props.sessionLen,
          seconds: 0,
          intervalID: "null",
          onBreak: false };

      });
    }
  }

  intervalTimer() {
    this.setState(prevState => {
      if (prevState.minutes !== 0) {
        if (prevState.seconds === 0) {
          return { minutes: prevState.minutes - 1, seconds: 59 };
        }
        return { seconds: prevState.seconds - 1 };
      }

      if (prevState.seconds !== 0) {
        return { seconds: prevState.seconds - 1 };
      }
      document.getElementById("beep").play();
      if (prevState.onBreak) {
        return { minutes: this.state.sessionLen, onBreak: false };
      }
      return { minutes: this.state.breakLen, onBreak: true };
    });
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { class: "ui" }, /*#__PURE__*/
      React.createElement("div", { class: "lengths" }, /*#__PURE__*/
      React.createElement(Length, { label: "Break", len: this.state.breakLen, onInput: this.handleLengthClick }), /*#__PURE__*/
      React.createElement(Length, { label: "Session", len: this.state.sessionLen, onInput: this.handleLengthClick })), /*#__PURE__*/

      React.createElement(Timer, { label: this.state.onBreak ? "Break" : "Session", minutes: this.state.minutes, seconds: this.state.seconds, onInput: this.handleTimerClick }), /*#__PURE__*/
      React.createElement("audio", { id: "beep", preload: "auto", src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav" })));


  }}


ReactDOM.render( /*#__PURE__*/React.createElement(UI, { breakLen: 5, sessionLen: 25 }), document.querySelector(".container-fluid"));