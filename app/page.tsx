"use client";

import { useState, useEffect } from "react";
import { Heart, Calendar, CheckCircle2, Circle, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { plannerData } from "./data/planner-data";

export default function Home() {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
  const [responses, setResponses] = useState<{ [key: number]: string }>({});
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("7intimacies_completed");
    if (saved) {
      setCompletedDays(new Set(JSON.parse(saved)));
    }
    const savedResponses = localStorage.getItem("7intimacies_responses");
    if (savedResponses) {
      setResponses(JSON.parse(savedResponses));
    }
  }, []);

  const toggleComplete = (day: number) => {
    const newCompleted = new Set(completedDays);
    if (newCompleted.has(day)) {
      newCompleted.delete(day);
    } else {
      newCompleted.add(day);
    }
    setCompletedDays(newCompleted);
    localStorage.setItem("7intimacies_completed", JSON.stringify(Array.from(newCompleted)));
  };

  const saveResponse = (day: number, text: string) => {
    const newResponses = { ...responses, [day]: text };
    setResponses(newResponses);
    localStorage.setItem("7intimacies_responses", JSON.stringify(newResponses));
  };

  const currentWeek = plannerData.find(w =>
    currentDay >= w.days[0].day && currentDay <= w.days[w.days.length - 1].day
  );

  const currentDayData = currentWeek?.days.find(d => d.day === currentDay);

  const goToDay = (day: number) => {
    setCurrentDay(day);
    setShowMenu(false);
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="absolute left-0 top-0 p-2 hover:bg-white/30 rounded-lg transition-colors md:hidden"
          >
            {showMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center justify-center gap-3 mb-2">
            <Heart className="text-primary" size={32} fill="currentColor" />
            <h1 className="text-3xl md:text-4xl font-bold text-secondary">
              The 7 Intimacies™
            </h1>
          </div>
          <p className="text-gray-700 text-sm md:text-base">30-Day Couples Connection Planner</p>
          <p className="text-gray-600 text-xs md:text-sm italic mt-1">A therapist-designed month of intentional love</p>
        </header>

        {/* Mobile Menu */}
        {showMenu && (
          <div className="md:hidden bg-white rounded-2xl shadow-lg p-4 mb-6">
            <h3 className="font-semibold mb-3 text-gray-700">Jump to Day</h3>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
                <button
                  key={day}
                  onClick={() => goToDay(day)}
                  className={`p-2 rounded-lg text-sm font-medium transition-all ${
                    currentDay === day
                      ? "bg-primary text-white"
                      : completedDays.has(day)
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden md:block">
            <div className="bg-white rounded-2xl shadow-lg p-4 sticky top-8">
              <h3 className="font-semibold mb-3 text-gray-700 flex items-center gap-2">
                <Calendar size={18} />
                Days
              </h3>
              <div className="space-y-1 max-h-[70vh] overflow-y-auto">
                {Array.from({ length: 30 }, (_, i) => i + 1).map(day => {
                  const weekNum = Math.ceil(day / 7);
                  const isFirstOfWeek = day % 7 === 1;
                  return (
                    <div key={day}>
                      {isFirstOfWeek && (
                        <div className="text-xs font-semibold text-gray-500 mt-3 mb-1 px-2">
                          Week {weekNum}
                        </div>
                      )}
                      <button
                        onClick={() => setCurrentDay(day)}
                        className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all ${
                          currentDay === day
                            ? "bg-primary text-white"
                            : completedDays.has(day)
                            ? "bg-green-50 text-green-700 hover:bg-green-100"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {completedDays.has(day) ? (
                          <CheckCircle2 size={16} />
                        ) : (
                          <Circle size={16} />
                        )}
                        <span className="text-sm">Day {day}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              {/* Week Header */}
              <div className="mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Calendar size={20} />
                  <span className="text-sm font-medium">{currentWeek?.week}</span>
                </div>
                <h2 className="text-2xl font-bold text-secondary mb-2">{currentWeek?.theme}</h2>
                <p className="text-gray-600 text-sm">{currentWeek?.description}</p>
              </div>

              {/* Day Content */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Day {currentDay}</h3>
                  <button
                    onClick={() => toggleComplete(currentDay)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      completedDays.has(currentDay)
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {completedDays.has(currentDay) ? (
                      <>
                        <CheckCircle2 size={18} />
                        <span className="text-sm font-medium">Completed</span>
                      </>
                    ) : (
                      <>
                        <Circle size={18} />
                        <span className="text-sm font-medium">Mark Complete</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-4">
                    <h4 className="font-semibold text-secondary mb-2">{currentDayData?.title}</h4>
                    <p className="text-gray-700 italic">{currentDayData?.prompt}</p>
                  </div>

                  {currentDayData?.subPrompts && (
                    <div className="space-y-2">
                      {currentDayData.subPrompts.map((sub, idx) => (
                        <div key={idx} className="bg-accent/10 rounded-lg p-3">
                          <p className="text-gray-700 text-sm">{sub}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Notes Area */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Reflections
                    </label>
                    <textarea
                      value={responses[currentDay] || ""}
                      onChange={(e) => saveResponse(currentDay, e.target.value)}
                      placeholder="Write your thoughts here..."
                      className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button
                  onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
                  disabled={currentDay === 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={18} />
                  <span className="text-sm font-medium">Previous</span>
                </button>

                <div className="text-sm text-gray-500">
                  {completedDays.size} / 30 days completed
                </div>

                <button
                  onClick={() => setCurrentDay(Math.min(30, currentDay + 1))}
                  disabled={currentDay === 30}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <span className="text-sm font-medium">Next</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* How to Use */}
            {currentDay === 1 && (
              <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-secondary mb-4">How to Use This Planner</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Spend 10–15 minutes per day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Complete individually or together</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>No perfection — only presence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Miss a day? Resume without guilt</span>
                  </li>
                </ul>
                <p className="mt-4 text-xs text-gray-600 italic">
                  Each week focuses on one core intimacy, while gently maintaining the others.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
