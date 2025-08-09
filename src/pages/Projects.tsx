import Seo from "@/components/Seo";

const Projects = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container py-12">
        <Seo
          title="Live Projects on 2b2t | 2b2t Community"
          description="Track ongoing community projects and initiatives on 2b2t."
          canonicalPath="/projects"
        />
        <h1 className="text-3xl font-semibold mb-4">Community Projects</h1>
        <p className="text-muted-foreground mb-8">Project details will be editable from the admin panel.</p>
        <section className="grid gap-6 md:grid-cols-2">
          {[1,2,3,4].map((i) => (
            <article key={i} className="rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="font-medium mb-2">Project Title</h2>
              <p className="text-sm text-muted-foreground">Short description about goals, progress, and how to join.</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Projects;
