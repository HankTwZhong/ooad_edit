import React from 'react';
import {Button,ButtonToolbar} from 'react-bootstrap';
import AddEvent from './Event/AddEvent'
import {Link} from 'react-router-dom'

export default class TopButtom extends React.Component{
    constructor(props){
      super(props);
      this.child = React.createRef()
    }
    onClick = () => {
      this.child.current.handleShow()
    }
    render(){
      return(
        <div>
          <ButtonToolbar>
            <Button className="pull-right" bsStyle="primary" onClick={this.onClick}>
              增加事件
            </Button>
            <Button  className="pull-right" bsStyle="primary">
              <Link to="/searchEvent" style={{ color: '#FFF' }}>查詢事件</Link>
            </Button>
            <Button  className="pull-right" bsStyle="primary">
              <Link to="/manageType" style={{ color: '#FFF' }}>管理類別</Link>
            </Button>
            <Button  className="pull-right" bsStyle="primary">
              <Link to="/generateChart" style={{ color: '#FFF' }}>產生圖表</Link>
            </Button>
            <Button  className="pull-left" bsStyle="primary">
              <Link to="/" style={{ color: '#FFF' }}>返回月曆</Link>
            </Button>
          </ButtonToolbar>
          <AddEvent ref = {this.child} 
            setEventList = {this.props.setEventList}
            myEventsList={this.props.myEventsList} typeList={this.props.typeList}/>
        </div>
      )
    }
  }