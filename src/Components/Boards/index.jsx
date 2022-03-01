import React, { useState } from 'react';
import './style.css';
import { Modal, Input } from 'antd';
import { CheckOutlined } from '@ant-design/icons/lib/icons';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../app/stores';

const Colors = ['rgb(0, 121, 191)', 'rgb(210, 144, 52)', 'rgb(81, 152, 57)', 'rgb(176, 70, 50)', 'rgb(137, 96, 158)'];

export default function Boards() {
  const { BoardsStore } = useStore();
  const navigate = useNavigate();
  const { boards } = BoardsStore;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setDatas] = useState({
    color: 'rgba(0,121,191)',
    boardTitle: '',
  });

  const setData = (object) => setDatas((prevState) => ({ ...prevState, ...object }));

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setData({ boardTitle: '' });
    if (data.color && data.boardTitle) {
      BoardsStore.addBoard(data.boardTitle, data.color);
    }
  };

  const handleCancel = () => {
    setData({ boardTitle: '' });
    setIsModalVisible(false);
  };

  return (
    <div className="boardContainer">

      <Modal title="Create new board" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className="modalTitle">Background</div>
        <div className="colors">
          {Colors.map((color, index) => (
            <div className="color" key={index} style={{ background: color }} onClick={() => setData({ color })}>
              {data.color === color && <CheckOutlined style={{ color: '#fff', fontSize: '18px' }} />}
            </div>
          ))}
        </div>
        <label htmlFor="boardTitle">
          Board Title
          <Input id="boardTitle" placeholder="Board title" className="titleInput" value={data.boardTitle} onChange={(e) => setData({ boardTitle: e.target.value })} />
          <input type="hidden" />
        </label>
      </Modal>

      {boards.map((board, index) => (
        <div className="board realCard" key={index} onClick={() => navigate(`/${board.id}`)} style={{ background: board.background }}>
          {board.title}
        </div>
      ))}
      <div className="board createCard" onClick={showModal}>
        Create new board
      </div>
    </div>
  );
}
