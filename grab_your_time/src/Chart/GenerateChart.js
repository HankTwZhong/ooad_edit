import React from 'react';
import {Bar} from 'react-chartjs-2';
import { Button,FormGroup,Col,ControlLabel} from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import axios from 'axios'
import moment from 'moment';
import ReactTable from "react-table";
import "react-table/react-table.css";


export default class GenerateChart extends React.Component{
    constructor(props){
        super(props)
        this.state={
            startDate : moment(),
            endDate :moment(),
            data:{},
            tableData: undefined
        }
        this.startDateChange = this.startDateChange.bind(this)
        this.endDateChange = this.endDateChange.bind(this)  
        this.generateChar = this.generateChar.bind(this)
    }
    startDateChange(value){
        this.setState({
            startDate : value
        })
    }
    endDateChange(value){
        this.setState({
            endDate : value
        })
    }
    generateChar(){
        this.setState({
            startDate:this.state.startDate.hour(0).minute(0).second(0),
            endDate:this.state.endDate.hour(23).minute(59).second(59)
        })
        axios.get('http://localhost:1321/chartInformation',{
        params: {  
            startDate:this.state.startDate.toDate(),
            endDate:this.state.endDate.toDate()
        }   
        }).then((result)=>{
            let types = []
            let spentHoursList = []
            let eventList = []
            result.data.forEach((type)=>{
                types.push(type.typeName)
                spentHoursList.push(type.totalSpentHours)
                type.eventList.forEach((event)=>{
                    eventList.push(event)
                })
            })
            this.setState({
                tableData:eventList,
                data:{
                    labels: types,
                    datasets: [
                      {
                        label: 'totalSpendHours',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: spentHoursList
                      }
                    ]
                }
            })
        })
     
    }
  render() {
    return (
        <div>
      <div>
          <h2>產生報表</h2>          
          <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={5}>
                      起始時間
                      <DatePicker
                        selected={this.state.startDate}
                        onChange={this.startDateChange}
                      />
                </Col>
                <Col componentClass={ControlLabel} sm={5}>
                      結束時間(日)
                    <DatePicker
                    selected={this.state.endDate}
                    onChange={this.endDateChange}
                    />
                </Col>
                <br></br>
                <Col  sm={2}>
                    <Button bsStyle="success" onClick={this.generateChar}>產生報表</Button>
                </Col>
             </FormGroup>
        <Bar
          data={this.state.data}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        Min: 0
                    }
                }]
            }
          }}
        />
      </div>
      <div>
          <ReactTable
          data={this.state.tableData}
          columns={[
            {
              Header: "類別名稱",
              accessor: "title"
            },
            {
              Header: "事件內容",
              accessor: "desc"
            },
            {
              Header: '起始時間',
              id: "startTime",
              accessor: data => moment(data.start).format('YYYY/MM/DD HH:mm')
            }, 
            {
                Header: '結束時間',
                id: "endTime",
                accessor: data => moment(data.end).format('YYYY/MM/DD HH:mm')
            },
            {
                Header: '花費時間(Hours)',
                id: "deltaTime",
                accessor: data => ( moment(data.end) - moment(data.start)) /1000 / 60 / 60
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
          </div>
          </div>
    );
  }
}