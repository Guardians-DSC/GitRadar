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
} from './styles';

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

    <List height={listHeight}>
      {students.map(student => (
        <Person key={Math.random()}>
          <Photo src={student.avatar_url} />

          <InfoContainer>
            <Username>{student.github_login}</Username>
            <Name>{student.name}</Name>
          </InfoContainer>

          <Arrow />
        </Person>
      ))}
    </List>
  </Container>
);

export default StudentsList;
