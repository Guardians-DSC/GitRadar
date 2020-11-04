import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis } from 'recharts'
import { Container, Title } from './styles'


interface SingleLineGraphicProps {
    title: string
    data: ChartInfo[]
    name: string
  }

interface ChartInfo {
    name: string;
    value: number;
}

const SingleLineGraphic: React.FC<SingleLineGraphicProps> = ({ title, data, name }: SingleLineGraphicProps) => (
    <>
        <Container>
            <Title>{title}</Title>
            <LineChart width={960} height={250} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <XAxis />
                <Tooltip />
                <Legend />
                <Line
                name={name}
                type="monotone"
                dataKey="value"
                stroke="#04D361"
                />
            </LineChart>
        </Container>
    </>
)

export default SingleLineGraphic