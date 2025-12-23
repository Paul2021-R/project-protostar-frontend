'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Plus, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5859';

// Types
interface Message {
  text: string;
  type: 'bot' | 'user';
  timestamp: string;
  attachments?: {
    title: string;
    content: string;
    url: string;
    timestamp: string;
  }[];
}

interface Session {
  id: string;
  created_at: string;
  last_updated: string;
  url: string;
  messages: Message[];
}

const MAX_SESSIONS_PER_DAY = 3;
const EXPIRATION_DAYS = 7;

export default function ChatbotWidget({
  isPreview = false,
}: {
  isPreview?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showSessionList, setShowSessionList] = useState(false);
  const [showLimitOverlay, setShowLimitOverlay] = useState(false);
  const [attachments, setAttachments] = useState<
    { title: string; content: string; url: string; timestamp: string }[]
  >([]);

  // Speech Bubble State
  const [currentMessage, setCurrentMessage] = useState('');
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);
  const [isSending, setIsSending] = useState(false); // Double submit prevention
  const [serverUUID, setServerUUID] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const [isWaitingForRetry, setIsWaitingForRetry] = useState(false);
  const [retryCountdown, setRetryCountdown] = useState(0);

  const PROMOTIONAL_MESSAGES = [
    '글에 대해 궁금 하신게 있으세요? 🤗',
    '이력과 경력에 대해 궁금한 것은 저에게 물어봐 주세요! 😎',
    '저는 커리어 관리 Agentic AI 비서 Protostar 입니다. 😄',
  ];

  // --- Effects ---
  useEffect(() => {
    // Bubble Animation Loop
    let timeoutId: NodeJS.Timeout;

    const showBubble = () => {
      // Pick random message
      const randomMsg =
        PROMOTIONAL_MESSAGES[
          Math.floor(Math.random() * PROMOTIONAL_MESSAGES.length)
        ];
      setCurrentMessage(randomMsg);
      setIsBubbleVisible(true);

      // Hide after 4 seconds
      timeoutId = setTimeout(() => {
        setIsBubbleVisible(false);
        // Show again after 3-6 seconds (random)
        const nextDelay = 3000 + Math.random() * 3000;
        timeoutId = setTimeout(showBubble, nextDelay);
      }, 4000);
    };

    // Initial start delay
    timeoutId = setTimeout(showBubble, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const MAX_MESSAGES_PER_SESSION = 10;

  // --- Helpers ---
  const generateSessionId = () => {
    const timestamp = Date.now();
    const cleanPath =
      typeof window !== 'undefined'
        ? window.location.pathname.replace(/[^a-zA-Z0-9]/g, '').substring(0, 10)
        : 'path';
    return `sess_${timestamp}_${cleanPath}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const isSessionWritable = (session: Session) => {
    const today = new Date().toDateString();
    const isToday = new Date(session.created_at).toDateString() === today;
    const userMsgCount = session.messages.filter(
      (m) => m.type === 'user',
    ).length;
    return isToday && userMsgCount < MAX_MESSAGES_PER_SESSION;
  };

  const isSessionExpired = (lastUpdated: string) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - new Date(lastUpdated).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > EXPIRATION_DAYS;
  };

  const getTodaySessionCount = (currentSessions: Session[]) => {
    const today = new Date().toDateString();
    return currentSessions.filter(
      (s) => new Date(s.created_at).toDateString() === today,
    ).length;
  };

  // --- Effects ---
  useEffect(() => {
    // Load sessions from localStorage
    const savedSessions = localStorage.getItem('protostar_sessions');
    let loadedSessions: Session[] = savedSessions
      ? JSON.parse(savedSessions)
      : [];

    // Filter expired
    loadedSessions = loadedSessions.filter(
      (s) => !isSessionExpired(s.last_updated),
    );
    setSessions(loadedSessions);

    // Initial Active Session
    if (loadedSessions.length > 0) {
      // Sort by last updated desc
      loadedSessions.sort(
        (a, b) =>
          new Date(b.last_updated).getTime() -
          new Date(a.last_updated).getTime(),
      );
      setActiveSessionId(loadedSessions[0].id);
      setMessages(loadedSessions[0].messages);
    }

    // Load UUID from localStorage
    const savedUUID = localStorage.getItem('protostar_chat_uuid');
    if (savedUUID) {
      setServerUUID(savedUUID);
    }
  }, []);

  useEffect(() => {
    // SSE Connection Management
    if (!activeSessionId) return;

    // cleanup previous
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    // Build URL
    const baseUrl = `${API_URL}/api/v1/chat/stream/${activeSessionId}`;
    const url = serverUUID ? `${baseUrl}?uuid=${serverUUID}` : baseUrl;

    const es = new EventSource(url);
    eventSourceRef.current = es;

    es.onopen = () => {
      console.log('SSE Connected');
    };

    es.onmessage = (event) => {
      // Default message handler (token streaming usually comes here or custom event)
      try {
        const data = JSON.parse(event.data);
        // Handle standard token stream if sending JSON
        // However, usually tokens are raw text or specific format.
        // Adapting based on backend "messageStream" which sends payload.
        // If payload is string token:
        if (typeof data === 'string') {
          setMessages((prev) => {
            const lastMsg = prev[prev.length - 1];
            if (lastMsg && lastMsg.type === 'bot') {
              // Update last bot message
              const updatedLast = { ...lastMsg, text: lastMsg.text + data };
              return [...prev.slice(0, -1), updatedLast];
            } else {
              // New bot message start (should ideally trigger on first token)
              return [
                ...prev,
                {
                  text: data,
                  type: 'bot',
                  timestamp: new Date().toISOString(),
                },
              ];
            }
          });
        }
      } catch (e) {
        // If raw text
        setMessages((prev) => {
          const lastMsg = prev[prev.length - 1];
          if (lastMsg && lastMsg.type === 'bot') {
            return [
              ...prev.slice(0, -1),
              { ...lastMsg, text: lastMsg.text + event.data },
            ];
          } else {
            return [
              ...prev,
              {
                text: event.data,
                type: 'bot',
                timestamp: new Date().toISOString(),
              },
            ];
          }
        });
      }
    };

    // Custom Events
    es.addEventListener('init', (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.uuid) {
        setServerUUID(data.uuid);
        localStorage.setItem('protostar_chat_uuid', data.uuid);
      }
    });

    es.addEventListener('done', () => {
      setIsSending(false);
    });

    es.onerror = (err) => {
      console.error('SSE Error', err);
      // es.close(); // Optional: close on error or let it retry
    };

    return () => {
      es.close();
    };
  }, [activeSessionId, serverUUID]);

  useEffect(() => {
    // Auto-save sessions whenever they change
    if (sessions.length > 0) {
      localStorage.setItem('protostar_sessions', JSON.stringify(sessions));
    }
  }, [sessions]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const createNewSession = () => {
    if (getTodaySessionCount(sessions) >= MAX_SESSIONS_PER_DAY) {
      setShowLimitOverlay(true);
      return null;
    }

    const newSession: Session = {
      id: generateSessionId(),
      created_at: new Date().toISOString(),
      last_updated: new Date().toISOString(),
      url: window.location.pathname,
      messages: [
        {
          text: '안녕하세요! Paul 님의 커리어 AI 비서 Protostar 입니다. 무엇을 도와드릴까요?',
          type: 'bot',
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const updatedSessions = [...sessions, newSession];
    setSessions(updatedSessions);
    setActiveSessionId(newSession.id);
    setMessages(newSession.messages);
    return newSession.id;
  };

  const handleToggleChat = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState && !activeSessionId) {
      // Try to create or get latest
      if (sessions.length === 0) {
        createNewSession();
      } else {
        // Should have been set by useEffect, but ensure
        setActiveSessionId(sessions[0].id);
        setMessages(sessions[0].messages);
      }
    }
  };

  const sendMessageToBackend = async (payload: any) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.status === 429) {
        // Rate Limit
        setIsWaitingForRetry(true);
        setRetryCountdown(10);

        // Countdown Timer
        const timer = setInterval(() => {
          setRetryCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              setIsWaitingForRetry(false);
              sendMessageToBackend(payload); // Retry with original payload
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        return; // Keep isSending true
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Success - SSE will handle the rest (streaming response)
      // Add pending bot bubble?
      setMessages((prev) => [
        ...prev,
        { text: '', type: 'bot', timestamp: new Date().toISOString() },
      ]);
    } catch (error) {
      console.error('Failed to send message:', error);
      setIsSending(false);
      setMessages((prev) => [
        ...prev,
        {
          text: 'Error: Failed to send message.',
          type: 'bot',
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  };

  const handleSendMessage = async () => {
    const activeSession = sessions.find((s) => s.id === activeSessionId);
    if (
      isSending ||
      (!inputValue.trim() && attachments.length === 0) ||
      !activeSession ||
      !isSessionWritable(activeSession) ||
      !serverUUID
    )
      return;

    setIsSending(true);

    const userText = inputValue;
    const newMessage: Message = {
      text: userText,
      type: 'user',
      timestamp: new Date().toISOString(),
      attachments: attachments.length > 0 ? [...attachments] : undefined,
    };

    // Optimistic Update
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setAttachments([]); // Clear attachments immediately

    // Update session
    const updatedSessions = sessions.map((s) => {
      if (s.id === activeSessionId) {
        return {
          ...s,
          messages: updatedMessages,
          last_updated: new Date().toISOString(),
        };
      }
      return s;
    });
    setSessions(updatedSessions);

    // Prepare Payload
    const payload = {
      sessionId: activeSessionId,
      uuid: serverUUID,
      mode:
        newMessage.attachments && newMessage.attachments.length > 0
          ? 'page_context'
          : 'general',
      content: userText,
      context:
        newMessage.attachments && newMessage.attachments.length > 0
          ? newMessage.attachments[0].content
          : undefined,
    };

    sendMessageToBackend(payload);
  };

  const handleAddAttachment = () => {
    // 1. Prevent root path attachment
    if (window.location.pathname === '/' || window.location.pathname === '') {
      alert('메인 페이지는 첨부할 수 없습니다. 세부 페이지에서 시도해주세요.');
      return;
    }

    const title = document.title;
    if (attachments.some((a) => a.title === title)) return;

    // 2. Extract Body Text Only (Clean HTML)
    const clone = document.body.cloneNode(true) as HTMLElement;

    // Remove scripts, styles, etc.
    const scripts = clone.getElementsByTagName('script');
    while (scripts[0]) scripts[0].parentNode?.removeChild(scripts[0]);

    const styles = clone.getElementsByTagName('style');
    while (styles[0]) styles[0].parentNode?.removeChild(styles[0]);

    const noscripts = clone.getElementsByTagName('noscript');
    while (noscripts[0]) noscripts[0].parentNode?.removeChild(noscripts[0]);

    const iframes = clone.getElementsByTagName('iframe');
    while (iframes[0]) iframes[0].parentNode?.removeChild(iframes[0]);

    // Get cleaned HTML
    const content = clone.innerHTML;

    const newAtt = {
      title,
      content: content.substring(0, 50000), // Limit size - Increased for HTML
      url: window.location.href,
      timestamp: new Date().toISOString(),
    };
    setAttachments([...attachments, newAtt]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const headerTitle = React.useMemo(() => {
    if (!activeSessionId) return 'Protostar';
    const session = sessions.find((s) => s.id === activeSessionId);
    // If user sent messages, show URL, else Protostar
    const hasUserMsg = session?.messages.some((m) => m.type === 'user');
    return hasUserMsg ? session?.url : 'Protostar';
  }, [activeSessionId, sessions]);

  // Derived state for locking
  const activeSessionCheck = sessions.find((s) => s.id === activeSessionId);
  const isLocked = activeSessionCheck
    ? !isSessionWritable(activeSessionCheck)
    : false;

  // Logic for positioning classes based on isPreview
  const positionClasses = isPreview
    ? 'absolute bottom-6 right-6'
    : 'fixed bottom-12 left-16';

  const bubblePositionClasses = isPreview
    ? 'absolute bottom-24 right-6'
    : 'fixed bottom-32 left-16';

  const windowPositionClasses = isPreview
    ? 'absolute bottom-20 right-6'
    : 'fixed bottom-28 left-16';

  return (
    <>
      {/* Floating Icon */}
      <div
        onClick={handleToggleChat}
        className={`${positionClasses} w-[51px] h-[51px] rounded-full bg-white shadow-lg cursor-pointer flex items-center justify-center transition-transform hover:scale-110 z-50 border-2 border-white overflow-hidden ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        {/* Icon Image */}
        <img
          src="/assets/images/project-protostar/protostar_icon.png"
          alt="Protostar Chat"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Promotional Bubble */}
      {!isOpen && (
        <div
          className={`${bubblePositionClasses} bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-100 transition-all duration-500 z-40 max-w-[200px] text-xs text-gray-600 font-medium pointer-events-none origin-bottom-${isPreview ? 'right' : 'left'}
          ${isBubbleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
        >
          {currentMessage}
          {/* Triangle pointer */}
          <div
            className={`absolute -bottom-1.5 ${isPreview ? 'right-6 border-b border-l' : 'left-6 border-b border-r'} w-3 h-3 bg-white border-gray-100 transform rotate-45`}
          ></div>
        </div>
      )}

      {/* Chat Window */}
      <div
        className={`${windowPositionClasses} w-[380px] h-[600px] bg-white rounded-2xl shadow-2xl border flex flex-col transition-all duration-300 transform z-50 overflow-hidden ${isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible'}`}
      >
        {/* Header */}
        <div className="bg-gray-50 p-4 border-b flex justify-between items-center text-gray-800 font-semibold select-none">
          <div className="flex items-center gap-3 overflow-hidden">
            <Menu
              className="w-5 h-5 cursor-pointer hover:text-black text-gray-500"
              onClick={() => setShowSessionList(!showSessionList)}
            />
            <Plus
              className="w-5 h-5 cursor-pointer hover:text-black text-gray-500"
              onClick={() => {
                const newId = createNewSession();
                if (newId) setShowSessionList(false); // Close list if open
              }}
            />
            <span className="truncate max-w-[150px]">{headerTitle}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center">
              <User className="w-3 h-3 text-gray-600" />
            </div>
            <X
              className="w-5 h-5 cursor-pointer hover:text-black text-gray-500"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-hidden relative flex flex-col bg-gray-50/50">
          {/* Session List Overlay */}
          <div
            className={`absolute inset-0 bg-white z-20 transition-transform duration-300 ${showSessionList ? 'translate-x-0' : '-translate-x-full'} p-4 overflow-y-auto`}
          >
            <h4 className="font-bold mb-4">Chat List</h4>
            <div className="space-y-2">
              {sessions
                .sort(
                  (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime(),
                )
                .map((session) => (
                  <div
                    key={session.id}
                    onClick={() => {
                      setActiveSessionId(session.id);
                      setMessages(session.messages);
                      setShowSessionList(false);
                    }}
                    className={`p-3 border rounded-lg cursor-pointer hover:shadow-sm transition-all ${session.id === activeSessionId ? 'border-blue-500 bg-blue-50' : 'bg-white'}`}
                  >
                    <div className="text-xs text-gray-400 mb-1">
                      {new Date(session.created_at).toLocaleString()}
                    </div>
                    <div className="font-semibold text-sm truncate">
                      {session.url}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Limit Overlay */}
          {showLimitOverlay && (
            <div className="absolute inset-0 bg-white/95 z-30 flex flex-col items-center justify-center p-6 text-center">
              <h3 className="text-xl font-bold mb-2">한도 초과</h3>
              <p className="text-gray-500 text-sm mb-6">
                Protostar 서비스에 회원가입 하시면
                <br />더 많은 질문이 가능합니다.
              </p>
              <Button
                className="w-full mb-2"
                onClick={() =>
                  window.open('https://service-protostar.ddns.net/', '_blank')
                }
              >
                등록하러 가기
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => setShowLimitOverlay(false)}
              >
                취소
              </Button>
            </div>
          )}

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-sm ${msg.type === 'user' ? 'bg-blue-100 text-blue-900 rounded-br-none' : 'bg-white border text-gray-700 rounded-bl-none'}`}
                >
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="mb-2 space-y-1">
                      {msg.attachments.map((att, i) => (
                        <div
                          key={i}
                          className="bg-white/50 text-xs px-2 py-1 rounded border flex items-center gap-1"
                        >
                          <span>📄</span> {att.title}
                        </div>
                      ))}
                    </div>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t">
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {attachments.map((att, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-xs"
                  >
                    <span>📄 {att.title.substring(0, 15)}...</span>
                    <button
                      onClick={() =>
                        setAttachments(attachments.filter((a) => a !== att))
                      }
                      className="hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={handleAddAttachment}
                disabled={isLocked || isSending}
                className={`p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors ${isLocked || isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
                title="Add Page Context"
              >
                <Plus size={20} />
              </button>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={
                  isLocked
                    ? '대화가 종료되었습니다 (제한 도달)'
                    : 'Type a message...'
                }
                disabled={isLocked || isSending}
                className="rounded-full bg-gray-50 border-gray-200 focus-visible:ring-1"
              />
              {isWaitingForRetry ? (
                <div className="relative w-[40px] h-[40px] flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-gray-200 rounded-full"></div>
                  <div className="absolute inset-0 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs text-blue-500 font-bold z-10">
                    {retryCountdown}
                  </span>
                </div>
              ) : (
                <button
                  onClick={handleSendMessage}
                  disabled={
                    (!inputValue.trim() && attachments.length === 0) ||
                    isLocked ||
                    isSending
                  }
                  className={`p-2 transition-colors ${(!inputValue.trim() && attachments.length === 0) || isLocked || isSending ? 'text-gray-300' : 'text-blue-500 hover:scale-110'}`}
                >
                  {isSending ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
