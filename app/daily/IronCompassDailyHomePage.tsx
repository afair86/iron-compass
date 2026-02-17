// TODO: Legacy homepage – candidate for deletion.
import React from "react";

// Types for props
interface Streak {
  name: string;
  days: number;
  progress: number; // 0–1
}
interface Habit {
  name: string;
  status: string;
  severity: "high" | "medium";
}
interface IronCompassDailyHomePageProps {
  mantra?: string;
  quote?: string;
  streaks?: Streak[];
  habitsNeedingWork?: Habit[];
  level?: string;
  mission?: string;
  todayWin?: string;
}

const defaultStreaks: Streak[] = [
  { name: "Cold Exposure", days: 14, progress: 0.8 },
  { name: "Steps", days: 29, progress: 0.95 },
  { name: "Training", days: 7, progress: 0.6 },
  { name: "Evening Ritual", days: 3, progress: 0.3 },
  { name: "Nutrition", days: 21, progress: 0.7 },
  { name: "Mindfulness", days: 12, progress: 0.5 },
];

const defaultHabits: Habit[] = [
  { name: "Evening Ritual", status: "inconsistent", severity: "high" },
  { name: "Sleep Routine", status: "< 6.5 hours", severity: "medium" },
  { name: "Device Discipline", status: "low compliance", severity: "medium" },
];

export const IronCompassDailyHomePage: React.FC<IronCompassDailyHomePageProps> = ({
  mantra = "Rise Beyond Limits.",
  quote = "Waste no more time arguing what a good man should be. Be one. — Marcus Aurelius",
  streaks = defaultStreaks,
  habitsNeedingWork = defaultHabits,
  level = "Iron II",
  mission = "Cold exposure + reflection",
  todayWin = "Win the first 30 minutes of the day.",
}) => {
  return (
    <main className="relative min-h-screen w-full bg-[#0A0A0B] flex flex-col items-center overflow-x-hidden">
      {/* Iron grain/noise overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "url('data:image/svg+xml;utf8,<svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"100\" height=\"100\" fill=\"%230A0A0B\"/><filter id=\"grain\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"2\" result=\"turb\"/><feColorMatrix type=\"saturate\" values=\"0.2\"/><feComponentTransfer><feFuncA type=\"linear\" slope=\"0.04\"/></feComponentTransfer></filter><rect width=\"100\" height=\"100\" filter=\"url(%23grain)\"/></svg>')",
          opacity: 0.18,
          zIndex: 0,
        }}
      />
      <section className="relative z-10 flex flex-col items-center w-full px-4 pt-12 pb-6">
        {/* Mantra */}
        <h1
          className="font-extrabold text-[#F1F1F1] text-center leading-tight"
          style={{
            fontFamily: "Inter, Montserrat, sans-serif",
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            maxWidth: 640,
            margin: "0 auto",
            paddingTop: "2.5rem",
            paddingBottom: "1.5rem",
          }}
        >
          {mantra}
        </h1>
        {/* Red divider */}
        <div className="flex justify-center">
          <div className="h-[1px] w-16 bg-[#B01015] mb-4" />
        </div>
        {/* Stoic quote */}
        <p
          className="text-[#C8C8C8] text-center font-light"
          style={{
            fontFamily: "Inter, Montserrat, sans-serif",
            fontSize: "1.1rem",
            lineHeight: 1.6,
            maxWidth: 640,
            margin: "0 auto",
            marginBottom: "2.5rem",
            opacity: 0.95,
          }}
        >
          {quote}
        </p>
      </section>
      {/* Metrics Strip */}
      <section className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center">
        <div
          className="
            grid grid-cols-1 gap-6 w-full
            md:grid-cols-2
            xl:grid-cols-4
            mb-8
            animate-fadein
          "
        >
          {/* Card 1: Streaks */}
          <div className="bg-[#1A1A1C] border border-[#2A2A2C] rounded-lg p-6 flex flex-col shadow-none min-h-[220px]">
            <h2 className="text-[#F1F1F1] font-bold text-lg mb-3">Streaks</h2>
            <div className="flex flex-col gap-3">
              {streaks.slice(0, 6).map((streak) => (
                <div key={streak.name} className="flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#C8C8C8] font-medium text-sm">{streak.name}</span>
                    <span className="text-[#C8C8C8] text-xs font-light">{streak.days} days</span>
                  </div>
                  <div className="w-full h-[3px] bg-[#111114]">
                    <div
                      className="h-full"
                      style={{
                        width: `${Math.round(Math.max(0, Math.min(1, streak.progress)) * 100)}%`,
                        background: "#B01015",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Card 2: Habits That Need Work */}
          <div className="bg-[#1A1A1C] border border-[#2A2A2C] rounded-lg p-6 flex flex-col shadow-none min-h-[220px]">
            <h2 className="text-[#F1F1F1] font-bold text-lg mb-3">Habits That Need Work</h2>
            <div className="flex flex-col gap-3">
              {habitsNeedingWork.slice(0, 3).map((habit) => (
                <div key={habit.name} className="flex items-center gap-3">
                  {/* Status dot */}
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-full ${
                      habit.severity === "high" ? "bg-[#B01015]" : "bg-[#2A2A2C]"
                    }`}
                  />
                  <span className="text-[#C8C8C8] font-medium text-sm">{habit.name}</span>
                  <span className="text-[#C8C8C8] font-light text-xs ml-auto">{habit.status}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Card 3: Level */}
          <div className="bg-[#1A1A1C] border border-[#2A2A2C] rounded-lg p-6 flex flex-col shadow-none min-h-[220px]">
            <h2 className="text-[#F1F1F1] font-bold text-lg mb-3">Level</h2>
            <div className="flex items-center h-full">
              <span
                className="px-4 py-1 border rounded-full text-[#F1F1F1] font-semibold text-base"
                style={{
                  borderColor: "#C8C8C8",
                  background: "transparent",
                  minWidth: 90,
                  textAlign: "center",
                  letterSpacing: "0.02em",
                }}
              >
                {level}
              </span>
            </div>
          </div>
          {/* Card 4: Today's Mission */}
          <div className="bg-[#1A1A1C] border border-[#2A2A2C] rounded-lg p-6 flex flex-col shadow-none min-h-[220px]">
            <h2 className="text-[#F1F1F1] font-bold text-lg mb-3">Today’s Mission</h2>
            <div className="flex items-center gap-3 h-full">
              {/* Checkbox-like status circle */}
              <span className="inline-block w-4 h-4 border-2 border-[#2A2A2C] rounded-full bg-transparent mr-2" />
              <span className="text-[#C8C8C8] font-medium text-base">{mission}</span>
            </div>
          </div>
        </div>
        {/* Optional: Today's Win */}
        {todayWin && (
          <div className="w-full bg-[#1A1A1C] border border-[#2A2A2C] rounded-lg px-6 py-3 flex items-center mt-2 shadow-none min-h-[48px]">
            <span className="text-[#C8C8C8] font-semibold text-sm mr-2">Today’s Win:</span>
            <span className="text-[#C8C8C8] font-light text-sm">{todayWin}</span>
          </div>
        )}
      </section>
      {/* Fade-in animation */}
      <style>
        {`
          @keyframes fadein {
            from { opacity: 0; transform: translateY(16px);}
            to { opacity: 1; transform: none;}
          }
          .animate-fadein {
            animation: fadein 0.7s cubic-bezier(.4,0,.2,1) 0.1s both;
          }
        `}
      </style>
    </main>
  );
};

/*
Example usage:

<IronCompassDailyHomePage />

Or with custom data:

<IronCompassDailyHomePage
  mantra="Rise Beyond Limits."
  quote="He who lives in harmony with himself lives in harmony with the universe. — Marcus Aurelius"
  streaks={[
    { name: "Cold Exposure", days: 10, progress: 0.7 },
    { name: "Steps", days: 22, progress: 0.9 },
    { name: "Training", days: 5, progress: 0.5 },
    { name: "Evening Ritual", days: 2, progress: 0.2 },
    { name: "Nutrition", days: 18, progress: 0.6 },
    { name: "Mindfulness", days: 8, progress: 0.4 },
  ]}
  habitsNeedingWork={[
    { name: "Evening Ritual", status: "inconsistent", severity: "high" },
    { name: "Sleep Routine", status: "< 6.5 hours", severity: "medium" },
  ]}
  level="Iron III"
  mission="Read Meditations + cold shower"
  todayWin="No phone before 8am."
/>
*/
