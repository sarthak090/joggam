import { GetStaticProps, NextPage } from "next";
import { Posts } from "../../models/blog";
import { NextSeo } from "next-seo";
import CardContainer from "../../components/CardContainer";
type Props = {
  posts: Posts[];
};
const Home: NextPage<Props, any> = (props: Props) => {
  const { posts } = props;

  return (
    <>
      <NextSeo
        title="Jobgam"
        description="jobgam"
        openGraph={{
          description: "the Official Blog For Jobgam",
          title: "Jobgam Blog",
        }}
      />
      <div className="pt-8 px-4 lg:px-20 container mx-auto container-blog text-gray-600">
        <h1 className="text-xl font-bold">BLOG & NEWS</h1>

        <h2 className="text-5xl font-bold  ">Read About Us</h2>
        <CardContainer posts={posts} />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BLOG_URL}/wp-json/wpr/v1/posts`
  ).then();

  const posts = await res.json();

  return {
    props: {
      posts: posts,
    },
  };
};
export default Home;
