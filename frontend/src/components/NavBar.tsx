import Link from "next/link";
import "./navbar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar__content">
        <Link href="/" className="navbar__brand">Booking</Link>
      </div>
    </nav>
  );
}


