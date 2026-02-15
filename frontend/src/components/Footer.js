import React from "react";
import { Film, Heart, Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Film className="w-8 h-8 text-red-600" />
              <h3 className="text-2xl font-bold text-white">MovieFlix</h3>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Discover your next favorite movie with our ML-powered
              recommendation system. Get personalized suggestions based on your
              preferences and viewing patterns.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>using React & Machine Learning</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Browse Movies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Recommendations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Genres
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Search
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="space-y-3">
              <a
                href="https://github.com/varaprasad-04"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/varaprasad-uppu/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
              <a
                href="mailto:varaprasaduppu552@example.com"
                className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>Contact</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} MovieFlix. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a
              href="#"
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              Terms of Service
            </a>
            <span className="text-gray-600">Powered by Machine Learning</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
