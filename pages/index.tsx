import BoxContainer from "@/components/BoxContainer";
import Meta from "@/components/Meta";
import { Flex, Heading } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex
      height={"100vh"}
      padding={20}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={8}
    >
      <Meta title={"Heavnn Next App"} />
      <Heading as={"h3"} size={"lg"}>
        Heavnn NextJs App
      </Heading>
      <Flex justifyContent={"center"} alignItems={"center"} gap={20}>
        <BoxContainer title={"Articles"} url={"articles"} />
        <BoxContainer title={"Users"} url={"users"} />
      </Flex>
    </Flex>
  );
}
