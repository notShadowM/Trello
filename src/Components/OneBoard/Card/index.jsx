import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { ItemTypes } from '../Types';
import { useStore } from '../../../app/stores';

export default function Card({
  card, listId, boardId,
}) {
  const { BoardsStore, ItemsData } = useStore();

  return <div className="cardItem">{card.cardTitle}</div>;
}
