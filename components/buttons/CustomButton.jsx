export default function CustomButton({ children, className }) {
  return (
    <button
      className={
        className ||
        "bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
      }
    >
      {children}
    </button>
  );
}
