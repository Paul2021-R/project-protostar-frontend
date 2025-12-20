export default function SettingPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="bg-card text-card-foreground p-6 rounded-lg shadow-sm border space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Account Settings</h3>
          <p className="text-sm text-muted-foreground">
            Manage your account details here.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Invitation Code</h3>
          <input
            type="text"
            placeholder="Enter code"
            className="border p-2 rounded w-full max-w-sm bg-background text-foreground"
          />
        </div>
        <div>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded font-medium text-sm">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
