/**
 * Adds favicon and manifest links to document head
 * Handles different favicon sizes and manifest file for web app support
 */
export function addFaviconsAndManifest() {
  const head = document.head;

  // Define favicon and manifest configurations
  const links = [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/assets/favicon/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/assets/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/assets/favicon/favicon-16x16.png",
    },
    { rel: "manifest", href: "/assets/favicon/site.webmanifest" },
  ];

  try {
    // Create and append link elements for each favicon
    links.forEach((linkInfo) => {
      const link = document.createElement("link");
      Object.keys(linkInfo).forEach((attr) =>
        link.setAttribute(attr, linkInfo[attr])
      );
      head.appendChild(link);

      // Validate favicon file existence
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

// Initialize favicons when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  addFaviconsAndManifest();
});
