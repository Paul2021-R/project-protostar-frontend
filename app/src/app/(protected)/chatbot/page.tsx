'use client';

import ChatbotWidget from '@/components/features/chatbot/ChatbotWidget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { useState } from 'react';

export default function ChatbotConfigPage() {
  const [domain, setDomain] = useState('');
  const [embedCode, setEmbedCode] = useState('');

  const handleGenerate = () => {
    if (!domain) return;

    const code = `<!-- Protostar Chatbot -->
<script>
  (function(w, d, s, o, r) {
    w['ProtostarConfig'] = r;
    var f = d.getElementsByTagName(s)[0], j = d.createElement(s);
    j.async = true; j.src = o;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', '${window.location.origin}/chatbot.js', { domain: '${domain}', baseUrl: '${window.location.origin}' });
</script>`;
    setEmbedCode(code);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    alert('Copied to clipboard!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Chatbot Configuration</h1>
      <p className="text-gray-500 mb-8">
        Configure your chatbot appearance and settings.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border p-4 rounded-lg bg-card text-card-foreground shadow-sm self-start">
          <h2 className="text-lg font-semibold mb-4">Settings</h2>

          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Domain Registration</label>
              <Input
                type="text"
                placeholder="https://your-blog.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Publish</label>
              <Button
                onClick={handleGenerate}
                disabled={!domain}
                className="w-full"
              >
                Generate Embed Code
              </Button>
            </div>

            {embedCode && (
              <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
                <label className="text-sm font-medium">Embed Code</label>
                <Textarea
                  className="font-mono text-xs h-32 bg-background"
                  readOnly
                  value={embedCode}
                />
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  Copy Code
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="relative border p-4 rounded-lg bg-card text-card-foreground shadow-sm h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute top-4 left-4 text-sm text-muted-foreground">
            Preview Area
          </div>
          {/* The widget will be fixed positioned, but restricted by the iframe conceptually if we were fully isolating it. 
                        For this preview, it just floats on the page. */}
          <ChatbotWidget />
        </div>
      </div>
    </div>
  );
}
