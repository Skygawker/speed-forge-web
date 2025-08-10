import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Seo from "@/components/Seo";
import { supabase } from "@/integrations/supabase/client";
import AdminTextEditor from "@/components/AdminTextEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ADMIN_EMAIL = "2b2tboy@gmail.com";

const Admin = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState<string>(ADMIN_EMAIL);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<import("@supabase/supabase-js").Session | null>(null);
  const [user, setUser] = useState<import("@supabase/supabase-js").User | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isAdmin = useMemo(() => user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase(), [user]);

  const sendMagicLink = async () => {
    try {
      if (!email) {
        toast({ title: "Email required", description: "Please enter your email address." });
        return;
      }
      if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        toast({ title: "Access restricted", description: "Only the admin email can sign in here." });
        return;
      }
      setLoading(true);
      const redirectUrl = `${window.location.origin}/admin`;
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectUrl },
      });
      if (error) throw error;
      toast({ title: "Check your email", description: "We sent a magic link to sign you in." });
    } catch (err: any) {
      toast({ title: "Sign-in failed", description: err.message || "Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast({ title: "Signed out" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Admin Dashboard | 2b2t Community"
        description="Secure admin dashboard for managing community content."
        canonicalPath="/admin"
      />
      <main className="container py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Restricted area. Only the site owner can access.</p>
        </header>

        {!user && (
          <section className="max-w-md rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="font-medium mb-2">Sign in</h2>
            <p className="text-sm text-muted-foreground mb-4">Use your admin email to receive a magic link.</p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button onClick={sendMagicLink} disabled={loading}>
                {loading ? "Sending..." : "Send magic link"}
              </Button>
            </div>
          </section>
        )}

        {user && !isAdmin && (
          <section className="max-w-xl rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="font-medium mb-2">Access denied</h2>
            <p className="text-sm text-muted-foreground mb-4">
              You are signed in as {user.email}. This page is restricted to the site owner.
            </p>
            <Button variant="outline" onClick={signOut}>Sign out</Button>
          </section>
        )}

        {user && isAdmin && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Signed in as</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <Button variant="outline" onClick={signOut}>Sign out</Button>
            </div>

            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Content Editor</TabsTrigger>
                <TabsTrigger value="pages">Page Management</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-6">
                <AdminTextEditor />
              </TabsContent>
              
              <TabsContent value="pages" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <article className="rounded-lg border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold mb-2">YouTube</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Managing channels will be enabled after we create database tables.
                    </p>
                    <div className="flex gap-3">
                      <Button asChild>
                        <a href="/youtube">Open YouTube page</a>
                      </Button>
                    </div>
                  </article>

                  <article className="rounded-lg border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold mb-2">Proxy Guide</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Draft and publish a proxy setup guide for your users.
                    </p>
                    <div className="flex gap-3">
                      <Button asChild>
                        <a href="/proxy-guide">Open Proxy Guide</a>
                      </Button>
                    </div>
                  </article>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-6">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="font-semibold mb-2">Site Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Additional settings and configurations will be added here.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </section>
        )}
      </main>
    </div>
  );
};

export default Admin;
