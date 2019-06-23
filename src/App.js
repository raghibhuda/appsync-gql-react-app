import React from 'react';
import logo from './logo.svg';
import './App.css';
import { API, graphqlOperation } from 'aws-amplify';

const allNotes = `
  query list {
    listNotess{
      items{
        id name description
      }
    }
  }`



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: []
    }
  }
  async componentDidMount (){
    let notes = await API.graphql(graphqlOperation(allNotes));
    console.log('===========Notes==========',notes);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>
    );
  }
}

export default App;
