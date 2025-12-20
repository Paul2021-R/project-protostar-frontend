export default function ChatHistoryPage() {
  return (
    <div className="p-6 h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Chat History</h1>
      <div className="flex-1 border rounded-lg flex overflow-hidden bg-card text-card-foreground shadow-sm">
        <div className="w-1/3 border-r p-4">
          <p className="text-sm text-muted-foreground">Session List</p>
        </div>
        <div className="w-2/3 p-4 flex items-center justify-center">
          <p className="text-muted-foreground">
            Select a conversation to view details
          </p>
        </div>
      </div>
    </div>
  );
}
