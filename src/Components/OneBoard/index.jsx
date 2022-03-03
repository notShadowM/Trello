import { toJS } from 'mobx';
import React, {
  useEffect, useRef, useState, useMemo,
} from 'react';
import { useLocation } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Input, Button } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons/lib/icons';
import { observer } from 'mobx-react';
import { Container, Draggable } from 'react-smooth-dnd';
import { useStore } from '../../app/stores';
import './style.css';
import List from './List';

function OneBoard() {
  const addInput = useRef();
  const { pathname } = useLocation();
  const [showAdd, setShowAdd] = useState(false);
  const [text, setText] = useState('');
  const [dropped, setDropped] = useState(false);
  const boardId = pathname.substring(1);
  const { BoardsStore } = useStore();
  const board = BoardsStore.boards.find((e) => e.id === boardId);
  const lists = board.list;
  const addList = () => {
    if (text) {
      BoardsStore.addList(text, boardId);
      setText('');
      addInput.current.focus();
    }
  };

  const boardListsItems = useMemo(
    () => lists?.map((listItem, index) => <Draggable key={index}><List boardId={boardId} list={listItem} /></Draggable>),
    [dropped, lists.length],
  );

  const addListBlock = useMemo(() => (
    <div className="addListBlock">
      <div className="addListThumbnail " onClick={() => { setShowAdd(true); addInput.current.focus(); }}>
        <PlusOutlined style={{ color: '#fff', fontSize: '15px' }} />
        {' '}
        Add a list
      </div>
      <form onSubmit={(e) => { e.preventDefault(); addList(); }} className={`addList ${showAdd ? 'showAddList' : ''}`}>
        <Input ref={addInput} placeholder="Enter list title..." className="listInput" value={text} onChange={(e) => setText(e.target.value)} />
        <div className="addListSecRow">
          <Button type="primary" onClick={() => addList()}>Add list</Button>
          <CloseOutlined style={{ fontSize: '20px' }} onClick={() => { setShowAdd(false); setText(''); }} />
        </div>
      </form>
    </div>
  ), [showAdd, text]);

  return (
    <div className="test">
      <Helmet bodyAttributes={{ style: `background-color : ${board.background}` }} />
      <Container
        orientation="horizontal"
        onDrop={(dragResult) => {
          if (dragResult.removedIndex !== dragResult.addedIndex) {
            BoardsStore.switchLists(dragResult, boardId);
            setDropped((prev) => !prev);
          }
        }}
        style={{
          display: 'flex', margin: '15px 0', gap: '8px', alignItems: 'flex-start',
        }}
        dragClass="card-ghost"
        dropClass="card-ghost-drop"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'drop-preview',
        }}
        dropPlaceholderAnimationDuration={200}
      >
        {boardListsItems}

      </Container>
      {addListBlock}
    </div>
  );
}

export default observer(OneBoard);
