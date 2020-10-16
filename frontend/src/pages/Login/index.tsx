import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { HiOutlineMail } from 'react-icons/hi';
import { BiLock } from 'react-icons/bi';
import {
  PageContainer,
  Container,
  Logo,
  Title,
  Form,
  ButtonWrapper,
  GoRegister,
  GoRegisterIcon,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logo from '../../assets/logo.png';
import validationError from '../../utils/validationError';
import api from '../../services/api';
import { login } from '../../services/auth';

const Login: React.FC = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const schema = Yup.object().shape({
      email: Yup.string()
        .required('E-mail obrigatório!')
        .email('Digite um e-mail válido!'),
      password: Yup.string().required('Senha obrigatória!'),
    });

    try {
      setLoading(true);

      await schema.validate({
        email,
        password,
      });

      const response = await api.post('/session', {
        email,
        password,
      });

      const { teacher, token } = response.data;
      login(token, teacher);

      setLoading(false);
      toast('Login realizado com sucesso!', { type: 'success' });
      history.push('/dashboard');
    } catch (error) {
      setLoading(false);

      validationError(
        error,
        'Ocorreu um erro no login, tente novamente mais tarde.',
      );
    }
  };

  return (
    <PageContainer>
      <Container>
        <Logo src={logo} alt="Git Radar" />
        <Title>Faça seu Login</Title>

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
            icon={BiLock}
            placeholder="Digite sua senha"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <ButtonWrapper>
            <Button
              loading={loading}
              width="100%"
              label="Login"
              type="submit"
            />
          </ButtonWrapper>
        </Form>

        <GoRegister to="/cadastrar">
          <GoRegisterIcon />
          Faça seu cadastro
        </GoRegister>
      </Container>
    </PageContainer>
  );
};

export default Login;
