// src/components/ui/card.jsx
export function Card({ children, className = "" }) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 ${className}`}>
        {children}
      </div>
    );
  }
  