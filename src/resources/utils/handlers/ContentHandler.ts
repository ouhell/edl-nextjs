import { SvgHandler } from "./SvgHandler";

export const SettingsMenuContent = () => {
  return [
    {
      Url: "/login",
      Image: SvgHandler.Power(),
      Title: "LogOut",
      IsMarginBottom: true,
    },
  ];
};
