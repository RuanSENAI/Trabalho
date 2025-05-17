
    import React, { useState, useRef } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Image as ImageIcon, Link2, Type, Send, X } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Textarea } from '@/components/ui/textarea';
    import { Input } from '@/components/ui/input';
    import { useToast } from '@/components/ui/use-toast';

    const PostPage = () => {
      const [postType, setPostType] = useState('text'); // 'text', 'image', 'link'
      const [text, setText] = useState('');
      const [imageUrl, setImageUrl] = useState('');
      const [linkUrl, setLinkUrl] = useState('');
      const [imagePreview, setImagePreview] = useState(null);
      const imageInputRef = useRef(null);
      const { toast } = useToast();

      const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setImageUrl(file.name); 
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

      const handlePublish = () => {
        if (postType === 'text' && !text.trim()) {
          toast({ title: "Erro", description: "Por favor, escreva algo para postar.", variant: "destructive" });
          return;
        }
        if (postType === 'image' && !imageUrl) {
          toast({ title: "Erro", description: "Por favor, selecione uma imagem.", variant: "destructive" });
          return;
        }
        if (postType === 'link' && !linkUrl.trim()) {
          toast({ title: "Erro", description: "Por favor, insira um link.", variant: "destructive" });
          return;
        }
        
        console.log('Publicando:', { postType, text, imageUrl, linkUrl });
        toast({ title: "Sucesso!", description: "Sua postagem foi publicada.", className: "bg-green-500 text-white" });
        
        setText('');
        setImageUrl('');
        setLinkUrl('');
        setImagePreview(null);
        if(imageInputRef.current) imageInputRef.current.value = "";
        setPostType('text');
      };

      const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      };

      return (
        <motion.div 
          className="max-w-xl mx-auto py-6"
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Criar Nova Postagem</h1>

          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-200">
            <div className="flex justify-center space-x-2 sm:space-x-4 mb-6">
              {[
                { type: 'text', icon: Type, label: 'Texto' },
                { type: 'image', icon: ImageIcon, label: 'Imagem' },
                { type: 'link', icon: Link2, label: 'Link' },
              ].map((item) => (
                <Button
                  key={item.type}
                  variant={postType === item.type ? 'default' : 'outline'}
                  onClick={() => setPostType(item.type)}
                  className={`flex-1 sm:flex-none sm:px-6 py-3 rounded-lg transition-all duration-200 ${postType === item.type ? 'bg-green-600 hover:bg-green-700 text-white' : 'text-gray-600 border-gray-300 hover:bg-gray-100'}`}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.label}
                </Button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {postType === 'text' && (
                <motion.div
                  key="text-input"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Textarea
                    placeholder="O que você está pensando?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[150px] text-base p-3 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
                  />
                </motion.div>
              )}

              {postType === 'image' && (
                <motion.div
                  key="image-input"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={imageInputRef}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200 cursor-pointer border-gray-300 rounded-lg"
                  />
                  {imagePreview && (
                    <div className="relative group aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <img-replace src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                       <Button 
                        variant="destructive" 
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => { setImagePreview(null); setImageUrl(''); if(imageInputRef.current) imageInputRef.current.value = ""; }}
                       >
                         <X className="h-4 w-4" />
                       </Button>
                    </div>
                  )}
                  <Textarea
                    placeholder="Adicione uma legenda (opcional)..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[80px] text-base p-3 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
                  />
                </motion.div>
              )}

              {postType === 'link' && (
                <motion.div
                  key="link-input"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <Input
                    type="url"
                    placeholder="https://exemplo.com"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="w-full text-base p-3 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
                  />
                   <Textarea
                    placeholder="Adicione um comentário (opcional)..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[80px] text-base p-3 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            <Button
              onClick={handlePublish}
              className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white text-lg py-3 rounded-lg font-semibold transition-colors duration-200"
              size="lg"
            >
              <Send className="w-5 h-5 mr-2" />
              Publicar
            </Button>
          </div>
        </motion.div>
      );
    };

    export default PostPage;
  