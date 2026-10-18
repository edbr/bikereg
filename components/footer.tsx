import { person, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="container-shell flex flex-col gap-2 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>FrameProof helps riders prove ownership and verify authenticity.</p>
        <div className="space-y-2">
          <p>Built by <a href={person.url} className="underline underline-offset-4">{person.name}</a></p>
          <nav aria-label="Project information" className="flex flex-wrap gap-4">
            <a href={site.writeupUrl} className="hover:underline">About this project</a>
            <a href="https://eduardobelluti.com/projects/personal" className="hover:underline">More projects</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
