import React from 'react';
import axios from 'axios';
import { Card,Form,Button} from 'antd';
import {connect} from 'react-redux';
import CustomTodoForm from '../components/TodoForm'
class TodoDetail extends React.Component {

    state = {
        item: []
    }
    componentWillReceiveProps() {
        const itemID = this.props.match.params.itemID;
        axios.defaults.headers = {'Authorization': `token ${localStorage.getItem('token')}`}
        axios.get(`http://127.0.0.1:8000/todo/${itemID}/`)
            .then(res => {
                this.setState({
                    item: res.data
                });
                console.log(res.data);
            })
    }

    handleDelete = event => {
        const itemID = this.props.match.params.itemID;
        axios.delete(`http://127.0.0.1:8000/items/${itemID}/`);
        this.props.history.push('/');
           

    }
    render() {
        return (
            <div>
                <Card title={this.state.item.name}>
                    <p>{this.state.item.description}</p>
                    <p>{this.state.item.deadline}</p>
                    <p>{this.state.item.status === 0 ? 'Uncompleted':'Completed'}</p>
                </Card>
                <CustomTodoForm
                requestType={"put"}
                itemID={this.props.match.params.itemID}
                btnText="Update"/>
                <Form onSubmit={this.handleDelete}>
                    <Button type ="danger" htmlType="submit"> Delete</Button>
                </Form>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return {
        isAuthenticated: state.token !== null
    }
}
export default connect(mapStateToProps)(TodoDetail);;