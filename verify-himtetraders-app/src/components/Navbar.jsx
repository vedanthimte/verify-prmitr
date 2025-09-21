import React from 'react';

const Navbar = () => {
    return (
        <nav
            style={{
                backgroundColor: '#1a1a1a',
                padding: '12px 24px',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                color: '#fff',
                // margin : 2,
            }}
        >
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                Prof. Ram Meghe Institute Of Technology & Research
            </div>
            {/* <a
                href="https://himtetraders.site"

                target="_blank"
                rel="noopener noreferrer"
                style={{
                    backgroundColor: '#903df5',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: '500',
                }}
            >
                🔗 Back to Main Site
            </a> */}

            {/* <a
                href="https://cisco.prmitr.in"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    backgroundColor: '#903df5',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: '500',
                }}
            >
                Cisco
            </a>
            <a
                href="https://ecell.prmitr.in"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    backgroundColor: '#903df5',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: '500',
                }}
            >
                Ecell
            </a>
            <a
                href="https://gdg.prmitr.in"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    backgroundColor: '#903df5',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: '500',
                }}
            >
               GDG
            </a> */}
        </nav>
    );
};

export default Navbar;
