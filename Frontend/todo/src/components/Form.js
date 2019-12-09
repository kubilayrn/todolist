import React from 'react';
import { Form, Input, Button,Select,DatePicker} from 'antd';
import axios from 'axios';

const { Option } = Select;
class CustomForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {value:"0"}

        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

    }

    handleSelectChange(value){
       this.setState({value:value})
      };
    handleFormSubmit = (event,requestType,itemID) =>{
        const name = event.target.elements.name.value;
        const description = event.target.elements.description.value;
        const deadline = event.target.elements.deadline.value;
        const status = this.state.value;
        console.log(name,description,deadline,status);

        switch(requestType){
            case 'post':
                return axios.post('http://127.0.0.1:8000/items/',{
                        name:name,
                        description:description,
                        deadline:deadline,
                        status:status
                })
                .then(res =>console.log(res))
                .catch(error =>console.err(error));
                
            case 'put' :
                return axios.put(`http://127.0.0.1:8000/items/${itemID}/`,{
                    name:name,
                    description:description,
                    deadline:deadline,
                    status:status
                    })
                    .then(res =>console.log(res))
                    .catch(error =>console.err(error));
        }
    }
      
  render() {
    
    return (
      <div>
        <Form onSubmit={(event)=>this.handleFormSubmit(
            event,
            this.props.requestType,
            this.props.itemID
            )} >
          
            <Form.Item label="Name" >
            <Input name="name" placeholder="Item Name" />
          </Form.Item>
            <Form.Item label="Description" >
            <Input name="description" placeholder="Description" />
          </Form.Item>
            <Form.Item label="Deadline">
          <DatePicker name="deadline" showTime placeholder="Select Time"  />
        </Form.Item>
            <Form.Item label="Status">   
                <Select name="status" placeholder="Please select a status" value={this.state.value} onChange={this.handleSelectChange}>
              <Option  selected value="0">Uncompleted</Option>
              <Option value="1">Completed</Option>
            </Select>    
            </Form.Item>
            <Form.Item>
  <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

}
export default CustomForm;

