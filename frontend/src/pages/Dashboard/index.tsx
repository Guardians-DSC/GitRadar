import React from 'react';
import { getTeacher } from '../../services/auth';

const Dashboard: React.FC = () => <h1>{getTeacher()?.name}</h1>;

export default Dashboard;
