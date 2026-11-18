import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef } from "react";
import { getPublicDestinations } from "@/lib/destinations.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Erode Explore – Discover the Beauty of Erode" },
      {
        name: "description",
        content:
          "Discover 20 destinations in Erode, Tamil Nadu. Explore rivers, temples, wildlife and local heritage, save favourites and plan your trip.",
      },
      { property: "og:title", content: "Erode Explore – Discover the Beauty of Erode" },
      {
        property: "og:description",
        content:
          "Explore Erode’s rivers, temples and timeless traditions with an independent student travel guide.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const readDestinations = useServerFn(getPublicDestinations);
  const frameRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let disposed = false;
    const load = async () => {
      try {
        const destinations = await readDestinations();
        if (!disposed)
          frame.contentWindow?.postMessage(
            { type: "erode:destinations", destinations },
            window.location.origin,
          );
      } catch (error) {
        console.error("Erode catalogue connection failed:", error);
        if (!disposed)
          frame.contentWindow?.postMessage(
            { type: "erode:destinations-error" },
            window.location.origin,
          );
      }
    };
    frame.addEventListener("load", load);
    // The SSR iframe may finish loading before React attaches event handlers.
    if (frame.contentDocument?.readyState === "complete") void load();
    return () => {
      disposed = true;
      frame.removeEventListener("load", load);
    };
  }, [readDestinations]);
  return (
    <iframe
      ref={frameRef}
      title="Erode Explore tourism website"
      src="/erode/index.html"
      className="block h-dvh w-full border-0"
    />
  );
}
