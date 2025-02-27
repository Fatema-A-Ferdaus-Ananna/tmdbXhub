import ToggleSwitcher from "../buttons/ToggleSwitcher";

export default function MovieSection({ children, sectionName }) {
  return (
    <section className="mb-8">
      <div className="mb-2 flex justify-between items-center">
        <h2 className="text-2xl font-bold">{sectionName}</h2>
        <ToggleSwitcher />
      </div>

      {children}
    </section>
  );
}
