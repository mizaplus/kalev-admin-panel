import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

function App() {
  return (
    <div className="flex min-h-screen w-screen bg-slate-50 text-slate-900">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-[#f6f8fb] p-10">
          <div className="grid min-h-[60vh] place-content-center rounded-3xl border border-dashed border-muted-foreground/30 bg-white/80 text-sm text-muted-foreground">
            Content placeholder
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
