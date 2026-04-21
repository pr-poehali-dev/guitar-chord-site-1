import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useFavorites } from "@/hooks/useFavorites";

interface NavLink {
  to: string;
  label: string;
  icon: string;
  badge?: number;
}

export default function Navbar() {
  const location = useLocation();
  const { favorites } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);

  const links: NavLink[] = [
    { to: "/", label: "Каталог", icon: "Music" },
    { to: "/favorites", label: "Избранное", icon: "Heart", badge: favorites.length },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/8"
      style={{ background: "rgba(10,14,21,0.85)" }}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center glow-orange"
            style={{ background: "linear-gradient(135deg, var(--neon-orange), #ff4500)" }}>
            <Icon name="Guitar" size={18} className="text-black" />
          </div>
          <div className="hidden sm:block">
            <span className="font-oswald text-xl font-bold text-white text-glow-orange">
              Chord<span className="text-[var(--neon-orange)]">Hub</span>
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                ${location.pathname === link.to
                  ? "text-[var(--neon-orange)] bg-[var(--neon-orange)]/10"
                  : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
            >
              <Icon name={link.icon} size={16} />
              {link.label}
              {link.badge !== undefined && link.badge > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center rounded-full text-black font-bold"
                  style={{ background: "var(--neon-orange)", minWidth: "18px", minHeight: "18px", fontSize: "10px", padding: "0 4px" }}>
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="sm:hidden p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-white/8 px-4 py-3 space-y-1"
          style={{ background: "rgba(10,14,21,0.95)" }}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                ${location.pathname === link.to
                  ? "text-[var(--neon-orange)] bg-[var(--neon-orange)]/10"
                  : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
            >
              <Icon name={link.icon} size={18} />
              {link.label}
              {link.badge !== undefined && link.badge > 0 && (
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full text-black font-bold"
                  style={{ background: "var(--neon-orange)" }}>
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
