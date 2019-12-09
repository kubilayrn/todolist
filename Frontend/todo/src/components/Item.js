import React from 'react';
import { List } from 'antd';

const Items = (props) => {
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
    
    renderItem={item => (
      <List.Item
        key={item.title}
        
        
      >
        <List.Item.Meta
          
          title={<a href={`items/${item.id}/`}>{item.name}</a>}
          description={item.description}
        />
        {item.status === 0 ? 'Uncompleted':'Completed'}
      </List.Item>
    )}
  />
    )
}

export default Items;