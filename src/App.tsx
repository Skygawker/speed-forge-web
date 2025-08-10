import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import YouTube from "./pages/YouTube";
import Players from "./pages/Players";
import Projects from "./pages/Projects";
import Shops from "./pages/Shops";
import Clans from "./pages/Clans";
import Admin from "./pages/Admin";
import ProxyGuide from "./pages/ProxyGuide";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/youtube" element={<YouTube />} />
          <Route path="/proxy-guide" element={<ProxyGuide />} />
          <Route path="/players" element={<Players />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/clans" element={<Clans />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
