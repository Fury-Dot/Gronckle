import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import GemsPage from "./pages/GemsPage";
import CommunityPage from "./pages/CommunityPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import { createClient } from "@/lib/supabase/client";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      // Check if user is admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();

      setIsAuthorized(!!profile?.is_admin);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : <Navigate to="/" replace />;
};

const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <main id="main-content" tabIndex={-1} className="focus:outline-none">
      <Routes>
        <Route 
          path="/" 
          element={
            <AuthGate>
              <Index />
            </AuthGate>
          } 
        />
        <Route 
          path="/gems" 
          element={
            <AuthGate>
              <GemsPage />
            </AuthGate>
          } 
        />
        <Route 
          path="/community" 
          element={
            <AuthGate>
              <CommunityPage />
            </AuthGate>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <AuthGate>
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            </AuthGate>
          } 
        />
        <Route path="/login" element={<LoginPage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
