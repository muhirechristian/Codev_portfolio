const fs = require('fs');
const code = fs.readFileSync('/tmp/bertrand.js', 'utf8');

// Find all React component definitions
// In Vite production bundles with React JSX:
// Components are often function definitions returning JSX (S.jsx or S.jsxs)
// Let's find Hero, Navbar, About, Skills, Projects, Contact, Footer, etc.

function findComponentAround(searchStr, beforeLen = 2000, afterLen = 8000) {
  const idx = code.indexOf(searchStr);
  if (idx === -1) return null;
  return code.substring(Math.max(0, idx - beforeLen), Math.min(code.length, idx + afterLen));
}

// 1. Hero
fs.writeFileSync('/tmp/hero_raw.txt', findComponentAround('Projects Completed', 2000, 4000) || '');

// 2. Navbar
fs.writeFileSync('/tmp/navbar_raw.txt', findComponentAround('name:"About",href:"#about"', 2000, 4000) || '');

// 3. About
fs.writeFileSync('/tmp/about_raw.txt', findComponentAround('id:"about"', 1000, 5000) || '');

// 4. Skills
fs.writeFileSync('/tmp/skills_raw.txt', findComponentAround('id:"skills"', 2000, 6000) || '');

// 5. Projects
fs.writeFileSync('/tmp/projects_raw.txt', findComponentAround('id:"projects"', 2000, 6000) || '');

// 6. Contact
fs.writeFileSync('/tmp/contact_raw.txt', findComponentAround('id:"contact"', 2000, 6000) || '');

// 7. Footer
fs.writeFileSync('/tmp/footer_raw.txt', findComponentAround('All rights reserved', 1000, 3000) || '');

console.log('Extracted raw components to /tmp/*_raw.txt');
