import { useEffect, useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiOutlineEnvelope } from "react-icons/hi2";
import heroImage from "./hero-06.png";
import interiorImage from "./residential-interior.png";
import gallery03 from "./gallery-03.png";
import gallery09 from "./gallery-09.png";
import gallery12 from "./gallery-12.png";
import gallery13 from "./gallery-13.png";
import gallery17 from "./gallery-17.png";
import gallery19 from "./gallery-19.png";
import gallery24 from "./gallery-24.png";
import gallery30 from "./gallery-30.png";
import gallery34 from "./gallery-34.png";
import gallery40 from "./gallery-40.png";

const services = [
  ["01", "Architecture", "Thoughtful, functional designs for residential and commercial spaces."],
  ["02", "Interior design", "Interiors that balance beauty, comfort and everyday living."],
  ["03", "Design development", "From concept to construction, with precision and care."],
];
const testimonials = [
  ["Professional, creative and easy to work with. They brought our vision to life beautifully.", "Private Residence", "Lekki, Lagos"],
  ["Excellent attention to detail and a deep understanding of what modern living needs.", "Residential Interior", "Ikoyi, Lagos"],
  ["A reliable partner from concept to completion. The results exceeded our expectations.", "Commercial Development", "Victoria Island, Lagos"],
];
const galleryImages = [gallery03, gallery09, gallery19, gallery40, gallery13, gallery24, gallery34, gallery17, gallery12, gallery30].map((src, index) => ({
  src,
  alt: `Photorealistic Jibsarc Design architectural project view ${index + 1}`,
}));

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [galleryExpanded, setGalleryExpanded] = useState(false);
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.setAttribute("data-visible", "true"));
    }, { threshold: 0.12, rootMargin: "0px 0px -36px" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const preventContextMenu = (event) => event.preventDefault();
    document.addEventListener("contextmenu", preventContextMenu);
    return () => document.removeEventListener("contextmenu", preventContextMenu);
  }, []);
  useEffect(() => {
    if (activeImage === null) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveImage(null);
      if (event.key === "ArrowRight") setActiveImage((activeImage + 1) % galleryImages.length);
      if (event.key === "ArrowLeft") setActiveImage((activeImage - 1 + galleryImages.length) % galleryImages.length);
    };
    document.body.classList.add("lightbox-open");
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("lightbox-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage]);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell" id="top">
      <header className="site-header">
        <a href="#top" className="wordmark" aria-label="Jibsarc Design home">JIBSARC<br />DESIGN</a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Primary navigation">
          <a onClick={closeMenu} href="#services">Services</a><a onClick={closeMenu} href="#studio">Studio</a>
          <a onClick={closeMenu} href="#gallery">Gallery</a><a onClick={closeMenu} href="#journal">Reviews</a>
          <a onClick={closeMenu} href="#contact">Contact</a>
        </nav>
        <a className="button button-primary header-cta" href="#contact">Start a project</a>
        <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label="Toggle menu">{menuOpen ? "Close" : "Menu"}</button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy" data-reveal data-visible="true">
            <p className="eyebrow">Functional spaces.<br />Meaningful lives.</p>
            <h1>Spaces<br />shaped around<br />how you live.</h1>
            <p className="hero-intro">At JIBSARC DESIGN, creativity meets functionality. We design unique residential and commercial spaces through architecture and interior design.</p>
            <div className="hero-actions"><a className="button button-primary" href="#contact">Start a project</a><a className="button button-secondary" href="#services">Our services</a></div>
            <div className="hero-disciplines"><span>Residential<br />homes</span><span>Commercial<br />spaces</span><span>Interior<br />solutions</span></div>
          </div>
          <figure className="hero-image image-reveal" data-reveal data-visible="true"><img src={heroImage} alt="Photorealistic front elevation of a contemporary Jibsarc residence" /><figcaption>Good design<br />builds better lives</figcaption></figure>
        </section>

        <section className="services section" id="services"><p className="section-kicker" data-reveal>Our services</p><div className="service-list">{services.map(([number, title, text]) => <article key={title} data-reveal><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

        <section className="studio section" id="studio">
          <div className="studio-copy" data-reveal><p className="section-kicker">About Jibsarc Design</p><h2>Design that<br />lives with you.</h2><p>We are an architectural design studio based in Lagos, Nigeria, focused on creating functional, inspiring and enduring spaces. From bespoke homes to commercial developments, we combine creativity, technical expertise and a deep understanding of how people live, work and connect.</p><a className="button button-primary" href="#services">Our approach</a></div>
          <figure className="studio-image image-reveal" data-reveal><img src={interiorImage} alt="Contemporary residential interior by Jibsarc Design" /><figcaption>People<br />Spaces<br />Possibilities</figcaption></figure>
        </section>

        <section className="gallery-section section" id="gallery" aria-labelledby="gallery-title">
          <div className="gallery-heading" data-reveal>
            <div><p className="section-kicker">Project gallery</p><h2 id="gallery-title">A closer look<br />at our work.</h2></div>
            <p>Explore residential architecture, landscape design, outdoor living and carefully resolved details from the Jibsarc portfolio.</p>
          </div>
          <div className="gallery-grid">
            {galleryImages.slice(0, galleryExpanded ? 10 : 4).map((image, index) => (
              <button className="gallery-item" type="button" key={image.src} onClick={() => setActiveImage(index)} aria-label={`Open project view ${index + 1}`}>
                <img src={image.src} alt={image.alt} loading={index < 4 ? "eager" : "lazy"} decoding="async" />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
          <div className="gallery-more" data-reveal>
            <button className="button gallery-more-button" type="button" onClick={() => setGalleryExpanded((value) => !value)} aria-expanded={galleryExpanded}>
              {galleryExpanded ? "Show less" : "View more"}
            </button>
            <span>{galleryExpanded ? "10 of 10 project views" : "4 of 10 project views"}</span>
          </div>
        </section>

        <section className="testimonials section" id="journal" aria-labelledby="testimonials-title">
          <div className="testimonial-heading" data-reveal><p className="section-kicker">What clients say</p><h2 id="testimonials-title">Trusted by people who<br />live our spaces.</h2></div>
          <div className="testimonial-grid">{testimonials.map(([quote, type, place]) => <blockquote key={type} data-reveal>“{quote}”<cite><strong>{type}</strong><span>{place}</span></cite></blockquote>)}</div>
        </section>

        <section className="contact-band" id="contact"><div data-reveal><p className="eyebrow">Start a project</p><h2>Let’s build something<br />remarkable.</h2></div><div className="contact-action" data-reveal><p>We listen, collaborate and design with intention. Get in touch to discuss your project and explore the possibilities.</p><a className="button button-inverse" href="mailto:Ojoajibolaiyanu02@gmail.com">Start a project</a></div></section>
      </main>

      {activeImage !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Project view ${activeImage + 1} of ${galleryImages.length}`} onClick={() => setActiveImage(null)}>
          <div className="lightbox-toolbar">
            <span>{String(activeImage + 1).padStart(2, "0")} / {galleryImages.length}</span>
            <button type="button" onClick={() => setActiveImage(null)}>Close</button>
          </div>
          <img src={galleryImages[activeImage].src} alt={galleryImages[activeImage].alt} onClick={(event) => event.stopPropagation()} />
          <div className="lightbox-controls" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setActiveImage((activeImage - 1 + galleryImages.length) % galleryImages.length)}>Previous</button>
            <button type="button" onClick={() => setActiveImage((activeImage + 1) % galleryImages.length)}>Next</button>
          </div>
        </div>
      )}

      <footer>
        <div className="wordmark">JIBSARC<br />DESIGN</div>
        <div className="footer-contact"><span>Lagos, Nigeria</span><a href="https://wa.me/2349114665314" target="_blank" rel="noreferrer" aria-label="Message Jibsarc Design on WhatsApp"><FaWhatsapp aria-hidden="true" /><span>+234 911 466 5314</span></a><a href="mailto:Ojoajibolaiyanu02@gmail.com"><HiOutlineEnvelope aria-hidden="true" /><span>Ojoajibolaiyanu02@gmail.com</span></a></div>
        <div className="socials"><a href="https://www.instagram.com/jibsarc?stkn=Mmx3dmk4Yml1dzNp&utm_source=qr" target="_blank" rel="noreferrer" aria-label="Follow Jibsarc Design on Instagram"><FaInstagram aria-hidden="true" /><span>Instagram</span></a></div>
        <p className="footer-tagline">Architecture · Interior design · Better spaces for brighter lives</p><small>© 2026 JIBSARC DESIGN. All rights reserved.</small>
      </footer>
    </div>
  );
}
export default App;
