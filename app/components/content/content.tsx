export function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md bg-white p-4 text-slate-800 shadow-md dark:bg-slate-800 dark:text-gray-50">
      {children}
    </div>
  );
}

export default Content;
