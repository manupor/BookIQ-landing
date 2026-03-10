"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BarChart3, Plus, Edit, Trash2, ExternalLink, LogOut } from "lucide-react";
import Link from "next/link";

interface LandingPage {
  id: string;
  title: string;
  description: string | null;
  slug: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [landingPages, setLandingPages] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchLandingPages();
    }
  }, [status]);

  const fetchLandingPages = async () => {
    try {
      const response = await fetch("/api/landing-pages");
      const data = await response.json();
      setLandingPages(data.landingPages || []);
    } catch (error) {
      console.error("Error fetching landing pages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this landing page?")) {
      return;
    }

    try {
      const response = await fetch(`/api/landing-pages/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setLandingPages(landingPages.filter((page) => page.id !== id));
      }
    } catch (error) {
      console.error("Error deleting landing page:", error);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#030712]">
      <nav className="border-b border-white/[0.04] bg-[#030712]/70 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/20">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Book<span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">IQ</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">
              {session.user?.name || session.user?.email}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Your Landing Pages</h1>
            <p className="text-slate-400">Create and manage your landing pages</p>
          </div>
          <Link
            href="/dashboard/new"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 transition-all"
          >
            <Plus className="h-5 w-5" />
            New Landing Page
          </Link>
        </div>

        {landingPages.length === 0 ? (
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/15 to-cyan-400/15 text-indigo-400 mx-auto mb-4">
              <BarChart3 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No landing pages yet</h3>
            <p className="text-slate-400 mb-6">Get started by creating your first landing page</p>
            <Link
              href="/dashboard/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 transition-all"
            >
              <Plus className="h-5 w-5" />
              Create Landing Page
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {landingPages.map((page) => (
              <div
                key={page.id}
                className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6 hover:border-indigo-500/20 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                      {page.title}
                    </h3>
                    {page.description && (
                      <p className="text-sm text-slate-400 line-clamp-2">{page.description}</p>
                    )}
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      page.published
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {page.published ? "Published" : "Draft"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                  <span>/{page.slug}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/edit/${page.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/[0.05] border border-white/[0.1] text-white text-sm font-semibold rounded-lg hover:bg-white/[0.08] transition-all"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Link>
                  <a
                    href={`/p/${page.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-2 bg-white/[0.05] border border-white/[0.1] text-white text-sm font-semibold rounded-lg hover:bg-white/[0.08] transition-all"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => handleDelete(page.id)}
                    className="flex items-center justify-center px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold rounded-lg hover:bg-red-500/20 transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-white/[0.05] text-xs text-slate-500">
                  Updated {new Date(page.updatedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
