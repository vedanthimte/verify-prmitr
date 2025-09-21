import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../supabase';

export default function VerifyCertificate() {
    const location = useLocation();
    const [certId, setCertId] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [autoTriggered, setAutoTriggered] = useState(false);
    const hasDownloaded = useRef(false); // ✅ Prevent multiple auto-downloads

    // ✅ Fetch cert ID from URL on load
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const prefill = params.get('cert');
        if (prefill) {
            setCertId(prefill);
            setAutoTriggered(true);
            handleVerify(prefill, true); // autoDownload = true
        }
    }, [location.search]);

    const handleVerify = async (id = certId, autoDownload = false) => {
        const trimmedId = id.trim().toLowerCase();
        if (!trimmedId) return alert('Please enter a Certificate ID.');

        setLoading(true);
        setData(null);
        setNotFound(false);

        const { data, error } = await supabase
            .from('Certificate')
            .select('*')
            .eq('verify_id', trimmedId)
            .single();

        setLoading(false);

        if (error || !data) {
            setNotFound(true);
        }
        
    };

    return (
        <div
            style={{
                padding: '20px',
                maxWidth: '600px',
                margin: '40px auto',
                backgroundColor: '#1a1a1a',
                borderRadius: '12px',
                boxShadow: '0 0 10px rgba(255,255,255,0.05)',
                color: 'white',
            }}
        >
            <h1 style={{ color: '#903df5', textAlign: 'center', marginBottom: '20px' }}>
                Certificate Verification
            </h1>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setAutoTriggered(false); // user-triggered
                    handleVerify(certId, false);
                }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                }}
            >
                <input
                    type="text"
                    placeholder="Enter Certificate ID"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                    autoFocus
                    style={{
                        padding: '10px 14px',
                        fontSize: '16px',
                        width: '100%',
                        maxWidth: '400px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        outline: 'none',
                        boxSizing: 'border-box',
                    }}
                />
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        backgroundColor: '#903df5',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    {loading ? 'Verifying...' : 'Verify'}
                </button>
            </form>

            {data && (
                <div
                    style={{
                        marginTop: '20px',
                        backgroundColor: '#222',
                        borderRadius: '10px',
                        padding: '20px',
                        animation: 'fadeIn 0.5s ease',
                        textAlign: 'center',
                    }}
                >
                    <h2 style={{ color: '#00ff95' }}>✅ Certificate Verified</h2>
                    <h4><strong>Name:</strong> {data.name}</h4>
                    <p><strong>Type:</strong> {data.type}</p>
                    <p><strong>Issued By:</strong> {data.issued_by}</p>
                    <p><strong>Issued On:</strong> {data.issued_on}</p>
                    <p><strong>Certificate ID:</strong> {data.verify_id}</p>

                </div>
            )}

            {notFound && (
                <p style={{ color: 'red', textAlign: 'center', marginTop: '15px' }}>
                    ❌ Certificate not found. Please check the ID.
                </p>
            )}
        </div>
    );
}
