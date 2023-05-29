import { useDarkMode } from "~/hooks/useDarkMode";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen select-none flex-col">
      <NavBar />
      <main className="flex-1 overflow-auto bg-gray-200 pt-5 font-sriracha dark:bg-slate-700">
        {children}
      </main>
    </div>
  );
}

function NavBar() {
  const [darkMode, setDarkMode] = useDarkMode();
  return (
    <div className="sticky top-0 flex bg-white shadow-md transition-all dark:bg-slate-900 dark:shadow-slate-800">
      <div
        className={`
          relative ml-14 inline-block
          before:absolute before:-inset-0 before:-left-6 before:-right-6
          before:-skew-x-[20deg] before:border-x-[0.75rem] before:border-x-red-600
          before:bg-white
        `}
      >
        <Logo />
      </div>
      <div className="flex-1" />
      <div className="text-slate-800 dark:text-white">
        <button
          onClick={() => {
            setDarkMode((mode) => !mode);
          }}
        >
          {darkMode ? "Dark Theme" : "Light Theme"}
        </button>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div
      className="relative mx-1 my-1 flex font-jost text-3xl font-semibold uppercase"
      // direction="row"
      // fontFamily={`"Overpass Variable", sans-serif`}
      // textTransform="uppercase"
      // fontSize={["1.25rem", "1.5rem", "2rem"]}
      // fontWeight="bold"
      // lineHeight={["1.25rem", "1.5rem", "2rem"]}
      // my={[5]}
      // mx={5}
    >
      <div className="my-0 border-2 border-red-600 bg-red-600  pl-2 pr-0.5 pt-0.5 text-white">
        Card
      </div>
      <div className="pt-0. border-2 border-red-600 bg-white pl-0.5 pr-2 pt-0.5 text-slate-900">
        Score
      </div>
      {/* <div className="absolute -bottom-2 -right-5 -rotate-12 bg-white px-1 py-0 pt-0.5 font-sriracha text-xl leading-4">
        Pro
      </div> */}
    </div>
  );
}
