import React from 'react';
import { Form, Input, Button,Select,DatePicker} from 'antd';
import axios from 'axios';

const { Option } = Select;
class CustomTodoForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {value:"0"}

        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

    }

    handleSelectChange(value){
       this.setState({value:value})
      };
    handleFormSubmit = (event,requestType,todoID) =>{
        const name = event.target.elements.name.value;
        const items = this.state.value;

        switch(requestType){
            case 'post':
                return axios.post('http://127.0.0.1:8000/items/',{
                        name:name,
                        
                })
                .then(res =>console.log(res))
                .catch(error =>console.err(error));
                
            case 'put' :
                return axios.put(`http://127.0.0.1:8000/items/${todoID}/`,{
                    name:name,
                    
                    })
                    .then(res =>console.log(res))
                    .catch(error =>console.err(error));
        }
    }
    state={
      todos:[]
  }
  componentDidMount(){
      axios.get('http://127.0.0.1:8000/todos/')
          .then(res=>{
              this.setState({
                  todos:res.data
              });
              console.log(res.data);
          })
  }
  render() {
    

const children = [];

    return (
      <div>
        <Form onSubmit={(event)=>this.handleFormSubmit(
            event,
            this.props.requestType,
            this.props.todoID
            )} >
          
            <Form.Item label="Todo List Name" >
            <Input name="name" placeholder="Todo List Name" />
          </Form.Item>
      
            <Form.Item label="Status">   
                <Select name="status" placeholder="Please select a status" value={this.state.value} onChange={this.handleSelectChange}>
              <Option  selected value="0">Uncompleted</Option>
              <Option value="1">Completed</Option>
            </Select>    
            </Form.Item>
            
        </Form>
      </div>
    );
  }

}
export default CustomTodoForm;

