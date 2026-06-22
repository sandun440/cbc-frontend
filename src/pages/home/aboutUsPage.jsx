import { FaLeaf, FaStar, FaHeart, FaShield } from "react-icons/fa6";

const values = [
  {
    icon: FaLeaf,
    title: "Natural Ingredients",
    desc: "We source only the finest natural ingredients, carefully selected for their purity and effectiveness on your skin.",
  },
  {
    icon: FaStar,
    title: "Premium Quality",
    desc: "Every product undergoes rigorous quality testing to ensure you receive nothing but the best beauty experience.",
  },
  {
    icon: FaHeart,
    title: "Made with Love",
    desc: "Our formulations are crafted with passion and care, designed to celebrate the unique beauty in everyone.",
  },
  {
    icon: FaShield,
    title: "Cruelty Free",
    desc: "We are proud to be 100% cruelty-free. Beauty should never come at the cost of our furry friends.",
  },
];

const team = [
  { name: "Amara Silva", role: "Founder & CEO", initial: "A" },
  { name: "Nethmi Perera", role: "Head of Product", initial: "N" },
  { name: "Dinesh Kumar", role: "Lead Formulator", initial: "D" },
];

const stats = [
  { value: "5+", label: "Years of Excellence" },
  { value: "200+", label: "Products" },
  { value: "50K+", label: "Happy Customers" },
  { value: "100%", label: "Cruelty Free" },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-cream to-[#f5e8d8]">
      {/* Decorative blobs */}
      <div className="fixed top-20 right-10 w-80 h-80 bg-accent/8 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 left-10 w-80 h-80 bg-accent-dark/6 rounded-full blur-3xl pointer-events-none" />

      {/* ── Hero Section ── */}
      <section className="relative py-24 px-4 text-center overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.4em] text-accent font-semibold mb-4">Our Story</p>
          <h1 className="font-playfair text-5xl sm:text-6xl font-bold text-dark mb-6 leading-tight">
            About <span className="text-accent">Crystal</span> Beauty Clear
          </h1>
          <p className="text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
            Welcome to Crystal Beauty Clear, where beauty meets elegance and confidence. Our mission is to empower individuals to embrace their unique beauty through high-quality skincare and cosmetic products.
          </p>
          <div className="flex justify-center gap-3 mt-8">
            <a href="/contact" className="px-7 py-3 bg-accent-gradient text-white font-semibold rounded-full text-sm hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 transition-all duration-300">
              Get in Touch
            </a>
            <a href="/" className="px-7 py-3 border border-accent/30 text-accent font-semibold rounded-full text-sm hover:bg-accent/8 transition-all duration-300">
              Shop Now
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats Row ── */}
      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl shadow-sm border border-accent/8 p-5 text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <p className="font-playfair text-3xl font-bold text-accent">{s.value}</p>
              <p className="text-secondary text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10 items-center">
          {/* Dark card */}
          <div className="w-full lg:w-[420px] flex-shrink-0">
            <div className="bg-[#1a1008] rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-accent/20 rounded-full pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/10 rounded-full pointer-events-none" />
              <div className="relative">
                <img src="/logo.png" className="w-16 h-16 rounded-full object-cover ring-2 ring-accent/40 mb-6" />
                <h2 className="font-playfair text-2xl font-bold mb-4">Our Journey</h2>
                <div className="space-y-4 text-white/70 text-sm leading-relaxed">
                  <p>
                    Founded in 2019, Crystal Beauty Clear started as a small passion project — a belief that everyone deserves access to premium, honest skincare.
                  </p>
                  <p>
                    What began in a small kitchen in Nugegoda has grown into a beloved Sri Lankan beauty brand trusted by thousands of customers across the country.
                  </p>
                  <p>
                    Today, we continue to stay true to our roots — natural, effective, and beautiful products made with love.
                  </p>
                </div>
                <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">A</div>
                  <div>
                    <p className="text-white font-semibold text-sm">Amara Silva</p>
                    <p className="text-white/40 text-xs">Founder & CEO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="flex-1 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-2">Who We Are</p>
              <h2 className="font-playfair text-3xl font-bold text-dark mb-4">Beauty Rooted in Nature</h2>
              <p className="text-secondary leading-relaxed">
                At Crystal Beauty Clear, we believe beauty should feel effortless and natural. With a commitment to excellence, we strive to provide innovative solutions that enhance your natural radiance — without compromise.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Skin-Safe", detail: "Dermatologist tested formulas" },
                { label: "Local Roots", detail: "Proudly made in Sri Lanka" },
                { label: "Eco Packaging", detail: "Sustainable materials" },
                { label: "No Toxins", detail: "Free from harmful chemicals" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-accent/8">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-dark text-sm">{item.label}</p>
                    <p className="text-secondary text-xs mt-0.5">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Values ── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-2">What Drives Us</p>
            <h2 className="font-playfair text-3xl font-bold text-dark">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm border border-accent/8 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group text-center">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <v.icon size={20} className="text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-playfair text-base font-bold text-dark mb-2">{v.title}</h3>
                <p className="text-secondary text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-2">The People Behind the Brand</p>
            <h2 className="font-playfair text-3xl font-bold text-dark">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-6 shadow-sm border border-accent/8 text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-accent-gradient flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {member.initial}
                </div>
                <h3 className="font-playfair text-base font-bold text-dark">{member.name}</h3>
                <p className="text-accent text-xs font-semibold mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 px-4 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1a1008] rounded-3xl p-10 text-center text-white relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/10 rounded-full pointer-events-none" />
            <div className="relative">
              <p className="text-accent text-xs uppercase tracking-widest font-semibold mb-3">Ready to Glow?</p>
              <h2 className="font-playfair text-3xl font-bold mb-4">Experience Crystal Beauty</h2>
              <p className="text-white/60 text-sm mb-7 max-w-md mx-auto">
                Discover our full range of premium skincare and beauty products, crafted to bring out your natural radiance.
              </p>
              <a href="/" className="inline-block px-8 py-3.5 bg-accent-gradient text-white font-semibold rounded-full text-sm hover:shadow-lg hover:shadow-accent/40 hover:-translate-y-0.5 transition-all duration-300">
                Shop the Collection →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}