import React from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Label } from '../ListItem/styles'
import { Container, Title } from './styles'

interface SimpleBarChartProps {
    title: string;
    data: object[];
    bars: BarProps[]
    xAxisName: string
}

interface BarProps {
    name: string
    dataKey: string
    fill: string
    stackId: string
  }
  

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ title, data, bars, xAxisName }: SimpleBarChartProps) => (
    <Container>
        <Title>{title}</Title>
        <ResponsiveContainer height="100%" width="100%">
            <BarChart
                data={data}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee"/>
                <XAxis dataKey={xAxisName} />
                <YAxis />
                <Tooltip />
                <Legend />
                {
                bars.map((bar) => (
                    <Bar 
                    key={bar.name}
                    name={bar.name}
                    dataKey={bar.dataKey}
                    fill={bar.fill}
                    stackId={bar.stackId}
                    />
                    
            ))
          }
            </BarChart>
        </ResponsiveContainer>
    </Container>
)

export default SimpleBarChart