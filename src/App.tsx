import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-900">
      <Sidebar />
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-[#f6f8fb] p-8">
          <div className="grid min-h-[60vh] place-content-center rounded-3xl border border-dashed border-muted-foreground/30 bg-white/80 text-xs text-muted-foreground">
            Content placeholder
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
