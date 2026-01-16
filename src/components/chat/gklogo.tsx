export const DragonLogo = ({ className = "w-12 h-12" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="dragonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      {/* Main Body (chubby round shape) */}
      <ellipse 
        cx="100" 
        cy="120" 
        rx="45" 
        ry="50" 
        fill="url(#dragonGradient)"
      />

      {/* Head (big round head) */}
      <circle 
        cx="100" 
        cy="75" 
        r="38" 
        fill="url(#dragonGradient)"
      />

      {/* Left Ear */}
      <path 
        d="M 75 55 Q 70 45, 75 42 Q 80 45, 78 55 Z" 
        fill="url(#dragonGradient)"
      />

      {/* Right Ear */}
      <path 
        d="M 125 55 Q 130 45, 125 42 Q 120 45, 122 55 Z" 
        fill="url(#dragonGradient)"
      />

      {/* Hair Spikes on top */}
      <path 
        d="M 95 45 L 93 35 L 97 45 Z" 
        fill="url(#dragonGradient)"
      />
      <path 
        d="M 100 42 L 98 30 L 102 42 Z" 
        fill="url(#dragonGradient)"
      />
      <path 
        d="M 105 45 L 103 35 L 107 45 Z" 
        fill="url(#dragonGradient)"
      />

      {/* Left Wing */}
      <path 
        d="M 55 100 Q 30 90, 35 75 Q 40 80, 45 85 Q 50 95, 55 100 Z" 
        fill="url(#dragonGradient)"
      />
      {/* Wing membrane lines */}
      <path d="M 40 82 L 50 95" stroke="#0f172a" strokeWidth="1.5" opacity="0.3"/>
      <path d="M 35 78 L 48 92" stroke="#0f172a" strokeWidth="1.5" opacity="0.3"/>

      {/* Right Wing */}
      <path 
        d="M 145 100 Q 170 90, 165 75 Q 160 80, 155 85 Q 150 95, 145 100 Z" 
        fill="url(#dragonGradient)"
      />
      {/* Wing membrane lines */}
      <path d="M 160 82 L 150 95" stroke="#0f172a" strokeWidth="1.5" opacity="0.3"/>
      <path d="M 165 78 L 152 92" stroke="#0f172a" strokeWidth="1.5" opacity="0.3"/>

      {/* Belly/Chest (striped pattern with white) */}
      <ellipse 
        cx="100" 
        cy="115" 
        rx="28" 
        ry="35" 
        fill="white"
      />
      {/* Belly stripes */}
      <rect x="80" y="95" width="40" height="6" rx="3" fill="url(#dragonGradient)"/>
      <rect x="80" y="105" width="40" height="6" rx="3" fill="url(#dragonGradient)"/>
      <rect x="80" y="115" width="40" height="6" rx="3" fill="url(#dragonGradient)"/>
      <rect x="80" y="125" width="40" height="6" rx="3" fill="url(#dragonGradient)"/>

      {/* Left Eye (big cute eyes) */}
      <ellipse 
        cx="85" 
        cy="72" 
        rx="8" 
        ry="10" 
        fill="white"
      />
      <circle cx="85" cy="74" r="4" fill="#1e293b"/>
      <circle cx="86" cy="72" r="2" fill="white"/>

      {/* Right Eye */}
      <ellipse 
        cx="115" 
        cy="72" 
        rx="8" 
        ry="10" 
        fill="white"
      />
      <circle cx="115" cy="74" r="4" fill="#1e293b"/>
      <circle cx="116" cy="72" r="2" fill="white"/>

      {/* Nostrils (two small dots) */}
      <circle cx="95" cy="85" r="2" fill="#0f172a"/>
      <circle cx="105" cy="85" r="2" fill="#0f172a"/>

      {/* Arms (short stumpy arms) */}
      {/* Left Arm */}
      <ellipse 
        cx="70" 
        cy="130" 
        rx="12" 
        ry="18" 
        fill="url(#dragonGradient)"
        transform="rotate(-20 70 130)"
      />
      {/* Left Hand/Paw */}
      <circle cx="65" cy="145" r="10" fill="url(#dragonGradient)"/>
      <path d="M 65 145 L 62 152" stroke="url(#dragonGradient)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M 65 145 L 68 152" stroke="url(#dragonGradient)" strokeWidth="3" strokeLinecap="round"/>

      {/* Right Arm */}
      <ellipse 
        cx="130" 
        cy="130" 
        rx="12" 
        ry="18" 
        fill="url(#dragonGradient)"
        transform="rotate(20 130 130)"
      />
      {/* Right Hand/Paw */}
      <circle cx="135" cy="145" r="10" fill="url(#dragonGradient)"/>
      <path d="M 135 145 L 132 152" stroke="url(#dragonGradient)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M 135 145 L 138 152" stroke="url(#dragonGradient)" strokeWidth="3" strokeLinecap="round"/>

      {/* Legs (short stumpy legs) */}
      {/* Left Leg */}
      <ellipse 
        cx="85" 
        cy="165" 
        rx="10" 
        ry="15" 
        fill="url(#dragonGradient)"
      />
      {/* Left Foot */}
      <ellipse cx="85" cy="178" rx="12" ry="8" fill="url(#dragonGradient)"/>
      <path d="M 80 178 L 78 183" stroke="url(#dragonGradient)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M 85 180 L 85 185" stroke="url(#dragonGradient)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M 90 178 L 92 183" stroke="url(#dragonGradient)" strokeWidth="3" strokeLinecap="round"/>

      {/* Right Leg */}
      <ellipse 
        cx="115" 
        cy="165" 
        rx="10" 
        ry="15" 
        fill="url(#dragonGradient)"
      />
      {/* Right Foot */}
      <ellipse cx="115" cy="178" rx="12" ry="8" fill="url(#dragonGradient)"/>
      <path d="M 110 178 L 108 183" stroke="url(#dragonGradient)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M 115 180 L 115 185" stroke="url(#dragonGradient)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M 120 178 L 122 183" stroke="url(#dragonGradient)" strokeWidth="3" strokeLinecap="round"/>

      {/* Tail (curved tail with flame tip) */}
      <path 
        d="M 120 155 Q 135 160, 145 165 Q 150 168, 152 172" 
        stroke="url(#dragonGradient)" 
        strokeWidth="12" 
        strokeLinecap="round"
        fill="none"
      />
      {/* Flame tip on tail */}
      <path 
        d="M 152 172 L 155 175 L 152 178 L 150 175 Z" 
        fill="#ef4444"
      />
      <path 
        d="M 152 172 L 157 173 L 155 175 Z" 
        fill="#f59e0b"
      />
    </svg>
  );
};

// Colored version (with purple gradient)
export const ColoredDragonLogo = ({ className = "w-12 h-12" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="purpleDragon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      {/* Same paths as above but with purple gradient */}
      <ellipse cx="100" cy="120" rx="45" ry="50" fill="url(#purpleDragon)"/>
      <circle cx="100" cy="75" r="38" fill="url(#purpleDragon)"/>
      
      {/* Ears */}
      <path d="M 75 55 Q 70 45, 75 42 Q 80 45, 78 55 Z" fill="url(#purpleDragon)"/>
      <path d="M 125 55 Q 130 45, 125 42 Q 120 45, 122 55 Z" fill="url(#purpleDragon)"/>
      
      {/* Hair spikes */}
      <path d="M 95 45 L 93 35 L 97 45 Z" fill="url(#purpleDragon)"/>
      <path d="M 100 42 L 98 30 L 102 42 Z" fill="url(#purpleDragon)"/>
      <path d="M 105 45 L 103 35 L 107 45 Z" fill="url(#purpleDragon)"/>
      
      {/* Wings */}
      <path d="M 55 100 Q 30 90, 35 75 Q 40 80, 45 85 Q 50 95, 55 100 Z" fill="url(#purpleDragon)"/>
      <path d="M 145 100 Q 170 90, 165 75 Q 160 80, 155 85 Q 150 95, 145 100 Z" fill="url(#purpleDragon)"/>
      
      {/* Belly */}
      <ellipse cx="100" cy="115" rx="28" ry="35" fill="white"/>
      <rect x="80" y="95" width="40" height="6" rx="3" fill="url(#purpleDragon)"/>
      <rect x="80" y="105" width="40" height="6" rx="3" fill="url(#purpleDragon)"/>
      <rect x="80" y="115" width="40" height="6" rx="3" fill="url(#purpleDragon)"/>
      <rect x="80" y="125" width="40" height="6" rx="3" fill="url(#purpleDragon)"/>
      
      {/* Eyes */}
      <ellipse cx="85" cy="72" rx="8" ry="10" fill="white"/>
      <circle cx="85" cy="74" r="4" fill="#1e293b"/>
      <circle cx="86" cy="72" r="2" fill="white"/>
      <ellipse cx="115" cy="72" rx="8" ry="10" fill="white"/>
      <circle cx="115" cy="74" r="4" fill="#1e293b"/>
      <circle cx="116" cy="72" r="2" fill="white"/>
      
      {/* Nostrils */}
      <circle cx="95" cy="85" r="2" fill="#0f172a"/>
      <circle cx="105" cy="85" r="2" fill="#0f172a"/>
      
      {/* Arms */}
      <ellipse cx="70" cy="130" rx="12" ry="18" fill="url(#purpleDragon)" transform="rotate(-20 70 130)"/>
      <circle cx="65" cy="145" r="10" fill="url(#purpleDragon)"/>
      <ellipse cx="130" cy="130" rx="12" ry="18" fill="url(#purpleDragon)" transform="rotate(20 130 130)"/>
      <circle cx="135" cy="145" r="10" fill="url(#purpleDragon)"/>
      
      {/* Legs */}
      <ellipse cx="85" cy="165" rx="10" ry="15" fill="url(#purpleDragon)"/>
      <ellipse cx="85" cy="178" rx="12" ry="8" fill="url(#purpleDragon)"/>
      <ellipse cx="115" cy="165" rx="10" ry="15" fill="url(#purpleDragon)"/>
      <ellipse cx="115" cy="178" rx="12" ry="8" fill="url(#purpleDragon)"/>
      
      {/* Tail */}
      <path d="M 120 155 Q 135 160, 145 165 Q 150 168, 152 172" 
            stroke="url(#purpleDragon)" strokeWidth="12" strokeLinecap="round" fill="none"/>
      <path d="M 152 172 L 155 175 L 152 178 L 150 175 Z" fill="#fbbf24"/>
    </svg>
  );
};

// Animated version with sparkles
export const AnimatedDragonLogo = ({ className = "w-12 h-12" }: { className?: string }) => {
  return (
    <div className="relative group cursor-pointer">
      <ColoredDragonLogo 
        className={`${className} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`} 
      />
      {/* Sparkle effects */}
      <span className="absolute -top-1 -right-1 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse">✨</span>
      <span className="absolute -bottom-1 -left-1 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse delay-100">✨</span>
    </div>
  );
};