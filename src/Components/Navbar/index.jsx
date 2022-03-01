import React from 'react';
import './style.css';
import { Input } from 'antd';
import {
  BellOutlined, DownOutlined, ExclamationCircleOutlined, MenuOutlined, SearchOutlined,
} from '@ant-design/icons/lib/icons';
import { useLocation } from 'react-router-dom';

const mneuItemsLists = ['Workspaces', 'Recent', 'Starred', 'Templates'];
const imageLink = 'https://i.pinimg.com/564x/7c/ff/a1/7cffa15ffffdac5452dcfcb1f8787c17.jpg';

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <div className="ant-menu" style={{ background: pathname !== '/' ? 'rgba(0, 0, 0, 0.45)' : '' }}>
      <div className="rightSide">
        <MenuOutlined className="ListIcon" />
        <div className="trelloTitle">Trello</div>
        {mneuItemsLists.map((itemList, index) => (
          <div className="menuItemsList" key={index}>
            {itemList}
            {' '}
            <DownOutlined className="itemListIcon" />
          </div>
        ))}
      </div>
      <div className="leftSide">
        <SearchOutlined style={{ color: '#fff' }} className="searchIcon" />
        <Input
          placeholder="Search"
          style={{
            background: 'rgba(255, 255, 255, 0.3)', paddingLeft: '28px', border: '1px solid rgba(255, 255, 255, 0.25)', color: 'rgba(255, 255, 255, 0.5)',
          }}
        />
        <ExclamationCircleOutlined className="leftSideIcon" style={{ color: '#fff' }} />
        <BellOutlined className="leftSideIcon" style={{ color: '#fff' }} />
        <div className="avatar">
          <img src={imageLink} alt="avatar" className="user-avatar" />
        </div>
      </div>
    </div>
  );
}
