import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	//this.state.todoList
	constructor(props){
		super(props);

	this.state={
		list: [{text:'one',completed:false},{text:'two',completed:true}],
		value: 'new item'
	}
	}
  render() {
	 // this.setState({list: this.state.list.concat(['new item'])});
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">To-do list</h1>
        </header>
        {this.state.list.map((text,index) => <div><span style={item.completed ? {textDecoration: "line-through"} :{}}

        {index}: {text.text}<button onClick={() => this.setState({list: this.state.list.filter((value,i)=> i != index)})}>Remove</button></div>)}
        <form onSubmit={e => {
	        e.preventDefault();
this.setState({list: this.state.list.concat([this.state.value])});

        }}>

        <input type="text" onChange={event => this.setState({value: event.target.value})}/>
                <input type="submit" value ="Add new item"/>
      </form>
      </div>

    );
  }
}

export default App;
