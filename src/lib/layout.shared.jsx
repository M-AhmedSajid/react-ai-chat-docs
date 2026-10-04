import { HandHeart, Package } from "lucide-react";

export function baseOptions() {
  return {
    links: [
      {
        text: "Docs",
        url: "/docs",
        active: "nested-url",
        secondary: false,
      },
      {
        text: "Playground",
        url: "/playground",
        active: "nested-url",
        secondary: false,
      },
      {
        type: "icon",
        label: "Patreon Donation/Support Link",
        text: "Patreon Donation/Support Link",
        icon: <HandHeart />,
        url: "https://www.patreon.com/cw/mahmedsajid",
        secondary: true,
      },
      {
        type: "icon",
        label: "NPM Package Link",
        text: "NPM Package Link",
        icon: <Package />,
        url: "https://www.npmjs.com/package/react-ai-chat",
        secondary: true,
      },
    ],
    nav: {
      title: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.2"
            viewBox="0 0 1080 1080"
            width="32"
            height="32"
            className="fill-black dark:fill-white transition-colors"
          >
            <path d="m642.84 331.77l176.86-125.89c0 0 15.36-18.32-1.19-36.05-16.54-17.73-225.75-138.29-225.75-138.29 0 0-37.23-17.14-70.33 3.55-33.09 20.68-434.37 316.17-434.37 316.17 0 0-38.42 24.82-43.14 78.6-4.73 53.78 0 397.14 0 397.14 0 0 6.5 45.51 48.46 17.73 41.96-27.77 549.61-416.05 549.61-416.05l-67.37-43.73c0 0-62.05-30.14-108.15 11.23-46.1 41.37-195.62 147.74-195.62 147.74 0 0-34.86 24.82-45.5-8.27-10.64-33.1-8.87-43.14 18.91-79.19 27.78-36.05 270.08-196.8 270.08-196.8 0 0 30.73-34.87 83.33-10.05 52.6 24.82 43.44 79.81 44.17 82.16z" />
            <path d="m437.35 747.33l-176.85 125.9c0 0-15.37 18.32 1.18 36.05 16.55 17.73 225.75 138.29 225.75 138.29 0 0 37.24 17.14 70.33-3.55 33.1-20.68 434.37-316.18 434.37-316.18 0 0 38.42-24.82 43.15-78.6 4.72-53.78 0-397.14 0-397.14 0 0-6.5-45.5-48.46-17.73-41.96 27.78-549.62 416.06-549.62 416.06l67.37 43.73c0 0 62.06 30.14 108.15-11.23 46.1-41.37 195.62-147.75 195.62-147.75 0 0 34.87-24.82 45.5 8.28 10.64 33.09 8.87 43.14-18.91 79.19-27.77 36.05-270.08 196.8-270.08 196.8 0 0-30.73 34.87-83.33 10.04-52.59-24.82-43.43-79.81-44.17-82.16z" />
          </svg>
          <span>react-ai-chat</span>
        </>
      ),
    },
    githubUrl: "https://github.com/M-AhmedSajid/react-ai-chat",
    themeSwitch: { mode: "select" },
  };
}
