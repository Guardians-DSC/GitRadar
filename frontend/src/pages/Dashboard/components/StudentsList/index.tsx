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
} from './styles';
import arrow from '../../../../assets/arrow.svg';
import { normalizeName } from '../../../../utils/normalizeStrings';

interface StudentsListProps {
  title: string;
  students: Student[];
  listHeight?: number;
}

const StudentsList: React.FC<StudentsListProps> = ({
  title,
  students,
  listHeight,
}) => (
  <Container>
    <Title>{title}</Title>

    {students.length === 0 ? (
      <Loading />
    ) : (
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
    )}
  </Container>
);

export default StudentsList;
