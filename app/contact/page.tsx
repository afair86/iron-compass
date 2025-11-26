export const metadata = {
  title: "Contact Iron Compass",
  description: "How to get in touch with Iron Compass. Reach out for support, questions, or collaborations—your message is valued and will be answered with care.",
};
export default function ContactPage() {
  return (
    <main className="max-w-lg mx-auto py-12 px-4">
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center">Contact Iron Compass</h1>
      <p className="text-gray-300 mb-8 text-center">
        We welcome your questions, feedback, and ideas. Whether you’re seeking support, want to collaborate, or just want to connect, your message matters to us. Please be patient—every inquiry is read and answered with care.
      </p>

      {/* Contact Form */}
      <form className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow space-y-5" aria-label="Contact form">
        <div>
          <label htmlFor="name" className="block text-gray-200 font-medium mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600"
            placeholder="Your name"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-200 font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600"
            placeholder="you@email.com"
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-200 font-medium mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600"
            placeholder="How can we help you?"
          />
        </div>
        <button
          type="button"
          className="w-full py-2 rounded bg-primary-600 text-white font-semibold hover:bg-primary-500 transition"
          aria-label="Send message (no backend yet)"
        >
          Send
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Please note: Replies may not be instant, but we do our best to respond promptly and thoughtfully.
      </p>
    </main>
  );
}
