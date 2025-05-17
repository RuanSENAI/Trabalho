
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Megaphone, ShieldCheck, Users } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
    import { useToast } from '@/components/ui/use-toast';

    const InstitutionPage = () => {
      const { toast } = useToast();

      const handleAction = (action) => {
        toast({
          title: "Ação Solicitada",
          description: `Funcionalidade "${action}" acionada. (Em desenvolvimento)`,
          className: "bg-blue-500 text-white"
        });
        // Placeholder for actual functionality
        console.log(`${action} clicado.`);
      };

      const actions = [
        {
          title: "Publicar Aviso",
          description: "Comunique informações importantes para toda a instituição.",
          icon: Megaphone,
          actionKey: "publicar_aviso",
          color: "bg-green-500 hover:bg-green-600",
        },
        {
          title: "Moderar Conteúdo",
          description: "Revise e gerencie postagens e comentários na plataforma.",
          icon: ShieldCheck,
          actionKey: "moderar_conteudo",
          color: "bg-yellow-500 hover:bg-yellow-600",
        },
        {
          title: "Gerenciar Usuários",
          description: "Administre contas de alunos, professores e outros administradores.",
          icon: Users,
          actionKey: "gerenciar_usuarios",
          color: "bg-red-500 hover:bg-red-600",
        },
      ];

      return (
        <motion.div 
          className="max-w-4xl mx-auto py-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Painel da Instituição</h1>
          
          <div className="grid md:grid-cols-3 gap-6">
            {actions.map((action, index) => (
              <motion.div
                key={action.actionKey}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-green-500">
                  <CardHeader className="items-center text-center">
                    <div className={`p-3 rounded-full ${action.color} text-white inline-block mb-3`}>
                      <action.icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-700">{action.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-500">{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex items-end justify-center">
                    <Button 
                      onClick={() => handleAction(action.title)}
                      className={`w-full ${action.color} text-white font-medium py-3`}
                    >
                      Acessar {action.title.split(' ')[0]}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-12 p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">Estatísticas Rápidas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded shadow">
                <p className="text-3xl font-bold text-green-600">12,345</p>
                <p className="text-sm text-gray-500">Usuários Ativos</p>
              </div>
              <div className="p-4 bg-white rounded shadow">
                <p className="text-3xl font-bold text-green-600">876</p>
                <p className="text-sm text-gray-500">Novas Postagens (Última Semana)</p>
              </div>
              <div className="p-4 bg-white rounded shadow">
                <p className="text-3xl font-bold text-green-600">42</p>
                <p className="text-sm text-gray-500">Avisos Publicados (Mês)</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      );
    };

    export default InstitutionPage;
  