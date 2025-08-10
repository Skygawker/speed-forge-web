import Seo from "@/components/Seo";

const ProxyGuide = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Proxy Guide for 2b2t | Safe Access Tutorial"
        description="Step-by-step 2b2t proxy guide: requirements, setup, safety tips, and FAQs to help players connect reliably."
        canonicalPath="/proxy-guide"
      />
      <main className="container py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold">2b2t Proxy Guide</h1>
          <p className="text-muted-foreground">
            Learn how to safely use a proxy for connecting to 2b2t. This guide covers setup, best practices, and safety tips.
          </p>
        </header>

        <nav aria-label="Guide sections" className="mb-8">
          <ul className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <li><a className="hover:underline" href="#what-is-proxy">What is a proxy?</a></li>
            <li><a className="hover:underline" href="#requirements">Requirements</a></li>
            <li><a className="hover:underline" href="#setup">Setup</a></li>
            <li><a className="hover:underline" href="#safety">Safety</a></li>
            <li><a className="hover:underline" href="#faq">FAQs</a></li>
          </ul>
        </nav>

        <section id="what-is-proxy" className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">What is a proxy?</h2>
          <p className="text-muted-foreground">
            A proxy routes your connection through another server. Players use proxies to manage queue sessions, improve stability,
            or route traffic differently. Use only trusted proxies and follow server rules.
          </p>
        </section>

        <section id="requirements" className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Requirements</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li>Minecraft client (e.g., vanilla or popular clients compatible with 2b2t)</li>
            <li>Proxy address and port from a trusted source</li>
            <li>Stable internet connection</li>
          </ul>
        </section>

        <section id="setup" className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Setup</h2>
          <ol className="list-decimal pl-6 text-muted-foreground space-y-1">
            <li>Open your Minecraft client and go to Multiplayer.</li>
            <li>Add a new server using the proxy address (format: host:port).</li>
            <li>Join the server and wait in queue as usual.</li>
            <li>Once connected, verify chat and movement to ensure stability.</li>
          </ol>
          <p className="text-sm text-muted-foreground mt-3">
            Tip: Save both the original 2b2t IP and proxy entry to switch easily if needed.
          </p>
        </section>

        <section id="safety" className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Safety and Best Practices</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li>Use proxies shared by trusted community sources.</li>
            <li>Never share your account credentials with anyone.</li>
            <li>Be cautious of clients or mods that promise queue skipping.</li>
            <li>Monitor latency and disconnect if behavior looks suspicious.</li>
          </ul>
        </section>

        <section id="faq" className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Frequently Asked Questions</h2>
          <article className="mb-4">
            <h3 className="font-medium">Do proxies skip the queue?</h3>
            <p className="text-muted-foreground">No. Proxies do not skip the queue; they only route your connection.</p>
          </article>
          <article className="mb-4">
            <h3 className="font-medium">Is this allowed?</h3>
            <p className="text-muted-foreground">Policies can change; use at your own risk and follow community guidelines.</p>
          </article>
        </section>

        <aside className="rounded-lg border bg-card p-4 text-sm text-muted-foreground">
          This page is a living guide. Updates will be posted as the community standard changes.
        </aside>
      </main>
    </div>
  );
};

export default ProxyGuide;
