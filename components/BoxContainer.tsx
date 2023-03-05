import { Box, Heading, theme } from "@chakra-ui/react";
import Link from "next/link";

export default function BoxContainer({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  return (
    <Link href={`/${url}`}>
      <Box
        bgColor={theme.colors.gray[50]}
        border={`1px solid${theme.colors.gray[300]}`}
        _hover={{ boxShadow: theme.shadows.md }}
        cursor={"pointer"}
        borderRadius={"lg"}
        height={64}
        width={64}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Heading as={"h5"} size={"md"} marginBottom={6} marginRight={4}>
          {title}
        </Heading>
      </Box>
    </Link>
  );
}
