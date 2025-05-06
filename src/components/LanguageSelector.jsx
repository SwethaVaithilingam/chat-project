// import React, { useState } from 'react';
// import './LanguageSelector.css';

// const languages = {
//   en: { label: 'English', icon: 'A' },
//   ta: { label: 'Tamil', icon: 'த' }, // Changed for better visual difference
//   hi: { label: 'Hindi', icon: 'हि' }   // Changed for better visual difference
// };

// export default function LanguageSelector() {
//   const [currentLang, setCurrentLang] = useState('en');
//   const [showDropdown, setShowDropdown] = useState(false);

//   const handleSelect = (langCode) => {
//     setCurrentLang(langCode);
//     setShowDropdown(false);
//   };

//   return (
//     <div className="position-relative me-2 language-selector">
//       {showDropdown && (
//         <ul className="dropdown-menu show position-absolute bottom-100 mb-1">
//           {Object.entries(languages).map(([code, { label, icon }]) => (
//             <li key={code}>
//               <button
//                 className="dropdown-item d-flex align-items-center"
//                 onClick={() => handleSelect(code)}
//               >
//                 <span className="me-2" style={{ fontSize: '1.2rem' }}>{icon}</span>
//                 {label}
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}

// <button
//   className="btn btn-light border"
//   onClick={() => setShowDropdown(!showDropdown)}
// >
//   <span className="language-icon">{languages[currentLang].icon}</span>
// </button>

// {showDropdown && (
//   <ul className="dropdown-menu show position-absolute bottom-100 mb-1">
//     {Object.entries(languages).map(([code, { label, icon }]) => (
//       <li key={code}>
//         <button
//           className="dropdown-item d-flex align-items-center"
//           onClick={() => handleSelect(code)}
//         >
//           <span className="language-icon me-2">{icon}</span>
//           {label}
//         </button>
//       </li>
//     ))}
//   </ul>
// )}

//     </div>
//   );
// }


import React, { useState } from 'react';
import './LanguageSelector.css';

const languages = {
  en: { label: 'English', icon: 'A' },
  ta: { label: 'Tamil', icon: 'த' },
  hi: { label: 'Hindi', icon: 'हि' }
};

export default function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState('en');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (langCode) => {
    setCurrentLang(langCode);
    setShowDropdown(false);
  };

  return (
    <div className="position-relative me-2 language-selector">
      <button
        className="btn p-0 border-0 bg-transparent"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span className="language-icon">{languages[currentLang].icon}</span>
      </button>

      {showDropdown && (
        <ul className="dropdown-menu show position-absolute bottom-100 mb-1 shadow">
          {Object.entries(languages).map(([code, { label, icon }]) => (
            <li key={code}>
              <button
                className="dropdown-item d-flex align-items-center"
                onClick={() => handleSelect(code)}
              >
                <span className="language-icon me-2">{icon}</span>
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
