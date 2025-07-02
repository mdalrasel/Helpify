
import { Link } from 'react-router';
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
                {/* Logo and description */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <Link to='/' className='text-2xl bg-blue-100 rounded-md font-extrabold'><img className='w-30' src="https://i.ibb.co/0RbKNMqG/logo.png" alt="" /></Link>
                    <p className="max-w-xs leading-relaxed text-gray-400">
                        Connecting you with trusted service providers effortlessly. Helping you book and manage your appointments with ease and confidence.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="/" className="hover:text-white transition-colors">Home</a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-white transition-colors">About</a>
                        </li>
                        <li>
                            <a href="/allPost" className="hover:text-white transition-colors">Services</a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
                    <p>123 Main Street, Cityville, Country</p>
                    <p>Phone: +880 1234 567890</p>
                    <p>Email: support@helpify.com</p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 mt-8 pt-4 text-center  text-sm">
                &copy; {new Date().getFullYear()} Helpify. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;