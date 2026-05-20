import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { clients, type ClientSector } from "../data/clients";
import ClientCard from "../components/ClientCard";
import "./ClientsPage.css";

const sectors: ("All" | ClientSector)[] = [
  "All",
  ...Array.from(new Set(clients.map((c) => c.sector))) as ClientSector[],
];

const ClientsPage = () => {
  const [filter, setFilter] = useState<(typeof sectors)[number]>("All");
  const [query, setQuery] = useState("");
  const { hash } = useLocation();

  // If the URL has e.g. #lifebit, expand that card and scroll to it.
  const initiallyOpen = hash ? hash.replace("#", "") : null;

  useEffect(() => {
    if (!initiallyOpen) return;
    const el = document.getElementById(initiallyOpen);
    if (el) {
      // Wait a frame so layout settles before scrolling.
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [initiallyOpen]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clients.filter((c) => {
      if (filter !== "All" && c.sector !== filter) return false;
      if (!q) return true;
      const hay = [
        c.company,
        c.role,
        c.headline,
        ...c.stack,
        ...(c.ribbons ?? []),
        ...c.projects.flatMap((p) => [p.title, ...p.bullets]),
        ...c.highlights,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [filter, query]);

  return (
    <main className="clients-page">
      <header className="clients-page__header container-narrow">
        <span className="eyebrow">CLIENTS · 2017 – PRESENT</span>
        <h1>Where I've delivered</h1>
        <p className="clients-page__lede">
          Ten engagements across gaming, industry, fintech, healthtech, edtech,
          retail and medical — with a consistent throughline of Identity &amp;
          Access, endpoint security, and compliance. Click any card to see the
          full project list, tools, and outcomes for that engagement.
        </p>

        <div className="clients-page__controls">
          <input
            type="search"
            className="clients-page__search"
            placeholder="Search tools, projects, frameworks… (e.g. SailPoint, FedRAMP, Terraform)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Filter clients"
          />
          <div className="clients-page__chips" role="tablist" aria-label="Sector filter">
            {sectors.map((s) => (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={filter === s}
                className={`clients-page__chip ${filter === s ? "is-active" : ""}`}
                onClick={() => setFilter(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="clients-page__list container-narrow">
        {filtered.length === 0 && (
          <p className="clients-page__empty">
            No clients match that filter. Try a different sector or search term.
          </p>
        )}
        {filtered.map((c) => (
          <ClientCard
            key={c.slug}
            client={c}
            defaultOpen={initiallyOpen === c.slug}
          />
        ))}
      </section>
    </main>
  );
};

export default ClientsPage;
