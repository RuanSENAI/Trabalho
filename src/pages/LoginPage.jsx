import React from 'react';
    import { motion } from 'framer-motion';
    import { Users, User, Briefcase, ArrowLeft } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useNavigate } from 'react-router-dom';

    const LoginPage = () => {
      const navigate = useNavigate();

      const handleSelectUserType = (userTypePath) => {
        navigate(userTypePath);
      };

      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 to-teal-600 p-4"
        >
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-white mb-3">EasyAcademics</h1>
            <p className="text-xl text-white/90">Conectando mentes, simplificando o aprendizado.</p>
            <p className="text-lg text-white/80 mt-4">Selecione seu perfil para continuar:</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 w-full max-w-4xl">
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                onClick={() => handleSelectUserType('/login/aluno')}
                className="w-full h-48 md:h-64 bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border-2 border-white/50 rounded-xl shadow-lg transition-all duration-300"
                variant="outline"
                size="lg"
              >
                <div className="flex flex-col items-center justify-center">
                  <Users className="w-16 h-16 md:w-20 md:h-20 mb-4 text-white" />
                  <span className="text-2xl md:text-3xl font-semibold">Aluno</span>
                </div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                onClick={() => handleSelectUserType('/login/professor')}
                className="w-full h-48 md:h-64 bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border-2 border-white/50 rounded-xl shadow-lg transition-all duration-300"
                variant="outline"
                size="lg"
              >
                <div className="flex flex-col items-center justify-center">
                  <User className="w-16 h-16 md:w-20 md:h-20 mb-4 text-white" />
                  <span className="text-2xl md:text-3xl font-semibold">Professor</span>
                </div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                onClick={() => handleSelectUserType('/login/instituicao')}
                className="w-full h-48 md:h-64 bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border-2 border-white/50 rounded-xl shadow-lg transition-all duration-300"
                variant="outline"
                size="lg"
              >
                <div className="flex flex-col items-center justify-center">
                  <Briefcase className="w-16 h-16 md:w-20 md:h-20 mb-4 text-white" />
                  <span className="text-2xl md:text-3xl font-semibold">Instituição</span>
                </div>
              </Button>
            </motion.div>
          </div>
           <p className="text-sm text-white/70 mt-12">© {new Date().getFullYear()} EasyAcademics. Todos os direitos reservados.</p>
        </motion.div>
      );
    };

    export default LoginPage;