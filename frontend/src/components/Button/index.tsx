import React, { ButtonHTMLAttributes } from 'react';
import { ButtonContainer } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label }) => (
  <ButtonContainer>{label}</ButtonContainer>
);

export default Button;
