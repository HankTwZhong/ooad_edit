import React from 'react';
import {Button, Modal,Form,FormControl,FormGroup,Col,ControlLabel, DropdownButton, MenuItem} from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import DatePicker from 'react-datepicker';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import axios from 'axios';
import swal from 'sweetalert';

const format = 'HH:mm';

export default class AddEvent extends React.Component{
    constructor(props) {
      super(props);
        // this.typeList = props.typeList
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.state = {
          _id:undefined,
          show: false,
          eventContent: undefined,
          startDate: moment(),
          endDate: moment(),
          startTime:moment(),
          endTime:moment(),
          title: '選擇類別',
          desc: undefined,
          checked:false,
          time:undefined
        }
        this.startDateChange = this.startDateChange.bind(this)
        this.endDateChange = this.endDateChange.bind(this)
        this.submitEvent = this.submitEvent.bind(this)
        this.selectedType = this.selectedType.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.startTimeOnChange = this.startTimeOnChange.bind(this)
        this.endTimeOnChange = this.endTimeOnChange.bind(this)
        this.checkBox = this.checkBox.bind(this)
        this.selectedTime = this.selectedTime.bind(this)
        this.checkFormData = this.checkFormData.bind(this)
        this.deleteEvent = this.deleteEvent.bind(this);
        
      }
      startDateChange(date) {
        this.setState({
          startDate: date
        });
      }
      endDateChange(date) {
        this.setState({
          endDate: date
        })
      }
      deleteEvent(){
          axios.delete('http://localhost:1321/event',{data:{
            title:this.state.title, _id:this.state._id}
          }).then((result)=>{
          axios.get('http://localhost:1321/event').then((result)=>{
            this.props.setEventList(result.data)
          })
        })
      }
      handleClose() {
        this.setState({ 
          title:'選擇類別',
          show: false });
      }
    
      handleShow(eventData) {
        this.setState({
          _id:eventData._id,
          title:eventData.title,
          startDate:moment(new Date(eventData.start)),
          startTime:moment(new Date(eventData.start)),
          endTime:moment(new Date(eventData.end)),
          desc:eventData.desc
        })
        this.setState({ show: true });
      }
      startTimeOnChange(value) {
        this.setState({
            startTime:value
        })
      }
      endTimeOnChange(value){
          this.setState({
              endTime:value
          })
      }
      checkFormData(){
        let formConfirm = true
        let startTime = moment(this.state.startTime).minute() +moment(this.state.startTime).hours() * 60
        let endTime = moment(this.state.endTime).minute() +moment(this.state.endTime).hours() * 60
        if(this.state.title === '選擇類別'){
          swal('請選擇一個類別')
          formConfirm = false
        }
        if(startTime >= endTime){
          swal('起始時間必須小於結束時間')
          formConfirm = false
        }
        return formConfirm
      }
      submitEvent() {
        if(this.checkFormData()){
          this.handleClose()
          this.eventList.push({
            title: this.state.title,
            start: new Date(this.state.startDate.get('year'),this.state.startDate.get('month'), this.state.startDate.get('date'), this.state.startTime.get('hour'), this.state.startTime.get('minute'), 0),
            end: new Date(this.state.endDate.get('year'),this.state.endDate.get('month'), this.state.endDate.get('date'), this.state.endTime.get('hour'), this.state.endTime.get('minute'), 0),
            desc: this.state.desc,
          })
          console.log(this.state.time)
          if(this.state.time===undefined){
              axios.post('http://localhost:1321/event',{
                title: this.state.title,
                start: new Date(this.state.startDate.get('year'),this.state.startDate.get('month'), this.state.startDate.get('date'), this.state.startTime.get('hour'), this.state.startTime.get('minute'), 0),
                end: new Date(this.state.startDate.get('year'),this.state.startDate.get('month'), this.state.startDate.get('date'), this.state.endTime.get('hour'), this.state.endTime.get('minute'), 0),
                desc: this.state.desc,
                selectedTime: this.state.selectedTime
            }).then((result)=>{
                this.setState({
                  title:'選擇類別'
                })
                axios.get('http://localhost:1321/event').then((result)=>{
                  this.props.setEventList(result.data)
                })
            })
          }
          else{
            axios.post('http://localhost:1321/event',{
                title: this.state.title,
                start: new Date(this.state.startDate.get('year'),this.state.startDate.get('month'), this.state.startDate.get('date'), this.state.startTime.get('hour'), this.state.startTime.get('minute'), 0),
                end: new Date(this.state.endDate.get('year'),this.state.endDate.get('month'), this.state.endDate.get('date'), this.state.endTime.get('hour'), this.state.endTime.get('minute'), 0),
                desc: this.state.desc,
                selectedTime: this.state.selectedTime
            }).then((result)=>{
              this.setState({
                title:'選擇類別'
              })
              axios.get('http://localhost:1321/event').then((result)=>{
                this.props.setEventList(result.data)
              })
          })
          }
        }
      }
      selectedType(selected) {
        this.setState({ title: selected })
      }
      selectedTime(selected){
        this.setState({
          time:selected
        })
      }
      handleChange(text) {
        this.setState({
          desc: text.target.value
        })
      }
      checkBox(checked){
        if(checked === false){
          this.setState({
            time:undefined
          })
        }
        this.setState({
          checked:checked
        })
      }
      render() {
        let optionItems = this.props.typeList.map((type,i) =>
          <MenuItem key={i} eventKey={type.typeName}>{type.typeName}</MenuItem>
      );
        return (
          <div>
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>管理事件</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form horizontal>
                  <FormGroup controlId="formControlsSelect">
                    <Col componentClass={ControlLabel} sm={2}>
                      事件類別
                    </Col>
                    <Col sm={3}>
                      <DropdownButton title={this.state.title} onSelect={this.selectedType} id="selectType">
                         {optionItems}
                      </DropdownButton>
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                      日期
                   </Col>
                    <Col sm={4}>
                      <DatePicker
                        selected={this.state.startDate}
                        onChange={this.startDateChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                      起始時間
                    </Col>
                    <Col sm={4}>
                      <TimePicker
                        showSecond={false}
                        defaultValue={this.state.startTime}
                        className="timePicker"
                        onChange={this.startTimeOnChange}
                        format={format}
                        inputReadOnly
                      />
                    </Col>
                    <Col componentClass={ControlLabel} sm={2}>
                      結束時間
                    </Col>
                    <Col sm={4}>
                      <TimePicker
                        showSecond={false}
                        defaultValue={this.state.endTime}
                        className="timePicker"
                        onChange={this.endTimeOnChange}
                        format={format}
                        inputReadOnly
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formControlsTextarea">
                    <Col componentClass={ControlLabel} sm={2}>
                      事件內容
                </Col>
                    <Col sm={10}>
                      <FormControl defaultValue={this.state.desc} componentClass="textarea" placeholder="input things" onChange={this.handleChange} />
                    </Col>
                  </FormGroup>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button className="pull-left" onClick={this.deleteEvent}>刪除</Button>                
                <Button onClick={this.submitEvent}>修改</Button>
                <Button onClick={this.handleClose}>關閉</Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
      }
}