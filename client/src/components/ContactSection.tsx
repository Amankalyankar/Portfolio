import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Github, Instagram } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'success', 'error'
  const [responseMessage, setResponseMessage] = useState('');

  // This hook handles the message disappearing after a delay
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => {
        setResponseMessage('');
        setStatus('idle');
      }, 2000); // Message will disappear after 2 seconds

      // Cleanup the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [status]); // This effect runs whenever the 'status' changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from reloading
    setStatus('sending'); // Shows the "Sending..." button text

    // Simulate a short "sending" delay
    setTimeout(() => {
      // Set the error message you requested
      setStatus('error');
      setResponseMessage("Im trying to fix it I promise😭🙏!! ");
    }, 800); // Waits 0.8 seconds before showing the message
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "amankalyankar06@gmail.com", href: "mailto:amankalyankar06@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 9657750779", href: "tel:+919657750779" },
    { icon: MapPin, label: "Location", value: "Indore , MP" }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/Amankalyankar', hoverClass: 'hover:bg-black' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/a.man_kalyankar', hoverClass: 'hover-bg-instagram' },
  ];
  
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 gradient-text">Let's Create Something Amazing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your vision to life? Let's discuss your next project
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-8">Get In Touch</h3>
            {contactInfo.map((info) => (
              <a key={info.label} href={info.href} className="flex items-center space-x-4 p-4 glass rounded-lg hover:scale-105 transition-transform duration-300 group">
                <div className="p-3 bg-primary/20 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <info.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{info.label}</p>
                  <p className="text-foreground font-medium">{info.value}</p>
                </div>
              </a>
            ))}
            <div className="pt-8">
              <p className="text-muted-foreground mb-4">Follow me on social media</p>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name} className={`w-10 h-10 glass rounded-lg flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-300 transform hover:scale-125 ${link.hoverClass}`}>
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-4 glass rounded-lg border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-4 glass rounded-lg border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={6} className="w-full p-4 glass rounded-lg border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none" required />
            </div>
            
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-transform duration-300 glow-purple flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
              <Send className="w-4 h-4" />
            </button>

            {/* Response Message with Fade-out Effect */}
            {responseMessage && (
              <p className={`
                mt-4 text-center transition-opacity duration-500 ease-in-out
                ${status === 'success' ? 'text-green-500 opacity-100' : ''}
                ${status === 'error' ? 'text-red-500 opacity-100' : ''}
                ${status === 'idle' ? 'opacity-0' : ''}
              `}>
                {responseMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
