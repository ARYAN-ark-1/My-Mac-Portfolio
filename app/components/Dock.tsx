import { ReactNode, useState } from 'react';
import { Terminal, Mail, Music, Globe, User, File, Briefcase } from 'lucide-react';

interface DockItemProps {
  label: string;
  onClick: () => void;
  children: ReactNode;
  showLabel: boolean; // Add showLabel prop
}

const openGithub = () => {
  window.open('https://github.com/ARYAN-ark-1', '_blank');
};

interface DockProps {
  toggleWindow: (id: string) => void;
}

const DockItem = ({ label, onClick, children, showLabel }: DockItemProps) => (
  <div className="group relative flex flex-col items-center">
    <button
      onClick={onClick}
      className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl 
        bg-gradient-to-br from-gray-100/50 to-white/50 dark:from-gray-800/50 dark:to-gray-900/50 
        backdrop-blur-lg flex items-center justify-center text-lg sm:text-xl 
        border border-black/5 dark:border-white/10 
        shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out
        group-hover:scale-110 group-hover:-translate-y-1 
        group-hover:from-white/60 group-hover:to-gray-100/60 
        dark:group-hover:from-gray-700/60 dark:group-hover:to-gray-800/60"
    >
      {children}
    </button>
    {showLabel && (
      <span className="mt-2 text-sm text-gray-900 dark:text-white">{label}</span>
    )}
  </div>
);

export default function Dock({ toggleWindow }: DockProps) {
  const [isLaunchpadOpen, setLaunchpadOpen] = useState(false);
  const [showExtraIcons, setShowExtraIcons] = useState(false);

  const toggleLaunchpad = () => {
    setLaunchpadOpen((prev) => !prev);
    setShowExtraIcons((prev) => !prev); // Toggle extra icons
  };

  return (
    <>
      {/* Full-screen Launchpad Overlay */}
      {isLaunchpadOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xl bg-black/50"
          onClick={() => {
            setLaunchpadOpen(false);
            setShowExtraIcons(false);
          }} // Close on click outside the overlay
        >
          <div className="w-full max-w-lg bg-gray-100 dark:bg-gray-900 p-5 rounded-lg shadow-lg">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 p-4">
              <DockItem label="Terminal" onClick={() => toggleWindow('terminal')} showLabel={true}>
                <img src="/icons/terminal.avif" alt="Terminal" className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg" />
              </DockItem>

              <DockItem label="Contact" onClick={() => toggleWindow('contact')} showLabel={true}>
                <Mail className="w-12 h-12 sm:w-14 sm:h-14 text-gray-600 dark:text-white" />
              </DockItem>

              <DockItem label="Music" onClick={() => toggleWindow('music-player')} showLabel={true}>
                <Music className="w-12 h-12 sm:w-14 sm:h-14 text-gray-600 dark:text-white" />
              </DockItem>

              <DockItem label="Browser" onClick={() => toggleWindow('browser')} showLabel={true}>
                <Globe className="w-12 h-12 sm:w-14 sm:h-14 text-gray-600 dark:text-white" />
              </DockItem>

              <DockItem label="GitHub" onClick={openGithub} showLabel={true}>
                <img src="/icons/github.png" alt="Github" className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg" />
              </DockItem>

              {/* Additional Icons - Shown when Launchpad is open */}
              {showExtraIcons && (
                <>
                  <DockItem label="About Me" onClick={() => toggleWindow('about')} showLabel={true}>
                    <User className="w-12 h-12 sm:w-14 sm:h-14 text-gray-600 dark:text-white" />
                  </DockItem>

                  <DockItem label="Projects" onClick={() => toggleWindow('projects')} showLabel={true}>
                    <Briefcase className="w-12 h-12 sm:w-14 sm:h-14 text-gray-600 dark:text-white" />
                  </DockItem>

                  <DockItem label="Resume" onClick={() => toggleWindow('resume')} showLabel={true}>
                    <File className="w-12 h-12 sm:w-14 sm:h-14 text-gray-600 dark:text-white" />
                  </DockItem>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Dock */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-auto">
        <div className="flex items-center gap-2 sm:gap-3 px-4 py-2
          bg-gradient-to-br from-white/80 to-gray-100/80 
          dark:from-gray-900/80 dark:to-gray-800/80 
          backdrop-blur-lg rounded-xl shadow-2xl border border-black/5 dark:border-white/10 
          transition-all duration-300"
        >
          {/* Launchpad Icon */}
          <DockItem label="Launchpad" onClick={toggleLaunchpad} showLabel={false}>
            <img src="/icons/launchpad.png" alt="Launchpad" className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg" />
          </DockItem>

          {/* Other icons */}
          <DockItem label="Terminal" onClick={() => toggleWindow('terminal')} showLabel={false}>
            <img src="/icons/terminal.avif" alt="Terminal" className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg" />
          </DockItem>

          <DockItem label="Contact" onClick={() => toggleWindow('contact')} showLabel={false}>
            <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-gray-600 dark:text-white" />
          </DockItem>

          <DockItem label="Music" onClick={() => toggleWindow('music-player')} showLabel={false}>
            <Music className="w-10 h-10 sm:w-12 sm:h-12 text-gray-600 dark:text-white" />
          </DockItem>

          <DockItem label="Browser" onClick={() => toggleWindow('browser')} showLabel={false}>
            <Globe className="w-10 h-10 sm:w-12 sm:h-12 text-gray-600 dark:text-white" />
          </DockItem>

          <DockItem label="GitHub" onClick={openGithub} showLabel={false}>
            <img src="/icons/github.png" alt="Github" className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg" />
          </DockItem>
        </div>
      </div>
    </>
  );
}
