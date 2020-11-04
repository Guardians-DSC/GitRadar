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

interface LineGraphicProps {
  title: string;
  data: ChartInfo[];
  lines: LinesProps[]
}

interface ChartInfo {
  name: string;
  value: number;
}

interface LinesProps {
  name: string
  dataKey: string
  stroke: string
}

const LineGraphic: React.FC<LineGraphicProps> = ({
  title,
  data,
  lines
}: LineGraphicProps) => (
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
          {
            lines.map((line) => (
              <Line key={line.name}
                name={line.name}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.stroke}
              />
            ))
          }
        </LineChart>
      </ResponsiveContainer>
    </Container>
  </>
);

export default LineGraphic;
