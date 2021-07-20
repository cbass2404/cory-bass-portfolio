import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export const getPostsFiles = () => {
  return fs.readdirSync(postsDirectory);
};

const getPostData: (fileName: any) => any = (fileName) => {
  const filePath = path.join(postsDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const postSlug = fileName.replace(/\.md$/, '');

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
};

export const getAllPosts = () => {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB): any => {
    if (postA.date && postB.date) {
      postA.date > postB.date ? -1 : 1;
    }
  });

  return sortedPosts;
};

export const getPostDetails = (slug: string) => {
  const allPosts = getAllPosts();

  const PostDetail = allPosts?.find((post) => post.slug === slug);

  return PostDetail;
};
