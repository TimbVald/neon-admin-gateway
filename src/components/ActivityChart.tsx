
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ActivityChart = () => {
  const data = [
    { name: 'Jan', users: 400, sessions: 240 },
    { name: 'Fév', users: 300, sessions: 139 },
    { name: 'Mar', users: 200, sessions: 980 },
    { name: 'Avr', users: 278, sessions: 390 },
    { name: 'Mai', users: 189, sessions: 480 },
    { name: 'Jun', users: 239, sessions: 380 },
    { name: 'Jul', users: 349, sessions: 430 },
  ];

  return (
    <Card className="glass-card neon-border">
      <CardHeader>
        <CardTitle className="text-white">Activité mensuelle</CardTitle>
        <CardDescription className="text-gray-400">
          Évolution des utilisateurs et sessions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="name" 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(59,130,246,0.3)',
                borderRadius: '8px',
                color: 'white'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="users" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              name="Utilisateurs"
            />
            <Line 
              type="monotone" 
              dataKey="sessions" 
              stroke="#8B5CF6" 
              strokeWidth={3}
              dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
              name="Sessions"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
