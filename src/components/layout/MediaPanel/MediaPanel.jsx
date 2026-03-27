import { useEffect, useMemo, useRef } from "react";
import "./MediaPanel.css";

export function MediaPanel({
  mediaItems = [],
  videoUrl = null,
  imageUrl = null,
  volume = 0,
}) {
  const videoRef = useRef(null);

  const resolvedItems = useMemo(() => {
    if (Array.isArray(mediaItems) && mediaItems.length > 0) {
      return mediaItems.filter((item) => item?.url);
    }

    if (videoUrl) {
      return [{ id: "legacy-video", type: "video", url: videoUrl }];
    }

    if (imageUrl) {
      return [{ id: "legacy-image", type: "image", url: imageUrl, duration: 8 }];
    }

    return [];
  }, [mediaItems, videoUrl, imageUrl]);

  const currentItem = resolvedItems[0] || null;

  useEffect(() => {
    if (videoRef.current && currentItem?.type === "video") {
      videoRef.current.volume = Math.max(0, Math.min(1, Number(volume) / 100));
    }
  }, [currentItem, volume]);

  if (!currentItem) {
    return (
      <section className="media-panel">
        <div className="media-panel__empty">Sin contenido multimedia</div>
      </section>
    );
  }

  return (
    <section className="media-panel">
      {currentItem.type === "video" ? (
        <video
          key={currentItem.id || currentItem.url}
          ref={videoRef}
          className="media-panel__content"
          src={currentItem.url}
          autoPlay
          muted={Number(volume) === 0}
          loop
          playsInline
        />
      ) : (
        <img
          key={currentItem.id || currentItem.url}
          className="media-panel__content"
          src={currentItem.url}
          alt="Contenido multimedia"
        />
      )}
    </section>
  );
}