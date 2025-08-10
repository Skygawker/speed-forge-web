import Seo from "@/components/Seo";

const YouTube = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container py-12">
        <Seo
          title="Latest YouTube Videos | 2b2t Community"
          description="Newest 2b2t videos from selected channels."
          canonicalPath="/youtube"
        />
        <h1 className="text-3xl font-semibold mb-2">Latest YouTube Videos</h1>
        <nav className="mb-6 text-sm text-muted-foreground" aria-label="Secondary">
          <a href="/proxy-guide" className="hover:underline">Read the Proxy Guide</a>
        </nav>
        <p className="text-muted-foreground mb-8">
          After we enable the admin + Supabase, this page will automatically pull from your selected channels.
        </p>
        <section className="grid gap-6 md:grid-cols-3">
          {[1,2,3].map((i) => (
            <article key={i} className="rounded-lg border bg-card p-4 shadow-sm">
              <div className="aspect-video rounded-md bg-muted" />
              <h2 className="mt-3 font-medium">Video title</h2>
              <p className="text-sm text-muted-foreground">Channel • Date</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default YouTube;
