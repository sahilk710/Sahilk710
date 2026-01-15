// Typing animation for hero roles
const roles = ["Data Scientist", "Python Developer", "ML & Data Engineer", "GenAI / Prompt Engineer"];
let i = 0, j = 0;
const typingSpeed = 100, erasingSpeed = 50, delay = 2000;
const typingElement = document.getElementById("typing");

function typeRole() {
  if (j < roles[i].length) {
    typingElement.textContent += roles[i][j];
    j++;
    setTimeout(typeRole, typingSpeed);
  } else {
    setTimeout(eraseRole, delay);
  }
}

function eraseRole() {
  if (j > 0) {
    typingElement.textContent = roles[i].substring(0, j-1);
    j--;
    setTimeout(eraseRole, erasingSpeed);
  } else {
    i = (i + 1) % roles.length;
    setTimeout(typeRole, typingSpeed);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if(roles.length) setTimeout(typeRole, delay);
});

// Smooth scroll for buttons
document.querySelectorAll('a.btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(btn.getAttribute('href'));
    target.scrollIntoView({behavior: 'smooth'});
  });
});
