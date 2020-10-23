import React from 'react';
import { Student } from '../../../../entities';
import {
  Arrow,
  Container,
  InfoContainer,
  List,
  Name,
  Person,
  Photo,
  Title,
  Username,
  Loading,
  NotFound,
} from './styles';
import arrow from '../../../../assets/arrow.svg';
import { normalizeName } from '../../../../utils/normalizeStrings';

interface StudentsListProps {
  title: string;
  isLoading: boolean;
  students: Student[];
  listHeight?: number;
}

const StudentsList: React.FC<StudentsListProps> = ({
  title,
  isLoading,
  students,
  listHeight,
}) => (
  <Container>
    <Title>{title}</Title>

    {isLoading ? (
      <Loading />
    ) : (
      <ShowList listHeight={listHeight} students={students} />
    )}
  </Container>
);

interface ShowListProps {
  listHeight?: number;
  students: Student[];
}

const ShowList: React.FC<ShowListProps> = ({ listHeight, students }) => {
  if (students.length === 0) {
    return <NotFound>Nenhum aluno encontrado.</NotFound>;
  }

  return (
    <List height={listHeight}>
      {students.map(student => (
        <Person key={Math.random()}>
          <Photo src={student.avatar_url} />

          <InfoContainer>
            <Username>{student.github_login}</Username>
            <Name>{normalizeName(student.name, 34)}</Name>
          </InfoContainer>

          <Arrow src={arrow} />
        </Person>
      ))}
    </List>
  );
};

export default StudentsList;
