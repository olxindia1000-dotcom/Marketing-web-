document.addEventListener('DOMContentLoaded', () => {
  
  // Toggle switches on Figma Inspector Popup
  const toggleLeft = document.getElementById('toggleLeftIcon');
  const toggleRight = document.getElementById('toggleRightIcon');

  const leftIcons = document.querySelectorAll('.left-ic');
  const rightIcons = document.querySelectorAll('.right-ic');

  if(toggleLeft) {
    toggleLeft.addEventListener('click', () => {
      toggleLeft.classList.toggle('active');
      leftIcons.forEach(icon => {
        icon.style.display = toggleLeft.classList.contains('active') ? 'inline' : 'none';
      });
    });
  }

  if(toggleRight) {
    toggleRight.addEventListener('click', () => {
      toggleRight.classList.toggle('active');
      rightIcons.forEach(icon => {
        icon.style.display = toggleRight.classList.contains('active') ? 'inline' : 'none';
      });
    });
  }

  console.log('UI Component Library Loaded Successfully!');
});
