import { CloseOutlined, PlusOutlined } from '@ant-design/icons/lib/icons';
import { Button, Input } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import React, { useRef, useState } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { useStore } from '../../../app/stores';
import Card from '../Card';

function List({ list, boardId }) {
  const addInput = useRef();
  const [showAdd, setShowAdd] = useState(false);
  const [text, setText] = useState('');
  const { BoardsStore } = useStore();
  const { cards } = BoardsStore.boards.find((e) => e.id === boardId).list.find((listItem) => listItem.id === list.id);

  const addCard = () => {
    if (text) {
      BoardsStore.addCard(text, list.id, boardId);
      setText('');
      addInput.current.focus();
    }
  };

  return (
    <div className="listCard">
      <div>

        <div>{list.listTitle}</div>
        <div className="cards">
          <Container
            groupName="col"
            onDrop={(dragResult) => BoardsStore.switchCards(dragResult, list.id, boardId)}
            getChildPayload={(index) => ({ card: toJS(BoardsStore.getCard(index, list.id, boardId)), listId: list.id })}
            dragClass="card-ghost"
            dropClass="card-ghost-drop"
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: 'drop-preview',
            }}
            dropPlaceholderAnimationDuration={200}
          >
            {cards?.map((card, index) => <Draggable key={index}><Card card={card} listId={list.id} boardId={boardId} /></Draggable>)}
          </Container>
        </div>
        <div className={`addCardRow ${showAdd ? 'hidden' : ''}`} onClick={(e) => { setShowAdd(true); addInput.current.focus(); }}>
          <PlusOutlined style={{ color: '#5e6c84', fontSize: '14px' }} />
          {' '}
          Add a card
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); addCard(); }} className={`addCard ${showAdd ? 'showAddCard' : ''}`}>
        <Input ref={addInput} placeholder="Enter list title..." className="cardInput" value={text} onChange={(e) => setText(e.target.value)} />
        <div className="addListSecRow">
          <Button type="primary" onClick={() => addCard()}>Add list</Button>
          <CloseOutlined style={{ fontSize: '20px' }} onClick={() => { setShowAdd(false); setText(''); }} />
        </div>
      </form>
    </div>
  );
}

export default React.memo(observer(List));
