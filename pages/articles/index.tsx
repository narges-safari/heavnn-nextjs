import { useEffect, useMemo, useState } from "react";
import { Article } from "@/types";
import Meta from "@/components/Meta";
import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListItem,
  theme,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const ITEMSCOUNT: number = 25;

export default function Articles() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articles, setArticles] = useState<Article[]>([]);
  const toast = useToast();

  const fetchArticles = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${ITEMSCOUNT}`
    );
    setArticles(await res.json());
  };

  const deleteArticle = async (id: number) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
      }
    );
    if (res.status) {
      toast({
        title: "Article is deleted.",
        description:
          "resource will not be really updated on the server but it will be faked as if.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const renderPagination = useMemo(
    () =>
      Array(4)
        .fill("")
        .map((_, index) => {
          const _pageNumber = index + 1;
          return (
            <Button
              size={"sm"}
              key={index}
              variant={"outline"}
              colorScheme={"gray"}
              isActive={_pageNumber === currentPage}
              onClick={() => setCurrentPage(_pageNumber)}
            >
              {_pageNumber}
            </Button>
          );
        }),
    [currentPage]
  );

  return (
    <Box padding={8}>
      <Meta title={"Articles"} />
      <Flex>
        <Heading as={"h3"} size={"lg"} marginBottom={6} marginRight={4}>
          Articles
        </Heading>
        {renderPagination}
      </Flex>
      {articles.map((article) => (
        <List key={article.id}>
          <ListItem
            bgColor={theme.colors.gray[50]}
            border={`1px solid${theme.colors.gray[300]}`}
            marginY={2}
            padding={2}
            _hover={{ boxShadow: theme.shadows.md }}
            cursor={"pointer"}
            borderRadius={"lg"}
          >
            <Flex justifyContent={"space-between"}>
              {article.title}
              <Tooltip label={"Delete article"}>
                <DeleteIcon
                  color={"gray.600"}
                  onClick={() => deleteArticle(article.id)}
                />
              </Tooltip>
            </Flex>
          </ListItem>
        </List>
      ))}
    </Box>
  );
}
