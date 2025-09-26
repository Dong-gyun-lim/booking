import Link from "next/link";
import "./navbar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar__content">
        <Link href="/" className="navbar__brand">
          Booking
        </Link>
        <Link href="/profile" className="px-3 py-2 hover:opacity-80">
          Profile
        </Link>
        <Link href="/admin/spaces" className="px-3 py-2 hover:opacity-80">
          Admin
        </Link>
      </div>
    </nav>
  );
}
