
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Heart, MessageSquare, Repeat2, UserPlus, Award, BellRing } from 'lucide-react';
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

    const notifications = [
      { id: 1, type: 'like', user: 'Ana Clara', userAvatar: 'https://randomuser.me/api/portraits/women/23.jpg', content: 'curtiu sua postagem: "Resultados do Projeto X".', time: '5m atrás', icon: Heart, iconColor: 'text-red-500' },
      { id: 2, type: 'comment', user: 'Bruno Silva', userAvatar: 'https://randomuser.me/api/portraits/men/45.jpg', content: 'comentou na sua postagem: "Alguma sugestão para o artigo?"', time: '15m atrás', icon: MessageSquare, iconColor: 'text-blue-500' },
      { id: 3, type: 'repost', user: 'Prof. Martins', userAvatar: 'https://randomuser.me/api/portraits/men/67.jpg', content: 'repostou sua descoberta sobre IA.', time: '1h atrás', icon: Repeat2, iconColor: 'text-green-500' },
      { id: 4, type: 'follow', user: 'Mariana Lopes', userAvatar: 'https://randomuser.me/api/portraits/women/88.jpg', content: 'começou a seguir você.', time: '3h atrás', icon: UserPlus, iconColor: 'text-purple-500' },
      { id: 5, type: 'achievement', user: 'Sistema EasyAcademics', userAvatar: '/vite.svg', content: 'Você desbloqueou a conquista "Colaborador Ativo"!', time: '1d atrás', icon: Award, iconColor: 'text-yellow-500' },
      { id: 6, type: 'mention', user: 'Carlos Andrade', userAvatar: 'https://randomuser.me/api/portraits/men/12.jpg', content: 'mencionou você em um comentário: "@SeuNome Confira isso!"', time: '2d atrás', icon: BellRing, iconColor: 'text-indigo-500' },
    ];

    const NotificationItem = ({ notification, index }) => {
      const IconComponent = notification.icon;
      return (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex items-start p-4 bg-white hover:bg-gray-50 rounded-lg shadow-sm border border-gray-200 transition-colors duration-200"
        >
          <Avatar className="h-10 w-10 mr-4">
            <AvatarImage src={notification.userAvatar} alt={notification.user} />
            <AvatarFallback>{notification.user.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-gray-800">{notification.user}</span> {notification.content}
            </p>
            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
          </div>
          <IconComponent className={`h-6 w-6 ml-4 flex-shrink-0 ${notification.iconColor}`} />
        </motion.div>
      );
    };

    const NotificationsPage = () => {
      return (
        <div className="max-w-2xl mx-auto py-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Notificações</h1>
          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map((notif, index) => (
                <NotificationItem key={notif.id} notification={notif} index={index} />
              ))}
            </div>
          ) : (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 mt-10 text-lg"
            >
              Você não tem nenhuma notificação nova.
            </motion.p>
          )}
        </div>
      );
    };

    export default NotificationsPage;
  