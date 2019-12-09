import React from 'react';
import Items from '../components/Item';
import axios from 'axios';
import CustomForm from '../components/Form';
import {connect} from 'react-redux';

class ItemList extends React.Component {

    state={
        items:[]
    }
    componentWillReceiveProps(newProps){
        
        if(localStorage.getItem('token')){
            /* axios.defaults.headers ={
                "Content-Type":"application/json",
                "Authorization":`Token ${newProps.token}`
            } */
            axios.defaults.headers = {'Authorization': `token ${localStorage.getItem('token')}`}
            axios.get('http://127.0.0.1:8000/items/')
                .then(res=>{
                    this.setState({
                        items:res.data
                    });
                    console.log(res.data);
                })
        }
        
    }

    render(){
        return(
            <div>
                <Items data={this.state.items}/>
                <br />
                <h2>Create an Item</h2>
                <CustomForm r
                    requestType="post"
                    itemID={null}
                    btnText="Create"/>
            </div>
        )
    
    }
    
   
    }
    const mapStateToProps = state =>{
        return {
            isAuthenticated: state.token !== null
        }
}
export default connect(mapStateToProps)(ItemList);