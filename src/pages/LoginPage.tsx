
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Github, Mail } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const { signIn, signUp, signInWithGoogle, signInWithGithub, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        toast({
          title: "Erreur de connexion",
          description: error.message || "Email ou mot de passe incorrect.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans votre dashboard !",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signUp(email, password, fullName);
      if (error) {
        toast({
          title: "Erreur d'inscription",
          description: error.message || "Impossible de créer le compte.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Inscription réussie",
          description: "Vérifiez votre email pour confirmer votre compte.",
        });
        setActiveTab('signin');
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast({
          title: "Erreur Google",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de se connecter avec Google.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubAuth = async () => {
    setIsLoading(true);
    try {
      const { error } = await signInWithGithub();
      if (error) {
        toast({
          title: "Erreur GitHub",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de se connecter avec GitHub.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 cyber-grid">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
      
      <Card className="w-full max-w-md glass-card neon-border relative z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold neon-text">
            Admin Gateway
          </CardTitle>
          <CardDescription className="text-gray-300">
            Connectez-vous ou créez votre compte
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800/50">
              <TabsTrigger value="signin" className="text-gray-300">Connexion</TabsTrigger>
              <TabsTrigger value="signup" className="text-gray-300">Inscription</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-gray-200">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-neon"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-gray-200">Mot de passe</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-neon"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full btn-neon"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Connexion...
                    </div>
                  ) : (
                    'Se connecter'
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-gray-200">Nom complet</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input-neon"
                    placeholder="Votre nom complet"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-gray-200">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-neon"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-gray-200">Mot de passe</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-neon"
                    placeholder="••••••••"
                    minLength={6}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full btn-neon"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Inscription...
                    </div>
                  ) : (
                    "S'inscrire"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-gray-400">Ou continuer avec</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="bg-red-900/20 border-red-500/30 text-red-300 hover:bg-red-900/30"
            >
              <Mail className="w-4 h-4 mr-2" />
              Google
            </Button>
            <Button
              variant="outline"
              onClick={handleGithubAuth}
              disabled={isLoading}
              className="bg-gray-900/20 border-gray-500/30 text-gray-300 hover:bg-gray-900/30"
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
