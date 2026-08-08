"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
  show: boolean;
}

interface NavbarMobileMenuProps {
  userId: string | null;
  role: string;
}

export default function NavbarMobileMenu({ userId, role }: NavbarMobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const links: NavLink[] = [
    { href: "/", label: "Home", show: true },
    { href: "/dashboard", label: "Dashboard", show: !!userId },
    { href: "/create-post", label: "Create Post", show: !!userId && role === "Creator" },
    { href: "/drafts", label: "Drafts", show: !!userId && role === "Creator" },
    { href: "/campaigns", label: "Campaigns", show: !!userId && role === "Admin" },
    { href: "/approve", label: "Approvals", show: !!userId && role === "Approver" },
    { href: "/analytics", label: "Analytics", show: !!userId && (role === "Approver" || role === "Admin") },
    { href: "/strategy", label: "Strategy & Compliance", show: !!userId },
  ];

  return (
    <div className="md:hidden">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors focus:outline-none"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-14.5 left-0 w-full bg-white border-b border-zinc-200 shadow-lg px-6 py-4 flex flex-col gap-2 z-50">
          {links
            .filter((link) => link.show)
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 text-sm text-zinc-800 font-medium hover:bg-zinc-100 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}