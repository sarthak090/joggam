import "../styles/globals.css";
import "../styles/blog.css";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title="Jobgam Blog | Your Source For Career Growth"
        description="Get access to valuable content that will help you push your career to the next level both for job seeker and employees"
        openGraph={{
          type: "website",
          locale: "en_NG",
          url: "https://jobgam.com/",
          site_name: "Jobgam",

          description:
            "Get access to valuable content that will help you push your career to the next level both for job seeker and employees",
          title: "Jobgam Blog | Your Source For Career Growth",
        }}
      />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
