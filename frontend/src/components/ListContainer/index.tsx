/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Container, List, Title, Loading, NotFound } from './styles';
import ListItem from '../ListItem';

interface ShowListProps {
  listHeight?: number;
  notFoundMessage?: string;
  items: any[];
  mapItem: (item: any) => Item;
  isExternal?: boolean;
}

interface Item {
  photo?: string;
  label: string;
  subLabel: string;
  link?: string;
  isExternal?: boolean;
}

const ShowList: React.FC<ShowListProps> = ({
  listHeight,
  items,
  mapItem,
  notFoundMessage,
  isExternal,
}) => {
  if (items.length === 0) {
    return <NotFound>{notFoundMessage || 'Nenhum item encontrado.'}</NotFound>;
  }

  return (
    <List height={listHeight}>
      {items.map(item => {
        const mappedItem = mapItem(item);

        return (
          <ListItem
            key={Math.random()}
            photo={mappedItem.photo}
            label={mappedItem.label}
            subLabel={mappedItem.subLabel}
            link={mappedItem.link}
            isExternal={isExternal}
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
  isExternal,
}) => (
  <Container>
    <Title>{title}</Title>

    {isLoading ? (
      <Loading />
    ) : (
      <ShowList
        listHeight={listHeight}
        items={items}
        mapItem={mapItem}
        isExternal={isExternal}
      />
    )}
  </Container>
);

export default ListContainer;
