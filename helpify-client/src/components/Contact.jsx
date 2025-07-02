import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation (add more if needed)
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", msg: "Please fill all required fields." });
      return;
    }

    // Here you can integrate email sending service (EmailJS, backend API etc.)
    // For demo, we just simulate success
    setStatus({ type: "success", msg: "Thank you for contacting us! We will get back to you soon." });

    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-16 ">
      <h2 className="text-4xl font-bold mb-8 text-primary-color text-center">Contact Us</h2>

      <p className="mb-10 text-center text-lg max-w-3xl mx-auto">
        Whether you have questions, want to collaborate, or just want to say hello — we’re here to listen! Reach out to us using the form below or through our contact details.
      </p>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1  shadow-lg rounded-lg p-8"
          noValidate
        >
          <div className="mb-6">
            <label className="block mb-2 font-semibold" htmlFor="name">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-color"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold" htmlFor="email">
              Email Address <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-color"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold" htmlFor="subject">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject (optional)"
              className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-color"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold" htmlFor="message">
              Message <span className="text-red-600">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-color resize-none"
              required
            ></textarea>
          </div>

          {status && (
            <p
              className={`mb-4 font-semibold ${
                status.type === "error" ? "text-red-600" : "text-green-600"
              }`}
            >
              {status.msg}
            </p>
          )}

          <button
            type="submit"
            className="custom-btn custom-btn:hover mt-5 "
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex-1 space-y-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
            <p className="text-lg">
              <strong>Address:</strong> 123 Main Street, Cityville, Country
            </p>
            <p className="text-lg">
              <strong>Phone:</strong> +880 1234 567890
            </p>
            <p className="text-lg">
              <strong>Email:</strong> support@helpify.com
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Business Hours</h3>
            <p className="text-lg">Monday - Friday: 9:00 AM to 6:00 PM</p>
            <p className="text-lg">Saturday: 10:00 AM to 4:00 PM</p>
            <p className="text-lg">Sunday: Closed</p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-6 text-primary-color text-3xl">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7">
                  <path d="M22.675 0h-21.35C.597 0 0 .593 0 1.326v21.348C0 23.406.597 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.466.099 2.797.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.406 24 22.674V1.326C24 .593 23.403 0 22.675 0z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7">
                  <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.863 9.863 0 01-3.127 1.195 4.92 4.92 0 00-8.38 4.482A13.978 13.978 0 011.671 3.149a4.92 4.92 0 001.523 6.574 4.9 4.9 0 01-2.229-.616v.061a4.923 4.923 0 003.95 4.827 4.996 4.996 0 01-2.224.084 4.935 4.935 0 004.6 3.417A9.867 9.867 0 010 19.54a13.933 13.933 0 007.548 2.209c9.056 0 14.01-7.496 14.01-13.986 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7">
                  <path d="M20.447 20.452H17.21v-5.569c0-1.327-.024-3.036-1.851-3.036-1.852 0-2.135 1.446-2.135 2.94v5.665H9.072V9h3.112v1.561h.045c.433-.82 1.49-1.686 3.065-1.686 3.277 0 3.881 2.156 3.881 4.965v6.612zM5.337 7.433a1.81 1.81 0 11.001-3.62 1.81 1.81 0 01-.001 3.62zM6.814 20.452H3.859V9h2.955v11.452zM22.225 0H1.771C.792 0 0 .775 0 1.729v20.543C0 23.226.792 24 1.771 24h20.451C23.208 24 24 23.226 24 22.271V1.729C24 .775 23.208 0 22.225 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
