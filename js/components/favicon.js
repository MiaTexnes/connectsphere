export function addFaviconsAndManifest() {
  const head = document.head;

  const links = [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/assets/favicon/apple-touch-icon.png", // Updated path
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/assets/favicon/favicon-32x32.png", // Updated path
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/assets/favicon/favicon-16x16.png", // Updated path
    },
    { rel: "manifest", href: "/assets/favicon/site.webmanifest" }, // Updated path
  ];

  try {
    links.forEach((linkInfo) => {
      const link = document.createElement("link");
      Object.keys(linkInfo).forEach((attr) =>
        link.setAttribute(attr, linkInfo[attr])
      );
      head.appendChild(link);

      // Verify if file exists
      fetch(linkInfo.href)
        .then((response) => {
          if (!response.ok) {
            console.error(`Favicon not found: ${linkInfo.href}`);
          }
        })
        .catch((error) =>
          console.error(`Error loading favicon: ${linkInfo.href}`, error)
        );
    });
  } catch (error) {
    console.error("Error adding favicons:", error);
  }
}

// Add DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  addFaviconsAndManifest();
});
