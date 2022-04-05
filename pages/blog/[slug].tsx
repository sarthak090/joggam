import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { PostData } from "../../models/blog";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import BlogPost from "../../components/BlogContainer";
type Props = {
  postsData: PostData;
  relatedPosts: PostData[];
  error: boolean;
};
export const PostSlug: NextPage<Props, any> = (props: Props) => {
  const router = useRouter();

  const [post, setPost] = React.useState<PostData>();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const { postsData, error, relatedPosts } = props;

  useEffect(() => {
    if (error) {
      setErrorMsg("Post Not Found With This Name");
    } else {
      setPost(postsData);
      setIsLoaded(true);
    }
  }, [postsData]);
  if (router.isFallback) {
    return <h5>Loading...</h5>;
  }
  if (!error && isLoaded) {
    const title: any = post !== undefined ? post.title : "Loading";
    return (
      <>
        {post && (
          <NextSeo
            title={title.rendered}
            description="Get access to valuable content that will help you push your career to the next level both for job seeker and employees"
            openGraph={{
              description:
                "Get access to valuable content that will help you push your career to the next level both for job seeker and employees",
              title: title.rendered,
              images: [
                {
                  url: post?.featuredImg.large,
                  width: 1280,
                  height: 720,
                  alt: title.rendered,
                },
              ],
            }}
          />
        )}

        <div className="pt-8 px-0 container mx-auto">
          <div className="flex flex-col lg:flex-row p-8 blog-container ">
            <div className=" ">
              <BlogPost {...post} relatedPosts={relatedPosts} />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className="pt-8 flex justify-center items-center container mx-auto"
        style={{ minHeight: "100vh" }}
      >
        error
        {/* {errorMsg.length > 0 ? <ErrorCmp /> : <Spinner />} */}
      </div>
    </>
  );
};
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BLOG_URL}/wp-json/wpr/v1/posts`
  ).then();

  const data = await res.json();

  const paths = data.map((post: PostData) => {
    return {
      params: { slug: post.slug.toString() },
    };
  });

  return {
    paths,
    fallback: true,
    // paths:[{slug:}]
  };
};
export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params !== undefined ? ctx.params.slug : "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BLOG_URL}/wp-json/wpr/v1/posts/${slug}`
  ).then();

  const rel = await fetch(
    `${process.env.NEXT_PUBLIC_BLOG_URL}/wp-json/wpr/v1/posts`
  ).then();

  const relatedPosts = await rel.json();

  const postsData = await res.json();

  if (postsData.msg) {
    return {
      props: {
        postsData,
        error: true,
      },
    };
  }
  return {
    props: {
      postsData,
      relatedPosts: relatedPosts.slice(0, 3),
      error: false,
    },
  };
};
export default PostSlug;
