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

interface SimpleLineChartProps {
  title: string;
  data: object[];
  lines: LinesProps[]
  xAxisName: string
}
interface LinesProps {
  name: string
  dataKey: string
  stroke: string
}

const SimpleLineChart: React.FC<SimpleLineChartProps> = ({
  title,
  data,
  lines,
  xAxisName
}: SimpleLineChartProps) => (
  <>
    <Container>
      <Title>{title}</Title>
      <ResponsiveContainer height="100%" width="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="eee" strokeDasharray="3 3" />
          <XAxis dataKey={xAxisName} />
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

export default SimpleLineChart;
