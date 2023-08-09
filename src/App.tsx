import { useState } from 'react'
import './App.css'
import { AudioOutlined } from '@ant-design/icons';

import { Input, Space } from 'antd';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);

const onSearch = (value: string) => console.log(value);


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
      </div>

    </>
  )
}

export default App
