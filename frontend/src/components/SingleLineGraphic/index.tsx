import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Container, Title } from './styles';

interface SingleLineGraphicProps {
  title: string;
  data: ChartInfo[];
  name: string;
  strokeColor?: string;
}

interface ChartInfo {
  name: string;
  value: number;
}

const SingleLineGraphic: React.FC<SingleLineGraphicProps> = ({
  title,
  data,
  name,
  strokeColor = '#04D361',
}: SingleLineGraphicProps) => (
  <>
    <Container>
      <Title>{title}</Title>
      <ResponsiveContainer height="100%" width="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="eee" strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            isAnimationActive={true}
            name={name}
            type="monotone"
            dataKey="value"
            stroke={strokeColor}
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  </>
);

export default SingleLineGraphic;
