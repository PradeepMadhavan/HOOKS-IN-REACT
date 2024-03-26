// import React, { useEffect } from 'react';
// import './styles.css'; // Import your CSS file where the animation keyframes are defined

// function Home() {
//   useEffect(() => {
//     const anime = document.querySelector(".bg-text");

//     // Split text into characters
//     const characters = anime.textContent.split("");

//     // Clear existing text content
//     anime.textContent = "";

//     // Reconstruct text with each character wrapped in a span
//     characters.forEach((char, index) => {
//       const charElement = document.createElement("span");
//       charElement.textContent = char;
//       charElement.style.transform = "scale(0)";
//       charElement.style.animation = zoomIn 0.5s ease-in-out ${index * 0.05}s forwards;
//       anime.appendChild(charElement);
//     });

//     // Clean up
//     return () => {
//       anime.textContent = characters.join(""); // Revert text back to its original state
//     };
//   }, []); // Empty dependency array to ensure the effect runs only once after component mount

//   return (
//     <div className="bg-text">Hi, Im Keerthana, a frontend web developer.</div>
//   );
// }

// export default Home;








import React from 'react'


 function Home() {
  return (
    <div id='homebg'>
    <h2 className='welcome text-secondary'>!Welcome to my REACT HOOKS-page...</h2>
    </div>
  )
}
export default Home;
