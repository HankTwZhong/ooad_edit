import React, { Component } from 'react';
import './App.css';
import {Route, Switch,Redirect} from 'react-router-dom'
import MyCalendar from './MyCalendar'
import SearchEvent from './Event/SearchEvent'
import TypeManage from './Type/TypeManage'
import TopButtom from './TopButton'
import axios from 'axios'
import GenerateChart from './Chart/GenerateChart'

class App extends Component {
  constructor(){
    super()
    this.state={
      eventList:[
      ],
      typeList:[{
      }]
    }
    axios.get('http://localhost:1321/type').then((result)=>{
      this.setState({
        typeList:result.data
      })
    })
    axios.get('http://localhost:1321/event').then((result)=>{
      this.setState({
        eventList:result.data
      })
    })
    this.setTypeList=this.setTypeList.bind(this)
    this.setEventList = this.setEventList.bind(this)
  }
  setEventList(eventList){
    this.setState({eventList:eventList})
  }
  setTypeList(typeList){
    this.setState({
      typeList: typeList
    })
  }
  render() {
    const MyTypeList = ()=>{
      return (
        <TypeManage setEventList={this.setEventList} setTypeList={this.setTypeList} typeList={this.state.typeList}/>
      )
    }
    const MyCalendarWithProps = (props) => {
    return (
      <MyCalendar 
      myEventsList={this.state.eventList} 
      setEventList={this.setEventList}
      typeList = {this.state.typeList}
      />
    );
    }
    const searchEvent = (props) =>{
      return (
        <SearchEvent myEventsList={this.state.eventList}/>
      )
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Grab Your Time
          <TopButtom  setEventList={this.setEventList} typeList={this.state.typeList} 
          myEventsList={this.state.eventList} 
          />
          </h1>
        </header>
            <Switch>
              <Route exact path="/" component={MyCalendarWithProps} />
              <Route exact path="/searchEvent" component={searchEvent}/>
              <Route exact path="/manageType" component={MyTypeList}/>
              <Route exact path="/generateChart" component={GenerateChart}/>                                    
              <Redirect to='/' />
            </Switch>
      </div>
    );
  }
}

export default App;
