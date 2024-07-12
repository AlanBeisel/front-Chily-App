/*"use client"
import { useEffect } from 'react';

const ChatBot: React.FC = () => {
  useEffect(() => {
    const loadVoiceflowChat = () => {
      if (window.voiceflow) {
        window.voiceflow.chat.load({
          verify: { projectID: '669050a77a37551a6557543c' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: '669050a77a37551a6557543d',
        });
      } else {
        console.warn('Voiceflow SDK not loaded yet.');
      }
    };

    if (!window.voiceflow) {
      const script = document.createElement('script');
      script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
      script.type = 'text/javascript';
      script.async = true;

      script.onload = loadVoiceflowChat;

      document.getElementsByTagName('head')[0].appendChild(script);

      return () => {
        document.getElementsByTagName('head')[0].removeChild(script);
      };
    } else {
      loadVoiceflowChat();
    }
  }, []);

  return null;
};

export default ChatBot;*/
