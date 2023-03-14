import { SvgHandler } from "../../../resources/utils/handlers/SvgHandler";

import UseResize from "../../../resources/utils/hooks/useResize";

export default function IsLoading() {
  const { windowHeight } = UseResize();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: windowHeight + "px",
      }}
    >
      {SvgHandler.Logo(0.2, "85")}
    </div>
  );
}
