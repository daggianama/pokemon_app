import React, { useState } from "react";
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

interface SearchPokemonProps {
    onSearch: (value: string) => void;
}

export const SearchPokemon: React.FC<SearchPokemonProps> = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState<string>("");

    const handleSearch = (value: string) => {
        onSearch(value);
        setSearchValue("");
    };

    return (
        <div className="search">
            <Space direction="vertical">
                <Search
                    placeholder="Search a pokemon"
                    size="large" suffix={suffix}
                    allowClear onSearch={handleSearch}
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue} 
                />
            </Space>
        </div>
    );
}
