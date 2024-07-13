"use client"
import { useEffect } from 'react';

const ChatBot: React.FC = () => {
  useEffect(() => {
    const loadVoiceflowChat = () => {
      if ((window as any).voiceflow) {
        (window as any).voiceflow.chat.load({
          verify: { projectID: '669050a77a37551a6557543c' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: '669050a77a37551a6557543d',
        });
      } else {
        console.warn('Voiceflow SDK not loaded yet.');
      }
    };

    const appendScriptToHead = () => {
      const head = document.getElementsByTagName('head')[0];
      if (!head) {
        console.warn('Head element not found. Cannot append script.');
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
      script.type = 'text/javascript';
      script.async = true;
      script.onload = loadVoiceflowChat;

      head.appendChild(script);

      return () => {
        head.removeChild(script);
      };
    };

    if (!(window as any).voiceflow) {
      appendScriptToHead();
    } else {
      loadVoiceflowChat();
    }
  }, []);

  return null;
};

export default ChatBot;
