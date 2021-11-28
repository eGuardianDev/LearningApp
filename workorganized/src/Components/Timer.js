import React from 'react';

class Timer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        seconds: parseInt(props.startTimeInSeconds, 10) || 0,
        oldJson: "",
        newJson: "",
    };
    }

    tick() {
      this.setState(state => ({
        seconds: state.seconds + 1
      }));
     fetch('http://212.21.151.98:5000/ned').then(response => response.json()).then(thisdata => this.state.newJson = thisdata);
     if(this.state.newJson === "") return;
     if(JSON.stringify( this.state.oldJson )=== JSON.stringify( this.state.newJson)){
        console.log("no update is found");
     }else{
         console.log(this.state.oldJson);
         console.log(this.state.newJson);
         this.state.oldJson = this.state.newJson;
         this.messagesEnd.scrollIntoView({ behavior: "smooth" });
     }
    }
  
    componentDidMount() {
      this.interval = setInterval(() => this.tick(), 250);
    }
  
    componentWillUnmount() {
      clearInterval(this.interval);
    }
  
    formatTime(secs) {
      let hours   = Math.floor(secs / 3600);
      let minutes = Math.floor(secs / 60) % 60;
      let seconds = secs % 60;
      return [hours, minutes, seconds]
          .map(v => ('' + v).padStart(2, '0'))
          .filter((v,i) => v !== '00' || i > 0)
          .join(':');;
    }
    
    render() {
        if(this.state.newJson === ""){
            return(<></>);
        }
        return (
            <>
                {this.state.newJson.map((d) => (<p>{d.input}</p>))}   
                <div ref={(el) => { this.messagesEnd = el; }}></div>
            </>
      );
    }
  }
  export default Timer