import React from "react";
import socketIOClient from "socket.io-client";

export default class Tweets extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], searchTerm: "JavaScript" };
  }

  componentDidMount() {
    const socket = socketIOClient('http://localhost:3000/');

    socket.on('connect', () => {
      console.log("Socket Connected");
      socket.on("tweets", data => {
        let newList = [data].concat(this.state.items.slice(0, 15));
        this.setState({ items: newList });
      });
    });
    socket.on('disconnect', () => {
      socket.off("tweets");
      socket.removeAllListeners("tweets");
      console.log("Socket Disconnected");
    });
  }

  render() {
    const items = this.state.items.map(item => {
      return <li>{item.text}</li>;
    });

    return (
      <>
        <h1>All Tweets</h1>
        <ul>{items}</ul>
      </>
    )
  }
}