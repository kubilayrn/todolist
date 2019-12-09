import React from 'react';
import { List } from 'antd';

const Todos = (props) => {
    return (
        <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={props.data}
    
    renderItem={todo => (
      <List.Item
        key={todo.title}
        
      >
        <List.Item.Meta
          
          title={<a href={`todos/${todo.id}/`}>{todo.name}</a>}
          description="Todo list's Items"
          
          
        />
        <ul>
          {todo.item_set.map(item => (
            <li key={item}><b>Name:</b>{ item.name} <br/> <b>Description:</b> : {item.description} <br/><b>Deadline:</b> : {item.deadline}
            <br/><b>Status:</b> : {item.status === 0 ? 'Uncompleted':'Completed'} <hr/></li>
            
          ))}
        </ul>

        
        
      </List.Item>
    )}
  />
    )
}

export default Todos;