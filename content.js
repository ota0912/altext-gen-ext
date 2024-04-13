function fetchAltTextAndReplace() {
  const images = document.querySelectorAll("img:not([alt])");
  images.forEach(async (img) => {
    try {
      const altText = await fetchAltText(img.src);
      img.alt = altText;
    } catch (error) {
      console.error("Error fetching alt text:", error);
    }
  });
}

async function fetchAltText(imageSrc) {
  try {
    const response = await fetch(
      "https://altext-gen-backend.onrender.com/generateAlt",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageSrc }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch alt text");
    }
  } catch (error) {
    throw error;
  }
}

window.addEventListener("load", fetchAltTextAndReplace);
