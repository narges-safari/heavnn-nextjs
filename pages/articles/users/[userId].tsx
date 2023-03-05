import React from "react";
import { Article } from "@/types";
import Meta from "@/components/Meta";
import { GetStaticProps } from "next";
import { Box, Heading, List, ListItem, theme } from "@chakra-ui/react";

export default function UserArticles({
  userArticles,
  userId,
}: {
  userArticles: Article[];
  userId: string;
}) {
  return (
    <Box padding={8}>
      <Meta title={`Articles of user with the id: ${userId}`} />
      <Heading as={"h3"} size={"lg"} marginBottom={6}>
        {`Articles of user with the id: ${userId}`}
      </Heading>
      {userArticles?.map((userArticle) => (
        <List key={userArticle.id}>
          <ListItem
            bgColor={theme.colors.gray[50]}
            border={`1px solid${theme.colors.gray[300]}`}
            margin={2}
            padding={2}
            borderRadius={"lg"}
          >
            {userArticle.title}
          </ListItem>
        </List>
      ))}
    </Box>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { userId } = params as unknown as { userId: number };

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  const userArticles = (await res.json()) as Article[];

  return {
    props: { userArticles, userId },
  };
};
