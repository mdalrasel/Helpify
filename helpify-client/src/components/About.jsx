import React from "react";

const About = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 ">
      <h1 className="text-4xl font-bold mb-8 text-primary-color">About Helpify</h1>

      <p className="mb-6 leading-relaxed text-lg">
        <strong>Helpify</strong> is a comprehensive service-sharing platform designed to connect users with trusted professionals across a wide variety of services. Our mission is to simplify the way people find, book, and manage service appointments — whether it’s legal advice, home repairs, or professional consultations.
      </p>

      <h2 className="text-2xl font-semibold mb-4 mt-8">Our Vision</h2>
      <p className="mb-6 leading-relaxed text-lg">
        We envision a world where accessing quality services is seamless, transparent, and convenient. Helpify aims to empower users by providing a reliable platform that bridges the gap between service providers and customers.
      </p>

      <h2 className="text-2xl font-semibold mb-4 mt-8">Core Features</h2>
      <ul className="list-disc list-inside mb-6 space-y-2 text-lg">
        <li><strong>User Authentication:</strong> Secure registration and login with email/password and social providers.</li>
        <li><strong>Role-Based Access:</strong> Separate dashboards for users, service providers (riders), and admins.</li>
        <li><strong>Service Booking:</strong> Easy booking system with calendar integration and status tracking.</li>
        <li><strong>Payment Integration:</strong> Multiple payment gateways including Stripe and SSLCommerz.</li>
        <li><strong>Real-Time Notifications:</strong> Stay updated on booking status changes and important alerts.</li>
        <li><strong>Dark/Light Mode:</strong> User-friendly interface with theme toggling.</li>
        <li><strong>Analytics:</strong> Visual charts and reports to monitor bookings and service efficiency.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 mt-8">Why Choose Helpify?</h2>
      <p className="mb-6 leading-relaxed text-lg">
        <strong>Trusted Professionals:</strong> All service providers are verified to ensure quality and reliability.<br />
        <strong>User-Centric Design:</strong> Intuitive UI/UX for hassle-free navigation and bookings.<br />
        <strong>Secure Payments:</strong> Your financial data is protected with top-tier payment gateways.<br />
        <strong>24/7 Support:</strong> Our dedicated support team is here to help anytime.<br />
        <strong>Continuous Improvement:</strong> Regular updates and feature enhancements based on user feedback.
      </p>

      <h2 className="text-2xl font-semibold mb-4 mt-8">Our Team</h2>
      <p className="mb-6 leading-relaxed text-lg">
        Helpify is developed by a passionate team of software engineers, designers, and business strategists committed to delivering the best user experience possible. We continuously strive to innovate and bring the latest technologies to our platform.
      </p>

      <h2 className="text-2xl font-semibold mb-4 mt-8">Get In Touch</h2>
      <p className="mb-6 leading-relaxed text-lg">
        Have questions or want to learn more about Helpify? Feel free to contact us anytime through the Contact page. We value your feedback and look forward to helping you!
      </p>

      <h2 className="text-2xl font-semibold mb-4 mt-8">Future Plans</h2>
      <p className="mb-6 leading-relaxed text-lg">
        We are constantly working to enhance Helpify with new features such as AI-based service recommendations, expanded service categories, multi-language support, and mobile app versions to make the platform even more accessible and efficient.
      </p>

      
    </section>
  );
};

export default About;
