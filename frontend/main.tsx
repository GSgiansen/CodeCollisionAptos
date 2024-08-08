import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/App";
import { WalletProvider } from "@/components/WalletProvider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { createClient } from '@supabase/supabase-js';

const queryClient = new QueryClient();
const supabaseUrl = "https://iqxjdbiwzpwzfvomtsvt.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxeGpkYml3enB3emZ2b210c3Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4NjgyNjcsImV4cCI6MjAzODQ0NDI2N30.Et8tXA4J2BqpkBvArFf1r5Da1CKwGxinO4bUg0xKzwI"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WalletProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={100}>
          <App />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </WalletProvider>
  </React.StrictMode>,
);
