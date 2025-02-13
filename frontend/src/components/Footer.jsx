import {Link} from "react-router-dom"
import { Facebook, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#134611] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-display">Waste No Food</h3>
            <p className="text-sm">Connecting excess food with hungry people.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 font-display">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:text-accent">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-accent">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-accent">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 font-display">Contact</h4>
            <ul className="space-y-2">
              <li className="text-sm">info@foodsaver.org</li>
              <li className="text-sm">1-XXX-XXXX-000</li>
              <li className="text-sm">XXX Chembur, Mumbai, MH</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 font-display">Follow Us</h4>
            <div className="flex space-x-4">
            <ul className="space-y-2">
              <li className="text-sm">Instagram</li>
              <li className="text-sm">X (Formerly Twitter)</li>
              <li className="text-sm">Facebook</li>
            </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Waste No Food. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

