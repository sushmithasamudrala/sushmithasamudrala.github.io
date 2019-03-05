// App.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as contactAction from './actions/contactAction';

class App extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handlerChange = this.handlerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: ''

    }
    this.state = {
      number: ''
    }
  }

  handleChange(e){
    this.setState({
      name: e.target.value
    })
  }

  handlerChange(e){
    this.setState({
      number: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    let contact = {
      name: this.state.name,
      number: this.state.number
    }
    this.setState({
      name: '',
      number: ''
    });
    this.props.createContact(contact);
  }

  listView(data, index){
    return (
      <div className="row">
        <div className="col-md-10">
           <li key={index} className="list-group-item clearfix">
            Name: {data.name}
          </li>
          <li key={index} className="list-group-item clearfix">
           Number: {data.number}
         </li>

        </div>

        <div className="col-md-2">
          <button onClick={(e) => this.deleteContact(e, index)} className="btn btn-danger">
            Remove
          </button>
        </div>
    </div>
    )
  }

  deleteContact(e, index){
    e.preventDefault();
    this.props.deleteContact(index);
  }

  render() {

    return(
      <div className="container">
        <h1>Phone Directory Application</h1>
        <hr />
        <div>
          <h3>Add Contact Form</h3>
          <form onSubmit={this.handleSubmit}>


            Name: <input type="text" onChange={this.handleChange} className="form-control" value={this.state.name}/><br /><br />
            Number:   <input type="number" onChange={this.handlerChange} className="form-control" value={this.state.number}/><br /><br />

            <input type="submit" className="btn btn-success" value="ADD"/>
          </form>
          <hr />
        { <ul className="list-group">
          {this.props.contacts.map((contact, i) => this.listView(contact, i))}
        </ul> }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    contacts: state.contacts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createContact: contact => dispatch(contactAction.createContact(contact)),
    deleteContact: index =>dispatch(contactAction.deleteContact(index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
