import React from 'react';
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

interface Student {
  name: string;
  github_login: string;
  avatar_url: string;
}

interface StudentsListProps {
  title: string;
  students: Student[];
}

const StudentsList: React.FC<StudentsListProps> = ({ title, students }) => (
  <Container>
    <Title>{title}</Title>

    <List>
      {students.map(student => (
        <Person key={Math.random()}>
          <Photo />

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
