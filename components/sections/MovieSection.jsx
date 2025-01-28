export default function MovieSection({ children, sectionName }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{sectionName}</h2>
      {children}
    </section>
  );
}
