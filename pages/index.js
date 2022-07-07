import fs from "fs";
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import PostCard from "../components/PostCard";
import Layout from "../components/Layout";

const Home = ({ posts }) => {
  return (
    <Layout title="Home">
    <div className="container w-[80%]  md:w-[60%]  mx-auto   " >
      <h1 className="text-blue-700 text-3xl font-bold my-12">
        Dev - Pubudu Blog
      </h1>
      <div className=" posts md:grid md:grid-cols-2 gap-8 ">
        {posts.map(post =>(
         <Link href={`/posts/${post.slug}`} key = {post.slug}>
          <a >
            <div className="p-6">
          <PostCard post={post} />
          </div>
            </a>
         </Link>
        )  )}
      </div>
   
    </div>
    </Layout>
  )
};

export default Home;

export async function getStaticProps () {
  //read page/post dir
  let files = fs.readdirSync(path.join('pages/posts'));

  // get only the mdx files
  files = files.filter(file => file.split(".")[1] === 'mdx');

  const posts = await Promise.all(
    files.map(file => {
      const mdWithData = fs.readFileSync(path.join('pages/posts', file),'utf-8');
      const { data: frontMatter } = matter(mdWithData);

      return {
        frontMatter,
        slug: file.split(".")[0],
      }

    })
  );

  return {
    props: {
      posts,
    }
  };

}

