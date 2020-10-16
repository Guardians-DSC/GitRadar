import React from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { AiFillGithub } from 'react-icons/ai';
import { BiLock } from 'react-icons/bi';
import {
  PageContainer,
  Container,
  Logo,
  Title,
  Form,
  ButtonWrapper,
  BackButton,
  BackButtonIcon,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logo from '../../assets/logo.png';

const SignUp: React.FC = () => {
  return (
    <PageContainer>
      <Container>
        <Logo src={logo} />
        <Title>Faça seu Cadastro</Title>

        <Form>
          <Input
            margin="5px 0"
            width="100%"
            icon={HiOutlineMail}
            placeholder="Digite seu e-mail"
          />
          <Input
            margin="5px 0"
            width="100%"
            icon={AiFillGithub}
            placeholder="Digite seu github"
          />
          <Input
            margin="5px 0"
            width="100%"
            icon={BiLock}
            placeholder="Digite sua senha"
          />
          <Input
            margin="5px 0"
            width="100%"
            icon={BiLock}
            placeholder="Repita sua senha"
          />

          <ButtonWrapper>
            <Button width="100%" label="Cadastrar" />
          </ButtonWrapper>
        </Form>

        <BackButton>
          <BackButtonIcon />
          Voltar para o Login
        </BackButton>
      </Container>
    </PageContainer>
  );
};

export default SignUp;
