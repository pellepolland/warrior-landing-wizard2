interface LogoOverlayProps {
  whiteLogo: string;
  blackLogo: string;
  whiteOpacity: number;
  blackOpacity: number;
  overall: number;
  scale: number;
}

export const LogoOverlay = ({ 
  whiteLogo, 
  blackLogo, 
  whiteOpacity, 
  blackOpacity,
  overall,
  scale 
}: LogoOverlayProps) => {
  // Calculate position based on scale to match header padding (px-4)
  const translateX = `calc(${(1 - scale) * -50}% + ${(1 - scale) * 16}px)`;
  const isAnimating = scale < 1;
  
  // Calculate vertical position - moves from center (50%) to top (0) as scale decreases
  const translateY = isAnimating ? `${(scale - 0.1) * 50}%` : '0';
  
  return (
    <div 
      id="logo-container" 
      className="fixed inset-0 flex items-start justify-center z-10"
    >
      <div 
        className="relative w-full max-w-[80vw]"
        style={{ 
          opacity: overall,
          transform: `translate(${translateX}, ${translateY}) scale(${scale})`,
          transition: 'transform 0.1s linear, opacity 0.1s linear',
          transformOrigin: 'top left'
        }}
      >
        <img
          id="white-logo"
          src={whiteLogo}
          alt="Warrior Capital Logo White"
          className="w-full h-auto absolute top-0 left-0 transition-opacity duration-300"
          style={{ opacity: whiteOpacity }}
        />
        <img
          id="black-logo"
          src={blackLogo}
          alt="Warrior Capital Logo Black"
          className="w-full h-auto transition-opacity duration-300"
          style={{ opacity: blackOpacity }}
        />
        <img
          src={whiteLogo}
          alt=""
          className="w-full h-auto invisible"
        />
      </div>
    </div>
  );
};