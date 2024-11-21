// src/app/settings/page.tsx
"use client";

import React, { useState } from 'react';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Paramètres</h1>
      <div className="flex flex-col space-y-4">
        <div>
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)} />
            <span className="ml-2">Mode Sombre</span>
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)} />
            <span className="ml-2">Notifications</span>
          </label>
        </div>
      </div>
    </div>
  );
}

