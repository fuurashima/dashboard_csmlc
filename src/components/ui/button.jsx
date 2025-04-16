export const Button = ({ children, ...props }) => (
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      {...props}
    >
      {children}
    </button>
  );
  