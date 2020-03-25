import React from 'react'
import { Table } from 'antd';

const columns = [
    {
      title: 'iteration',
      dataIndex: 'iteration',
      key: 'iteration',
      
    },
    {
      title: 'x',
      dataIndex: 'x',
      key: 'x',
    },
    {
        title: 'y',
        dataIndex: 'y',
        key: 'y',
        
      },
      {
        title: 'e',
        dataIndex: 'e',
        key: 'e',
      },]

function table(props) {
    return (
        <div>
            <Table columns={columns} dataSource={props.data.table} />
        </div>
    )
}

export default table
