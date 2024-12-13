import { useEffect, useState } from 'react';

export const useLogoTransition = () => {
  const [opacities, setOpacities] = useState({ white: 1, black: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const missionSection = document.querySelector('.mission-section');
      const aboutSection = document.querySelector('.about-section');
      const logoContainer = document.getElementById('logo-container');
      
      if (missionSection && logoContainer && aboutSection) {
        const scrollPosition = window.scrollY;
        const missionRect = missionSection.getBoundingClientRect();
        const aboutRect = aboutSection.getBoundingClientRect();
        const missionStart = window.scrollY + missionRect.top;
        const missionEnd = missionStart + missionRect.height;
        const viewportHeight = window.innerHeight;
        
        // First transition: white to black during mission section
        let whiteOpacity = 1;
        let blackOpacity = 0;
        
        if (scrollPosition >= missionStart - viewportHeight * 0.3) {
          const progress = (scrollPosition - (missionStart - viewportHeight * 0.3)) / (missionRect.height * 0.7);
          whiteOpacity = Math.max(0, 1 - progress * 2);
          blackOpacity = Math.min(1, progress * 2);
        }

        // Position and fade handling
        if (scrollPosition <= missionEnd) {
          // Keep logo centered until end of mission section
          logoContainer.style.position = 'fixed';
          logoContainer.style.top = '50%';
          logoContainer.style.left = '50%';
          logoContainer.style.transform = 'translate(-50%, -50%)';
        } else {
          // Calculate progress for the transition from center to top
          const distanceToTop = 32; // 2rem = 32px (final top position)
          const startPosition = viewportHeight / 2; // Center of viewport
          const transitionDistance = aboutRect.top - distanceToTop; // Distance to travel before about section
          
          // Calculate the target position based on scroll
          const scrollProgress = Math.max(0, Math.min(1, (scrollPosition - missionEnd) / (viewportHeight / 2)));
          const targetTop = startPosition - (startPosition - distanceToTop) * scrollProgress;
          
          if (aboutRect.top <= viewportHeight * 0.2) {
            // When approaching the about section, fade out the black logo
            const fadeProgress = 1 - (aboutRect.top / (viewportHeight * 0.2));
            blackOpacity = Math.max(0, 1 - fadeProgress);
            
            logoContainer.style.position = 'fixed';
            logoContainer.style.top = `${distanceToTop}px`;
            logoContainer.style.left = '50%';
            logoContainer.style.transform = 'translate(-50%, 0)';
          } else {
            // Smooth transition from center to top
            logoContainer.style.position = 'fixed';
            logoContainer.style.top = `${targetTop}px`;
            logoContainer.style.left = '50%';
            logoContainer.style.transform = `translate(-50%, ${scrollProgress >= 1 ? '0' : '-50%'})`;
          }
        }
        
        setOpacities({ white: whiteOpacity, black: blackOpacity });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return opacities;
};