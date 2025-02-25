import React, { useState, useCallback, useEffect } from 'react';
import wallpaper1 from "@/public/wallpaper1.jpg";
import wallpaper2 from "@/public/wallpaper2.jpg";
import wallpaper3 from "@/public/wallpaper3.jpg";
import wallpaper4 from "@/public/wallpaper4.jpg";
import wallpaper5 from "@/public/wallpaper5.jpg";
import wallpaper7 from "@/public/wallpaper7.jpg";
import wallpaper8 from "@/public/wallpaper8.jpg";
import wallpaper9 from "@/public/wallpaper9.jpg";
import wallpaper10 from "@/public/wallpaper10.jpg";

interface WallpaperSelectorProps {
  onSelectWallpaper: (wallpaper: string) => void;
  closeWindow: () => void;
}

const wallpapers = [
  { id: 1, src: wallpaper1.src, alt: "Sunrise" },
  { id: 2, src: wallpaper2.src, alt: "G-Metallic" },
  { id: 3, src: wallpaper3.src, alt: "Red blur" },
  { id: 4, src: wallpaper4.src, alt: "Ventura" },
  { id: 5, src: wallpaper5.src, alt: "Sequria" },
  { id: 6, src: wallpaper7.src, alt: "Mountains" },
  { id: 7, src: wallpaper8.src, alt: "Car" },
  { id: 8, src: wallpaper9.src, alt: "Rskull" },
  { id: 9, src: wallpaper10.src, alt: "Djoker" }
];

const Loader: React.FC = () => (
  <div className="absolute inset-0 flex justify-center items-center">
    <div className="w-8 h-8 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

interface WallpaperItemProps {
  src: string;
  alt: string;
  isLoading: boolean;
  onSelect: () => void;
  onLoad: () => void;
}

const WallpaperItem: React.FC<WallpaperItemProps> = ({ src, alt, isLoading, onSelect, onLoad }) => {
  return (
    <div
      className="relative cursor-pointer rounded-lg overflow-hidden shadow-md aspect-video focus-within:ring-2 focus-within:ring-blue-500"
      onClick={onSelect}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover rounded-lg transition-all duration-300 transform hover:scale-105 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={onLoad}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/50 to-transparent text-white text-center opacity-100">
          {alt}
        </div>
      )}
    </div>
  );
};

const WallpaperSelector: React.FC<WallpaperSelectorProps> = ({ onSelectWallpaper, closeWindow }) => {
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>(
    Object.fromEntries(wallpapers.map(w => [w.id, true]))
  );

  const handleImageLoad = useCallback((id: number) => {
    setLoadingStates(prev => ({
      ...prev,
      [id]: false
    }));
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeWindow();
    }
  }, [closeWindow]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('overflow-hidden'); // Prevent background scroll

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('overflow-hidden');
    };
  }, [handleKeyDown]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
      <div
        className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg w-full max-w-4xl h-[90vh] overflow-hidden flex flex-col"
        style={{ touchAction: 'none' }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gray-100 dark:bg-gray-800 p-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white">Select Wallpaper</h2>
          <button
            onClick={closeWindow}
            className="text-black dark:text-white p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            aria-label="Close wallpaper selector"
          >
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Scrollable Wallpaper List */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {wallpapers.map((wallpaper) => (
              <WallpaperItem
                key={wallpaper.id}
                src={wallpaper.src}
                alt={wallpaper.alt}
                isLoading={loadingStates[wallpaper.id]}
                onSelect={() => onSelectWallpaper(wallpaper.src)}
                onLoad={() => handleImageLoad(wallpaper.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(WallpaperSelector);
