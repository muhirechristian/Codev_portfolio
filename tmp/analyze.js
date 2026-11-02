const fs = require('fs');
const code = fs.readFileSync('/tmp/bertrand.js', 'utf8');

// Find all section tags or id="..."
const idMatches = code.match(/id:\s*"([^"]+)"|id:\s*'([^']+)'/g);
console.log('IDs:', idMatches);

// Find navigation links
const hrefMatches = code.match(/href:\s*"([^"]+)"|href:\s*'([^']+)'/g);
console.log('Hrefs:', [...new Set(hrefMatches)]);

// Find all text that looks like section headings or titles
const headings = code.match(/(About|Skills|Services|Projects|Experience|Education|Certificates|Contact|Testimonial|Get in touch)/gi);
console.log('Headings sample:', [...new Set(headings)]);
