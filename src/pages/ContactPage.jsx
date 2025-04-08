import { useState } from "react";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Message sent:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-red-800 font-inria font-thin text-lg pb-4">Get in touch</h1>

      <div className="bg-red-100 p-8 rounded-lg shadow-md space-y-4 mb-8">
     
        <div className="text-red-800 font-inria  text-center">Send us a message <br></br> and we will get back to you as soon as possible</div>

        {submitted && (
          <p className="text-green-700 text-sm text-center font-medium">Your message has been sent! ❤️</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-red-800 font-inria">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-red-800 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-red-800 font-inria">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-red-800 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-red-800 font-inria">Message</label>
            <textarea
              name="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border border-red-800 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 bg-red-800 text-white rounded-lg"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="text-center text-sm text-red-800 font-inria space-y-2">
        <p><strong>Email:</strong> support@lulu-shop.com</p>
        <p><strong>Phone:</strong> +47 123 45 678</p>
        <p><strong>Opening Hours:</strong> Mon–Fri 10:00–16:00</p>
      </div>
    </div>
  );
}

export default ContactPage;
