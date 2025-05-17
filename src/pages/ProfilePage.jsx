
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Edit3, Settings, LogOut } from 'lucide-react';
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
    import { Button } from '@/components/ui/button';
    import { useAuth } from '@/contexts/AuthContext'; // Assuming you have this

    const userProfile = {
      name: 'Carlos Alberto Souza',
      role: 'Estudante de Engenharia de Software',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      bio: 'Apaixonado por desenvolvimento de software, IA e novas tecnologias. Buscando sempre aprender e compartilhar conhecimento.',
      stats: [
        { label: 'Postagens', value: 28 },
        { label: 'Seguidores', value: 156 },
        { label: 'Seguindo', value: 78 },
      ],
      posts: [ // Example posts, ideally fetched
        { id: 1, type: 'image', thumbnailUrl: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60', alt: 'Código na tela' },
        { id: 2, type: 'text', title: 'Minhas reflexões sobre Clean Code', snippet: 'Escrever código limpo não é apenas...' },
        { id: 3, type: 'image', thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60', alt: 'Setup de trabalho' },
        { id: 4, type: 'link', title: 'Artigo interessante sobre Microserviços', url: 'https://example.com/microservices' },
        { id: 5, type: 'image', thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60', alt: 'Conceito de tecnologia' },
        { id: 6, type: 'text', title: 'Ideias para o projeto final', snippet: 'Estou pensando em usar React com Firebase...' },
      ]
    };

    const teacherProfile = {
      name: 'Prof. Dra. Elisa Bernardes',
      role: 'Professora de Biologia Celular',
      avatar: 'https://randomuser.me/api/portraits/women/48.jpg',
      bio: 'Doutora em Ciências Biológicas com foco em biologia molecular. Entusiasta da divulgação científica e metodologias ativas de ensino.',
      stats: [
        { label: 'Artigos', value: 12 },
        { label: 'Orientações', value: 35 },
        { label: 'Seguidores', value: 870 },
      ],
      posts: [
        { id: 1, type: 'image', thumbnailUrl: 'https://images.unsplash.com/photo-1532187643623-db673ead3aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2VsbCUyMGJpb2xvZ3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60', alt: 'Microscópio com célula' },
        { id: 2, type: 'text', title: 'Nova Publicação: Mitocôndrias e Envelhecimento', snippet: 'Nosso último artigo acaba de ser publicado na revista Nature...' },
        { id: 3, type: 'link', title: 'Vídeo Aula: Ciclo Celular', url: 'https://youtube.com/ciclocelular' },
      ]
    };
    
    const institutionProfile = {
      name: 'Universidade Federal Delta',
      role: 'Instituição de Ensino Superior',
      avatar: '/institution-logo-alt.png', // Placeholder, use a generic or uploaded logo
      bio: 'Promovendo excelência em ensino, pesquisa e extensão desde 1985. Comprometida com a inovação e o desenvolvimento social.',
      stats: [
        { label: 'Cursos', value: 52 },
        { label: 'Alunos', value: 12500 },
        { label: 'Publicações', value: 3200 },
      ],
      posts: [
        { id: 1, type: 'image', thumbnailUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dW5pdmVyc2l0eSUyMGNhbXB1c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=300&q=60', alt: 'Campus universitário' },
        { id: 2, type: 'text', title: 'Aviso: Inscrições Abertas para Vestibular 2025!', snippet: 'Não perca a chance de estudar conosco. Inscrições até 30/11.' },
        { id: 3, type: 'link', title: 'Conheça Nossos Programas de Intercâmbio', url: 'https://ufdelta.edu/intercambio' },
      ]
    };


    const PostThumbnail = ({ post, index }) => (
      <motion.div 
        className="aspect-square bg-gray-200 rounded-md overflow-hidden relative group cursor-pointer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
      >
        {post.type === 'image' && <img-replace src={post.thumbnailUrl} alt={post.alt} className="w-full h-full object-cover" />}
        {(post.type === 'text' || post.type === 'link') && (
          <div className="p-2 flex flex-col justify-center items-center h-full bg-green-50">
            <p className="text-xs font-semibold text-green-700 text-center">{post.title}</p>
            {post.snippet && <p className="text-xxs text-green-600 mt-1 text-center line-clamp-2">{post.snippet}</p>}
          </div>
        )}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <p className="text-white text-sm font-semibold">Ver Post</p>
        </div>
      </motion.div>
    );

    const ProfilePage = () => {
      const { userType, logout } = useAuth();
      
      let currentProfile;
      if (userType === 'aluno') currentProfile = userProfile;
      else if (userType === 'professor') currentProfile = teacherProfile;
      else if (userType === 'instituicao') currentProfile = institutionProfile;
      else currentProfile = userProfile; // Default

      return (
        <motion.div 
          className="max-w-3xl mx-auto py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-200">
            <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8">
              <Avatar className="w-24 h-24 sm:w-32 sm:h-32 text-4xl border-4 border-green-200 shadow-md">
                <AvatarImage src={currentProfile.avatar} alt={currentProfile.name} />
                <AvatarFallback className="bg-green-100 text-green-600">{currentProfile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-800">{currentProfile.name}</h1>
                <p className="text-md text-green-600 font-medium">{currentProfile.role}</p>
                <p className="text-sm text-gray-600 mt-2 max-w-md">{currentProfile.bio}</p>
                <div className="mt-4 flex justify-center sm:justify-start space-x-2">
                  <Button variant="outline" size="sm" className="text-green-600 border-green-500 hover:bg-green-50">
                    <Edit3 className="w-4 h-4 mr-2" /> Editar Perfil
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-green-600">
                    <Settings className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center mb-8 py-4 border-y border-gray-200">
              {currentProfile.stats.map(stat => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-green-600">{stat.value}</p>
                  <p className="text-xs text-gray-500 uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Minhas Postagens</h2>
              {currentProfile.posts && currentProfile.posts.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
                  {currentProfile.posts.map((post, index) => <PostThumbnail key={post.id} post={post} index={index} />)}
                </div>
              ) : (
                <p className="text-gray-500">Nenhuma postagem ainda.</p>
              )}
            </div>

            <Button onClick={logout} variant="destructive" className="w-full mt-8">
              <LogOut className="w-4 h-4 mr-2" /> Sair da Conta
            </Button>
          </div>
        </motion.div>
      );
    };

    export default ProfilePage;
  