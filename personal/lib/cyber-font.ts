import localFont from "next/font/local";

export const cyberAlert = localFont({
  src: [
    {
      path: "../fonts/CyberAlert-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/CyberAlert-Italic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
});
