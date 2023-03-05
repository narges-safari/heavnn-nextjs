import Head from "next/head";

const Meta = ({ title }: { title: string }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale1" />
      <meta
        name="keywords"
        content="Heavnn, tax management, remote-first, remote workers"
      />
      <meta
        name="description"
        content="Heavnn is a global tax management platform designed for remote-first companies and international remote workers"
      />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
};

export default Meta;
