
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Shield,
  Activity,
  TrendingUp
} from 'lucide-react';
import StatsCards from '../components/StatsCards';
import UserTable from '../components/UserTable';
import ActivityChart from '../components/ActivityChart';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background cyber-grid">
      {/* Header */}
      <header className="glass-card border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold neon-text">Admin Dashboard</h1>
                <p className="text-sm text-gray-400">Panneau de contrôle administrateur</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-900/30 text-green-300 border-green-500/30">
                    {user?.role}
                  </Badge>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="bg-red-900/20 border-red-500/30 text-red-300 hover:bg-red-900/30"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold neon-text">
              Bienvenue, {user?.name}
            </h2>
            <p className="text-gray-300">
              Gérez votre application depuis ce tableau de bord sécurisé
            </p>
          </div>

          {/* Stats Cards */}
          <StatsCards />

          {/* Charts and Tables Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Activity Chart */}
            <div className="xl:col-span-2">
              <ActivityChart />
            </div>

            {/* Quick Actions */}
            <Card className="glass-card neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Settings className="w-5 h-5" />
                  Actions rapides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start btn-neon">
                  <Users className="w-4 h-4 mr-2" />
                  Gérer les utilisateurs
                </Button>
                <Button className="w-full justify-start btn-neon">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Voir les rapports
                </Button>
                <Button className="w-full justify-start btn-neon">
                  <Activity className="w-4 h-4 mr-2" />
                  Monitoring système
                </Button>
                <Button className="w-full justify-start btn-neon">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Analytics avancés
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* User Management Table */}
          <UserTable />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
