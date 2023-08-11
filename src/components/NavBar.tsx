import React from "react";
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
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

export const NavBar = () => {
    return (
        <div className="navbar">
            <Space direction="vertical">
                {/* <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} /> */}
                <Search placeholder="Search a pokemon" size="large" suffix={suffix} allowClear onSearch={onSearch} />
            </Space>
        </div>
    );
}
