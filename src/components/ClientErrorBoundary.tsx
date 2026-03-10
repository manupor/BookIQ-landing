"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ClientErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div
          style={{
            minHeight: "100vh",
            background: "#030712",
            color: "#f1f5f9",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            Book<span style={{ background: "linear-gradient(135deg,#818cf8,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>IQ</span>
          </h1>
          <p style={{ color: "#94a3b8", marginBottom: "1rem" }}>Something went wrong loading this page.</p>
          <a
            href="/"
            style={{
              color: "#6366f1",
              textDecoration: "underline",
            }}
          >
            Reload
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}
