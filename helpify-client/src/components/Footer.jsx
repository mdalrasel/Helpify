import React from 'react';
import logo from '../assets/Footer.png'
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
const Footer = () => {
    return (
        <footer className="bg-base-300 mt-10 footer md:footer-horizontal   text-base-content p-10">
            <aside>
                <img className='w-20 ' src={logo} alt="" />
                <p>
                    Copyright © 2025 - All right reserved
                </p>
                <nav className="flex gap-5">
                    <a>
                        <FaFacebook />
                    </a>
                    <a>
                        <FaYoutube />
                    </a>
                    <a>
                       <FaTwitter />
                    </a>
                </nav>
            </aside>
            <nav>
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    );
};

export default Footer;