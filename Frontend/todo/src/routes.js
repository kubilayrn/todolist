import React from 'react';
import {Route} from 'react-router-dom';
import ItemList from './containers/ItemListView'
import ItemDetail from './containers/ItemDetailView';
import TodoList from './containers/TodoListView';
import Login from './containers/Login';
import Signup from './containers/Signup';
const BaseRouter = () => (
    <div>
        <Route exact path='/items' component={ItemList}/>
        <Route exact path='/items/:itemID' component={ItemDetail}/>
        <Route exact path='/todos' component={TodoList}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
    </div>
);

export default BaseRouter;