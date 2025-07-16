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
          <style>${css}</style>
        </head>
        <body>${html}</body>
        </html>
      `);
      doc.close();
    }
  }, [html, css]);

  return (
    <div className="w-full h-[85vh] border rounded overflow-hidden shadow">
      <iframe
        ref={iframeRef}
        title="Website Preview"
        className="w-full h-full"
        sandbox="allow-scripts allow-forms allow-same-origin"
      />
    </div>
  );
};
