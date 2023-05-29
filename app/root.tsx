import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import Layout from "~/components/layout";

import {
  ThemeBody,
  ThemeHead,
  ThemeProvider,
  useTheme,
} from "~/utils/theme-provider";
import { getThemeSession } from "~/utils/theme.server";

import { getUser } from "~/session.server";
import stylesheet from "~/tailwind.css";
import sriracha from "@fontsource/sriracha/index.css";
import jost from "@fontsource-variable/jost/index.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: sriracha },
  { rel: "stylesheet", href: jost },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderArgs) => {
  const themeSession = await getThemeSession(request);
  return json({ user: await getUser(request), theme: themeSession.getTheme() });
};

function Document({
  children,
  theme,
  themeHead,
  themeBody,
}: {
  children: React.ReactNode;
  theme?: string | null;
  themeHead?: React.ReactNode;
  themeBody?: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full ${theme ?? ""}`.trim()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        {themeHead}
      </head>
      <body className="h-full text-slate-800 transition-colors duration-300 dark:text-white">
        <Layout>{children}</Layout>
        {themeBody}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();

  return (
    <Document
      theme={theme}
      themeHead={<ThemeHead ssrTheme={Boolean(data.theme)} />}
      themeBody={<ThemeBody ssrTheme={Boolean(data.theme)} />}
    >
      <Outlet />
    </Document>
  );

  // return (
  //   <html lang="en" className={`h-full ${theme ?? ""}`.trim()}>
  //     <head>
  //       <meta charSet="utf-8" />
  //       <meta name="viewport" content="width=device-width,initial-scale=1" />
  //       <Meta />
  //       <Links />
  //       <ThemeHead ssrTheme={Boolean(data.theme)} />
  //     </head>
  //     <body className="h-full transition-colors duration-300">
  //       <ThemeBody ssrTheme={Boolean(data.theme)} />
  //       <Layout>
  //         <Outlet />
  //       </Layout>
  //       <ScrollRestoration />
  //       <Scripts />
  //       <LiveReload />
  //     </body>
  //   </html>
  // );
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();

  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  console.error(error);

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data}</p>
      </Document>
    );
  }

  // Don't forget to typecheck with your own logic.
  // Any value can be thrown, not just errors!
  let errorMessage = "Unknown error";

  return (
    <Document>
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
      <pre>{errorMessage}</pre>
    </Document>
  );
}
