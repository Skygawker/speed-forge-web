import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCallback } from "react";
import { useCmsText } from "@/hooks/useCmsText";

const Index = () => {
  const { toast } = useToast();
  
  // Use CMS text hooks for editable content
  const { text: siteTitle } = useCmsText("site_title", "2b2t Community Hub");
  const { text: heroTitle } = useCmsText("hero_title", "2b2t Community Hub");
  const { text: heroDescription } = useCmsText("hero_description", "Home for players of 2b2t.org — get the latest news, community guides, and event info. Connect, share, and survive.");
  const { text: discordButtonText } = useCmsText("discord_button_text", "Join Discord");
  const { text: serverIpButtonText } = useCmsText("server_ip_button_text", "Copy Server IP");
  const { text: newsTitle } = useCmsText("news_title", "Latest News");
  const { text: guidesTitle } = useCmsText("guides_title", "Starter Guides");
  const { text: eventsTitle } = useCmsText("events_title", "Upcoming Events");
  const { text: eventsDescription } = useCmsText("events_description", "Post your event details here.");
  const { text: footerText } = useCmsText("footer_text", "Not affiliated with 2b2t.org. Community fan site.");

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
          <a href="/" className="text-xl font-semibold">{siteTitle}</a>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <a href="/youtube" className="hover:underline">YouTube</a>
            <a href="/proxy-guide" className="hover:underline">Proxy Guide</a>
            <a href="/players" className="hover:underline">Players</a>
            <a href="/projects" className="hover:underline">Projects</a>
            <a href="/shops" className="hover:underline">Shops</a>
            <a href="/clans" className="hover:underline">Clans</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="container py-16 text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-4">{heroTitle}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {heroDescription}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">{discordButtonText}</a>
            </Button>
            <Button variant="outline" onClick={copyIP}>{serverIpButtonText}</Button>
          </div>
        </section>

        <section id="news" className="container py-12">
          <h2 className="text-2xl font-semibold mb-6">{newsTitle}</h2>
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
          <h2 className="text-2xl font-semibold mb-6">{guidesTitle}</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            <li className="rounded-lg border bg-card p-4">Queue tips and client setup</li>
            <li className="rounded-lg border bg-card p-4">Travel routes and survival basics</li>
          </ul>
        </section>

        <section id="events" className="container py-12">
          <h2 className="text-2xl font-semibold mb-6">{eventsTitle}</h2>
          <p className="text-muted-foreground">{eventsDescription}</p>
        </section>
      </main>

      <footer className="border-t">
        <div className="container py-8 text-center text-sm text-muted-foreground">
          {footerText} • <a href="/admin" className="underline underline-offset-2">Admin</a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
