
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Pin, MessageSquare, Heart, Repeat2, Send, Bookmark } from 'lucide-react';
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
    import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Assume Card exists

    const pinnedPost = {
      id: 'pinned-1',
      isPinned: true,
      institution: 'Universidade Central',
      avatar: '/institution-logo.png', // Placeholder, replace with actual
      title: 'Aviso Importante: Matrículas Abertas!',
      content: 'As matrículas para o próximo semestre já estão abertas. Não perca o prazo! Visite o portal do aluno para mais informações e garanta sua vaga. Temos novos cursos e bolsas disponíveis.',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      timestamp: '2 horas atrás',
      likes: 120,
      comments: 15,
    };

    const feedPosts = [
      {
        id: 'post-1',
        user: 'Prof. Ana Silva',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        content: 'Nova descoberta sobre física quântica publicada hoje! Alunos, confiram o artigo no link. #física #ciência',
        image: 'https://images.unsplash.com/photo-1582719471384-894fbb165179?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cXVhbnR1bSUyMHBoeXNpY3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
        timestamp: '30 minutos atrás',
        likes: 45,
        comments: 8,
      },
      {
        id: 'post-2',
        user: 'Carlos Mendes (Aluno)',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        content: 'Grupo de estudos para a prova de Cálculo II hoje às 18h na biblioteca. Quem topa? 🤓',
        timestamp: '1 hora atrás',
        likes: 22,
        comments: 5,
      },
      {
        id: 'post-3',
        user: 'Mariana Costa (Aluna)',
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
        content: 'Incrível palestra sobre Inteligência Artificial que assisti hoje! Muitas ideias para o TCC. Recomendo a todos os interessados.',
        image: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
        timestamp: '4 horas atrás',
        likes: 78,
        comments: 12,
      },
    ];

    const PostCard = ({ post }) => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`bg-white rounded-xl shadow-lg overflow-hidden mb-6 ${post.isPinned ? 'border-2 border-green-300 ring-4 ring-green-300/30' : 'border border-gray-200'}`}
      >
        <CardHeader className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.avatar} alt={post.user || post.institution} />
              <AvatarFallback>{(post.user || post.institution)?.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-gray-800">{post.user || post.institution}</p>
              <p className="text-xs text-gray-500">{post.timestamp}</p>
            </div>
            {post.isPinned && <Pin className="ml-auto h-5 w-5 text-green-500" />}
          </div>
          {post.isPinned && <CardTitle className="text-lg font-bold text-green-600 mt-2">{post.title}</CardTitle>}
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-gray-700 mb-3 leading-relaxed">{post.content}</p>
          {post.image && (
            <div className="rounded-lg overflow-hidden aspect-video bg-gray-100">
              <img-replace src={post.image} alt={`Post by ${post.user || post.institution}`} className="w-full h-full object-cover" />
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 border-t border-gray-100 flex justify-between items-center">
          <div className="flex space-x-4 text-gray-500">
            <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
              <Heart className="h-5 w-5" /> <span>{post.likes}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
              <MessageSquare className="h-5 w-5" /> <span>{post.comments}</span>
            </button>
            <button className="hover:text-green-500 transition-colors">
              <Repeat2 className="h-5 w-5" />
            </button>
          </div>
          <div className="flex space-x-2">
            <button className="hover:text-indigo-500 transition-colors">
                <Bookmark className="h-5 w-5" />
            </button>
            <button className="hover:text-teal-500 transition-colors">
                <Send className="h-5 w-5" />
            </button>
          </div>
        </CardFooter>
      </motion.div>
    );

    const FeedPage = () => {
      return (
        <div className="max-w-2xl mx-auto py-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Feed de Notícias</h1>
          
          {pinnedPost && <PostCard post={pinnedPost} />}
          
          {feedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      );
    };

    export default FeedPage;
  