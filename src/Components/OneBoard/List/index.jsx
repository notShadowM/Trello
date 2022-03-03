import { CloseOutlined, PlusOutlined } from '@ant-design/icons/lib/icons';
import { Button, Input } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import React, { useMemo, useRef, useState } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { useStore } from '../../../app/stores';
import Card from '../Card';

function List({ list, boardId }) {
  const addInput = useRef();
  const [showAdd, setShowAdd] = useState(false);
  const [text, setText] = useState('');
  const [dropped, setDropped] = useState(false);
  const { BoardsStore } = useStore();
  const { cards } = BoardsStore.boards.find((e) => e.id === boardId).list.find((listItem) => listItem.id === list.id);

  const addCard = () => {
    if (text) {
      BoardsStore.addCard(text, list.id, boardId);
      setText('');
      addInput.current.focus();
    }
  };

  const listForm = useMemo(() => (
    <form onSubmit={(e) => { e.preventDefault(); addCard(); }} className={`addCard ${showAdd ? 'showAddCard' : ''}`}>
      <Input ref={addInput} placeholder="Enter list title..." className="cardInput" value={text} onChange={(e) => setText(e.target.value)} />
      <div className="addListSecRow">
        <Button type="primary" onClick={() => addCard()}>Add list</Button>
        <CloseOutlined style={{ fontSize: '20px' }} onClick={() => { setShowAdd(false); setText(''); }} />
      </div>
    </form>
  ), [showAdd, text]);

  const listCards = useMemo(
    () => cards?.map((card, index) => <Draggable key={index}><Card card={card} listId={list.id} boardId={boardId} /></Draggable>),
    [cards, cards.length, dropped],
  );
  return (
    <div className="listCard">
      <div>

        <div>{list.listTitle}</div>
        <div className="cards">
          <Container
            groupName="col"
            onDrop={(dragResult) => {
              if (dragResult.removedIndex !== dragResult.addedIndex) {
                BoardsStore.switchCards(dragResult, list.id, boardId);
                setDropped((prev) => !prev);
              }
            }}
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
            {listCards}
          </Container>
        </div>
        <div className={`addCardRow ${showAdd ? 'hidden' : ''}`} onClick={(e) => { setShowAdd(true); addInput.current.focus(); }}>
          <PlusOutlined style={{ color: '#5e6c84', fontSize: '14px' }} />
          {' '}
          Add a card
        </div>
      </div>

      {listForm}
    </div>
  );
}

export default observer(List);
