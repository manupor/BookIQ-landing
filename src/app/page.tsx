import dynamic from "next/dynamic";
import ClientErrorBoundary from "@/components/ClientErrorBoundary";

const LandingPage = dynamic(() => import("@/components/LandingPage"), {
  ssr: true,
  loading: () => (
    <div
      style={{
        minHeight: "100vh",
        background: "#030712",
        color: "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <span>Loading BookIQ…</span>
    </div>
  ),
});

export default function Home() {
  return (
    <ClientErrorBoundary>
      <LandingPage />
    </ClientErrorBoundary>
  );
}
