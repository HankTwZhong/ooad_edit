// import React from 'react';
// import { Button, Modal,Form,FormControl,FormGroup,Col,ControlLabel, DropdownButton, MenuItem} from 'react-bootstrap'
// import 'react-datepicker/dist/react-datepicker-cssmodules.css'
// import DatePicker from 'react-datepicker';
// import 'rc-time-picker/assets/index.css';
// import TimePicker from 'rc-time-picker';
// import moment from 'moment';
// import axios from 'axios'

// const now = moment()
// const format = 'HH:mm';

// export default class DeleteEvent extends React.Component{
//     constructor(props, context) {
//         super(props, context);
//         this.handleShow = this.handleShow.bind(this)
//         this.handleClose = this.handleClose.bind(this)
//         this.state = {
//           show: false,
//           id: props.myEventsList.length,
//           eventContent: undefined,
//           startDate: moment(),
//           endDate: moment(),
//           startTime:moment(),
//           endTime:moment(),
//           title: 'OOAD',
//           desc: undefined
//         }
//         this.startDateChange = this.startDateChange.bind(this)
//         this.endDateChange = this.endDateChange.bind(this)
//         this.submitEvent = this.submitEvent.bind(this)
//         this.selectedType = this.selectedType.bind(this)
//         this.handleChange = this.handleChange.bind(this)
//         this.startTimeOnChange = this.startTimeOnChange.bind(this)
//         this.endTimeOnChange = this.endTimeOnChange.bind(this)
//       }
//       startDateChange(date) {
//         this.setState({
//           startDate: date
//         });
//       }
//       endDateChange(date) {
//         this.setState({
//           endDate: date
//         })
//       }
    
//       handleClose() {
//         this.setState({ show: false });
//       }
    
//       handleShow() {
//         this.setState({ show: true });
//       }
//       startTimeOnChange(value) {
//         this.setState({
//             startTime:value
//         })
//       }
//       endTimeOnChange(value){
//           this.setState({
//               endTime:value
//           })
//       }
//       submitEvent() {
//         this.handleClose()
//         this.props.myEventsList.push({
//           id: this.props.myEventsList.length ,
//           title: this.state.title,
//           start: new Date(this.state.startDate.get('year'),this.state.startDate.get('month'), this.state.startDate.get('date'), this.state.startTime.get('hour'), this.state.startTime.get('minute'), 0),
//           end: new Date(this.state.endDate.get('year'),this.state.endDate.get('month'), this.state.endDate.get('date'), this.state.endTime.get('hour'), this.state.endTime.get('minute'), 0),
//           desc: this.state.desc,
//         })
//         axios.post('localhost:1321/event',{
//             // id: this.props.myEventsList.length ,
//             type: this.state.title,
//             startDate: new Date(this.state.startDate.get('year'),this.state.startDate.get('month'), this.state.startDate.get('date'), this.state.startTime.get('hour'), this.state.startTime.get('minute'), 0),
//             endDate: new Date(this.state.endDate.get('year'),this.state.endDate.get('month'), this.state.endDate.get('date'), this.state.endTime.get('hour'), this.state.endTime.get('minute'), 0),
//             description: this.state.desc,
//         })
//         console.log(this.props.myEventsList)
    
//       }
//       selectedType(selected) {
//         this.setState({ title: selected })
//         return selected
//       }
    
//       handleChange(text) {
//         console.log(text)
//         this.setState({
//           desc: text.target.value
//         })
//       }
    
//       render() {
//         return (
//           <div>
//             <Button className="pull-right" bsStyle="primary" bsSize="xsmall" onClick={this.handleShow}>
//               Add Event
//             </Button>
//             <Modal show={this.state.show} onHide={this.handleClose}>
//               <Modal.Header closeButton>
//                 <Modal.Title>Add Event</Modal.Title>
//               </Modal.Header>
//               <Modal.Body>
//                 <Form horizontal>
//                   <FormGroup controlId="formControlsSelect">
//                     <Col componentClass={ControlLabel} sm={2}>
//                       事件類別
//                     </Col>
//                     <Col sm={10}>
//                       <DropdownButton title={this.state.title} onSelect={this.selectedType} id="selectType">
//                         <MenuItem eventKey='OOAD'>OOAD</MenuItem>
//                         <MenuItem eventKey='STV'>STV</MenuItem>
//                         <MenuItem eventKey='SA'>SA</MenuItem>
//                       </DropdownButton>
//                     </Col>
//                   </FormGroup>
//                   <FormGroup controlId="formHorizontalEmail">
//                     <Col componentClass={ControlLabel} sm={2}>
//                       起始時間（日）
//                 </Col>
//                     <Col sm={4}>
//                       <DatePicker
//                         selected={this.state.startDate}
//                         onChange={this.startDateChange}
//                       />
//                     </Col>
//                     <Col componentClass={ControlLabel} sm={2}>
//                       結束時間(日)
//                 </Col>
//                     <Col sm={4}>
//                       <DatePicker
//                         selected={this.state.endDate}
//                         onChange={this.endDateChange}
//                       />
//                     </Col>
//                   </FormGroup>
//                   <FormGroup>
//                     <Col componentClass={ControlLabel} sm={2}>
//                       起始時間
//                     </Col>
//                     <Col sm={4}>
//                       <TimePicker
//                         showSecond={false}
//                         defaultValue={now}
//                         className="timePicker"
//                         onChange={this.startTimeOnChange}
//                         format={format}
//                         inputReadOnly
//                       />
//                     </Col>
//                     <Col componentClass={ControlLabel} sm={2}>
//                       結束時間
//                     </Col>
//                     <Col sm={4}>
//                       <TimePicker
//                         showSecond={false}
//                         defaultValue={now}
//                         className="timePicker"
//                         onChange={this.endTimeOnChange}
//                         format={format}
//                         inputReadOnly
//                       />
//                     </Col>
//                   </FormGroup>
//                   <FormGroup controlId="formControlsTextarea">
//                     <Col componentClass={ControlLabel} sm={2}>
//                       事件內容
//                 </Col>
//                     <Col sm={10}>
//                       <FormControl componentClass="textarea" placeholder="input things" onChange={this.handleChange} />
//                     </Col>
//                   </FormGroup>
//                 </Form>
//               </Modal.Body>
//               <Modal.Footer>
//                 <Button onClick={this.submitEvent}>Add</Button>
//                 <Button onClick={this.handleClose}>Close</Button>
//               </Modal.Footer>
//             </Modal>
//           </div>
//         );
//       }
// }