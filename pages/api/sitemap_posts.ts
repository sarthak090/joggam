import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const url = `${process.env.NEXT_PUBLIC_BLOG_URL}/wp-json/wpr/v1/posts`;
  const resp = await fetch(url);
  const projects = await resp.json();
  res.setHeader("Content-Type", "text/xml");
  res.write(createSitemap(projects));
  res.end();
};
const YOUR_SITENAME = process.env.NEXT_PUBLIC_DOMAIN_NAME;

const createSitemap = (projects: []) => `<?xml version="1.0" encoding="UTF-8"?>
      <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
      >
        ${projects
          .map(({ slug }) => {
            return `
                    <url>
                        <loc>${`${YOUR_SITENAME}/blog/${slug}`}</loc>
                    </url>
                `;
          })
          .join("")}
    </urlset>
    `;
export default handler;
