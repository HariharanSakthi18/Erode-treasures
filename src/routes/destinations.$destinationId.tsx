import { createFileRoute, Link, notFound, type ErrorComponentProps } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { getPublicDestinations } from "@/lib/destinations.functions";

function DestinationError({ error }: ErrorComponentProps) {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-3xl font-semibold">This place could not be loaded</h1>
        <p className="mt-3 text-muted-foreground">
          {error instanceof Error
            ? error.message
            : "Destination information is temporarily unavailable."}
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-sm bg-primary px-4 py-2 text-primary-foreground"
        >
          Back to Erode Explore
        </Link>
      </div>
    </main>
  );
}

export const Route = createFileRoute("/destinations/$destinationId")({
  loader: async ({ params }) => {
    let destinations: Awaited<ReturnType<typeof getPublicDestinations>>;
    try {
      destinations = await getPublicDestinations();
    } catch (error) {
      console.error("Erode destination catalogue connection failed:", error);
      return {
        destinationId: params.destinationId,
        destination: null,
        destinations: null,
        catalogueUnavailable: true,
      };
    }

    const destination = destinations.find((place) => place.id === params.destinationId);
    if (!destination) throw notFound();
    return {
      destinationId: destination.id,
      destination,
      destinations,
      catalogueUnavailable: false,
    };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.destination?.name ?? "Erode destination";
    const description =
      loaderData?.destination?.description ?? "Explore a destination in Erode, Tamil Nadu.";
    return {
      meta: [
        { title: `${name} | Erode Explore` },
        { name: "description", content: description },
        { property: "og:title", content: `${name} | Erode Explore` },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: DestinationPage,
  errorComponent: DestinationError,
  notFoundComponent: () => (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-3xl font-semibold">Destination not found</h1>
        <p className="mt-3 text-muted-foreground">
          This place is not in the Erode Explore catalogue.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-sm bg-primary px-4 py-2 text-primary-foreground"
        >
          Browse destinations
        </Link>
      </div>
    </main>
  ),
});

function DestinationPage() {
  const { destination, destinationId, destinations, catalogueUnavailable } = Route.useLoaderData();
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let disposed = false;
    const sendCatalogue = () => {
      if (disposed) return;
      const message = catalogueUnavailable
        ? { type: "erode:destinations-error" }
        : { type: "erode:destinations", destinations };
      frame.contentWindow?.postMessage(message, window.location.origin);
    };
    frame.addEventListener("load", sendCatalogue);
    if (frame.contentDocument?.readyState === "complete") void sendCatalogue();
    return () => {
      disposed = true;
      frame.removeEventListener("load", sendCatalogue);
    };
  }, [catalogueUnavailable, destinations]);

  return (
    <iframe
      key={destinationId}
      ref={frameRef}
      title={`${destination?.name ?? "Erode"} destination details`}
      src={`/erode/index.html?destination=${encodeURIComponent(destinationId)}`}
      className="block h-dvh w-full border-0"
      aria-label={`${destination?.name ?? "Erode"} destination details`}
    />
  );
}
