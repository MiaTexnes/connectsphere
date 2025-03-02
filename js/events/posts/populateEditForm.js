import { editPost } from "../../api/posts/editPosts.js";
import { displayMessage } from "../../ui/common/displayMessage.js";

export function populateEditForm(post) {
  const { title, body, media, id } = post;

  const form = document.getElementById("edit-post-form");
  console.log(form);

  form.title.value = title || "";
  form.content.value = body || "";

  // Replace undefined with empty strings for media properties
  form.imageUrl.value = media?.url || "";
  form.imageAlt.value = media?.alt || "";
  form.id.value = id || "";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const id = formData.get("id");
    const title = formData.get("title");
    const body = formData.get("content");

    const post = {
      title,
      body,
    };

    const imageUrl = formData.get("imageUrl");
    let imageAlt = formData.get("imageAlt");

    if (imageUrl.trim() !== "") {
      if (imageAlt.trim() === "") {
        imageAlt = title;
      }

      post.media = {
        url: imageUrl,
        alt: imageAlt,
      };
    }

    try {
      await editPost(id, post);
      displayMessage("#message", "success", "Post updated successfully!");

      // Redirect to the feed page after successful update
      setTimeout(() => {
        window.location.href = "/feed/index.html";
      }, 2000); // Delay for 2 seconds to show the success message
    } catch (error) {
      displayMessage(
        "#message",
        "error",
        `Failed to update post: ${error.message}`
      );
    }
  });
}

// import { editPost } from "../../api/posts/editPosts.js";
// import { displayMessage } from "../../ui/common/displayMessage.js";

// export function populateEditForm(post) {
//   const { title, body, media, id } = post;

//   const form = document.getElementById("edit-post-form");
//   console.log(form);

//   form.title.value = title;
//   form.content.value = body;
//   form.imageUrl.value = media?.url;
//   form.imageAlt.value = media?.alt;
//   form.id.value = id;

//   form.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const form = event.target;
//     const formData = new FormData(form);

//     const id = formData.get("id");
//     const title = formData.get("title");
//     const body = formData.get("content");

//     const post = {
//       title,
//       body,
//     };

//     const imageUrl = formData.get("imageUrl");
//     let imageAlt = formData.get("imageAlt");

//     if (imageUrl.trim() !== "") {
//       if (imageAlt.trim() === "") {
//         imageAlt = title;
//       }

//       post.media = {
//         url: imageUrl,
//         alt: imageAlt,
//       };
//     }

//     try {
//       await editPost(id, post);
//       displayMessage("#message", "success", "Post updated successfully!");

//       // Redirect to the feed page after successful update
//       setTimeout(() => {
//         window.location.href = "/feed/index.html";
//       }, 2000); // Delay for 2 seconds to show the success message
//     } catch (error) {
//       displayMessage(
//         "#message",
//         "error",
//         `Failed to update post: ${error.message}`
//       );
//     }
//   });
// }
