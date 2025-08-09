import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCallback } from "react";

const Index = () => {
  const { toast } = useToast();

  const copyIP = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("2b2t.org");
      toast({ title: "Server IP copied", description: "2b2t.org has been copied to your clipboard." });
    } catch (e) {
      toast({ title: "Copy failed", description: "Please copy the IP manually: 2b2t.org" });
    }
  }, [toast]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="container py-6 flex items-center justify-between">
          <a href="/" className="text-xl font-semibold">2b2t Community Hub</a>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <a href="/youtube" className="hover:underline">YouTube</a>
            <a href="/players" className="hover:underline">Players</a>
            <a href="/projects" className="hover:underline">Projects</a>
            <a href="/shops" className="hover:underline">Shops</a>
            <a href="/clans" className="hover:underline">Clans</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="container py-16 text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-4">2b2t Community Hub</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Home for players of 2b2t.org — get the latest news, community guides, and event info. Connect, share, and survive.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">Join Discord</a>
            </Button>
            <Button variant="outline" onClick={copyIP}>Copy Server IP</Button>
          </div>
        </section>

        <section id="news" className="container py-12">
          <h2 className="text-2xl font-semibold mb-6">Latest News</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="font-medium mb-2">Update your first post</h3>
              <p className="text-muted-foreground text-sm">Share recent base discoveries, queue changes, or client tips.</p>
            </article>
            <article className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="font-medium mb-2">Community spotlight</h3>
              <p className="text-muted-foreground text-sm">Feature a veteran, build, or history thread from the subreddit.</p>
            </article>
            <article className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="font-medium mb-2">Events and meetups</h3>
              <p className="text-muted-foreground text-sm">Announce coordinated journeys, art collabs, or lore sessions.</p>
            </article>
          </div>
        </section>

        <section id="guides" className="container py-12">
          <h2 className="text-2xl font-semibold mb-6">Starter Guides</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            <li className="rounded-lg border bg-card p-4">Queue tips and client setup</li>
            <li className="rounded-lg border bg-card p-4">Travel routes and survival basics</li>
          </ul>
        </section>

        <section id="events" className="container py-12">
          <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>
          <p className="text-muted-foreground">Post your event details here.</p>
        </section>
      </main>

      <footer className="border-t">
        <div className="container py-8 text-center text-sm text-muted-foreground">
          Not affiliated with 2b2t.org. Community fan site.
        </div>
      </footer>
    </div>
  );
};

export default Index;
