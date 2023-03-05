import Link from "next/link";
import { User } from "@/types";
import { useCallback, useState } from "react";
import { GetStaticProps } from "next";
import {
  Box,
  Heading,
  List,
  ListItem,
  theme,
  Text,
  Flex,
  Input,
} from "@chakra-ui/react";
import Meta from "@/components/Meta";

export default function Users({ users }: { users: User[] }) {
  const [usersState, setUsersState] = useState<User[]>(users);

  const searchUsers = useCallback(
    (searchedValue: string) => {
      if (searchedValue.length > 2) {
        setUsersState(
          usersState.filter((item) =>
            item.name.toLowerCase().includes(searchedValue)
          )
        );
      }
      if (searchedValue.length === 0) {
        setUsersState(users);
      }
    },
    [users, usersState]
  );

  return (
    <Box padding={8}>
      <Meta title={"Users"} />
      <Flex gap={6}>
        <Heading as={"h3"} size={"lg"} marginBottom={6}>
          Users
        </Heading>
        <Input
          placeholder={"Type a name..."}
          _focusVisible={{
            border: `1px solid${theme.colors.gray[600]}`,
            boxShadow: theme.shadows.inner,
          }}
          onChange={(event) => searchUsers(event.currentTarget.value)}
        />
      </Flex>
      {usersState.map((user) => (
        <List key={user.id}>
          <Link href={`/articles/users/${user.id}`} key={user.id}>
            <ListItem
              bgColor={theme.colors.gray[50]}
              border={`1px solid${theme.colors.gray[300]}`}
              marginY={2}
              padding={2}
              _hover={{ boxShadow: theme.shadows.md }}
              cursor={"pointer"}
              borderRadius={"lg"}
            >
              <Flex gap={1}>
                <Text as={"i"}>Name:</Text>
                <Text as={"b"}>{user.name}</Text>
              </Flex>
              <Flex gap={1}>
                <Text as={"i"}>Username:</Text>
                <Text as={"b"}>{user.username}</Text>
              </Flex>
              <Flex gap={1}>
                <Text as={"i"}>E-mail:</Text>
                <Text as={"b"}>{user.email}</Text>
              </Flex>
            </ListItem>
          </Link>
        </List>
      ))}
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const users = await res.json();

  return {
    props: { users },
  };
};
