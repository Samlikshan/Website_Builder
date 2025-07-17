import React, { useEffect, useRef } from "react";

type Props = {
  html: string;
  css: string;
};

export const PreviewPane: React.FC<Props> = ({ html, css }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const doc = iframeRef.current?.contentDocument;
    if (doc) {
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${css}</style>
        </head>
        <body>${html}</body>
        </html>
      `);
      doc.close();
    }
  }, [html, css]);

  return (
    <iframe
      ref={iframeRef}
      title="Website Preview"
      className="w-full h-[calc(100%-40px)]"
      sandbox="allow-scripts allow-forms allow-same-origin"
    />
  );
};
