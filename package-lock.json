import React from 'react';
import imgTangram from '../assets/images/game_tangram_1781855491416.jpg';
import imgSenet from '../assets/images/game_senet_1781855504960.jpg';
import imgStomachion from '../assets/images/game_stomachion_1781855518808.jpg';
import imgMancala from '../assets/images/game_mancala_1781855530685.jpg';

const GAME_IMAGES: Record<string, string> = {
  "Tangram": imgTangram,
  "Senet": imgSenet,
  "Stomachion": imgStomachion,
  "Ouri": imgMancala,
};

interface GameThumbnailProps {
  gameName: string;
  className?: string;
  isSelected?: boolean;
}

export const GameThumbnail: React.FC<GameThumbnailProps> = ({ gameName, className = '', isSelected = false }) => {
  // If it is a premium image game, render the premium JPEG asset
  if (GAME_IMAGES[gameName]) {
    return (
      <div className={`w-full h-full relative overflow-hidden bg-[#F2F0E8] flex items-center justify-center ${className}`}>
        <img 
          src={GAME_IMAGES[gameName]} 
          alt={gameName} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
      </div>
    );
  }

  // Otherwise, render a custom, high-fidelity, context-relevant mathematical SVG vector
  const renderSVG = () => {
    switch (gameName) {
      case "Semaphore":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#7245FF" />
            {/* 3x3 Grid pattern */}
            <path d="M40 0V100M80 0V100M120 0V100M0 25H160M0 50H160M0 75H160" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.2" />
            <circle cx="80" cy="50" r="4" fill="#FFFFFF" fillOpacity="0.3" />
            {/* Semaphore Flag / Lines */}
            <line x1="80" y1="50" x2="40" y2="25" stroke="#FFEAA7" strokeWidth="4" strokeLinecap="round" />
            <line x1="80" y1="50" x2="120" y2="25" stroke="#FFEAA7" strokeWidth="4" strokeLinecap="round" />
            <circle cx="40" cy="25" r="7" fill="#FF7675" stroke="#2D3436" strokeWidth="2" />
            <circle cx="120" cy="25" r="7" fill="#2D3436" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="80" cy="75" r="7" fill="#55EFC4" stroke="#2D3436" strokeWidth="2" />
            <line x1="80" y1="50" x2="80" y2="75" stroke="#55EFC4" strokeWidth="4" strokeLinecap="round" />
          </svg>
        );

      case "Tracks":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#00B894" />
            <g stroke="#FFFFFF" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.4">
              <line x1="30" y1="0" x2="30" y2="100" />
              <line x1="60" y1="0" x2="60" y2="100" />
              <line x1="90" y1="0" x2="90" y2="100" />
              <line x1="120" y1="0" x2="120" y2="100" />
              <line x1="150" y1="0" x2="150" y2="100" />
              <line x1="0" y1="25" x2="160" y2="25" />
              <line x1="0" y1="50" x2="160" y2="50" />
              <line x1="0" y1="75" x2="160" y2="75" />
            </g>
            {/* Continuous curvy grid track */}
            <path d="M 15 12 L 45 12 L 45 37 L 75 37 L 105 37 L 105 62 L 135 62 L 135 87" fill="none" stroke="#FFEAA7" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Little animal tracks prints circles */}
            <circle cx="15" cy="12" r="5.5" fill="#FFEAA7" stroke="#2D3436" strokeWidth="1.5" />
            <circle cx="45" cy="12" r="4.5" fill="#FF7675" stroke="#2D3436" strokeWidth="1.5" />
            <circle cx="45" cy="37" r="4.5" fill="#FF7675" stroke="#2D3436" strokeWidth="1.5" />
            <circle cx="75" cy="37" r="4.5" fill="#74B9FF" stroke="#2D3436" strokeWidth="1.5" />
            <circle cx="105" cy="37" r="4.5" fill="#74B9FF" stroke="#2D3436" strokeWidth="1.5" />
            <circle cx="105" cy="62" r="4.5" fill="#DFE6E9" stroke="#2D3436" strokeWidth="1.5" />
            <circle cx="135" cy="62" r="4.5" fill="#DFE6E9" stroke="#2D3436" strokeWidth="1.5" />
            <circle cx="135" cy="87" r="5.5" fill="#2D3436" stroke="#FFEAA7" strokeWidth="1.5" />
          </svg>
        );

      case "Product":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#FF7675" />
            {/* Factors line */}
            <rect x="15" y="65" width="130" height="20" rx="6" fill="#2D3436" />
            <text x="35" y="79" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="monospace">3</text>
            <text x="75" y="79" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="monospace">x</text>
            <text x="115" y="79" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="monospace">7</text>
            {/* Slider arrows pointing to factors */}
            <circle cx="35" cy="55" r="4" fill="#FFEAA7" stroke="#2D3436" strokeWidth="1.5" />
            <circle cx="115" cy="55" r="4" fill="#FFEAA7" stroke="#2D3436" strokeWidth="1.5" />
            <line x1="35" y1="59" x2="35" y2="65" stroke="#2D3436" strokeWidth="2" />
            <line x1="115" y1="59" x2="115" y2="65" stroke="#2D3436" strokeWidth="2" />
            {/* Grid of numbers */}
            <rect x="25" y="15" width="110" height="30" rx="8" fill="#FFF" stroke="#2D3436" strokeWidth="2" />
            <text x="35" y="34" fill="#2D3436" fontSize="13" fontWeight="950" fontFamily="monospace" fontStyle="italic">21</text>
            <circle cx="105" cy="30" r="8" fill="#55EFC4" stroke="#2D3436" strokeWidth="2" />
            <text x="102" y="33" fill="#2D3436" fontSize="8" fontWeight="900" fontFamily="monospace">✓</text>
          </svg>
        );

      case "Dominorio":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#A29BFE" />
            {/* Interlocking dominoes */}
            <g transform="translate(15, 23)">
              {/* Domino 1 */}
              <rect x="0" y="0" width="60" height="30" rx="6" fill="#FFFFFF" stroke="#2D3436" strokeWidth="2.5" />
              <line x1="30" y1="0" x2="30" y2="30" stroke="#2D3436" strokeWidth="2" strokeDasharray="2 2" />
              <circle cx="15" cy="15" r="3.5" fill="#FF7675" stroke="#2D3436" strokeWidth="1" />
              {/* 3 dots in second half */}
              <circle cx="40" cy="10" r="2.5" fill="#2D3436" />
              <circle cx="45" cy="15" r="2.5" fill="#2D3436" />
              <circle cx="50" cy="20" r="2.5" fill="#2D3436" />
            </g>
            <g transform="translate(65, 38)">
              {/* Domino 2 */}
              <rect x="0" y="0" width="60" height="30" rx="6" fill="#FFEAA7" stroke="#2D3436" strokeWidth="2.5" />
              <line x1="30" y1="0" x2="30" y2="30" stroke="#2D3436" strokeWidth="2" strokeDasharray="2 2" />
              {/* 4 dots in first half */}
              <circle cx="10" cy="10" r="2.5" fill="#2D3436" />
              <circle cx="20" cy="10" r="2.5" fill="#2D3436" />
              <circle cx="10" cy="20" r="2.5" fill="#2D3436" />
              <circle cx="20" cy="20" r="2.5" fill="#2D3436" />
              {/* sum display */}
              <circle cx="45" cy="15" r="3.5" fill="#55EFC4" stroke="#2D3436" strokeWidth="1" />
            </g>
            <text x="13" y="18" fill="#2D3436" fontSize="7" fontWeight="900" fontFamily="sans-serif">DOMINO SUMS = 10</text>
          </svg>
        );

      case "Alquerque":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#E17055" />
            {/* Grid framework */}
            <g transform="translate(45, 15)">
              <rect width="70" height="70" fill="#FFF" stroke="#2D3436" strokeWidth="3" />
              {/* Diagonal lines */}
              <line x1="0" y1="0" x2="70" y2="70" stroke="#2D3436" strokeWidth="1.5" />
              <line x1="70" y1="0" x2="0" y2="70" stroke="#2D3436" strokeWidth="1.5" />
              <line x1="35" y1="0" x2="35" y2="70" stroke="#2D3436" strokeWidth="1.5" />
              <line x1="0" y1="35" x2="70" y2="35" stroke="#2D3436" strokeWidth="1.5" />
              {/* Playing circular wooden pegs */}
              <circle cx="0" cy="0" r="5" fill="#2D3436" stroke="#FFF" strokeWidth="1" />
              <circle cx="35" cy="0" r="5" fill="#2D3436" stroke="#FFF" strokeWidth="1" />
              <circle cx="70" cy="0" r="5" fill="#2D3436" stroke="#FFF" strokeWidth="1" />
              <circle cx="0" cy="35" r="5" fill="#FFEAA7" stroke="#2D3436" strokeWidth="1.5" />
              <circle cx="70" cy="35" r="5" fill="#FFEAA7" stroke="#2D3436" strokeWidth="1.5" />
              <circle cx="35" cy="70" r="5" fill="#FFF" stroke="#2D3436" strokeWidth="1.5" />
              <circle cx="0" cy="70" r="5" fill="#FFF" stroke="#2D3436" strokeWidth="1.5" />
            </g>
          </svg>
        );

      case "Flume":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#0984E3" />
            {/* Sinuous flow tracks */}
            <path d="M 15 50 Q 45 10, 75 50 T 135 50 T 150 20" fill="none" stroke="#ECCC68" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 15 50 Q 45 90, 75 50 T 135 50 T 150 80" fill="none" stroke="#74B9FF" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 2" />
            {/* Intersections and switches */}
            <circle cx="15" cy="50" r="7" fill="#FFF" stroke="#2D3436" strokeWidth="2" />
            <circle cx="75" cy="50" r="7" fill="#FF7675" stroke="#2D3436" strokeWidth="2" />
            <circle cx="135" cy="50" r="7" fill="#55EFC4" stroke="#2D3436" strokeWidth="2" />
          </svg>
        );

      case "Hex":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#6C5CE7" />
            {/* Hex cells pattern */}
            <g transform="translate(18, 15)">
              {/* Row 1 */}
              <polygon points="30,0 45,8 45,24 30,32 15,24 15,8" fill="#FFF" stroke="#2D3436" strokeWidth="1.5" opacity="0.8" />
              <polygon points="60,0 75,8 75,24 60,32 45,24 45,8" fill="#FFF" stroke="#2D3436" strokeWidth="1.5" opacity="0.8" />
              <polygon points="90,0 105,8 105,24 90,32 75,24 75,8" fill="#55EFC4" stroke="#2D3436" strokeWidth="1.75" />
              
              {/* Row 2 */}
              <polygon points="45,24 60,32 60,48 45,56 30,48 30,32" fill="#74B9FF" stroke="#2D3436" strokeWidth="1.75" />
              <polygon points="75,24 90,32 90,48 75,56 60,48 60,32" fill="#FF7675" stroke="#2D3436" strokeWidth="2" />
              <polygon points="105,24 120,32 120,48 105,56 90,48 90,32" fill="#FFF" stroke="#2D3436" strokeWidth="1.5" opacity="0.8" />
            </g>
            <text x="35" y="90" fill="#FFEAA7" fontSize="8" fontWeight="950" fontFamily="monospace">RED vs BLUE CONNECTION</text>
          </svg>
        );

      case "Amazons":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#2D3436" />
            {/* Small stylized grid with burning barriers */}
            <g transform="translate(45, 10)" opacity="0.85">
              <rect x="0" y="0" width="80" height="80" fill="#DFE6E9" stroke="#FFF" strokeWidth="2.5" />
              <rect x="0" y="0" width="40" height="40" fill="#ADB5BD" />
              <rect x="40" y="40" width="40" height="40" fill="#ADB5BD" />
              {/* Queen Arrow Indicators */}
              <line x1="40" y1="40" x2="10" y2="10" stroke="#FF7675" strokeWidth="3" strokeLinecap="round" />
              <line x1="40" y1="40" x2="70" y2="10" stroke="#FED330" strokeWidth="3" strokeLinecap="round" />
              {/* Burning obstacles (little custom flames/crosses) */}
              <circle cx="20" cy="60" r="6" fill="#FF7675" stroke="#2D3436" strokeWidth="1.5" />
              <text x="18" y="63" fill="#FFF" fontSize="8" fontWeight="Bold">x</text>
              {/* Queen symbol representing the Amazon piece */}
              <circle cx="40" cy="40" r="9" fill="#FFF" stroke="#2D3436" strokeWidth="2" />
              <polygon points="36,44 44,44 44,36 40,41 36,36" fill="#2D3436" />
            </g>
          </svg>
        );

      case "Advancement":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#FD9644" />
            {/* Racing/Advancement rows with arrow indicators */}
            <line x1="20" y1="30" x2="140" y2="30" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
            <line x1="20" y1="50" x2="140" y2="50" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
            <line x1="20" y1="70" x2="140" y2="70" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
            {/* Runner tokens advancing to the right */}
            <circle cx="95" cy="30" r="7" fill="#10AC84" stroke="#2D3436" strokeWidth="2" />
            <circle cx="55" cy="50" r="7" fill="#FF9FF3" stroke="#2D3436" strokeWidth="2" />
            <circle cx="115" cy="70" r="7" fill="#54A0FF" stroke="#2D3436" strokeWidth="2" />
            <polygon points="121,70 126,67 126,73" fill="#2D3436" />
            {/* Goal flag */}
            <line x1="130" y1="20" x2="130" y2="80" stroke="#2D3436" strokeWidth="2" />
            <polygon points="130,20 145,26 130,32" fill="#2D3436" />
          </svg>
        );

      case "Labyrinth":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#2B2B2B" />
            {/* Concentric square walls maze vector */}
            <g transform="translate(30, 10)">
              <rect x="0" y="0" width="100" height="80" fill="none" stroke="#55EFC4" strokeWidth="3.5" rx="4" />
              <rect x="15" y="12" width="70" height="56" fill="none" stroke="#55EFC4" strokeWidth="3.5" rx="4" />
              <rect x="30" y="24" width="40" height="32" fill="none" stroke="#FFEAA7" strokeWidth="3.5" rx="4" />
              {/* maze path cuts/breaks */}
              <rect x="40" y="-3" width="15" height="10" fill="#2B2B2B" />
              <rect x="75" y="9" width="15" height="10" fill="#2B2B2B" />
              <circle cx="50" cy="40" r="5" fill="#FF7675" stroke="#2D3436" strokeWidth="1.5" />
            </g>
          </svg>
        );

      case "Cats and Rats":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#F1C40F" />
            {/* Math Grid lines representing movement coordinate system */}
            <path d="M 20 0 V100 M 40 0 V100 M 60 0 V100 M 80 0 V100 M 100 0 V100 M 120 0 V100 M 140 0 V100" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.3" />
            <path d="M 0 20 H160 M 0 40 H160 M 0 60 H160 M 0 80 H160" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.3" />
            {/* Hypothetical Distance Path (Manhattan vs Euclidean) */}
            <path d="M40 80 L120 80 L120 20" fill="none" stroke="#2D3436" strokeWidth="3" strokeDasharray="3 3.5" strokeLinecap="round" />
            {/* Angry Orange Cat avatar on (2,4) - coordinates offset */}
            <circle cx="40" cy="80" r="9.5" fill="#E67E22" stroke="#2D3436" strokeWidth="2.5" />
            <polygon points="34,74 38,72 36,78" fill="#2D3436" />
            <polygon points="46,74 42,72 44,78" fill="#2D3436" />
            {/* Tiny mouse avatar on (6,1) */}
            <circle cx="120" cy="20" r="7.5" fill="#95A5A6" stroke="#2D3436" strokeWidth="2" />
            <circle cx="114" cy="14" r="3.5" fill="#D2D7D9" stroke="#2D3436" strokeWidth="1" />
            <circle cx="126" cy="14" r="3.5" fill="#D2D7D9" stroke="#2D3436" strokeWidth="1" />
          </svg>
        );

      case "Alcuin of York":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#3867D6" />
            {/* Winding blue river crossing with green landscape margins */}
            <rect x="0" y="0" width="30" height="100" fill="#20BF6B" />
            <rect x="130" y="0" width="30" height="100" fill="#20BF6B" />
            <line x1="30" y1="0" x2="30" y2="100" stroke="#2D3436" strokeWidth="2" />
            <line x1="130" y1="0" x2="130" y2="100" stroke="#2D3436" strokeWidth="2" />
            {/* Wooden ferry boat in the middle */}
            <path d="M 60 55 L 100 55 L 105 45 L 55 45 Z" fill="#D5B895" stroke="#2D3436" strokeWidth="2" />
            {/* Passengers icons: Wolf (grey), Goat (white), Cabbage (green) */}
            <circle cx="68" cy="40" r="4.5" fill="#7F8C8D" stroke="#2D3436" strokeWidth="1" /> {/* Wolf */}
            <circle cx="80" cy="40" r="4.5" fill="#FFF" stroke="#2D3436" strokeWidth="1" /> {/* Goat */}
            <circle cx="92" cy="40" r="4.5" fill="#2ECC71" stroke="#2D3436" strokeWidth="1" /> {/* Cabbage */}
            {/* Wave dashes on river */}
            <path d="M 45 20 H 60 M 105 80 H 120" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />
          </svg>
        );

      case "15 Puzzle":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#D08770" />
            {/* 3x3 Grid showing sliding number squares */}
            <g transform="translate(38, 11)">
              <rect width="84" height="78" rx="6" fill="#222831" stroke="#2D3436" strokeWidth="2.5" />
              {/* Sliding blocks */}
              <rect x="5" y="5" width="22" height="20" rx="3" fill="#FFF" stroke="#2D3436" strokeWidth="1.5" />
              <text x="12" y="19" fill="#2D3436" fontSize="11" fontWeight="950" fontFamily="sans-serif">1</text>
              
              <rect x="31" y="5" width="22" height="20" rx="3" fill="#FFF" stroke="#2D3436" strokeWidth="1.5" />
              <text x="38" y="19" fill="#2D3436" fontSize="11" fontWeight="950" fontFamily="sans-serif">2</text>
              
              <rect x="57" y="5" width="22" height="20" rx="3" fill="#FFF" stroke="#2D3436" strokeWidth="1.5" />
              <text x="64" y="19" fill="#2D3436" fontSize="11" fontWeight="950" fontFamily="sans-serif">3</text>

              <rect x="5" y="29" width="22" height="20" rx="3" fill="#FFF" stroke="#2D3436" strokeWidth="1.5" />
              <text x="12" y="43" fill="#2D3436" fontSize="11" fontWeight="950" fontFamily="sans-serif">4</text>
              
              <rect x="31" y="29" width="22" height="20" rx="3" fill="#FFEAA7" stroke="#2D3436" strokeWidth="1.5" />
              <text x="38" y="43" fill="#2D3436" fontSize="11" fontWeight="950" fontFamily="sans-serif">5</text>
              
              <rect x="57" y="29" width="22" height="20" rx="3" fill="#FFF" stroke="#2D3436" strokeWidth="1.5" />
              <text x="64" y="43" fill="#2D3436" fontSize="11" fontWeight="950" fontFamily="sans-serif">6</text>

              <rect x="5" y="53" width="22" height="20" rx="3" fill="#FFF" stroke="#2D3436" strokeWidth="1.5" />
              <text x="12" y="67" fill="#2D3436" fontSize="11" fontWeight="950" fontFamily="sans-serif">7</text>
              
              {/* Empty slot pointing arrow */}
              <rect x="31" y="53" width="22" height="20" rx="3" fill="#393E46" />
              <path d="M 42 59 L 42 67 M 42 59 L 39 62 M 42 59 L 45 62" stroke="#55EFC4" strokeWidth="1.75" strokeLinecap="round" />

              <rect x="57" y="53" width="22" height="20" rx="3" fill="#FFF" stroke="#2D3436" strokeWidth="1.5" />
              <text x="64" y="67" fill="#2D3436" fontSize="11" fontWeight="950" fontFamily="sans-serif">8</text>
            </g>
          </svg>
        );

      case "Polyminoes":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#81ECEC" />
            {/* Colorful custom block setups representing pentomino shapes */}
            <g transform="translate(30, 22)">
              {/* T shape (Pink) */}
              <rect x="0" y="0" width="18" height="18" fill="#FF7675" stroke="#2D3436" strokeWidth="2" />
              <rect x="18" y="0" width="18" height="18" fill="#FF7675" stroke="#2D3436" strokeWidth="2" />
              <rect x="36" y="0" width="18" height="18" fill="#FF7675" stroke="#2D3436" strokeWidth="2" />
              <rect x="18" y="18" width="18" height="18" fill="#FF7675" stroke="#2D3436" strokeWidth="2" />
              
              {/* L shape (Yellow) */}
              <rect x="58" y="18" width="18" height="18" fill="#FFEAA7" stroke="#2D3436" strokeWidth="2" />
              <rect x="76" y="18" width="18" height="18" fill="#FFEAA7" stroke="#2D3436" strokeWidth="2" />
              <rect x="76" y="0" width="18" height="18" fill="#FFEAA7" stroke="#2D3436" strokeWidth="2" />
              <rect x="76" y="-18" width="18" height="18" fill="#FFEAA7" stroke="#2D3436" strokeWidth="2" />
            </g>
          </svg>
        );

      case "Magic Squares":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#FFEAA7" />
            {/* Grid structure */}
            <g transform="translate(42, 10)">
              <rect width="78" height="78" rx="6" fill="#FFF" stroke="#2D3436" strokeWidth="3" />
              <line x1="26" y1="0" x2="26" y2="78" stroke="#2D3436" strokeWidth="1.5" />
              <line x1="52" y1="0" x2="52" y2="78" stroke="#2D3436" strokeWidth="1.5" />
              <line x1="0" y1="26" x2="78" y2="26" stroke="#2D3436" strokeWidth="1.5" />
              <line x1="0" y1="52" x2="78" y2="52" stroke="#2D3436" strokeWidth="1.5" />
              {/* Numbers */}
              <text x="8" y="18" fill="#2D3436" fontSize="11" fontWeight="950" fontFamily="sans-serif">8</text>
              <text x="34" y="18" fill="#2D3436" fontSize="11" fontWeight="950" fontFamily="sans-serif">1</text>
              <text x="60" y="18" fill="#2D3436" fontSize="11" fontWeight="950" fontFamily="sans-serif">6</text>
              <text x="8" y="44" fill="#2D3436" fontSize="11" fontWeight="950" fontFamily="sans-serif">3</text>
              <text x="34" y="44" fill="#FF7675" fontSize="11" fontWeight="950" fontFamily="sans-serif">5</text>
              <text x="60" y="44" fill="#2D3436" fontSize="11" fontWeight="950" fontFamily="sans-serif">7</text>
              <text x="8" y="70" fill="#2D3436" fontSize="11" fontWeight="950" fontFamily="sans-serif">4</text>
              <text x="34" y="70" fill="#2D3436" fontSize="11" fontWeight="950" fontFamily="sans-serif">9</text>
              <text x="60" y="70" fill="#2D3436" fontSize="11" fontWeight="950" fontFamily="sans-serif">2</text>
            </g>
            {/* "Sum = 15" tag overlay */}
            <rect x="111" y="32" width="44" height="15" rx="3" fill="#2D3436" />
            <text x="115" y="42" fill="#FFEAA7" fontSize="8" fontWeight="Bold" fontFamily="monospace">SUM=15</text>
          </svg>
        );

      case "Sam Loyd":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#FF7675" />
            {/* Classic physics balancing scale diagram vector */}
            <path d="M 80 85 L 80 40 M 40 85 H 120" stroke="#2D3436" strokeWidth="3" />
            {/* Scale balancing arm */}
            <line x1="30" y1="45" x2="130" y2="35" stroke="#2D3436" strokeWidth="4.5" strokeLinecap="round" />
            {/* Suspended plates */}
            <line x1="30" y1="45" x2="30" y2="65" stroke="#2D3436" strokeWidth="1.5" />
            <ellipse cx="30" cy="65" rx="14" ry="4" fill="#FFF" stroke="#2D3436" strokeWidth="1.5" />
            {/* Weight 1 */}
            <rect x="24" y="55" width="12" height="10" fill="#FFEAA7" stroke="#2D3436" strokeWidth="1.5" rx="2" />
            {/* Suspended plates 2 */}
            <line x1="130" y1="35" x2="130" y2="55" stroke="#2D3436" strokeWidth="1.5" />
            <ellipse cx="130" cy="55" rx="14" ry="4" fill="#FFF" stroke="#2D3436" strokeWidth="1.5" />
            {/* Weight 2 */}
            <circle cx="130" cy="48" r="6" fill="#10AC84" stroke="#2D3436" strokeWidth="1.5" />
          </svg>
        );

      case "Einstein's Riddle":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#1B1F3B" />
            {/* Lined houses of distinct colors representing the famous puzzle */}
            <g transform="translate(14, 25)">
              {/* House 1 (Red) */}
              <polygon points="12,0 24,12 0,12" fill="#E84118" stroke="#FFF" strokeWidth="1" />
              <rect x="2" y="12" width="20" height="24" fill="#C23616" stroke="#FFF" strokeWidth="1" />
              <rect x="8" y="22" width="8" height="14" fill="#FFF" />
              
              {/* House 2 (Blue) */}
              <g transform="translate(28, 0)">
                <polygon points="12,0 24,12 0,12" fill="#0097E6" stroke="#FFF" strokeWidth="1" />
                <rect x="2" y="12" width="20" height="24" fill="#0079C1" stroke="#FFF" strokeWidth="1" />
                <rect x="8" y="22" width="8" height="14" fill="#FFF" />
              </g>

              {/* House 3 (Yellow) */}
              <g transform="translate(56, 0)">
                <polygon points="12,0 24,12 0,12" fill="#FBC531" stroke="#FFF" strokeWidth="1" />
                <rect x="2" y="12" width="20" height="24" fill="#E1B12C" stroke="#FFF" strokeWidth="1" />
                <rect x="8" y="22" width="8" height="14" fill="#FFF" />
              </g>

              {/* House 4 (Green) */}
              <g transform="translate(84, 0)">
                <polygon points="12,0 24,12 0,12" fill="#4CD137" stroke="#FFF" strokeWidth="1" />
                <rect x="2" y="12" width="20" height="24" fill="#44BD32" stroke="#FFF" strokeWidth="1" />
                <rect x="8" y="22" width="8" height="14" fill="#FFF" />
              </g>

              {/* House 5 (White) */}
              <g transform="translate(112, 0)">
                <polygon points="12,0 24,12 0,12" fill="#F5F6FA" stroke="#2D3436" strokeWidth="1" />
                <rect x="2" y="12" width="20" height="24" fill="#DCDDE1" stroke="#2D3436" strokeWidth="1" />
                <rect x="8" y="22" width="8" height="14" fill="#2D3436" />
              </g>
            </g>
            <text x="35" y="80" fill="#718093" fontSize="7" fontWeight="bold" fontFamily="monospace">WHO OWNS THE FISH ?</text>
          </svg>
        );

      case "Sokoban":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#D35400" />
            {/* Grid walls and push box */}
            <g transform="translate(32, 10)">
              {/* Walls (deep red) */}
              <rect x="0" y="0" width="24" height="24" fill="#2C3E50" stroke="#FFF" strokeWidth="1.5" />
              <rect x="0" y="24" width="24" height="24" fill="#2C3E50" stroke="#FFF" strokeWidth="1.5" />
              {/* Box (brown wood) with X lines */}
              <rect x="48" y="24" width="24" height="24" fill="#F39C12" stroke="#2D3436" strokeWidth="2" />
              <line x1="48" y1="24" x2="72" y2="48" stroke="#2D3436" strokeWidth="1.5" />
              <line x1="72" y1="24" x2="48" y2="48" stroke="#2D3436" strokeWidth="1.5" />
              {/* Target (gold circle) */}
              <circle cx="84" cy="36" r="6" fill="#F1C40F" stroke="#2D3436" strokeWidth="1.5" />
              {/* Push guy avatar (blue ellipse) */}
              <circle cx="36" cy="36" r="7.5" fill="#3498DB" stroke="#2D3436" strokeWidth="2" />
              <path d="M 36 36 L 44 36" stroke="#2D3436" strokeWidth="2" />
            </g>
          </svg>
        );

      case "Arbusto":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#27AE60" />
            {/* Procedural Fractal Tree diagram */}
            <g transform="translate(80, 95)" stroke="#FFFFFF" strokeLinecap="round">
              <line x1="0" y1="0" x2="0" y2="-30" strokeWidth="3" />
              
              {/* Branch level 1 */}
              <line x1="0" y1="-30" x2="-25" y2="-55" strokeWidth="2.5" />
              <line x1="0" y1="-30" x2="25" y2="-55" strokeWidth="2.5" />

              {/* Branch level 2 */}
              <line x1="-25" y1="-55" x2="-40" y2="-72" strokeWidth="1.5" />
              <line x1="-25" y1="-55" x2="-15" y2="-72" strokeWidth="1.5" />
              
              <line x1="25" y1="-55" x2="15" y2="-72" strokeWidth="1.5" />
              <line x1="25" y1="-55" x2="40" y2="-72" strokeWidth="1.5" />

              {/* Little leaf-tips */}
              <circle cx="-40" cy="-72" r="2.5" fill="#FFEAA7" />
              <circle cx="-15" cy="-72" r="2.5" fill="#FFEAA7" />
              <circle cx="15" cy="-72" r="2.5" fill="#FFEAA7" />
              <circle cx="40" cy="-72" r="2.5" fill="#FFEAA7" />
            </g>
          </svg>
        );

      case "Chaos Game":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#1E272E" />
            {/* Triangle with glowing star dots representing Siepinski fractal dots */}
            <polygon points="80,10 25,85 135,85" stroke="#00D2D3" strokeWidth="2.5" strokeDasharray="3 3.5" />
            <polygon points="80,47 52,85 108,85" fill="#00D2D3" fillOpacity="0.1" />
            {/* Dots */}
            <circle cx="80" cy="10" r="3.5" fill="#FFEAA7" />
            <circle cx="25" cy="85" r="3.5" fill="#FFEAA7" />
            <circle cx="135" cy="85" r="3.5" fill="#FFEAA7" />
            <circle cx="53" cy="48" r="1.5" fill="#FFF" />
            <circle cx="107" cy="48" r="1.5" fill="#FFF" />
            <circle cx="80" cy="85" r="1.5" fill="#FFF" />
            <circle cx="80" cy="28" r="1.5" fill="#FFF" />
            <circle cx="39" cy="66" r="1.5" fill="#FFF" />
            <circle cx="121" cy="66" r="1.5" fill="#FFF" />
          </svg>
        );

      case "Sudoku":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#F5F6FA" />
            {/* Sudoku grid */}
            <g transform="translate(42, 10)">
              <rect width="78" height="78" fill="#FFF" stroke="#222F3E" strokeWidth="2.5" />
              {/* Inner thin lines */}
              <g stroke="#8395A7" strokeWidth="0.75">
                <line x1="8.6" y1="0" x2="8.6" y2="78" />
                <line x1="17.2" y1="0" x2="17.2" y2="78" />
                <line x1="34.4" y1="0" x2="34.4" y2="78" />
                <line x1="43" y1="0" x2="43" y2="78" />
                <line x1="60.2" y1="0" x2="60.2" y2="78" />
                <line x1="68.8" y1="0" x2="68.8" y2="78" />
                <line x1="0" y1="8.6" x2="78" y2="8.6" />
                <line x1="0" y1="17.2" x2="78" y2="17.2" />
                <line x1="0" y1="34.4" x2="78" y2="34.4" />
                <line x1="0" y1="43" x2="78" y2="43" />
                <line x1="0" y1="60.2" x2="78" y2="60.2" />
                <line x1="0" y1="68.8" x2="78" y2="68.8" />
              </g>
              {/* Major group separators */}
              <line x1="26" y1="0" x2="26" y2="78" stroke="#222F3E" strokeWidth="1.75" />
              <line x1="52" y1="0" x2="52" y2="78" stroke="#222F3E" strokeWidth="1.75" />
              <line x1="0" y1="26" x2="78" y2="26" stroke="#222F3E" strokeWidth="1.75" />
              <line x1="0" y1="52" x2="78" y2="52" stroke="#222F3E" strokeWidth="1.75" />
              {/* Predetermined bold numbers */}
              <text x="13" y="20" fill="#2E86DE" fontSize="8" fontWeight="Bold" fontFamily="monospace">9</text>
              <text x="39" y="46" fill="#353B48" fontSize="8" fontWeight="Bold" fontFamily="monospace">5</text>
              <text x="65" y="72" fill="#2E86DE" fontSize="8" fontWeight="Bold" fontFamily="monospace">3</text>
            </g>
          </svg>
        );

      case "Nim":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#2D3436" />
            {/* Staggered matchsticks */}
            <g transform="translate(15, 20)">
              {/* Row 1 (1 match) */}
              <rect x="62" y="0" width="4" height="20" rx="1.5" fill="#FFEAA7" stroke="#2D3436" strokeWidth="0.5" />
              <ellipse cx="64" cy="-2" rx="3" ry="4" fill="#FF7675" />
              
              {/* Row 2 (3 matches) */}
              <rect x="42" y="30" width="4" height="20" rx="1.5" fill="#FFEAA7" stroke="#2D3436" strokeWidth="0.5" />
              <ellipse cx="44" cy="28" rx="3" ry="4" fill="#FF7675" />

              <rect x="62" y="30" width="4" height="20" rx="1.5" fill="#FFEAA7" stroke="#2D3436" strokeWidth="0.5" />
              <ellipse cx="64" cy="28" rx="3" ry="4" fill="#FF7675" />

              <rect x="82" y="30" width="4" height="20" rx="1.5" fill="#FFEAA7" stroke="#2D3436" strokeWidth="0.5" />
              <ellipse cx="84" cy="28" rx="3" ry="4" fill="#FF7675" />
            </g>
            <text x="35" y="85" fill="#BDC5C8" fontSize="8" fontWeight="950" fontFamily="sans-serif">TAKE 1, 2 OR 3 MATCHES</text>
          </svg>
        );

      case "Game of 24":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#D63031" />
            {/* Number circles and math operators directing to 24 */}
            <g transform="translate(15, 25)">
              <circle cx="15" cy="15" r="12" fill="#FFA502" stroke="#2D3436" strokeWidth="1.5" />
              <text x="11" y="20" fill="#2D3436" fontSize="12" fontWeight="Bold" fontFamily="sans-serif">6</text>
              
              <circle cx="50" cy="15" r="12" fill="#FFA502" stroke="#2D3436" strokeWidth="1.5" />
              <text x="46" y="20" fill="#2D3436" fontSize="12" fontWeight="Bold" fontFamily="sans-serif">4</text>

              <circle cx="85" cy="15" r="12" fill="#FFA502" stroke="#2D3436" strokeWidth="1.5" />
              <text x="81" y="20" fill="#2D3436" fontSize="12" fontWeight="Bold" fontFamily="sans-serif">3</text>

              <circle cx="120" cy="15" r="12" fill="#FFA502" stroke="#2D3436" strokeWidth="1.5" />
              <text x="116" y="20" fill="#2D3436" fontSize="12" fontWeight="Bold" fontFamily="sans-serif">2</text>
            </g>
            {/* Equation representation */}
            <text x="38" y="75" fill="#FFF" fontSize="11" fontWeight="Black" fontFamily="sans-serif">6 × 4 × (3 - 2) = </text>
            <rect x="120" y="61" width="28" height="20" rx="4" fill="#2D3436" />
            <text x="124" y="75" fill="#FFD2FF" fontSize="10" fontWeight="Black" fontFamily="sans-serif">24</text>
          </svg>
        );

      case "Tantrix":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#2D3436" />
            {/* Hexagonal tiles curving bands */}
            <polygon points="80,10 115,30 115,70 80,90 45,70 45,30" fill="#1E272E" stroke="#FFF" strokeWidth="1.5" />
            {/* Colorful continuous pathways intersecting across the tile face */}
            <path d="M 45 50 Q 80 50, 115 50" fill="none" stroke="#FF5252" strokeWidth="6" strokeLinecap="round" />
            <path d="M 62.5 40 Q 80 70, 97.5 40" fill="none" stroke="#341F97" strokeWidth="4" strokeLinecap="round" />
            <path d="M 62.5 60 Q 80 60, 97.5 60" fill="none" stroke="#F1C40F" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case "Azumetria":
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#00D2D3" />
            {/* Rotational symmetric grid geometric flowers */}
            <g transform="translate(80, 50)">
              {/* Outer symmetry petals */}
              <circle cx="0" cy="0" r="32" fill="none" stroke="#FFF" strokeWidth="4" />
              <rect x="-20" y="-20" width="40" height="40" rx="4" fill="none" stroke="#FFF" strokeWidth="2" transform="rotate(0)" />
              <rect x="-20" y="-20" width="40" height="40" rx="4" fill="none" stroke="#FFF" strokeWidth="2" transform="rotate(30)" />
              <rect x="-20" y="-20" width="40" height="40" rx="4" fill="none" stroke="#FFF" strokeWidth="2" transform="rotate(60)" />
              {/* Core circular target indicator */}
              <circle cx="0" cy="0" r="12" fill="#FFEAA7" stroke="#2D3436" strokeWidth="2.5" />
              <line x1="-32" y1="0" x2="32" y2="0" stroke="#FFF" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="-32" x2="0" y2="32" stroke="#FFF" strokeWidth="1" strokeDasharray="3 3" />
            </g>
          </svg>
        );

      case "Fibonacci (Flower)":
      default:
        return (
          <svg className="w-full h-full" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#10AC84" />
            {/* Fibonacci Golden spiral curve overlay */}
            <path d="M 80 50 A 5 5 0 0 1 85 50 A 10 10 0 0 1 75 50 A 15 15 0 0 1 90 50 A 25 25 0 0 1 65 50 A 40 40 0 0 1 105 50" fill="none" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
            {/* Golden spiral coordinates points */}
            <circle cx="80" cy="50" r="2.5" fill="#FFEAA7" />
            <circle cx="85" cy="50" r="2.5" fill="#FFEAA7" />
            <circle cx="75" cy="50" r="2.5" fill="#FFEAA7" />
            <circle cx="90" cy="50" r="3" fill="#FFEAA7" />
            <circle cx="65" cy="50" r="3.5" fill="#FFEAA7" />
            <circle cx="105" cy="50" r="4.5" fill="#FFEAA7" />
            <text x="35" y="85" fill="#FFF" fontSize="8" fontWeight="Bold" fontFamily="monospace">THE INFINITE SPIRAL</text>
          </svg>
        );
    }
  };

  return (
    <div className={`w-full h-full relative overflow-hidden flex items-center justify-center select-none ${className}`}>
      {renderSVG()}
      {/* Neo shadow grid details overlay */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />
    </div>
  );
};
