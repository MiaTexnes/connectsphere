function addFaviconsAndManifest() {
  const head = document.head;

  const links = [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/favicon/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon/favicon-16x16.png",
    },
    { rel: "manifest", href: "/favicon/site.webmanifest" },
  ];

  links.forEach((linkInfo) => {
    const link = document.createElement("link");
    Object.keys(linkInfo).forEach((attr) =>
      link.setAttribute(attr, linkInfo[attr])
    );
    head.appendChild(link);
  });
}

document.addEventListener("DOMContentLoaded", addFaviconsAndManifest);
