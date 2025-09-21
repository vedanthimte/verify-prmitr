// src/TestConnection.jsx
import { useEffect } from 'react';
import { supabase } from './supabase';

export default function TestConnection() {
    useEffect(() => {
        const checkConnection = async () => {
            const { data, error } = await supabase
                .from('Certificate')
                .select('*')
                .limit(1);

            if (error) {
                console.error("❌ Supabase connection failed:", error.message);
                alert("❌ Supabase connection failed: " + error.message);
            } else {
                console.log("✅ Supabase connected successfully:", data);
                alert("✅ Supabase connected!");
            }
        };

        checkConnection();
    }, []);

    return <p style={{ textAlign: 'center' }}>🔍 Testing Supabase connection... Check console & alerts.</p>;
}
