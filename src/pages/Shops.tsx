import Seo from "@/components/Seo";

const Shops = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container py-12">
        <Seo
          title="Shops & Scam Reports | 2b2t Community"
          description="Directory of shops with trust ratings and scam warnings."
          canonicalPath="/shops"
        />
        <h1 className="text-3xl font-semibold mb-4">Shops — Trust & Scam Warnings</h1>
        <p className="text-muted-foreground mb-8">Mark shops as trusted or flagged via the admin panel soon.</p>
        <section className="grid gap-6 md:grid-cols-2">
          {[1,2,3,4].map((i) => (
            <article key={i} className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-medium">Shop Name</h2>
                  <p className="text-sm text-muted-foreground">Owner / Contact</p>
                </div>
                <span className="rounded-full bg-secondary px-2 py-1 text-xs">Trusted</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">Notes about stock, reliability, and reports.</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Shops;
