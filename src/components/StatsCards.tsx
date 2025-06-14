
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Activity, Shield, TrendingUp } from 'lucide-react';

const StatsCards = () => {
  const stats = [
    {
      title: "Utilisateurs totaux",
      value: "1,284",
      change: "+12%",
      icon: Users,
      color: "from-blue-600 to-cyan-600"
    },
    {
      title: "Sessions actives",
      value: "342",
      change: "+8%",
      icon: Activity,
      color: "from-purple-600 to-pink-600"
    },
    {
      title: "Sécurité",
      value: "99.9%",
      change: "+0.1%",
      icon: Shield,
      color: "from-green-600 to-emerald-600"
    },
    {
      title: "Performance",
      value: "2.4s",
      change: "-0.3s",
      icon: TrendingUp,
      color: "from-orange-600 to-red-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="glass-card neon-border hover:scale-105 transition-transform duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
              <stat.icon className="w-4 h-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <p className="text-xs text-green-400 mt-1">
              {stat.change} depuis le mois dernier
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
