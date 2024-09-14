export default function MainStructure({ children, className }) {
  return (
    <main className={`bg-gray-50 dark:bg-zinc-900 lg:border-l max-lg:border-l-0 border-gray-200 dark:border-zinc-800 h-full ${className}`}>
      {children}
    </main>
  );
}

