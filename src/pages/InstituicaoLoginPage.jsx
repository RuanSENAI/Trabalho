import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { ArrowLeft, Briefcase, Mail, Lock, Building, FileText } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { useAuth } from '@/contexts/AuthContext';
    import { useNavigate } from 'react-router-dom';
    import { useToast } from "@/components/ui/use-toast";
    import { Label } from "@/components/ui/label";

    const InstituicaoLoginPage = () => {
      const { login } = useAuth();
      const navigate = useNavigate();
      const { toast } = useToast();
      const [institutionName, setInstitutionName] = useState('');
      const [cnpj, setCnpj] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!institutionName.trim() || !cnpj.trim() || !email.trim() || !password.trim()) {
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
        // Basic CNPJ validation (just checks for 14 digits for simplicity)
        if (!/^\d{14}$/.test(cnpj.replace(/\D/g, ''))) {
            toast({
                title: "Erro de Validação",
                description: "CNPJ inválido. Deve conter 14 dígitos.",
                variant: "destructive",
            });
            return;
        }

        console.log('Login Instituição:', { institutionName, cnpj, email, password });
        login('instituicao', { institutionName, email });
        toast({
          title: "Login Bem-sucedido!",
          description: `Bem-vinda, ${institutionName}!`,
          className: "bg-green-500 text-white",
        });
        navigate('/');
      };
      
      const formatCnpj = (value) => {
        const cleaned = value.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})$/);
        if (!match) return cleaned;
        return !match[2] ? match[1] : `${match[1]}.${match[2]}` +
               (!match[3] ? '' : `.${match[3]}`) +
               (!match[4] ? '' : `/${match[4]}`) +
               (!match[5] ? '' : `-${match[5]}`);
      };

      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-700 p-4"
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
              <Briefcase className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-800">Login da Instituição</h1>
              <p className="text-gray-600">Acesse o painel administrativo.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="institutionName" className="block text-sm font-medium text-gray-700 mb-1">Nome da Instituição</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input 
                    id="institutionName"
                    type="text" 
                    placeholder="Nome da sua instituição" 
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    className="pl-10 w-full"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="cnpj" className="block text-sm font-medium text-gray-700 mb-1">CNPJ</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input 
                    id="cnpj"
                    type="text" 
                    placeholder="00.000.000/0000-00" 
                    value={cnpj}
                    onChange={(e) => setCnpj(formatCnpj(e.target.value))}
                    maxLength={18}
                    className="pl-10 w-full"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="emailInst" className="block text-sm font-medium text-gray-700 mb-1">Email Institucional</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input 
                    id="emailInst"
                    type="email" 
                    placeholder="contato@instituicao.edu.br" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="passwordInst" className="block text-sm font-medium text-gray-700 mb-1">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input 
                    id="passwordInst"
                    type="password" 
                    placeholder="Sua senha de administrador" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-3">
                Entrar
              </Button>
            </form>
          </motion.div>
          <p className="text-sm text-white/70 mt-8">© {new Date().getFullYear()} EasyAcademics.</p>
        </motion.div>
      );
    };

    export default InstituicaoLoginPage;