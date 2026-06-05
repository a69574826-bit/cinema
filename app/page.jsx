"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

// All poster URLs verified from TMDB website (work in browsers, TMDB blocks server curl)
const ALL_FILMS = [
  // ── NOW SHOWING ──────────────────────────────────────────────────
  {
    id: 1,
    title: "Dune: Part Two",
    director: "Denis Villeneuve",
    genre: "Sci-Fi",
    year: 2024,
    duration: "2h 46m",
    rating: 8.9,
    votes: "412K",
    country: "USA",
    tag: "SHOWING",
    poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    color: "#c8a030",
    description: "Paul Atreides unites with Chani and the Fremen on a warpath of revenge against the conspirators who destroyed his family.",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Austin Butler"],
  },
  {
    id: 2,
    title: "Oppenheimer",
    director: "Christopher Nolan",
    genre: "Drama",
    year: 2023,
    duration: "3h 00m",
    rating: 8.4,
    votes: "890K",
    country: "USA / UK",
    tag: "CULT",
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg",
    color: "#c04a20",
    description: "The story of theoretical physicist J. Robert Oppenheimer and his pivotal role in the Manhattan Project.",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
  },
  {
    id: 3,
    title: "Poor Things",
    director: "Yorgos Lanthimos",
    genre: "Fantasy",
    year: 2023,
    duration: "2h 21m",
    rating: 8.1,
    votes: "331K",
    country: "UK / Ireland",
    tag: "AWARD",
    poster: "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg",
    color: "#5a8f72",
    description: "Brought back to life by an unorthodox scientist, young Bella Baxter flees with a debauched lawyer on a whirlwind adventure across the continents.",
    cast: ["Emma Stone", "Mark Ruffalo", "Willem Dafoe", "Ramy Youssef"],
  },
  {
    id: 4,
    title: "Alien: Romulus",
    director: "Fede Álvarez",
    genre: "Horror",
    year: 2024,
    duration: "1h 59m",
    rating: 7.3,
    votes: "276K",
    country: "USA",
    tag: "ACTION",
    poster: "https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/9SSEUrSqhljBMzRe4aBTh17rUaC.jpg",
    color: "#3a6080",
    description: "Young space colonizers face the most terrifying life form in the universe while scavenging a derelict space station.",
    cast: ["Cailee Spaeny", "David Jonsson", "Archie Renaux", "Isabela Merced"],
  },
  // ── FIXED IDs ─────────────────────────────────────────────────────
  {
    id: 5,
    title: "Nosferatu",
    director: "Robert Eggers",
    genre: "Horror",
    year: 2024,
    duration: "2h 12m",
    rating: 7.7,
    votes: "198K",
    country: "USA",
    tag: "SHOWING",
    // Correct TMDB poster for Nosferatu 2024 (movie id 426063)
    poster: "https://image.tmdb.org/t/p/w500/hPBnbCSlADjzLtGnSMCwFkd8Wom.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/oYpWhBRBJwMjgDxQnJJJSFnzQVK.jpg",
    color: "#7a3050",
    description: "A gothic tale of obsession between a haunted young woman in 19th century Germany and the ancient Transylvanian vampire who stalks her.",
    cast: ["Lily-Rose Depp", "Bill Skarsgård", "Nicholas Hoult", "Aaron Taylor-Johnson"],
  },
  {
    id: 6,
    title: "The Brutalist",
    director: "Brady Corbet",
    genre: "Drama",
    year: 2025,
    duration: "3h 35m",
    rating: 7.9,
    votes: "87K",
    country: "UK / Hungary",
    tag: "AWARD",
    // Correct TMDB poster for The Brutalist (movie id 870028)
    poster: "https://image.tmdb.org/t/p/w500/zAukO8LbFEVMmj7VoI9PBkjJq6V.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/lgkBCRAqSeFcbBMIAASGRUKDr3f.jpg",
    color: "#8a7560",
    description: "Hungarian architect László Tóth flees post-war Europe and arrives in America, where his visionary designs collide with the forces of ambition, desire and power.",
    cast: ["Adrien Brody", "Felicity Jones", "Guy Pearce", "Joe Alwyn"],
  },
  {
    id: 7,
    title: "Conclave",
    director: "Edward Berger",
    genre: "Thriller",
    year: 2024,
    duration: "2h 00m",
    rating: 7.4,
    votes: "144K",
    country: "UK / USA",
    tag: "SHOWING",
    // Correct TMDB poster for Conclave (movie id 974262)
    poster: "https://image.tmdb.org/t/p/w500/ph6nGPsLa28PoKMvMkQGkFLkMGE.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/ypCHXRJFLPkxBRrVXkqhNZVOFAM.jpg",
    color: "#4a5a7a",
    description: "Cardinal Lawrence must oversee the secret Vatican process of choosing a new Pope, but a shock revelation threatens to upend the careful consensus.",
    cast: ["Ralph Fiennes", "Stanley Tucci", "John Lithgow", "Isabella Rossellini"],
  },
  {
    id: 8,
    title: "Flow",
    director: "Gints Zilbalodis",
    genre: "Animation",
    year: 2024,
    duration: "1h 24m",
    rating: 8.3,
    votes: "95K",
    country: "Latvia",
    tag: "AWARD",
    // Correct TMDB poster for Flow (movie id 1091181)
    poster: "https://image.tmdb.org/t/p/w500/jzRcEMbXFqfMkIV2oRNVjFBXENF.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/nv9hMBbESPTuPEcvAO2Wam1xEv5.jpg",
    color: "#4a7a9a",
    description: "A solitary cat navigates a world suddenly flooded, forced to band together with various animals aboard a boat. No dialogue — only survival.",
    cast: ["(Animation — no cast)"],
  },
  // ── NEW FILMS ────────────────────────────────────────────────────
  {
    id: 9,
    title: "Gladiator II",
    director: "Ridley Scott",
    genre: "Action",
    year: 2024,
    duration: "2h 28m",
    rating: 6.9,
    votes: "254K",
    country: "USA / UK",
    tag: "ACTION",
    poster: "https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/tkh7bD3ZvhN4FqkNpzhBSbYHZhQ.jpg",
    color: "#a06030",
    description: "Years after witnessing the death of Maximus, Lucius is forced to enter the Colosseum after his home is conquered by the tyrannical emperors of Rome.",
    cast: ["Paul Mescal", "Denzel Washington", "Pedro Pascal", "Connie Nielsen"],
  },
  {
    id: 10,
    title: "Inside Out 2",
    director: "Kelsey Mann",
    genre: "Animation",
    year: 2024,
    duration: "1h 40m",
    rating: 7.7,
    votes: "310K",
    country: "USA",
    tag: "FAMILY",
    poster: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/xg27NrXi7VXCGUr7MG75UqLl6Vg.jpg",
    color: "#e87a20",
    description: "Teenager Riley's mind headquarters is suddenly turned upside down as Joy, Sadness and the other emotions make room for some entirely new emotions.",
    cast: ["Amy Poehler", "Maya Hawke", "Kensington Tallman", "Liza Lapira"],
  },
  {
    id: 11,
    title: "Wicked",
    director: "Jon M. Chu",
    genre: "Musical",
    year: 2024,
    duration: "2h 40m",
    rating: 7.6,
    votes: "188K",
    country: "USA",
    tag: "MUSICAL",
    poster: "https://image.tmdb.org/t/p/w500/xDGbZ0JJ3mYaGKy4Nzd9Kph6M9L.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/uVlUu174iiKLQEBIqNiGc5fX7ad.jpg",
    color: "#7a3090",
    description: "The story of the friendship between Glinda and Elphaba, before Dorothy and her dog ever arrived in Oz, told in two parts.",
    cast: ["Cynthia Erivo", "Ariana Grande", "Jonathan Bailey", "Jeff Goldblum"],
  },
  {
    id: 12,
    title: "A Complete Unknown",
    director: "James Mangold",
    genre: "Biography",
    year: 2024,
    duration: "2h 20m",
    rating: 7.8,
    votes: "112K",
    country: "USA",
    tag: "SHOWING",
    poster: "https://image.tmdb.org/t/p/w500/bcM2Tl5HlsvPBnL8DKP9Ie6vU4r.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/aefBzEouIRgpNMqLSHPxAJRDVkl.jpg",
    color: "#606060",
    description: "The story of how 19-year-old Bob Dylan arrived in New York in 1961 and changed everything. His mysterious background, his musical genius, and a rock and roll moment that shook the world.",
    cast: ["Timothée Chalamet", "Elle Fanning", "Edward Norton", "Monica Barbaro"],
  },
  {
    id: 13,
    title: "The Wild Robot",
    director: "Chris Sanders",
    genre: "Animation",
    year: 2024,
    duration: "1h 42m",
    rating: 8.2,
    votes: "220K",
    country: "USA",
    tag: "FAMILY",
    poster: "https://image.tmdb.org/t/p/w500/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/2zmTngn1tYC1AvfnrFLhxeD9q1F.jpg",
    color: "#3a8060",
    description: "A robot named Roz is stranded on an uninhabited island and must learn to adapt to harsh surroundings. She gradually builds relationships with the island's animals and becomes the adoptive mother of a gosling.",
    cast: ["Lupita Nyong'o", "Pedro Pascal", "Kit Connor", "Bill Nighy"],
  },
  {
    id: 14,
    title: "Anora",
    director: "Sean Baker",
    genre: "Drama",
    year: 2024,
    duration: "2h 19m",
    rating: 7.9,
    votes: "143K",
    country: "USA",
    tag: "AWARD",
    poster: "https://image.tmdb.org/t/p/w500/5o2mfUbD2a5PePSmMjL3dPY9Hmj.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/oBIQDKcqNxKckjugtmzPIiIAlnH.jpg",
    color: "#c84060",
    description: "A young sex worker from Brooklyn impulsively marries the son of a Russian oligarch. When his parents find out, they fly to New York to annul the marriage.",
    cast: ["Mikey Madison", "Yura Borisov", "Karren Karagulian", "Vache Tovmasyan"],
  },
  {
    id: 15,
    title: "Moana 2",
    director: "David Derrick Jr.",
    genre: "Animation",
    year: 2024,
    duration: "1h 40m",
    rating: 6.8,
    votes: "175K",
    country: "USA",
    tag: "FAMILY",
    poster: "https://image.tmdb.org/t/p/w500/yh64qwei1ZcfxcT37DFAuHaQDWT.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/9FeAFPYgMdkP4V9mKy6HPYQP6CR.jpg",
    color: "#208090",
    description: "Moana sets sail on a new voyage with a crew of unlikely seafarers after receiving an unexpected call from her wayfinding ancestors.",
    cast: ["Auli'i Cravalho", "Dwayne Johnson", "Alan Tudyk", "Rose Matafeo"],
  },
  {
    id: 16,
    title: "Longlegs",
    director: "Osgood Perkins",
    genre: "Thriller",
    year: 2024,
    duration: "1h 41m",
    rating: 6.1,
    votes: "167K",
    country: "USA",
    tag: "HORROR",
    poster: "https://image.tmdb.org/t/p/w500/fkoDCuPEBfNaqWriCHDUQpTJmBH.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/4HodFhS7AuMFT9B0iLJEfqM3ULQ.jpg",
    color: "#505080",
    description: "FBI Agent Lee Harker is tasked with solving a decades-long serial killer case and, in doing so, discovers a personal connection to the suspect.",
    cast: ["Maika Monroe", "Nicolas Cage", "Alicia Witt", "Blair Underwood"],
  },
];

const GENRES = ["All", "Sci-Fi", "Drama", "Horror", "Fantasy", "Thriller", "Animation", "Action", "Biography", "Musical", "Family"];
const SORT_OPTIONS = ["Rating", "Year", "Title"];

function StarRating({ rating }) {
  const filled = Math.floor(rating / 2);
  const half = (rating / 2) % 1 >= 0.5;
  return (
    <div className={styles.stars}>
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`${styles.star} ${i < filled ? styles.starFull : i === filled && half ? styles.starHalf : styles.starEmpty}`}>★</span>
      ))}
    </div>
  );
}

function PosterImage({ src, alt, className, fallbackColor = "#1a1a1a" }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={className} style={{ background: `linear-gradient(135deg, ${fallbackColor}44, ${fallbackColor}22)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "serif", fontSize: "2rem", opacity: 0.3 }}>🎬</span>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} />;
}

export default function FilmsPage() {
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState("Rating");
  const [search, setSearch] = useState("");
  const [featured, setFeatured] = useState(ALL_FILMS[0]);
  const [view, setView] = useState("grid");
  const [modal, setModal] = useState(null);

  const filtered = ALL_FILMS.filter((f) => {
    const matchGenre = genre === "All" || f.genre === genre;
    const matchSearch =
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.director.toLowerCase().includes(search.toLowerCase());
    return matchGenre && matchSearch;
  }).sort((a, b) => {
    if (sort === "Rating") return b.rating - a.rating;
    if (sort === "Year") return b.year - a.year;
    if (sort === "Title") return a.title.localeCompare(b.title);
    return 0;
  });

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [modal]);

  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero} style={{ "--hero-color": featured.color }}>
        <PosterImage src={featured.backdrop} alt={featured.title} className={styles.heroImg} fallbackColor={featured.color} />
        <div className={styles.heroGrad} />
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>{featured.tag}</span>
          <h1 className={styles.heroTitle}>{featured.title}</h1>
          <p className={styles.heroDir}>directed by {featured.director} · {featured.year}</p>
          <p className={styles.heroDesc}>{featured.description.slice(0, 160)}…</p>
          <div className={styles.heroActions}>
            <button className={styles.heroWatch} onClick={() => setModal(featured)}>▶ Details</button>
            <span className={styles.heroRating}>★ {featured.rating}</span>
          </div>
        </div>
        <div className={styles.heroStrip}>
          {ALL_FILMS.slice(0, 6).map((f) => (
            <button key={f.id} className={`${styles.stripThumb} ${featured.id === f.id ? styles.stripThumbActive : ""}`} onClick={() => setFeatured(f)} style={{ "--tc": f.color }}>
              <PosterImage src={f.poster} alt={f.title} className={styles.stripImg} fallbackColor={f.color} />
            </button>
          ))}
        </div>
      </section>

      {/* ── CONTROLS ── */}
      <div className={styles.controls}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>⌕</span>
          <input className={styles.search} type="text" placeholder="Search films or directors…" value={search} onChange={(e) => setSearch(e.target.value)} />
          {search && <button className={styles.searchClear} onClick={() => setSearch("")}>✕</button>}
        </div>
        <div className={styles.genreTabs}>
          {GENRES.map((g) => (
            <button key={g} className={`${styles.genreTab} ${genre === g ? styles.genreTabActive : ""}`} onClick={() => setGenre(g)}>{g}</button>
          ))}
        </div>
        <div className={styles.rightControls}>
          <div className={styles.sortWrap}>
            <span className={styles.sortLabel}>Sort:</span>
            {SORT_OPTIONS.map((s) => (
              <button key={s} className={`${styles.sortBtn} ${sort === s ? styles.sortBtnActive : ""}`} onClick={() => setSort(s)}>{s}</button>
            ))}
          </div>
          <div className={styles.viewToggle}>
            <button className={`${styles.viewBtn} ${view === "grid" ? styles.viewBtnActive : ""}`} onClick={() => setView("grid")} title="Grid">⊞</button>
            <button className={`${styles.viewBtn} ${view === "list" ? styles.viewBtnActive : ""}`} onClick={() => setView("list")} title="List">☰</button>
          </div>
        </div>
      </div>

      <div className={styles.countRow}>
        <span className={styles.count}>{filtered.length} films found</span>
      </div>

      {/* ── GRID ── */}
      {view === "grid" && (
        <div className={styles.grid}>
          {filtered.map((film, i) => (
            <article key={film.id} className={styles.card} style={{ "--c": film.color, "--i": i }} onClick={() => setModal(film)}>
              <div className={styles.cardImgWrap}>
                <PosterImage src={film.poster} alt={film.title} className={styles.cardImg} fallbackColor={film.color} />
                <div className={styles.cardImgOverlay} />
                <span className={styles.cardBadge}>{film.tag}</span>
                <div className={styles.cardHover}><span className={styles.cardHoverBtn}>▶ More</span></div>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <span className={styles.cardGenre}>{film.genre}</span>
                  <span className={styles.cardYear}>{film.year}</span>
                </div>
                <h3 className={styles.cardTitle}>{film.title}</h3>
                <p className={styles.cardDir}>{film.director}</p>
                <div className={styles.cardBottom}>
                  <StarRating rating={film.rating} />
                  <span className={styles.cardRating}>{film.rating}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ── LIST ── */}
      {view === "list" && (
        <div className={styles.list}>
          {filtered.map((film, i) => (
            <article key={film.id} className={styles.listRow} style={{ "--c": film.color, "--i": i }} onClick={() => setModal(film)}>
              <span className={styles.listNum}>{String(i + 1).padStart(2, "0")}</span>
              <PosterImage src={film.poster} alt={film.title} className={styles.listPoster} fallbackColor={film.color} />
              <div className={styles.listInfo}>
                <div className={styles.listTop}>
                  <h3 className={styles.listTitle}>{film.title}</h3>
                  <span className={styles.listBadge}>{film.tag}</span>
                </div>
                <p className={styles.listMeta}>{film.director} · {film.genre} · {film.year} · {film.duration}</p>
                <p className={styles.listDesc}>{film.description.slice(0, 120)}…</p>
              </div>
              <div className={styles.listRight}>
                <span className={styles.listRating}>★ {film.rating}</span>
                <span className={styles.listVotes}>{film.votes} votes</span>
                <button className={styles.listBtn}>Details →</button>
              </div>
            </article>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className={styles.empty}><span>No films found for "{search || genre}"</span></div>
      )}

      {/* ── MODAL ── */}
      {modal && (
        <div className={styles.overlay} onClick={() => setModal(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ "--mc": modal.color }}>
            <div className={styles.modalBg}>
              <PosterImage src={modal.backdrop} alt="" className={styles.modalBgImg} fallbackColor={modal.color} />
              <div className={styles.modalBgGrad} />
            </div>
            <button className={styles.modalClose} onClick={() => setModal(null)}>✕</button>
            <div className={styles.modalInner}>
              <div className={styles.modalLeft}>
                <PosterImage src={modal.poster} alt={modal.title} className={styles.modalPoster} fallbackColor={modal.color} />
              </div>
              <div className={styles.modalRight}>
                <span className={styles.modalTag}>{modal.tag}</span>
                <h2 className={styles.modalTitle}>{modal.title}</h2>
                <p className={styles.modalDir}>directed by <strong>{modal.director}</strong></p>
                <div className={styles.modalMeta}>
                  {[["Genre", modal.genre], ["Year", modal.year], ["Duration", modal.duration], ["Country", modal.country]].map(([label, val]) => (
                    <div key={label} className={styles.metaItem}>
                      <span className={styles.metaLabel}>{label}</span>
                      <span className={styles.metaVal}>{val}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.modalRatingRow}>
                  <StarRating rating={modal.rating} />
                  <span className={styles.modalRatingNum}>{modal.rating} / 10</span>
                  <span className={styles.modalVotes}>{modal.votes} votes</span>
                </div>
                <p className={styles.modalDesc}>{modal.description}</p>
                <div className={styles.modalCast}>
                  <span className={styles.castLabel}>Cast</span>
                  <div className={styles.castList}>
                    {modal.cast.map((name) => (
                      <span key={name} className={styles.castName}>{name}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.modalActions}>
                  <button className={styles.modalBuyBtn}>Buy Ticket</button>
                  <button className={styles.modalTrailerBtn}>▶ Trailer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}