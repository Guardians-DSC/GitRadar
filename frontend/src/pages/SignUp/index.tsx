import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
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
import validationError from '../../utils/validationError';
import api from '../../services/api';

const SignUp: React.FC = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [github, setGithub] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      toast('As senhas devem ser iguais!', { type: 'error' });
      return;
    }

    const schema = Yup.object().shape({
      github: Yup.string().required('Github obrigatório!'),
      email: Yup.string()
        .required('E-mail obrigatório!')
        .email('Digite um e-mail válido!'),
      password: Yup.string().min(6, 'No mínimo 6 dígitos!'),
    });

    try {
      await schema.validate({
        github,
        email,
        password,
      });

      await api.post('/teacher', {
        github_login: github,
        email,
        password,
      });

      toast('Sua conta foi cadastrada com sucesso!');
      history.push('/login');
    } catch (error) {
      validationError(
        error,
        'Ocorreu um erro no cadastro, tente novamente mais tarde.',
      );
    }
  };

  return (
    <PageContainer>
      <Container>
        <Logo src={logo} />
        <Title>Faça seu Cadastro</Title>

        <Form onSubmit={handleSubmit}>
          <Input
            margin="5px 0"
            width="100%"
            icon={HiOutlineMail}
            placeholder="Digite seu e-mail"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            margin="5px 0"
            width="100%"
            icon={AiFillGithub}
            placeholder="Digite seu github"
            value={github}
            onChange={e => setGithub(e.target.value)}
          />
          <Input
            margin="5px 0"
            width="100%"
            icon={BiLock}
            placeholder="Digite sua senha"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Input
            margin="5px 0"
            width="100%"
            icon={BiLock}
            placeholder="Repita sua senha"
            type="password"
            value={repeatPassword}
            onChange={e => setRepeatPassword(e.target.value)}
          />

          <ButtonWrapper>
            <Button width="100%" label="Cadastrar" type="submit" />
          </ButtonWrapper>
        </Form>

        <BackButton to="/login">
          <BackButtonIcon />
          Voltar para o Login
        </BackButton>
      </Container>
    </PageContainer>
  );
};

export default SignUp;
