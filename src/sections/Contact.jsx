import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedinIn, FaSpinner, FaPaperPlane } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const form = useRef();
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_mock';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_mock';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'mock_public_key';

    if (serviceId === 'service_mock' || templateId === 'template_mock' || publicKey === 'mock_public_key') {
      setTimeout(() => {
        setStatus({ loading: false, success: "Your message was sent successfully (Simulated)!", error: null });
        form.current.reset();
      }, 1500);
      return;
    }

    emailjs.sendForm(serviceId, templateId, form.current, {
      publicKey: publicKey
    })
    .then(() => {
      setStatus({ loading: false, success: "Your message was sent successfully!", error: null });
      form.current.reset();
    })
    .catch((err) => {
      console.error(err);
      setStatus({ loading: false, success: null, error: "Failed to send message. Please try again." });
    });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-primary/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h4 className="text-secondary font-mono tracking-widest text-sm uppercase mb-2 animate-pulse">
            Get In Touch
          </h4>
          <h2 className="text-3xl md:text-4xl font-extrabold text-textColor font-poppins">
            Contact Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Map */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-bold font-poppins text-textColor">Let's talk about projects</h3>
            <p className="text-textSecondary text-sm md:text-base font-inter leading-relaxed">
              Have an exciting application to build or need custom components optimized? Send me a message using the form or connect via standard social channels.
            </p>

            <div className="space-y-4 font-inter pt-2">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-primary shadow-glow-primary">
                  <FaEnvelope size={18} />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-500 block uppercase">Email</span>
                  <a href="mailto:ritikkumar.dev@gmail.com" className="text-sm font-semibold text-textColor hover:text-highlight transition-colors duration-300">
                    ritikkumar.dev@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-secondary shadow-glow-secondary">
                  <FaMapMarkerAlt size={18} />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-500 block uppercase">Location</span>
                  <span className="text-sm font-semibold text-textColor">
                    LPU Campus, Phagwara, Punjab, India
                  </span>
                </div>
              </div>
            </div>

            {/* Styled Google Map */}
            <div className="relative w-full h-[230px] rounded-2xl overflow-hidden border border-slate-800/80 shadow-md">
              <iframe
                title="Lovely Professional University Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3410.7263996711913!2d75.70256867623053!3d31.254181874336916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5f5e9c489cf3%3A0x4049a540b50a3000!2sLovely%20Professional%20University!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(15%) contrast(95%) brightness(90%)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Glassmorphism Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass-card p-6 md:p-8 rounded-[24px] relative"
            >
              <form ref={form} onSubmit={sendEmail} className="space-y-5 font-inter">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-semibold font-mono text-slate-400 uppercase">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="user_name"
                      required
                      placeholder="John Doe"
                      className="w-full bg-slate-950/40 border border-slate-800 hover:border-slate-700 focus:border-primary focus:outline-none p-3.5 rounded-xl text-sm transition-all duration-300 text-textColor"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold font-mono text-slate-400 uppercase">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="user_email"
                      required
                      placeholder="johndoe@example.com"
                      className="w-full bg-slate-950/40 border border-slate-800 hover:border-slate-700 focus:border-primary focus:outline-none p-3.5 rounded-xl text-sm transition-all duration-300 text-textColor"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-semibold font-mono text-slate-400 uppercase">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full bg-slate-950/40 border border-slate-800 hover:border-slate-700 focus:border-primary focus:outline-none p-3.5 rounded-xl text-sm transition-all duration-300 text-textColor"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-semibold font-mono text-slate-400 uppercase">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    placeholder="Hello Ritik, let's collaborate on..."
                    className="w-full bg-slate-950/40 border border-slate-800 hover:border-slate-700 focus:border-primary focus:outline-none p-3.5 rounded-xl text-sm transition-all duration-300 text-textColor resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-secondary hover:to-primary text-textColor font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-glow flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed hover:scale-[1.01]"
                >
                  {status.loading ? (
                    <>
                      <FaSpinner className="animate-spin" size={16} /> Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane size={14} /> Send Message
                    </>
                  )}
                </button>

                {/* Status messages */}
                {status.success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide text-center"
                  >
                    {status.success}
                  </motion.div>
                )}
                {status.error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold tracking-wide text-center"
                  >
                    {status.error}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
