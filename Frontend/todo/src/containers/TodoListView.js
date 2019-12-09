import React from 'react';
import Items from '../components/Todo';
import axios from 'axios';
import {connect} from 'react-redux';
import CustomTodoForm from '../components/TodoForm'
class TodoList extends React.Component {

    state={
        todos:[]
    }
    componentWillReceiveProps(){
        axios.defaults.headers = {'Authorization': `token ${localStorage.getItem('token')}`}
        axios.get('http://127.0.0.1:8000/todos/')
            .then(res=>{
                this.setState({
                    todos:res.data
                });
                console.log(res.data);
            })
    }

    render(){
        return(
            <div>
                <Items data={this.state.todos}/>
                <br />
                 {/* <h2>Create an Todo</h2>
                <CustomTodoForm 
                    requestType="post"
                    itemID={null}
                    btnText="Create"/>  */}
            </div>
        )
    }
    
}
const mapStateToProps = state =>{
    return {
        isAuthenticated: state.token !== null
    }}
export default connect(mapStateToProps)(TodoList);