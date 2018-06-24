import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import ManageEvent from './Event/ManageEvent'

BigCalendar.momentLocalizer(moment)
class MyCalendar extends React.Component {
    constructor(props){
        super(props)
        this.child = React.createRef()
        this.state= {
            myEventsList :props.myEventsList,
        }
        this.showManageModal = this.showManageModal.bind(this)
    }
    Event({ event }) {
      return (
        <span>
          <strong>{event.title}</strong>
          {event.desc && ':  ' + event.desc}
        </span>
      )
    }
    EventAgenda({ event }) {
      return (
        <span>
          <em style={{ color: 'magenta' }}>{event.title}</em>
          <p>{event.desc}</p>
        </span>
      )
    }
    showManageModal(event){
      this.child.current.handleShow(event)
    }
    render() {
      return (
        <div>
          <BigCalendar
            style={{height: 800}}
            popup events={this.state.myEventsList}
            defaultDate={new Date()}
            defaultView="month"
            views={['month', 'agenda']}
            onSelectEvent={event => this.showManageModal(event)}
            components={{
              event: this.Event,
              agenda: {
                event: this.EventAgenda,
              },
            }}
            drilldownView="agenda"          
          />
          <ManageEvent ref = {this.child}  deleteEvent={this.deleteEvent} typeList={this.props.typeList} setEventList = {this.props.setEventList} />
        </div>
      )
    }
  }
  export default MyCalendar;