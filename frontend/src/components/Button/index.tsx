import React, { ButtonHTMLAttributes } from 'react';
import { ButtonContainer, Loading } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLInputElement> {
  label: string;
  width?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, width, loading = false }) => (
  <ButtonContainer width={width} disabled={loading}>
    {loading ? <Loading /> : label}
  </ButtonContainer>
);

export default Button;
