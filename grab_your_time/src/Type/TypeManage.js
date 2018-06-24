import React from "react";
import { Button,FormControl,Form} from 'react-bootstrap'
// Import React Table
import axios from 'axios';
import ReactTable from "react-table";
import "react-table/react-table.css";
import swal from 'sweetalert';

export default class TypeManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:props.typeList,
      inputText:''
    };
    this.addType=this.addType.bind(this)
    this.inputTypeChange = this.inputTypeChange.bind(this)
    this.deleteType = this.deleteType.bind(this)
  }
  addType(){
    if(this.state.inputText !== ''){
      let newArray = this.state.data
      newArray.push({typeName:this.state.inputText})
      this.props.setTypeList(newArray)
      axios.post('http://localhost:1321/type',{
        typeName:this.state.inputText
      }).then((result)=>{
        console.log(result);
        axios.get('http://localhost:1321/type').then((result)=>{
          this.props.setTypeList(result.data)
        })
      });
    }
    else
      swal('類別不能為空')
  }
  inputTypeChange(inputText){
    this.setState({
      inputText:inputText.target.value      
    })
  }
  deleteType(typeName){
    let newArray = this.state.data
    newArray = newArray.filter((type)=>{
      return type.typeName !== typeName
    })
    axios.delete('http://localhost:1321/type',{data:{typeName:typeName}}).then((result)=>{
      axios.get('http://localhost:1321/event').then((result)=>{
        this.props.setEventList(result.data)
      })
      console.log(result);
    })
    this.props.setTypeList(newArray)
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <Form inline>
            <FormControl type="text" onChange={this.inputTypeChange} placeholder="類別名稱" />
          <Button bsStyle="success" onClick={()=>this.addType()} >新增類別</Button>
        </Form>
        <ReactTable
          data={data}
          noDataText="新增一個類別"
          columns={[
            {
              id:'typeName',
              Header: "類別名稱",
              accessor:'typeName'
            },
            {
              id: 'edit',
              accessor: 'typeName',
              Cell: ({value}) => (
              <div>
                <Button bsStyle="danger" onClick={()=>this.deleteType(value)}>刪除類別</Button>
              </div>
            )
            }
          ]}
          filterable
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

