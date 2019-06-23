import React from 'react';
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

const createNoteMutation = `
  mutation ($name:String! $description:String ){
    createNotes(input:{
      name:$name
      description: $description
    }){
      id name description
    }
  }
`

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      name: '',
      description: ''
    }
  }
  async componentDidMount() {
    const data = await API.graphql(graphqlOperation(allNotes));
    console.log('===========Notes==========', data);
    this.setState({
      notes: data.data.listNotess.items
    })
    console.log(this.state.notes)
  }

  handeNameChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }


  handeDescriptionChange = (e) => {
    this.setState({
      description: e.target.value
    });
  }

  createNote = async (e) => {
    e.preventDefault();
    const newNote  =  {
      name: this.state.name,
      description:this.state.description
    }

    try{
      const notes = [...this.state.notes,newNote];
      this.setState({
        notes,
        name:'',
        description:''
      })
      await API.graphql(graphqlOperation(createNoteMutation,newNote));
      console.log('Successfully added ');
    }catch(error){
      console.log(error)
    }

  }


  render() {
    return (
      <div className="App">
        <div style={{ padding: 25, display: 'flex', flexDirection: 'column' }}>
          <input type="text" name="name" placeholder="Task Name" onChange={this.handeNameChange} />
          <textarea style={{ paddingTop: 40, marginTop: 30 }} type="text" name="description" placeholder="Task Description" onChange={this.handeDescriptionChange}></textarea>
          <button type="submit" onClick={this.createNote} >Add Task</button>
        </div>

        {
          this.state.notes.map((c, i) => (<div key={i}>
            <h2>{c.name}</h2>
            <p>{c.description}</p>
          </div>))
        }
      </div>
    );
  }
}

export default App;
