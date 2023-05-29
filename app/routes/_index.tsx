import type { V2_MetaFunction } from "@remix-run/node";
import Content from "~/components/content";

import { useOptionalUser } from "~/utils";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  // const user = useOptionalUser();
  return (
    <div className="container m-auto">
      <Content>CONTENT HERE</Content>
    </div>
  );
}
