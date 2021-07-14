import Image from 'next/dist/client/image';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

import PostHeader from './PostHeader';
import classes from './PostDetail.module.scss';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

const PostDetail = (props: any) => {
  const { slug, image, content, title } = props.post;

  const imagePath = `/images/posts/${slug}/${image}`;

  const customRenderers = {
    p(paragraph: any) {
      const { node } = paragraph;

      if (node.children[0].tagName === 'img') {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${slug}/${image.properties.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      if (
        (node.children[1] && node.children[1].tagName === 'a') ||
        node.children[0].tagName === 'a'
      ) {
        const aTag =
          node.children[0].tagName === 'a'
            ? node.children[0]
            : node.children[1];

        return (
          <a href={aTag.properties.href} target="_blank" rel="noreferrer">
            {aTag.children[0].value}
          </a>
        );
      }

      return <p>{paragraph.children}</p>;
    },
    code(code: any) {
      const { className, children } = code;
      const language = className.split('-')[1];
      return (
        <SyntaxHighlighter
          style={{ ...atomDark }}
          language={language}
          wrapLongLines
        >
          {children}
        </SyntaxHighlighter>
      );
    },
    // a(a: any){
    //   return (
    //     <a
    //   )
    // }
  };

  return (
    <article className={classes.wrapper}>
      <PostHeader title={title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
    </article>
  );
};

export default PostDetail;
