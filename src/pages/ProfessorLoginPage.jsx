import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { ArrowLeft, UserCheck, Mail, Lock } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { useAuth } from '@/contexts/AuthContext';
    import { useNavigate } from 'react-router-dom';
    import { useToast } from "@/components/ui/use-toast";
    import { Label } from "@/components/ui/label";

    const ProfessorLoginPage = () => {
      const { login } = useAuth();
      const navigate = useNavigate();
      const { toast } = useToast();
      const [fullName, setFullName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      const handleSubmit = (e) => {
        e.preventDefault();
         if (!fullName.trim() || !email.trim() || !password.trim()) {
          toast({
            title: "Erro de Validação",
            description: "Todos os campos são obrigatórios.",
            variant: "destructive",
          });
          return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
          toast({
            title: "Erro de Validação",
            description: "Por favor, insira um email institucional válido.",
            variant: "destructive",
          });
          return;
        }

        console.log('Login Professor:', { fullName, email, password });
        login('professor', { fullName, email });
        toast({
          title: "Login Bem-sucedido!",
          description: `Bem-vindo(a), Prof. ${fullName}!`,
          className: "bg-green-500 text-white",
        });
        navigate('/');
      };

      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-500 to-cyan-700 p-4"
        >
          <Button 
            variant="ghost" 
            className="absolute top-6 left-6 text-white hover:bg-white/20"
            onClick={() => navigate('/login')}
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Voltar
          </Button>

          <motion.div 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="w-full max-w-md bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl"
          >
            <div className="text-center mb-8">
              <UserCheck className="w-16 h-16 text-teal-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-800">Login do Professor</h1>
              <p className="text-gray-600">Acesse sua conta para gerenciar suas turmas e conteúdos.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="fullNameProf" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</Label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input 
                    id="fullNameProf"
                    type="text" 
                    placeholder="Seu nome completo" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10 w-full"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="emailProf" className="block text-sm font-medium text-gray-700 mb-1">Email Institucional</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input 
                    id="emailProf"
                    type="email" 
                    placeholder="seu.nome@instituicao.edu.br" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="passwordProf" className="block text-sm font-medium text-gray-700 mb-1">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input 
                    id="passwordProf"
                    type="password" 
                    placeholder="Sua senha" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white text-lg py-3">
                Entrar
              </Button>
            </form>
          </motion.div>
          <p className="text-sm text-white/70 mt-8">© {new Date().getFullYear()} EasyAcademics.</p>
        </motion.div>
      );
    };

    export default ProfessorLoginPage;