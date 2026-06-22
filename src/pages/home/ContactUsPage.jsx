import { FaPhone, FaLocationDot, FaEnvelope, FaInstagram, FaFacebookF } from "react-icons/fa6";

export default function ContactUsPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-cream to-[#f5e8d8] py-16 px-4">
      {/* Decorative blobs */}
      <div className="fixed top-20 right-10 w-80 h-80 bg-accent/8 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 left-10 w-80 h-80 bg-accent-dark/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.4em] text-accent font-semibold mb-3">We'd Love to Hear From You</p>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-dark mb-4">Contact Us</h1>
          <p className="text-secondary max-w-xl mx-auto text-base leading-relaxed">
            Have a question or feedback? Reach out and our team will get back to you shortly.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Left: Info Panel ── */}
          <div className="w-full lg:w-[320px] space-y-5">
            {/* Dark Brand Card */}
            <div className="bg-[#1a1008] rounded-2xl p-7 text-white relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-accent/20 rounded-full pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-accent/10 rounded-full pointer-events-none" />
              <div className="relative">
                <img src="/logo.png" className="w-14 h-14 rounded-full object-cover ring-2 ring-accent/40 mb-5" />
                <h2 className="font-playfair text-2xl font-bold mb-2">Crystal Beauty Clear</h2>
                <p className="text-white/60 text-sm leading-relaxed mb-7">
                  Premium beauty products crafted with love. We're here to help you look and feel your best.
                </p>

                {/* Contact Details */}
                <div className="space-y-4">
                  {[
                    { icon: FaLocationDot, label: "Address", value: "01st Floor, No.08, Old Kottawa Rd, Nugegoda" },
                    { icon: FaPhone,       label: "Phone",   value: "077 1234567" },
                    { icon: FaEnvelope,    label: "Email",   value: "example@example.com" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <item.icon size={14} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-white/40 text-[10px] uppercase tracking-wide mb-0.5">{item.label}</p>
                        <p className="text-white/85 text-sm leading-snug">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Icons */}
                <div className="flex gap-3 mt-7">
                  {[FaInstagram, FaFacebookF].map((Icon, i) => (
                    <div key={i} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-accent hover:text-accent cursor-pointer transition-all duration-300">
                      <Icon size={14} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-accent/8 p-5">
              <h3 className="font-playfair text-base font-bold text-dark mb-4">Business Hours</h3>
              <div className="space-y-0 text-sm">
                {[
                  { day: "Mon – Fri",  time: "9:00 AM – 6:00 PM" },
                  { day: "Saturday",   time: "9:00 AM – 4:00 PM" },
                  { day: "Sunday",     time: "Closed" },
                ].map((row) => (
                  <div key={row.day} className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-b-0">
                    <span className="text-secondary">{row.day}</span>
                    <span className={`font-semibold text-xs ${row.time === "Closed" ? "text-red-400" : "text-dark"}`}>
                      {row.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Contact Form ── */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-accent/8 overflow-hidden">
              {/* Card Header */}
              <div className="px-7 py-5 border-b border-gray-50">
                <h2 className="font-playfair text-xl font-bold text-dark">Send a Message</h2>
                <p className="text-xs text-secondary mt-1">We'll respond within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="p-7 space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-secondary uppercase tracking-wide mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-primary/40 text-dark placeholder-gray-400 text-sm transition-all duration-200"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-secondary uppercase tracking-wide mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-primary/40 text-dark placeholder-gray-400 text-sm transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-secondary uppercase tracking-wide mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-primary/40 text-dark placeholder-gray-400 text-sm transition-all duration-200 resize-none"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-accent-gradient text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm"
                >
                  Submit Message →
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}