
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';

const UserTable = () => {
  const users = [
    { id: '1', name: 'Alice Martin', email: 'alice@example.com', role: 'admin', status: 'Actif', lastLogin: '2024-06-14' },
    { id: '2', name: 'Bob Durant', email: 'bob@example.com', role: 'user', status: 'Actif', lastLogin: '2024-06-13' },
    { id: '3', name: 'Claire Dubois', email: 'claire@example.com', role: 'user', status: 'Inactif', lastLogin: '2024-06-10' },
    { id: '4', name: 'David Moreau', email: 'david@example.com', role: 'user', status: 'Actif', lastLogin: '2024-06-14' },
    { id: '5', name: 'Emma Rousseau', email: 'emma@example.com', role: 'admin', status: 'Actif', lastLogin: '2024-06-14' },
  ];

  const getRoleBadge = (role: string) => {
    return role === 'admin' ? (
      <Badge className="bg-purple-900/30 text-purple-300 border-purple-500/30">
        Admin
      </Badge>
    ) : (
      <Badge className="bg-blue-900/30 text-blue-300 border-blue-500/30">
        User
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    return status === 'Actif' ? (
      <Badge className="bg-green-900/30 text-green-300 border-green-500/30">
        Actif
      </Badge>
    ) : (
      <Badge className="bg-gray-900/30 text-gray-300 border-gray-500/30">
        Inactif
      </Badge>
    );
  };

  return (
    <Card className="glass-card neon-border">
      <CardHeader>
        <CardTitle className="text-white">Gestion des utilisateurs</CardTitle>
        <CardDescription className="text-gray-400">
          Liste des utilisateurs enregistrés dans le système
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead className="text-gray-300">Nom</TableHead>
              <TableHead className="text-gray-300">Email</TableHead>
              <TableHead className="text-gray-300">Rôle</TableHead>
              <TableHead className="text-gray-300">Statut</TableHead>
              <TableHead className="text-gray-300">Dernière connexion</TableHead>
              <TableHead className="text-gray-300 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="border-white/10 hover:bg-white/5">
                <TableCell className="text-white font-medium">{user.name}</TableCell>
                <TableCell className="text-gray-300">{user.email}</TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell className="text-gray-300">{user.lastLogin}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserTable;
