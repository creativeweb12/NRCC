import { Link } from "react-router-dom";
import camelImage from "../img/camel.jpg";
import { getLatestNews } from "@/lib/news";

import { ChevronLeft, ChevronRight } from "lucide-react";


import React, {
  useEffect,
  useState,
  useRef,
} from "react";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import camel1 from "../../img/camel1.jpg";
import camel2 from "../../img/camel2.jpg";
import camel3 from "../../img/camel3.jpg";
import camel4 from "../../img/camel4.jpg";

const slides = [
  camel1,
  camel2,
  camel3,
  camel4,
];




const camelCards = [
  {
    id: 1,
    image: camel1,
    title: "Desert Camel Caravan",
    description:
      "Traditional camel caravan travelling across the desert dunes.",
  },

  {
    id: 2,
    image: camel2,
    title: "Camel Research",
    description:
      "Research and monitoring of camels in arid climatic conditions.",
  },

  {
    id: 3,
    image: camel3,
    title: "Camel Illustration",
    description:
      "Educational illustration representing desert ecosystem research.",
  },

  {
    id: 4,
    image: camel4,
    title: "Camel Expedition",
    description:
      "Camel expedition and livestock movement in desert environments.",
  },
];





  const menuItems = [
    {
      title: "About Us",
      submenu: ["Vision", "Mission", "History", "Leadership"],
    },
    {
      title: "Research",
      submenu: ["Projects", "Research Areas", "Innovation"],
    },
    {
      title: "Divisions & Sections",
      submenu: ["IT Division", "AI Section", "Research Labs"],
    },
    {
      title: "Publications",
      submenu: ["Annual Reports", "Research Papers", "Journals"],
    },
    {
      title: "News & Events",
      submenu: ["Latest News", "Events", "Gallery"],
    },
    {
      title: "Academics & Training",
      submenu: ["Courses", "Training", "Workshops"],
    },
    {
      title: "Recruitment",
      submenu: ["Current Openings", "Apply Online", "Results"],
    },
    {
      title: "Tenders",
      submenu: ["Open Tenders", "Closed Tenders"],
    },
    {
      title: "RTI",
      submenu: ["RTI Act", "RTI Officers", "Downloads"],
    },
    {
      title: "Downloads",
      submenu: ["PDF Files", "Forms", "Documents"],
    },
    {
      title: "Facilities",
      submenu: ["Library", "Laboratories", "Infrastructure"],
    },
    {
      title: "Contact Us",
      submenu: ["Phone", "Email", "Location"],
    },
  ];

 







import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaLinkedin,
  FaGithub,
}from "react-icons/fa";
const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebook />,
      link: "https://facebook.com",
      color: "bg-blue-600",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      link: "https://instagram.com",
      color: "bg-pink-500",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      link: "https://whatsapp.com",
      color: "bg-green-500",
    },
    {
      name: "YouTube",
      icon: <FaYoutube />,
      link: "https://youtube.com",
      color: "bg-red-600",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      link: "https://linkedin.com",
      color: "bg-blue-800",
    },
    {
      name: "GitHub",
      icon: <FaGithub />,
      link: "https://github.com",
      color: "bg-gray-900",
    },
  ];
  


  


// const news = [
//   { date: "12 May 2026", title: "Institute publishes 2025–26 Annual Report", href: "/publications/institutional-publications/annual-reports" },
//   { date: "08 May 2026", title: "International Workshop on Camel Genomics announced", href: "/news-and-events/events/workshops" },
//   { date: "02 May 2026", title: "Recruitment notification for Scientist (Reproduction)", href: "/recruitment/career-opportunities/current-openings" },
//   { date: "28 Apr 2026", title: "MoU signed with State Agricultural University", href: "/news-and-events/news/press-releases" },
// ];

const announcements = [
  { tag: "Tender", title: "Open Tender — Laboratory Equipment (Phase II)", href: "/tenders/active-tenders/open-tenders" },
  { tag: "Notice", title: "Office Order: Revised Working Hours – Summer 2026", href: "/downloads/circulars-and-notices/office-orders" },
  { tag: "Result", title: "Shortlisted Candidates — Technical Assistant", href: "/recruitment/results-and-notices/shortlisted-candidates" },
  { tag: "RTI", title: "Q1 2026 Disclosure Documents now available", href: "/rti/rti-documents/disclosure-documents" },
];


const research = [
  {
    title: "Camel Milk Genomics",
    desc: "Whole-genome sequencing programme to characterise functional traits of indigenous camel breeds.",
    href: "/research/research-divisions/biotechnology",
  },
  {
    title: "Climate-Resilient Nutrition",
    desc: "Designing arid-zone forage strategies to sustain productivity under heat stress.",
    href: "/research/research-divisions/camel-nutrition",
  },
  {
    title: "Therapeutic Camel Milk",
    desc: "Clinical evidence for camel milk applications in metabolic and autoimmune conditions.",
    href: "/research/research-programs/ongoing-projects",
  },
];

const events = [
  { day: "22", month: "May", title: "Workshop: Reproductive Biotechnology in Camelids", venue: "NRI Auditorium", href: "/news-and-events/events/workshops" },
  { day: "05", month: "Jun", title: "Farmer Training Programme — Kharif Season", venue: "Extension Block", href: "/academics-and-training/training-programs/farmer-training" },
  { day: "18", month: "Jun", title: "National Conference on Arid Animal Husbandry", venue: "Convention Centre", href: "/news-and-events/events/conferences" },
];

const publications = [
  { title: "Annual Report 2024–25", type: "Report", href: "/publications/institutional-publications/annual-reports" },
  { title: "Newsletter — Vol. 27, Issue 1", type: "Newsletter", href: "/publications/institutional-publications/newsletters" },
  { title: "Technical Bulletin: Camel Calf Management", type: "Bulletin", href: "/publications/institutional-publications/technical-bulletins" },
];

export default function HomePage() {
  /*
  ------------------------------------
  State
  ------------------------------------
  */
  const [news, setNews] = useState<any[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);

  /*
  ------------------------------------
  Load Latest News
  ------------------------------------
  */
  useEffect(() => {
    async function loadNews() {
      try {
        setLoadingNews(true);

        const posts = await getLatestNews(4);

        setNews(posts);
      } catch (error) {
        console.error("Error loading latest news:", error);
      } finally {
        setLoadingNews(false);
      }
    }

    loadNews();
  }, []);

  /*
  ------------------------------------
  Page Initialization
  ------------------------------------
  */
  useEffect(() => {
    document.title = "Home — National Research Institute";

    const metaDesc = document.querySelector(
      'meta[name="description"]'
    );

    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Welcome to the National Research Institute. Explore research, publications, tenders, recruitment notifications and more."
      );
    }

    /*
    ------------------------------------
    Initialize Jssor Slider
    ------------------------------------
    */

    if (!(window as any).$JssorSlider$) {
      console.warn("Jssor Slider not loaded.");
      return;
    }

    const transitions = [
      {
        $Duration: 1200,
        x: -0.3,
        $During: { $Left: [0.3, 0.7] },
        $Opacity: 2,
      },
      {
        $Duration: 1200,
        x: 0.3,
        $SlideOut: true,
        $Opacity: 2,
      },
    ];

    const slider = new (window as any).$JssorSlider$("jssor_1", {
      $AutoPlay: true,

      $SlideshowOptions: {
        $Class: (window as any).$JssorSlideshowRunner$,
        $Transitions: transitions,
        $TransitionsOrder: 1,
      },

      $ArrowNavigatorOptions: {
        $Class: (window as any).$JssorArrowNavigator$,
      },

      $BulletNavigatorOptions: {
        $Class: (window as any).$JssorBulletNavigator$,
      },

      $ThumbnailNavigatorOptions: {
        $Class: (window as any).$JssorThumbnailNavigator$,
        $Cols: 1,
        $Align: 0,
        $NoDrag: true,
      },
    });

    const scaleSlider = () => {
      const refSize = slider.$Elmt.parentNode.clientWidth;

      if (refSize) {
        slider.$ScaleWidth(Math.min(refSize, 600));
      }
    };

    scaleSlider();

    window.addEventListener("resize", scaleSlider);
    window.addEventListener("orientationchange", scaleSlider);

    return () => {
      window.removeEventListener("resize", scaleSlider);
      window.removeEventListener(
        "orientationchange",
        scaleSlider
      );
    };
  }, []);

  const sliderRef = useRef<HTMLDivElement>(null);


   /* LEFT SCROLL */

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -350,
        behavior: "smooth",
      });
    }
  };

  /* RIGHT SCROLL */

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 350,
        behavior: "smooth",
      });
    }
  };
 
  
  


const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };
  
  return (
    <>
{/* HERO SLIDER SECTION */}

<section className="relative h-screen w-full overflow-hidden">
  
  {/* Slider Container */}
  <div className="relative h-full w-full">

    {/* Slide 1 */}
    <div className="absolute inset-0">
      <img
        src="https://picsum.photos/id/1015/1920/1080"
        alt="Slide 1"
        className="h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
    </div>

    {/* Slide 2 */}
    <div className="absolute inset-0 animate-[fade_16s_infinite]">
      <img
        src="https://picsum.photos/id/1016/1920/1080"
        alt="Slide 2"
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50"></div>
    </div>

    {/* Slide 3 */}
    <div className="absolute inset-0 animate-[fade_24s_infinite]">
      <img
        src="https://picsum.photos/id/1018/1920/1080"
        alt="Slide 3"
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50"></div>
    </div>

    {/* Slide 4 */}
    <div className="absolute inset-0 animate-[fade_32s_infinite]">
      <img
        src="https://picsum.photos/id/1020/1920/1080"
        alt="Slide 4"
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50"></div>
    </div>



       <section className="relative h-screen w-screen overflow-hidden">
      {/* Full Screen Image */}
      <img
        src={slides[currentSlide]}
        alt={`Camel Slide ${currentSlide + 1}`}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      
 {/* Hero Content */}
    <div className="relative z-10 flex h-full items-center">
      <div className="mx-auto w-full max-w-7xl px-6">

        <div className="max-w-3xl">
          
          {/* Small Heading */}
          <p className="mb-4 text-sm font-semibold uppercase tracking-[4px] text-yellow-400">
            National Research Centre on Camel
          </p>

          {/* Main Title */}
          <h1 className="text-5xl font-extrabold leading-tight text-white md:text-7xl">
            Advancing Science.
            <br />
            Serving the Nation.
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200 md:text-xl">
            The National Research Centre on Camel is a premier ICAR institute
            dedicated to research, education, innovation and extension services
            in arid-zone animal sciences.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            
            <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
              Explore Research
            </button>

            <button className="rounded-lg border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-black">
              Learn More
            </button>

          </div>

        </div>

      </div>
    </div>

    
      {/* Left Arrow */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-4 text-white shadow-lg transition hover:bg-black/70"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Right Arrow */}
      <button
        type="button"
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-4 text-white shadow-lg transition hover:bg-black/70"
      >
        <ChevronRight size={32} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 rounded-full ${
              currentSlide === index
                ? "bg-white"
                : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>


   
  
  </div>
  <div
  id="jssor_1"
  style={{
    position: "relative",
    margin: "0 auto",
    top: 0,
    left: 0,
    width: "1200px",
    height: "600px",
    overflow: "hidden",
  }}
>
  <div
    data-u="slides"
    style={{
      cursor: "default",
      position: "relative",
      top: 0,
      left: 0,
      width: "1200px",
      height: "600px",
      overflow: "hidden",
    }}
  >
    <div>
      <img data-u="image" src={camel1} alt="" />
    </div>

    <div>
      <img data-u="image" src={camel2} alt="" />
    </div>

    <div>
      <img data-u="image" src={camel3} alt="" />
    </div>

    <div>
      <img data-u="image" src={camel4} alt="" />
    </div>
  </div>
</div>
</section>



        <div className="fixed left-1 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-1">

      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${social.color} flex h-7 w-7 items-center justify-center rounded-sm text-[10px] text-white shadow-md transition hover:scale-105`}
        >

          {/* Very Small Icon */}
          {social.icon}

        </a>
      ))}
    </div>





 

      {/* Quick Links */}
      <section aria-labelledby="quick-links-h" className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h2 id="quick-links-h" className="sr-only">
            Quick Links
          </h2>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-2">
        {/* Latest News */}
        <section aria-labelledby="news-h" className="rounded border border-border bg-card">
          <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
            <h2 id="news-h" className="text-lg font-bold text-foreground">
              Latest News
            </h2>
            <Link to="/news-and-events/news/latest-news" className="text-sm font-medium text-primary hover:underline">
              View all →
            </Link>
          </header>
         <ul className="news-list">
  {news.map((item) => (
    <React.Fragment key={item.id}>
      <li className="news-item">
        <Link to={item.href}>
          <span className="news-date" style={{ color:"Orange"}}> &nbsp; &nbsp;{item.date}</span>
          <h4> &nbsp; &nbsp;{item.title}</h4>
        </Link>
      </li>

      
        <hr
  style={{
    border: "none",
    borderTop: "0.1px solid lightgrey",
    margin: "4px 0",
  }}
/>
    
    </React.Fragment>
  ))}
</ul>
        </section>

        {/* Announcements */}
        <section aria-labelledby="ann-h" className="rounded border border-border bg-card">
          <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
            <h2 id="ann-h" className="text-lg font-bold text-foreground">
              Announcements
            </h2>
            <Link to="/news-and-events/news/announcements" className="text-sm font-medium text-primary hover:underline">
              View all →
            </Link>
          </header>
          <ul className="divide-y divide-border">
            {announcements.map((a) => (
              <li key={a.title}>
                <Link to={a.href} className="flex items-start gap-3 px-4 py-3 hover:bg-accent">
                  <span className="mt-0.5 inline-block rounded bg-india-green px-2 py-0.5 text-xs font-bold uppercase text-india-green-foreground">
                    {a.tag}
                  </span>
                  <span className="text-sm text-card-foreground">{a.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Research Highlights */}
      <section aria-labelledby="research-h" className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-saffron">Focus areas</p>
              <h2 id="research-h" className="mt-1 text-2xl font-bold text-foreground">
                Research Highlights
              </h2>
            </div>
            <Link to="/research" className="text-sm font-medium text-primary hover:underline">
              All research →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {research.map((r) => (
              <article key={r.title} className="rounded border border-border bg-card p-5">
                <h3 className="text-base font-bold text-card-foreground">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
                <Link to={r.href} className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section aria-labelledby="events-h" className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-end justify-between gap-4">
          <h2 id="events-h" className="text-2xl font-bold text-foreground">
            Upcoming Events
          </h2>
          <Link to="/news-and-events/events/workshops" className="text-sm font-medium text-primary hover:underline">
            All events →
          </Link>
        </div>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {events.map((e) => (
            <li key={e.title}>
              <Link
                to={e.href}
                className="flex h-full items-stretch gap-4 rounded border border-border bg-card hover:border-primary"
              >
                <div className="flex w-20 flex-col items-center justify-center bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold leading-none">{e.day}</span>
                  <span className="text-xs uppercase tracking-wider">{e.month}</span>
                </div>
                <div className="flex-1 py-3 pr-3">
                  <p className="text-sm font-semibold text-card-foreground">{e.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Venue: {e.venue}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Publications Highlights */}
      <section aria-labelledby="pub-h" className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex items-end justify-between gap-4">
            <h2 id="pub-h" className="text-2xl font-bold text-foreground">
              Publications Highlights
            </h2>
            <Link to="/publications" className="text-sm font-medium text-primary hover:underline">
              All publications →
            </Link>
          </div>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {publications.map((p) => (
              <li key={p.title}>
                <Link
                  to={p.href}
                  className="block h-full rounded border border-border bg-card p-5 hover:border-primary"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-saffron">{p.type}</p>
                  <p className="mt-2 text-base font-semibold text-card-foreground">{p.title}</p>
                  <p className="mt-3 text-sm text-primary">Download PDF →</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
