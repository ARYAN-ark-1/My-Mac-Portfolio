import { useState, useEffect } from "react";
import {
  Wifi,
  WifiOff,
  BatteryFull,
  BatteryLow,
  BatteryCharging,
  Sun,
  Moon,
  Settings,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import Calendar from "./Calendar";
import WallpaperSelector from "./WallpaperSel";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}
interface MenuBarProps {
  switchWallpaper: (wallpaperSrc: string) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ switchWallpaper }) => {
  const { theme, toggleTheme } = useTheme() as ThemeContextType;
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const [batteryLevel, setBatteryLevel] = useState<number>(100);
  const wifiStrength: number = 3;
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isWallpaperSelectorOpen, setIsWallpaperSelectorOpen] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const batteryInterval = setInterval(() => {
      setBatteryLevel((prev) => (prev > 10 ? prev - 1 : 100));
    }, 5000);
    return () => clearInterval(batteryInterval);
  }, []);

  const handleOpenWallpaperSelector = (): void => {
    setIsWallpaperSelectorOpen(true);
  };

  const handleCloseWallpaperSelector = (): void => {
    setIsWallpaperSelectorOpen(false);
  };

  const handleCalendarClick = (): void => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleFullscreenToggle = async (): Promise<void> => {
    if (isFullscreen) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {/* 🌟 Menu Bar */}
      <div
        className={`fixed top-0 left-0 right-0 h-8 flex items-center px-4 z-50 backdrop-blur-xl transition-colors duration-300 ${
          theme === "light"
            ? "bg-gradient-to-br from-white/70 to-gray-100/70 text-black"
            : "bg-gradient-to-br from-gray-900/70 to-gray-800/70 text-white"
        }`}
      >
        {/* 🔹 Apple Logo */}
        <div className="flex items-center space-x-4">
          <img src="/logo26.svg" alt="Apple Logo" className="w-5 h-5" />

          {/* 🔹 macOS Menu Items (Hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-6 text-sm">
            {["File", "Edit", "View", "Go", "Window", "Help"].map((item) => (
              <div
                key={item}
                className="cursor-pointer hover:text-gray-400 transition"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Right Section (WiFi, Battery, Time) */}
        <div className="flex items-center space-x-4 ml-auto">
          {/* 🔆 Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1 rounded-full hover:bg-gray-200/50 dark:hover:bg-black/25 transition"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* ⚙️ Wallpaper Selector */}
          <Settings
            onClick={handleOpenWallpaperSelector}
            className="w-5 h-5 cursor-pointer hover:scale-110 transition"
          />

          {/* 🔋 Battery Status */}
          <div className="relative group">
            {batteryLevel > 80 ? (
              <BatteryFull className="w-5 h-5 text-black dark:text-white" />
            ) : batteryLevel > 30 ? (
              <BatteryCharging className="w-5 h-5 text-black dark:text-white" />
            ) : (
              <BatteryLow className="w-5 h-5 text-red-500" />
            )}
            <span className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              {batteryLevel}%
            </span>
          </div>

          {/* 📶 WiFi Status */}
          <div className="relative group">
            {wifiStrength === 3 ? (
              <Wifi className="w-5 h-5 text-black dark:text-white" />
            ) : wifiStrength === 2 ? (
              <Wifi className="w-5 h-5 text-yellow-500" />
            ) : wifiStrength === 1 ? (
              <Wifi className="w-5 h-5 text-red-500" />
            ) : (
              <WifiOff className="w-5 h-5 text-gray-500" />
            )}
            <span className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              {`${wifiStrength * 33}%`}
            </span>
          </div>

          {/* 📅 Date & Time */}
          <button onClick={handleCalendarClick} className="text-sm">
            {formatDate(dateTime)}
          </button>
          <span className="text-sm">{formatTime(dateTime)}</span>

          {/* 🔳 Fullscreen Toggle */}
          <button
            onClick={handleFullscreenToggle}
            className="p-1 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition hidden sm:block"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 📌 Wallpaper Selector */}
      {isWallpaperSelectorOpen && (
        <WallpaperSelector
          onSelectWallpaper={switchWallpaper}
          closeWindow={handleCloseWallpaperSelector}
        />
      )}

      {/* 📌 Calendar (Dropdown) */}
      {isCalendarOpen && (
        <div className="absolute top-10 right-10 z-10">
          <Calendar />
        </div>
      )}
    </>
  );
};

export default MenuBar;
