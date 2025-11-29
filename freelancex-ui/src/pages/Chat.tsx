import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { type ChatConversation, type Message } from '../types';
import { Send, User } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

export default function Chat() {
  const { user } = useAuth();
  const location = useLocation();
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [activeChat, setActiveChat] = useState<ChatConversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load Conversations on Mount & Handle Navigation State
  useEffect(() => {
    api.get('/chat/conversations')
      .then(res => {
        const fetchedChats = res.data;
        setConversations(fetchedChats);

        // Check if we navigated here with a specific chat in mind
        if (location.state) {
          const { projectId, otherUserId, otherUserName, projectTitle } = location.state as any;
          
          // Check if this chat already exists in our history
          const existingChat = fetchedChats.find((c: ChatConversation) => 
            c.projectId === projectId && c.otherUserId === otherUserId
          );

          if (existingChat) {
            setActiveChat(existingChat);
          } else {
            // New conversation starter
            const newChat: ChatConversation = {
              projectId,
              projectTitle,
              otherUserId,
              otherUserName,
              lastMessage: 'Start a conversation...'
            };
            // Add to list optimistically so it appears in sidebar
            setConversations(prev => [newChat, ...prev]);
            setActiveChat(newChat);
          }
        }
      })
      .catch(err => console.error("Failed to load chats", err));
  }, []); // Run once on mount

  // Load Messages when Active Chat changes & poll for updates
  useEffect(() => {
    if (activeChat) {
      const fetchMessages = () => {
        // If it's a brand new chat (phantom), it might not have history yet, 
        // but the API handles empty lists gracefully.
        api.get(`/chat/history/${activeChat.projectId}/${activeChat.otherUserId}`)
          .then(res => setMessages(res.data))
          .catch(err => console.error("Failed to load history", err));
      };

      fetchMessages();
      const interval = setInterval(fetchMessages, 5000); // Poll every 5s
      return () => clearInterval(interval);
    }
  }, [activeChat]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    try {
      const payload = {
        projectId: activeChat.projectId,
        receiverId: activeChat.otherUserId,
        messageText: newMessage
      };
      
      const res = await api.post('/chat/send', payload);
      setMessages([...messages, res.data]);
      setNewMessage('');
      
      // Update last message in sidebar
      setConversations(prev => prev.map(c => 
        (c.projectId === activeChat.projectId && c.otherUserId === activeChat.otherUserId)
          ? { ...c, lastMessage: payload.messageText }
          : c
      ));

    } catch (error) {
      console.error("Failed to send", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 h-[calc(100vh-80px)]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        
        {/* Sidebar */}
        <GlassCard className="h-full flex flex-col p-4 overflow-hidden">
          <h2 className="text-xl font-bold mb-4 px-2 text-white">Messages</h2>
          <div className="overflow-y-auto flex-1 space-y-2 pr-2 custom-scrollbar">
            {conversations.map(chat => (
              <div
                key={`${chat.projectId}-${chat.otherUserId}`}
                onClick={() => setActiveChat(chat)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  activeChat?.projectId === chat.projectId && activeChat?.otherUserId === chat.otherUserId
                    ? 'bg-primary/20 border border-primary/30' 
                    : 'bg-white/5 hover:bg-white/10 border border-transparent'
                }`}
              >
                <div className="font-semibold text-sm text-white">{chat.otherUserName}</div>
                <div className="text-xs text-blue-400 mb-1">{chat.projectTitle}</div>
                <div className="text-xs text-gray-400 truncate">{chat.lastMessage}</div>
              </div>
            ))}
            {conversations.length === 0 && (
              <div className="text-center text-gray-500 mt-10 text-sm">No active conversations</div>
            )}
          </div>
        </GlassCard>

        {/* Chat Area */}
        <GlassCard className="md:col-span-2 h-full flex flex-col p-0 overflow-hidden relative">
          {activeChat ? (
            <>
              <div className="p-4 border-b border-white/10 bg-black/20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                   <User size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{activeChat.otherUserName}</h3>
                  <span className="text-xs text-gray-400">{activeChat.projectTitle}</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/10 custom-scrollbar">
                {messages.length === 0 && (
                   <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                      Start the conversation...
                   </div>
                )}
                {messages.map((msg) => {
                  const isMe = msg.senderId === user?.userId;
                  return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] rounded-2xl p-3 text-sm ${
                        isMe 
                          ? 'bg-primary text-white rounded-br-none' 
                          : 'bg-white/10 text-gray-200 rounded-bl-none'
                      }`}>
                        {msg.messageText}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-black/20 flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-black/30 border border-white/10 rounded-full px-4 py-2 text-white outline-none focus:border-primary"
                />
                <button type="submit" className="p-2 bg-primary rounded-full hover:bg-blue-600 text-white transition-colors">
                  <Send size={20} />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 flex-col gap-2">
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}