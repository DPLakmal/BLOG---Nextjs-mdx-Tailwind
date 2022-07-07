import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import styles from '../../styles/Post.module.css';
import HighLight, { defaultProps } from "prism-react-renderer";
import theme from 'prism-react-renderer/themes/nightOwl';
import Layout from '../../components/Layout';

const Post = ({ frontMatter, mdxSource }) => {

    const components = {
        code: function code({ className, ...props }) {
            return (
                <HighLight {...defaultProps}
                    theme={theme}
                    code={props.children}
                    // language={`${this.getDataValue('languages').split(".")[1]}`}
                >
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <pre className={className} style={style}>
                            {tokens.map((line, i) => (
                                <div {...getLineProps({ line, key: i })}>
                                    {line.map((token, key) => (
                                        <span {...getTokenProps({ token, key })} />
                                    ))}
                                </div>
                            ))}
                        </pre>
                    )}
                </HighLight>
            );
        }
    }

    return (
        <Layout title={frontMatter.title}>

        <div className={styles.post}>
        <img src={frontMatter.cover_image} alt="Cover Image"  />
                     <h1 className=' font-semibold  my-8 text-3xl text-black-700 text-center'>
                {frontMatter.title}
            </h1>
            <p>{frontMatter.date}</p>
            <div className='container w-[85%]  md:w-[80%]  mx-auto ' >
            <MDXRemote {...mdxSource} components={components}  />
            </div>
        </div>
     
        </Layout>
    )
}

export default Post;

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('pages/posts'));

    const paths = files.map(file => {
        return {
            params: {
                slug: file.replace('.mdx', "",)
            }
        }
    });
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params: { slug } }) {
    const markdown = fs.readFileSync(
        path.join("pages/posts", slug + ".mdx"), "utf-8"
    );

    const { data: frontMatter, content } = matter(markdown);

    const mdxSource = await serialize(content);
    return {
        props: {
            frontMatter,
            slug,
            mdxSource,
        }
    }

}