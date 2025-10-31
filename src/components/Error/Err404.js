import React from 'react';
import { Link } from 'react-router-dom';
import './Err404.css';

const Err404 = () => {
	return (
		<div className="err404-root">
			<div className="err404-card">
				<div className="err404-visual" aria-hidden>
					{/* SVG ilustrativo sencillo */}
					<svg width="220" height="140" viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect x="0" y="0" width="220" height="140" rx="12" fill="#f3f6fb" />
						<g transform="translate(22,20)">
							<circle cx="40" cy="40" r="28" fill="#e6f0ff" />
							<path d="M78 10 L110 10 L110 42" stroke="#cfe3ff" strokeWidth="6" strokeLinecap="round" />
							<rect x="60" y="62" width="86" height="48" rx="8" fill="#fff" stroke="#e6eefc" />
							<text x="6" y="46" fill="#7aa7ff" fontSize="34" fontWeight="700">404</text>
						</g>
					</svg>
				</div>

				<div className="err404-content">
					<h1>Página no encontrada</h1>

					<div className="err404-actions">
						<Link to="/" className="btn primary">Volver al inicio</Link>
						<Link to="/directorio" className="btn">Ver directorio</Link>
					</div>
				</div>
			</div>

		</div>
	);
};

export default Err404;