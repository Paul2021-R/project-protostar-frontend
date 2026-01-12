(function () {
    // 1. Inject Styles
    const style = document.createElement('style');
    style.textContent = `
    .protostar-icon {
      transition: 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      width: 51px;
      height: 51px;
      border-radius: 50%;
      left: 60px;
      bottom: 48px;
      background: white;
      cursor: pointer;
      opacity: 1;
      transform: translateY(0);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
      border: 2px solid white;
      z-index: 1000;
      overflow: hidden;
      box-sizing: border-box;
    }

    .protostar-icon img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .protostar-window {
      position: fixed;
      left: 60px;
      bottom: 112px;
      width: 380px;
      height: 600px;
      background: white;
      box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(0,0,0,0.1);
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
      transition: 0.3s;
      z-index: 1000;
      overflow: hidden;
      box-sizing: border-box;
      font-family: Helvetica, Arial, sans-serif;
    }

    .protostar-window.show {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .protostar-header {
      padding: 15px 20px;
      background: #f8f9fa;
      border-bottom: 1px solid #eee;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #333;
    }
    
    .header-left {
        display: flex;
        gap: 15px;
        align-items: center;
        flex: 1; /* Allow title to take space */
        min-width: 0; /* Enable truncation flex child */
    }
    
    .header-right {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .header-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .icon-btn {
        cursor: pointer;
        font-size: 16px;
        color: #555;
        transition: 0.2s;
        flex-shrink: 0;
    }
    
    .icon-btn:hover {
        color: #000;
        transform: scale(1.1);
    }
    
    /* User Profile Icon */
    .user-icon {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 1px solid #333;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    .user-icon svg {
        width: 14px;
        height: 14px;
        fill: none;
        stroke: #333;
        stroke-width: 2;
    }

    .protostar-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #fafafa;
      overflow: hidden;
      position: relative;
    }

    /* Overlays */
    .overlay-base {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,0.95);
        z-index: 20;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px 20px;
        text-align: center;
        box-sizing: border-box; /* Fix width overflow */
    }
    
    .overlay-base.active {
        display: flex;
    }
    
    .limit-overlay h3 {
        margin-top: 0;
        color: #333;
        margin-bottom: 15px;
    }
    
    .limit-overlay p {
        color: #666;
        font-size: 14px;
        margin-bottom: 30px;
        line-height: 1.5;
    }
    
    .overlay-btn {
        width: 100%;
        padding: 12px;
        border-radius: 8px;
        border: none;
        font-weight: bold;
        cursor: pointer;
        margin-bottom: 10px;
        transition: 0.2s;
    }
    
    .btn-primary {
        background: #007bff;
        color: white;
    }
    .btn-primary:hover { background: #0056b3; }
    
    .btn-secondary {
        background: #eee;
        color: #555;
    }
    .btn-secondary:hover { background: #e0e0e0; }
    

    /* Session List Overlay (Refined) */
    .session-list-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fafafa;
        z-index: 10;
        padding: 20px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        box-sizing: border-box; /* Fix width overflow */
        transform: translateX(-100%);
        transition: transform 0.3s ease-in-out;
    }
    
    .session-list-overlay.active {
        transform: translateX(0);
    }
    
    .session-item {
        padding: 15px;
        background: white;
        border: 1px solid #eee;
        border-radius: 8px;
        margin-bottom: 10px;
        cursor: pointer;
        transition: 0.2s;
        box-shadow: 0 2px 5px rgba(0,0,0,0.02);
    }
    
    .session-item:hover {
        border-color: #ccc;
        transform: translateY(-2px);
    }
    
    .session-item.active {
        border-color: #007bff;
        background: #f0f7ff;
    }
    
    .session-date {
        font-size: 10px;
        color: #999;
        margin-bottom: 4px;
        display: block;
    }
    
    .session-title {
        font-size: 13px;
        font-weight: bold;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }


    .message-list {
      flex: 1;
      padding: 15px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .message-bubble {
      max-width: 80%;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 14px;
      line-height: 1.4;
      position: relative;
    }

    .message-bubble.user {
      align-self: flex-end;
      background: #e3f2fd;
      color: #0d47a1;
      border-bottom-right-radius: 2px;
    }

    .message-bubble.bot {
      align-self: flex-start;
      background: #fff;
      color: #444;
      border: 1px solid #eee;
      border-bottom-left-radius: 2px;
    }

    .attachment-pill-in-chat {
      display: block;
      background: rgba(255,255,255,0.6);
      border: 1px solid rgba(0,0,0,0.1);
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 11px;
      margin-bottom: 5px;
      color: #555;
    }
    
    .message-bubble.user .attachment-pill-in-chat {
        background: rgba(255,255,255,0.4);
        border-color: rgba(13, 71, 161, 0.2);
        color: #0d47a1;
    }

    .input-area {
      padding: 10px 15px;
      background: white;
      border-top: 1px solid #eee;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .attachment-preview-area {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
    }

    .attachment-pill {
        display: flex;
        align-items: center;
        gap: 5px;
        background: #f0f0f0;
        border: 1px solid #e0e0e0;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 12px;
        color: #333;
    }
    
    .attachment-pill .remove-btn {
        cursor: pointer;
        color: #999;
        font-weight: bold;
        line-height: 1;
    }
    
    .attachment-pill .remove-btn:hover {
        color: #f44336;
    }

    .input-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .add-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #f0f0f0;
      border: none;
      color: #666;
      font-size: 18px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.2s;
    }

    .add-btn:hover {
      background: #e0e0e0;
      color: #333;
    }

    .chat-input {
      flex: 1;
      border: 1px solid #ddd;
      border-radius: 20px;
      padding: 8px 15px;
      font-size: 14px;
      outline: none;
    }
    
    .chat-input:focus {
        border-color: #aaa;
    }

    .send-btn {
      background: none;
      border: none;
      color: #007bff;
      cursor: pointer;
      font-size: 16px;
      padding: 5px;
      transition: 0.2s;
    }
    
    .send-btn:disabled {
        color: #ccc;
        cursor: default;
    }
    
    .send-btn:hover:not(:disabled) {
        transform: translateX(2px);
    }

    /* Speech Bubble */
    .protostar-bubble {
        position: fixed;
        box-sizing: border-box;
        bottom: 125px;
        left: 60px;
        background: white;
        padding: 10px 16px;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        border: 1px solid rgba(0,0,0,0.05);
        font-size: 13px;
        color: #555;
        z-index: 999;
        max-width: 220px;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.5s ease-in-out;
        pointer-events: none;
        font-weight: 500;
        display: flex;
        align-items: center;
    }

    .protostar-bubble.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .protostar-bubble::after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 20px;
        width: 12px;
        height: 12px;
        background: white;
        border-bottom: 1px solid rgba(0,0,0,0.05);
        border-right: 1px solid rgba(0,0,0,0.05);
        transform: rotate(45deg);
    }

    @media (max-width: 1024px) {
      .protostar-icon {
        width: 38px;
        height: 38px;
        left: 35px;
        border-width: 1.5px;
      }
      .protostar-bubble {
        left: 35px;
        bottom: 110px;
      }
      .protostar-bubble::after {
        left: 13px;
      }
      .protostar-window {
        left: 35px;
      }
    }

    @media (max-width: 600px) {
      .protostar-icon {
        width: 29px;
        height: 29px;
        left: 20px;
        border-width: 1.5px;
      }
      .protostar-window {
        left: 20px;
        right: 20px;
        width: auto;
        bottom: 93px;
        height: 60vh;
      }
      .protostar-bubble {
        left: 20px;
        bottom: 85px;
        border-radius: 8px;
      }
      .protostar-bubble::after {
        left: 8.5px;
      }
    }

    .protostar-error-text {
      color: #ff6b6b; /* Soft pastel red */
    }
    
    /* Dark Mode Overrides */
    @media (prefers-color-scheme: dark) {
      .protostar-window,
      .protostar-body,
      .input-area {
        background: #2d2d2d;
      }

      .protostar-header {
        background: #2d2d2d;
        border-bottom: 1px solid #444;
        color: #e0e0e0;
      }

      .header-title {
        color: #e0e0e0;
      }

      .icon-btn {
        color: #aaa;
      }
      .icon-btn:hover {
        color: #fff;
      }
      
      .user-icon {
        border-color: #aaa;
      }
      .user-icon svg {
        stroke: #aaa;
      }

      .protostar-icon {
        background: #2d2d2d;
        border-color: #444;
        filter: grayscale(100%) brightness(0.7);
      }

      .protostar-bubble {
        background: #333;
        color: #ddd;
        border-color: #444;
      }

      .protostar-bubble::after {
        background: #333;
        border-bottom: 1px solid #444;
        border-right: 1px solid #444;
      }

      .message-bubble.bot {
        background: #2d2d2d;
        color: #e0e0e0;
        border: 1px solid #444;
      }

      .message-bubble.user {
        background: #1a3b5c;
        color: #bbdefb;
      }
      
      .attachment-pill-in-chat {
        background: rgba(0,0,0,0.3);
        border-color: rgba(255,255,255,0.1);
        color: #ccc;
      }
      .message-bubble.user .attachment-pill-in-chat {
        background: rgba(0,0,0,0.2);
        border-color: rgba(13, 71, 161, 0.4);
      }

      .chat-input {
        background: #383838;
        color: #fff;
        border: 1px solid #555;
      }

      .add-btn {
        background: #383838;
        color: #aaa;
      }
      .add-btn:hover {
        background: #444;
        color: #ccc;
      }
      
      /* Overlays */
      .session-list-overlay {
        background: #2d2d2d;
      }
      .session-list-overlay h4 {
        color: #e0e0e0 !important;
      }
      .session-item {
        background: #333;
        border-color: #444;
      }
      .session-item:hover {
        border-color: #666;
      }
      .session-item.active {
        border-color: #007bff;
        background: #1a3b5c;
      }
      .session-title {
        color: #ddd;
      }
      
      .overlay-base {
        background: rgba(30, 30, 30, 0.95);
      }
      .limit-overlay h3 {
        color: #e0e0e0;
      }
      .limit-overlay p {
        color: #aaa;
      }
      .btn-secondary {
        background: #444;
        color: #ddd;
      }
      .btn-secondary:hover {
        background: #555;
      }
      
      .attachment-pill {
        background: #383838;
        border-color: #555;
        color: #ddd;
      }
      .attachment-pill .remove-btn {
         color: #bbb;
      }
      .protostar-error-text {
        color: #ff8a80; /* Soft coral red for dark mode */
      }
    }
    
    /* Loading Dots Animation */
    .protostar-loading-dots {
      display: flex;
      gap: 4px;
      padding: 5px 0;
      justify-content: center;
      align-items: center;
      min-width: 40px;
    }
    .protostar-dot {
      width: 6px;
      height: 6px;
      background: #888;
      border-radius: 50%;
      animation: protostar-bounce 1.4s infinite ease-in-out both;
    }
    .protostar-dot:nth-child(1) { animation-delay: -0.32s; }
    .protostar-dot:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes protostar-bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
    
    @keyframes protostar-fade-in {
      from { opacity: 0; transform: translateY(2px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .protostar-char-fade {
        animation: protostar-fade-in 0.3s ease-out forwards;
        opacity: 0;
        display: inline-block;
    }

  `;
    document.head.appendChild(style);

    // 2. Create DOM Elements
    const config = window.ProtostarConfig || {};
    const baseUrl = config.baseUrl || ''; // Default to relative if not provided

    const iconContainer = document.createElement('div');
    iconContainer.className = 'protostar-icon';
    iconContainer.id = 'protostar-icon';
    iconContainer.innerHTML = `<img src="${baseUrl}/assets/images/project-protostar/protostar_icon.png" alt="Protostar Chat">`;

    // Create Bubble
    const bubbleContainer = document.createElement('div');
    bubbleContainer.className = 'protostar-bubble';
    bubbleContainer.id = 'protostar-bubble';
    bubbleContainer.innerText = 'Hello!'; // Initial placeholder

    const windowContainer = document.createElement('div');
    windowContainer.className = 'protostar-window';
    windowContainer.id = 'protostar-window';
    windowContainer.innerHTML = `
    <div class="protostar-header">
      <div class="header-left">
          <span class="icon-btn" id="protostar-list-btn" title="Chat List">☰</span>
          <span class="icon-btn" id="protostar-new-btn" title="New Chat">+</span>
          <span class="header-title" id="protostar-header-title">Protostar</span>
      </div>
      <div class="header-right">
          <div class="user-icon" title="User Profile">
            <!-- Line art person icon -->
            <svg viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <span id="close-protostar" style="cursor: pointer;">&#10005;</span>
      </div>
    </div>
    <div class="protostar-body">
      <!-- Session List Overlay -->
      <div class="session-list-overlay" id="protostar-session-overlay">
          <h4 style="margin-bottom: 15px; color: #333;">Chat List</h4>
          <div id="protostar-session-list-items"></div>
      </div>
      
      <!-- Limit Alert Overlay -->
      <div class="overlay-base limit-overlay" id="protostar-limit-overlay">
          <h3>한도 초과</h3>
          <p>Protostar 서비스에 회원가입 하시면<br>더 많은 질문이 가능합니다.</p>
          <button class="overlay-btn btn-primary" id="protostar-register-btn">등록하러 가기</button>
          <button class="overlay-btn btn-secondary" id="protostar-cancel-limit-btn">취소</button>
      </div>

      <div class="message-list" id="protostar-message-list">
        <!-- Messages will be injected here -->
      </div>
      <div class="input-area">
        <div class="attachment-preview-area" id="protostar-attachment-area"></div>
        <div class="input-row">
            <button class="add-btn" id="protostar-add-btn" title="Add Current Page">+</button>
            <input type="text" class="chat-input" id="protostar-input" placeholder="Type a message...">
            <button class="send-btn" id="protostar-send-btn" title="Send" disabled>&#10148;</button>
        </div>
      </div>
    </div>
  `;

    document.body.appendChild(iconContainer);
    document.body.appendChild(bubbleContainer);
    document.body.appendChild(windowContainer);

    // 3. Logic & Event Listeners
    const messageList = document.getElementById('protostar-message-list');
    const sessionOverlay = document.getElementById('protostar-session-overlay');
    const sessionListItems = document.getElementById('protostar-session-list-items');
    const limitOverlay = document.getElementById('protostar-limit-overlay');

    const headerTitle = document.getElementById('protostar-header-title');
    const attachmentArea = document.getElementById('protostar-attachment-area');
    const addBtn = document.getElementById('protostar-add-btn');
    const listBtn = document.getElementById('protostar-list-btn');
    const newBtn = document.getElementById('protostar-new-btn');
    const registerBtn = document.getElementById('protostar-register-btn');
    const cancelLimitBtn = document.getElementById('protostar-cancel-limit-btn');

    const input = document.getElementById('protostar-input');
    const sendBtn = document.getElementById('protostar-send-btn');
    const closeBtn = document.getElementById('close-protostar');

    let activeSessionId = null;
    let attachments = [];
    let isSending = false; // Prevents double submission

    // Typing Effect State
    let typeQueue = [];
    let typeQueueIndex = 0;
    let isTypingLoopRunning = false;
    let typingGeneration = 0;


    // --- Constants ---
    const MAX_SESSIONS_PER_DAY = 3;
    const MAX_MESSAGES_PER_SESSION = 10;
    const EXPIRATION_DAYS = 7;

    // --- Helpers ---
    const generateSessionId = () => {
        const timestamp = Date.now();
        const cleanPath = window.location.pathname.replace(/[^a-zA-Z0-9]/g, '').substring(0, 10);
        return `sess_${timestamp}_${cleanPath}_${Math.random().toString(36).substr(2, 9)}`;
    };

    const escapeHtml = (text) => {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };

    const safeJsonParse = (str, fallback) => {
        try {
            return str ? JSON.parse(str) : fallback;
        } catch (e) {
            console.error('Protostar: JSON Parse Error', e);
            return fallback;
        }
    };

    const isSessionExpired = (lastUpdated) => {
        const now = new Date();
        const diffTime = Math.abs(now - new Date(lastUpdated));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > EXPIRATION_DAYS;
    };

    const isSessionWritable = (session) => {
        if (!session) return false;
        const today = new Date().toDateString();
        const isToday = new Date(session.created_at).toDateString() === today;
        const userMsgCount = session.messages.filter(m => m.type === 'user').length;
        return isToday && userMsgCount < MAX_MESSAGES_PER_SESSION;
    };

    const getTodaySessionCount = (sessions) => {
        const today = new Date().toDateString();
        return sessions.filter(s => new Date(s.created_at).toDateString() === today).length;
    };

    // --- State Variables (Added for SSE) ---
    let serverUUID = localStorage.getItem('protostar_chat_uuid') || null;
    let eventSource = null;
    let isWaitingForRetry = false;
    let retryCount = 0;
    const MAX_RETRIES = 10;

    const RETRY_DELAY = 10000; // 10 seconds

    // Watchdog State
    let lastHeartbeatTime = Date.now();
    let lastTokenTime = Date.now();
    let watchdogTimer = null;

    // --- Data Management ---
    const getSessions = () => {
        let sessions = safeJsonParse(localStorage.getItem('protostar_sessions'), []);

        // Migration: Check if old history exists and migrate
        const oldHistory = localStorage.getItem('protostar_chat_history');
        if (oldHistory) {
            const mainSession = {
                id: generateSessionId(),
                created_at: new Date().toISOString(),
                last_updated: new Date().toISOString(),
                url: window.location.pathname,
                messages: safeJsonParse(oldHistory, [])
            };
            sessions.push(mainSession);
            localStorage.removeItem('protostar_chat_history'); // Delete old key
            localStorage.setItem('protostar_sessions', JSON.stringify(sessions));
        }

        // Cleanup: Remove expired
        const validSessions = sessions.filter(s => !isSessionExpired(s.last_updated));
        if (validSessions.length !== sessions.length) {
            localStorage.setItem('protostar_sessions', JSON.stringify(validSessions));
        }
        return validSessions;
    };

    const saveSessions = (sessions) => {
        localStorage.setItem('protostar_sessions', JSON.stringify(sessions));
    };

    const createSession = () => {
        const sessions = getSessions();

        // Limit Check: Max 3 per day
        if (getTodaySessionCount(sessions) >= MAX_SESSIONS_PER_DAY) {
            // Show Custom Overlay instead of Alert
            limitOverlay.classList.add('active');
            return null;
        }

        const newSession = {
            id: generateSessionId(),
            created_at: new Date().toISOString(),
            last_updated: new Date().toISOString(),
            url: window.location.pathname,
            messages: [{
                text: "안녕하세요! Paul 님의 커리어 AI 비서 Protostar 입니다. 무엇을 도와드릴까요?",
                type: 'bot',
                timestamp: new Date().toISOString()
            }]
        };

        sessions.push(newSession);
        saveSessions(sessions);
        return newSession.id;
    };

    const getActiveSession = () => {
        const sessions = getSessions();
        if (!activeSessionId) {
            // If no active session, try to find one or create one
            if (sessions.length > 0) {
                // Get most recently updated
                sessions.sort((a, b) => new Date(b.last_updated) - new Date(a.last_updated));
                const lastSession = sessions[0];

                // Check if last session is from today
                const today = new Date().toDateString();
                const isToday = new Date(lastSession.created_at).toDateString() === today;

                if (isToday) {
                    activeSessionId = lastSession.id;
                } else {
                    // Start fresh if last session was a different day
                    activeSessionId = createSession();
                }
            } else {
                activeSessionId = createSession();
            }
        }
        return sessions.find(s => s.id === activeSessionId);
    };

    const updateHeaderTitle = (session) => {
        if (!session) return;
        // Check if any user messages exist (ignoring initial bot msg)
        const hasUserMessages = session.messages.some(m => m.type === 'user');

        if (hasUserMessages) {
            headerTitle.textContent = decodeURIComponent(session.url);
        } else {
            headerTitle.textContent = "Protostar";
        }
    };

    // --- Render ---
    const renderChat = () => {
        // Reset typing state on re-render to prevent cross-session bleeding
        typingGeneration++;
        typeQueue = [];
        typeQueueIndex = 0;
        isTypingLoopRunning = false;

        messageList.innerHTML = '';
        const session = getActiveSession();
        if (!session) return; // Should not happen unless limit prevented creation

        // Update Header
        updateHeaderTitle(session);

        // Check Lock Status
        const writable = isSessionWritable(session);
        if (!writable) {
            input.disabled = true;
            input.placeholder = "대화가 종료되었습니다 (제한 도달)";
            sendBtn.disabled = true;
            addBtn.disabled = true;
            addBtn.style.opacity = '0.5';
            addBtn.style.cursor = 'not-allowed';
        } else {
            input.disabled = false;
            input.placeholder = "Type a message...";
            addBtn.disabled = false;
            addBtn.style.opacity = '1';
            addBtn.style.cursor = 'pointer';
            updateSendButton(); // Re-eval send button
        }

        session.messages.forEach((msg, index) => {
            const bubble = document.createElement('div');
            bubble.className = `message-bubble ${msg.type}`;

            let html = '';
            if (msg.attachments && msg.attachments.length > 0) {
                msg.attachments.forEach(att => {
                    html += `<div class="attachment-pill-in-chat">📄 ${escapeHtml(att.title)}</div>`;
                });
            }

            // Loading Animation Check: If it's a bot message, empty, and the LATEST message
            if (msg.type === 'bot' && !msg.text && (index === session.messages.length - 1)) {
                html += `
                 <div class="protostar-loading-dots">
                    <div class="protostar-dot"></div>
                    <div class="protostar-dot"></div>
                    <div class="protostar-dot"></div>
                 </div>`;
                bubble.classList.add('loading-bubble');
            } else if (msg.isError) {
                // Error Case
                html += `<div class="message-text protostar-error-text">${msg.text}</div>`;
            } else {
                html += `<div class="message-text">${escapeHtml(msg.text)}</div>`;
            }

            bubble.innerHTML = html;
            messageList.appendChild(bubble);
        });
        scrollToBottom();
    };

    const ensureTypingLoop = () => {
        if (isTypingLoopRunning && (typeQueue.length - typeQueueIndex) > 0) return;
        if (isTypingLoopRunning) return;

        isTypingLoopRunning = true;
        const myGeneration = typingGeneration;
        let lastTime = 0;
        const RENDER_INTERVAL = 20; // 20ms throttle

        const loop = (timestamp) => {
            // Generation Check: invalidates old loops
            if (myGeneration !== typingGeneration) {
                isTypingLoopRunning = false;
                return;
            }

            if (typeQueueIndex >= typeQueue.length) {
                isTypingLoopRunning = false;
                typeQueue = []; // Cleanup
                typeQueueIndex = 0;
                return;
            }

            if (!lastTime) lastTime = timestamp;
            const elapsed = timestamp - lastTime;

            if (elapsed < RENDER_INTERVAL) {
                requestAnimationFrame(loop);
                return;
            }

            lastTime = timestamp;

            let lastBubble = messageList.lastElementChild;
            // Validations
            if (!lastBubble || !lastBubble.classList.contains('bot')) {
                // If queue has items but no bubble, create one to prevent data loss
                if (typeQueueIndex < typeQueue.length) {
                    const bubble = document.createElement('div');
                    bubble.className = 'message-bubble bot';
                    bubble.innerHTML = '<div class="message-text"></div>';
                    messageList.appendChild(bubble);
                    lastBubble = bubble;
                } else {
                    isTypingLoopRunning = false;
                    return;
                }
            }

            // Remove loading dots if present
            const loadingDots = lastBubble.querySelector('.protostar-loading-dots');
            if (loadingDots) {
                loadingDots.remove();
                lastBubble.classList.remove('loading-bubble');
                // Ensure text container exists
                if (!lastBubble.querySelector('.message-text')) {
                    const textDiv = document.createElement('div');
                    textDiv.className = 'message-text';
                    lastBubble.appendChild(textDiv);
                }
            }

            let textDiv = lastBubble.querySelector('.message-text');
            if (!textDiv) {
                // Fallback if structure is weird (e.g. attachments only? shouldn't happen for text stream)
                textDiv = document.createElement('div');
                textDiv.className = 'message-text';
                lastBubble.appendChild(textDiv);
            }

            // Speed control: Fixed speed (no acceleration)
            const batchSize = 1;

            for (let i = 0; i < batchSize; i++) {
                if (typeQueueIndex < typeQueue.length) {
                    const char = typeQueue[typeQueueIndex++];
                    const span = document.createElement('span');
                    // Handle space preservation
                    if (char === ' ') {
                        span.innerHTML = '&nbsp;';
                    } else {
                        span.textContent = char;
                    }
                    span.className = 'protostar-char-fade';
                    textDiv.appendChild(span);
                }
            }

            scrollToBottom();
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    };

    const renderSessionList = () => {
        sessionListItems.innerHTML = '';
        const sessions = getSessions();
        // Sort by newest created
        sessions.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        sessions.forEach(s => {
            const div = document.createElement('div');
            div.className = `session-item ${s.id === activeSessionId ? 'active' : ''}`;

            // Format date: "YYYY/MM/DD HH:mm"
            const date = new Date(s.created_at);
            const dateStr = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;

            div.innerHTML = `
             <span class="session-date">${dateStr}</span>
             <span class="session-title">${escapeHtml(decodeURIComponent(s.url))}</span> 
           `;

            div.addEventListener('click', () => {
                activeSessionId = s.id;
                sessionOverlay.classList.remove('active'); // Close overlay
                renderChat();
                connectSSE(activeSessionId); // Reconnect to selected session
            });

            sessionListItems.appendChild(div);

        });
    };

    const scrollToBottom = () => {
        messageList.scrollTop = messageList.scrollHeight;
    }

    // --- Logic Events ---

    // Toggle Window
    const toggleChat = () => {
        windowContainer.classList.toggle('show');
        if (windowContainer.classList.contains('show')) {
            bubbleContainer.classList.remove('visible'); // Hide bubble immediately
            setTimeout(() => input.focus(), 300);

            // Ensure we have a session (unless limited)
            if (!activeSessionId) {
                const session = getActiveSession();
                if (session) {
                    activeSessionId = session.id;
                }
            }

            if (activeSessionId) {
                renderChat();
                // Note: connectSSE is already called on init, but idempotent calls are fine or we can skip
            }
        }
    };

    listBtn.addEventListener('click', () => {
        renderSessionList();
        sessionOverlay.classList.toggle('active');
    });

    newBtn.addEventListener('click', () => {
        const newId = createSession();
        if (newId) {
            activeSessionId = newId;
            sessionOverlay.classList.remove('active');
            renderChat();
            // Reset input/attachments for new session
            input.value = '';
            attachments = [];
            attachmentArea.innerHTML = '';
            connectSSE(newId); // Connect SSE for new session

            updateSendButton();
        }
    });

    // Custom Overlay Events
    registerBtn.addEventListener('click', () => {
        window.location.href = 'https://service-protostar.ddns.net/';
    });

    cancelLimitBtn.addEventListener('click', () => {
        limitOverlay.classList.remove('active');
    });


    iconContainer.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleChat();
    });

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        windowContainer.classList.remove('show');
        // Also hide overlays if open
        limitOverlay.classList.remove('active');
        sessionOverlay.classList.remove('active');
    });

    document.addEventListener('click', (e) => {
        if (windowContainer.classList.contains('show') &&
            !windowContainer.contains(e.target) &&
            !iconContainer.contains(e.target)) {
            windowContainer.classList.remove('show');
            limitOverlay.classList.remove('active');
            sessionOverlay.classList.remove('active');
        }
    });

    // Input Handling
    const updateSendButton = () => {
        const session = getActiveSession();
        if ((session && !isSessionWritable(session)) || isSending) {
            sendBtn.disabled = true;
            sendBtn.style.color = '#ccc';
            return;
        }

        if (input.value.trim() || attachments.length > 0) {
            sendBtn.disabled = false;
            sendBtn.style.color = '#007bff';
        } else {
            sendBtn.disabled = true;
            sendBtn.style.color = '#ccc';
        }
    };

    input.addEventListener('input', updateSendButton);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
            e.preventDefault();
            if (!sendBtn.disabled && !isSending) sendMessage();
        }
    });

    // Attachment Logic
    addBtn.addEventListener('click', () => {
        // 1. Prevent root path
        if (window.location.pathname === '/' || window.location.pathname === '') {
            alert('메인 페이지는 첨부할 수 없습니다. 세부 페이지에서 시도해주세요.');
            return;
        }

        const title = document.title;
        // Check if already added
        if (attachments.some(att => att.title === title)) return;

        // 2. Extract Body Text
        const content = document.body.innerText;

        const attachment = {
            title: title,
            content: content.substring(0, 5000), // Limit content size
            url: window.location.href,
            timestamp: new Date().toISOString()
        };

        attachments.push(attachment);
        renderAttachmentPill(attachment);
        updateSendButton();
        input.focus();
    });

    const renderAttachmentPill = (att) => {
        const pill = document.createElement('div');
        pill.className = 'attachment-pill';
        pill.innerHTML = `
        <span>📄 ${att.title.length > 20 ? att.title.substring(0, 20) + '...' : att.title}</span>
        <span class="remove-btn">×</span>
      `;

        pill.querySelector('.remove-btn').addEventListener('click', (e) => {
            e.stopPropagation(); // Fix chat window closing on removal
            attachments = attachments.filter(a => a !== att);
            attachmentArea.removeChild(pill);
            updateSendButton();
        });

        attachmentArea.appendChild(pill);
    };

    // --- SSE Connection Logic ---
    const connectSSE = (sessionId) => {
        // Prevent timer leak on reconnect
        if (watchdogTimer) clearInterval(watchdogTimer);

        if (!sessionId) return;
        if (eventSource) eventSource.close();

        // Use baseUrl from config or default domain
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const API_URL = isLocal ? 'http://localhost:5859' : 'https://back-protostar.ddns.net';

        const baseUrl = `${API_URL}/api/v1/chat/stream/${sessionId}`;
        const url = serverUUID ? `${baseUrl}?uuid=${serverUUID}` : baseUrl;

        eventSource = new EventSource(url);

        eventSource.onopen = () => {
            console.log('Protostar SSE Connected');
            lastHeartbeatTime = Date.now();
            lastTokenTime = Date.now();
            startStreamWatchdog();
        };

        const startStreamWatchdog = () => {
            if (watchdogTimer) clearInterval(watchdogTimer);
            watchdogTimer = setInterval(() => {
                const now = Date.now();
                // 1. Heartbeat Check (60s)
                if (now - lastHeartbeatTime > 60000) {
                    handleStreamError("Connection lost (Heartbeat timeout)");
                    return;
                }
                // 2. Token Stream Check (30s) - Only if sending/streaming
                if (isSending && (now - lastTokenTime > 30000)) {
                    handleStreamError("Stream hanging (Token timeout)");
                    return;
                }
            }, 1000);
        };

        const handleStreamError = (reason) => {
            console.warn("Protostar Stream Error:", reason);
            if (eventSource) {
                eventSource.close();
                // eventSource = null; // Maybe keep instance or nullify? Logic uses it to check.
            }
            if (watchdogTimer) clearInterval(watchdogTimer);

            isSending = false;

            // UI Update
            const sessions = getSessions();
            const s = sessions.find(sess => sess.id === sessionId);
            if (s) {
                const lastMsg = s.messages[s.messages.length - 1];
                const errorHtml = '<i>현재 서비스 상태가 좋지 않아 연결이 강제 종료 되었습니다. 관리자에게 문의 부탁드립니다.</i>';

                if (lastMsg && lastMsg.type === 'bot') {
                    // Replace content completely
                    lastMsg.text = errorHtml;
                    // Mark as error purely for internal if needed, or just rely on text
                } else {
                    // Should act on last bot bubble, if not exists push new?
                    s.messages.push({
                        text: errorHtml,
                        type: 'bot',
                        timestamp: new Date().toISOString()
                    });
                }
                saveSessions(sessions);
                if (activeSessionId === s.id) {
                    renderChat();
                    // In renderChat, escapeHtml is used. We need to handle this specific HTML.
                    // Or we can add a flag to message 'isError' and render differently?
                    // Currently implementation plan said to use escapeHtml usually?
                    // Wait, previous code uses escapeHtml(msg.text).
                    // So we must modify renderChat to support innerHTML for this specific error or handle it.
                    // Quick fix: Add 'isError' flag to message object.
                    const lastMsgRef = s.messages[s.messages.length - 1]; // Re-fetch
                    lastMsgRef.isError = true;
                    saveSessions(sessions);
                    renderChat();
                }
            }
            updateSendButton();
        };

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                // Handle Object Payloads (init, heartbeat) which might come as generic messages
                if (typeof data === 'object' && data !== null) {
                    if (data.type === 'init') {
                        if (data.uuid) {
                            serverUUID = data.uuid;
                            localStorage.setItem('protostar_chat_uuid', data.uuid);
                        }
                        return;
                    }
                    if (data.type === 'heartbeat') {
                        // Ignore heartbeat but update time
                        lastHeartbeatTime = Date.now();
                        return;
                    }
                    // If it is a token object (if backend changes), handle here?
                    // Currently backend sends raw string for tokens? 
                    // Wait, worker.py sends: { type: 'message', content: token ... } via Redis.
                    // ChatService routes it: userStream.next({ type: 'message', content: ... })
                    // Controller maps it: { data: payload }
                    // So data IS an object { type: 'message', content: '...' }

                    if (data.type === 'message') {
                        const content = data.content;
                        lastTokenTime = Date.now();
                        lastHeartbeatTime = Date.now(); // Data implies connection alive

                        if (typeof content === 'string') {
                            const sessions = getSessions();
                            const s = sessions.find(sess => sess.id === sessionId);
                            if (s) {
                                const lastMsg = s.messages[s.messages.length - 1];
                                if (lastMsg && lastMsg.type === 'bot') {
                                    lastMsg.text += content;
                                } else {
                                    s.messages.push({
                                        text: content, // First chunk
                                        type: 'bot',
                                        timestamp: new Date().toISOString()
                                    });
                                }
                                s.last_updated = new Date().toISOString();
                                saveSessions(sessions);
                                if (activeSessionId === sessionId) {
                                    // Use spread for unicode support
                                    typeQueue.push(...[...content]);
                                    ensureTypingLoop();
                                }
                            }
                        } else if (typeof content === 'object' && content !== null && content.type === 'done') {
                            // Handle wrapped DONE signal
                            isSending = false;
                            updateSendButton();
                        }
                        return;
                    }

                    if (data.type === 'done') {
                        // Protocol update: Handle structured done signal
                        if (data.uuid) {
                            serverUUID = data.uuid;
                            localStorage.setItem('protostar_chat_uuid', data.uuid);
                        }
                        console.log('Protostar Stream Done:', data);

                        isSending = false;
                        updateSendButton();
                        return;
                    }
                }

                // Legacy/Fallback for raw string handling if needed
                if (typeof data === 'string') {
                    // Start of stream or token
                    const sessions = getSessions();
                    const s = sessions.find(sess => sess.id === sessionId);
                    if (s) {
                        const lastMsg = s.messages[s.messages.length - 1];
                        if (lastMsg && lastMsg.type === 'bot') {
                            lastMsg.text += data;
                        } else {
                            // New bot message
                            s.messages.push({
                                text: data,
                                type: 'bot',
                                timestamp: new Date().toISOString()
                            });
                        }
                        s.last_updated = new Date().toISOString();
                        saveSessions(sessions);
                        if (activeSessionId === sessionId) {
                            typeQueue.push(...[...data]);
                            ensureTypingLoop();
                        }
                    }
                }
            } catch (e) {
                // Raw text fallback
                const sessions = getSessions();
                const s = sessions.find(sess => sess.id === sessionId);
                if (s) {
                    const lastMsg = s.messages[s.messages.length - 1];
                    if (lastMsg && lastMsg.type === 'bot') {
                        lastMsg.text += event.data;
                    } else {
                        s.messages.push({
                            text: event.data,
                            type: 'bot',
                            timestamp: new Date().toISOString()
                        });
                    }
                    s.last_updated = new Date().toISOString();
                    saveSessions(sessions);
                    if (activeSessionId === sessionId) {
                        typeQueue.push(...[...event.data]);
                        ensureTypingLoop();
                    }
                }
            }
        };



        eventSource.addEventListener('done', () => {
            isSending = false;
            updateSendButton();
        });

        eventSource.onerror = (err) => {
            // console.error('SSE Error', err);
        };
    };

    // Helper to extract clean HTML
    const getCleanContext = () => {
        // Try to find specific content container (User requested .post-content)
        const postContent = document.querySelector('.post-content') || document.querySelector('.e-content');
        const sourceNode = postContent ? postContent : document.body;

        const clone = sourceNode.cloneNode(true);
        // Remove scripts, styles
        const scripts = clone.getElementsByTagName('script');
        while (scripts[0]) scripts[0].parentNode.removeChild(scripts[0]);
        const styles = clone.getElementsByTagName('style');
        while (styles[0]) styles[0].parentNode.removeChild(styles[0]);
        const noscripts = clone.getElementsByTagName('noscript');
        while (noscripts[0]) noscripts[0].parentNode.removeChild(noscripts[0]);
        const iframes = clone.getElementsByTagName('iframe');
        while (iframes[0]) iframes[0].parentNode.removeChild(iframes[0]);

        return clone.innerHTML.substring(0, 50000); // 50000 limit
    };


    // Send Logic
    sendBtn.addEventListener('click', (e) => {
        if (!isSending) sendMessage();
    });

    function sendMessage() {
        // Double Check Lock
        const session = getActiveSession();
        if (isSending || !session || !isSessionWritable(session)) return;

        const text = input.value.trim();
        if (!text && attachments.length === 0) return;

        const userMsg = {
            text: text,
            attachments: [...attachments], // Copy array
            timestamp: new Date().toISOString(),
            type: 'user'
        };

        isSending = true; // Set block flag
        updateSendButton();

        // 0. Prepare Payload (Before clearing state)
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const API_URL = isLocal ? 'http://localhost:5859' : 'https://back-protostar.ddns.net';

        // Use Clean Context function
        const contextBody = attachments.length > 0 ? getCleanContext() : undefined;

        const payload = {
            sessionId: activeSessionId,
            uuid: serverUUID,
            mode: attachments.length > 0 ? 'page_context' : 'general',
            content: text,
            context: contextBody
        };

        // 1. Update State
        const sessions = getSessions();
        const currentSession = sessions.find(s => s.id === activeSessionId);
        currentSession.messages.push(userMsg);
        currentSession.last_updated = new Date().toISOString();
        saveSessions(sessions);

        // 2. Render UI
        // Reset Input
        input.value = '';
        attachments = [];
        attachmentArea.innerHTML = '';
        updateSendButton();

        renderChat(); // Re-render to show new message

        // 3. API Call
        // Payload already prepared at step 0

        // Add pending bot bubble immediately
        const sessionsForBot = getSessions();
        const sForBot = sessionsForBot.find(s => s.id === activeSessionId);
        if (sForBot) {
            sForBot.messages.push({
                text: '',
                type: 'bot',
                timestamp: new Date().toISOString()
            });
            saveSessions(sessionsForBot);
            if (activeSessionId === sForBot.id) renderChat();
        }

        const sendToBackend = (payloadData) => {
            fetch(`${API_URL}/api/v1/chat/message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payloadData)
            }).then(res => {
                if (res.status === 429 || res.status >= 500) {
                    throw new Error(`Server Error: ${res.status}`);
                }
                if (!res.ok) {
                    throw new Error('Network error');
                }
            }).catch(e => {
                console.error(e);

                // Retry Logic
                if (retryCount < MAX_RETRIES) {
                    retryCount++;
                    isWaitingForRetry = true;

                    // Show Retry Message
                    const sessions = getSessions();
                    const s = sessions.find(s => s.id === activeSessionId);
                    if (s) {
                        const lastMsg = s.messages[s.messages.length - 1];
                        if (lastMsg && lastMsg.type === 'bot') {
                            lastMsg.text = `서버와 연결을 다시 시도하고 있어요... 잠시만 기다려 주세요! 🥺🔄 (${retryCount}/${MAX_RETRIES})`;
                        } else {
                            s.messages.push({
                                text: `서버와 연결을 다시 시도하고 있어요... 잠시만 기다려 주세요! 🥺🔄 (${retryCount}/${MAX_RETRIES})`,
                                type: 'bot',
                                timestamp: new Date().toISOString()
                            });
                        }
                        saveSessions(sessions);
                        if (activeSessionId === s.id) {
                            renderChat();
                            input.disabled = true; // Lock Input
                            input.placeholder = "연결을 복구 중입니다...";
                        }
                    }

                    setTimeout(() => {
                        sendToBackend(payloadData);
                    }, RETRY_DELAY);

                } else {
                    // Final Failure
                    isSending = false;
                    isWaitingForRetry = false;
                    retryCount = 0;
                    updateSendButton();

                    const sessions = getSessions();
                    const s = sessions.find(s => s.id === activeSessionId);
                    if (s) {
                        const lastMsg = s.messages[s.messages.length - 1];
                        const failMsg = "죄송해요, 서버 연결이 원활하지 않네요. 😭 주인장이 곧 확인하고 복구할 거예요! 잠시 뒤에 다시 찾아와주세요.";
                        if (lastMsg && lastMsg.type === 'bot') {
                            lastMsg.text = failMsg;
                        } else {
                            s.messages.push({
                                text: failMsg,
                                type: 'bot',
                                timestamp: new Date().toISOString()
                            });
                        }
                        saveSessions(sessions);
                        if (activeSessionId === s.id) {
                            renderChat();
                            input.disabled = true;
                            input.placeholder = "현재 이용이 불가능합니다 😭";
                            sendBtn.disabled = true;
                        }
                    }
                }
            });
        };

        // Reset retry count on new message
        retryCount = 0;
        sendToBackend(payload);

    }

    // Init
    // Try to load one immediately to handle migration & pre-connection
    getSessions();
    const activeSession = getActiveSession();
    if (activeSession) {
        // Pre-connect
        connectSSE(activeSession.id);
    }

    // --- Bubble Logic ---
    const PROMOTIONAL_MESSAGES = [
        '글에 대해 궁금 하신게 있으세요? 🤗',
        '이력과 경력에 대해 궁금한 것은 저에게 물어봐 주세요! 😎',
        '저는 커리어 관리 Agentic AI 비서 Protostar 입니다. 😄',
    ];

    const runBubbleLoop = () => {
        // Stop/Pause if chat is open
        if (windowContainer.classList.contains('show')) {
            setTimeout(runBubbleLoop, 3000);
            return;
        }

        const randomMsg = PROMOTIONAL_MESSAGES[Math.floor(Math.random() * PROMOTIONAL_MESSAGES.length)];
        bubbleContainer.innerText = randomMsg;
        bubbleContainer.classList.add('visible');

        // Hide after 4s
        setTimeout(() => {
            bubbleContainer.classList.remove('visible');
            // Show again after random 3-6s
            const nextDelay = 3000 + Math.random() * 3000;
            setTimeout(runBubbleLoop, nextDelay);
        }, 4000);
    };

    // Start loop after 2s
    setTimeout(runBubbleLoop, 2000);

})();
