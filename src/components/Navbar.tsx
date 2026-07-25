import { NavLink, Link } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/assessment', label: 'Assessment' },
  { to: '/coach', label: 'Coach' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-slate-200/70">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 text-white shadow-sm shadow-sky-500/30 transition-transform group-hover:scale-105">
            <BrainCircuit className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-slate-900">
            VARK<span className="text-sky-600">Sense</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sky-50 text-sky-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link
          to="/assessment"
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md active:scale-95"
        >
          Start Assessment
        </Link>
      </nav>
    </header>
  );
}
