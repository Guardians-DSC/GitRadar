/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Container, List, Title, Loading, NotFound } from './styles';
import ListItem from '../ListItem';

interface ShowListProps {
  listHeight?: number;
  notFoundMessage?: string;
  items: any[];
  mapItem: (item: any) => Item;
}

interface Item {
  photo?: string;
  label: string;
  subLabel: string;
}

const ShowList: React.FC<ShowListProps> = ({
  listHeight,
  items,
  mapItem,
  notFoundMessage,
}) => {
  if (items.length === 0) {
    return <NotFound>{notFoundMessage || 'Nenhum aluno encontrado.'}</NotFound>;
  }

  return (
    <List height={listHeight}>
      {items.map(item => {
        const mappedItem = mapItem(item);

        return (
          <ListItem
            photo={mappedItem.photo}
            label={mappedItem.label}
            subLabel={mappedItem.subLabel}
          />
        );
      })}
    </List>
  );
};

type ListContainerProps = ShowListProps & {
  title: string;
  isLoading: boolean;
};

const ListContainer: React.FC<ListContainerProps> = ({
  title,
  isLoading,
  items,
  mapItem,
  listHeight,
}) => (
  <Container>
    <Title>{title}</Title>

    {isLoading ? (
      <Loading />
    ) : (
      <ShowList listHeight={listHeight} items={items} mapItem={mapItem} />
    )}
  </Container>
);

export default ListContainer;
