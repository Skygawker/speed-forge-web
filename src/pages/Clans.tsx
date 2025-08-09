import Seo from "@/components/Seo";

const Clans = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container py-12">
        <Seo
          title="Trusted Clans | 2b2t Community"
          description="List of trusted clans and how to join them."
          canonicalPath="/clans"
        />
        <h1 className="text-3xl font-semibold mb-4">Trusted Clans</h1>
        <p className="text-muted-foreground mb-8">You will curate this list from the admin panel.</p>
        <section className="grid gap-6 md:grid-cols-2">
          {[1,2,3,4].map((i) => (
            <article key={i} className="rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="font-medium">Clan Name</h2>
              <p className="text-sm text-muted-foreground">Focus, history, and how to apply.</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Clans;
