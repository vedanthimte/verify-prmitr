import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../supabase";

export default function VerifyCertificate() {
  const location = useLocation();
  const [certId, setCertId] = useState("");
  const [certData, setCertData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const hasRun = useRef(false);

  // ✅ Run on page load with ?cert=abc123
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const params = new URLSearchParams(location.search);
    const prefill = params.get("cert");
    if (prefill) {
      setCertId(prefill);
      handleVerify(prefill);
    }
  }, [location.search]);

  // ✅ Verify function
  const handleVerify = async (id = certId) => {
    const trimmedId = id.trim().toLowerCase();
    if (!trimmedId) return alert("Please enter a Certificate ID.");

    setLoading(true);
    setCertData(null);
    setNotFound(false);

    const { data, error } = await supabase
      .from("certificate") // ⚡ ensure lowercase
      .select("*")
      .eq("verify_id", trimmedId)
      .single();

    setLoading(false);

    if (error?.code === "PGRST116" || !data) {
      setNotFound(true);
    } else if (error) {
      console.error("Supabase error:", error.message);
      setNotFound(true);
    } else {
      setCertData(data);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "40px auto",
        backgroundColor: "#1a1a1a",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(255,255,255,0.05)",
        color: "white",
      }}
    >
      <h1 style={{ color: "#903df5", textAlign: "center", marginBottom: "20px" }}>
        Certificate Verification
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleVerify(certId);
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <input
          type="text"
          placeholder="Enter Certificate ID"
          value={certId}
          onChange={(e) => setCertId(e.target.value)}
          autoFocus
          style={{
            padding: "10px 14px",
            fontSize: "16px",
            width: "100%",
            maxWidth: "400px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            backgroundColor: "#903df5",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      {/* ✅ Certificate Verified */}
      {certData && (
        <div
          style={{
            marginTop: "20px",
            backgroundColor: "#222",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#00ff95" }}>✅ Certificate Verified</h2>
          <h4>
            <strong>Name:</strong> {certData.name}
          </h4>
          <p>
            <strong>Type:</strong> {certData.type}
          </p>
          <p>
            <strong>Issued By:</strong> {certData.issued_by}
          </p>
          <p>
            <strong>Issued On:</strong>{" "}
            {new Date(certData.issued_on).toLocaleDateString()}
          </p>
          <p>
            <strong>Certificate ID:</strong> {certData.verify_id}
          </p>
        </div>
      )}

      {/* ❌ Certificate Not Found */}
      {notFound && (
        <p style={{ color: "red", textAlign: "center", marginTop: "15px" }}>
          ❌ Certificate not found. Please check the ID.
        </p>
      )}
    </div>
  );
}
