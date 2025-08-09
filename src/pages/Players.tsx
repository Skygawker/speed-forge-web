import Seo from "@/components/Seo";

const Players = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container py-12">
        <Seo
          title="Famous 2b2t Players (RU) | 2b2t Community"
          description="Curated list of notable Russian 2b2t players."
          canonicalPath="/players"
        />
        <h1 className="text-3xl font-semibold mb-4">Famous Players — Russian Community</h1>
        <p className="text-muted-foreground mb-8">Manage this list in the upcoming admin panel.</p>
        <section className="grid gap-6 md:grid-cols-3">
          {["Player One","Player Two","Player Three"].map((name) => (
            <article key={name} className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <img src="/placeholder.svg" alt={`${name} avatar placeholder`} className="h-12 w-12 rounded-full border" />
                <div>
                  <h2 className="font-medium">{name}</h2>
                  <p className="text-sm text-muted-foreground">Notable achievements summary</p>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Players;
