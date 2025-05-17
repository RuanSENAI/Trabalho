
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Search, Tag } from 'lucide-react';
    import { Input } from "@/components/ui/input"; // Assume Input exists
    import { Badge } from "@/components/ui/badge"; // Assume Badge exists

    const exploreItems = [
      { id: 1, type: 'article', title: 'Avanços em Nanotecnologia', user: 'Dr. Ricardo Almeida', image: 'https://images.unsplash.com/photo-1554475024-a9c288700429?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmFub3RlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60', tags: ['#ciência', '#nanotecnologia', '#pesquisa'] },
      { id: 2, type: 'video', title: 'Documentário: A História da Filosofia', user: 'Canal SaberProfundo', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGlzdG9yeSUyMG9mJTIwcGhpbG9zb3BoeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60', tags: ['#história', '#filosofia', '#documentário'] },
      { id: 3, type: 'project', title: 'App de Realidade Aumentada para Anatomia', user: 'Grupo Inovação Digital', image: 'https://images.unsplash.com/photo-1593349048475-b62145f509a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60', tags: ['#tecnologia', '#AR', '#medicina', '#projeto'] },
      { id: 4, type: 'image', title: 'Fotografia Microscópica de Células', user: 'BioArte Lab', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWljcm9zY29wZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60', tags: ['#biologia', '#microscopia', '#arte'] },
      { id: 5, type: 'discussion', title: 'Debate: O Futuro do Trabalho Remoto na Educação', user: 'Fórum Acadêmico', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlzY3Vzc2lvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60', tags: ['#educação', '#tecnologia', '#futuro'] },
      { id: 6, type: 'article', title: 'Impacto das Mudanças Climáticas na Amazônia', user: 'Dra. Helena Costa', image: 'https://images.unsplash.com/photo-1500332990286-31f7f0616376?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW1hem9uJTIwcmFpbmZvcmVzdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60', tags: ['#meioambiente', '#sustentabilidade', '#amazonia'] },
    ];

    const categories = ['Todos', 'Artigos', 'Vídeos', 'Projetos', 'Discussões', 'Ciência', 'Tecnologia', 'Humanas', 'Artes'];

    const ExploreCard = ({ item }) => (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
      >
        <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
          <img-replace src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-800 mb-1 truncate group-hover:text-green-600">{item.title}</h3>
          <p className="text-sm text-gray-500 mb-2">por {item.user}</p>
          <div className="flex flex-wrap gap-1">
            {item.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">{tag}</Badge>
            ))}
          </div>
        </div>
      </motion.div>
    );

    const ExplorePage = () => {
      const [searchTerm, setSearchTerm] = React.useState('');
      const [selectedCategory, setSelectedCategory] = React.useState('Todos');

      const filteredItems = exploreItems.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.user.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Todos' || item.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase().slice(0, -1))) || item.type.toLowerCase() === selectedCategory.toLowerCase().slice(0,-1);
        return matchesSearch && matchesCategory;
      });

      return (
        <div className="py-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Explorar Conteúdos</h1>
          
          <div className="mb-8 sticky top-16 bg-white py-4 z-10 shadow-sm">
            <div className="relative max-w-xl mx-auto mb-4">
              <Input 
                type="text" 
                placeholder="Buscar por título, autor, #tag..." 
                className="pl-10 pr-4 py-3 text-base border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <Badge 
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className={`cursor-pointer px-4 py-2 text-sm rounded-full transition-colors ${selectedCategory === category ? 'bg-green-600 text-white border-green-600' : 'text-gray-600 border-gray-300 hover:bg-green-100 hover:border-green-300'}`}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {filteredItems.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <ExploreCard key={item.id} item={item} />
              ))}
            </motion.div>
          ) : (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 mt-10 text-lg"
            >
              Nenhum conteúdo encontrado para "{searchTerm}" na categoria "{selectedCategory}". Tente outros termos ou categorias.
            </motion.p>
          )}
        </div>
      );
    };

    export default ExplorePage;
  