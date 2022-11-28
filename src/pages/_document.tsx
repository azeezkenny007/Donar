import React from "react";
import { Html, Head, Main, NextScript, DocumentProps } from "next/document";

type Props = {};

const Document = (props: DocumentProps) => {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
