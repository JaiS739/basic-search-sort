import logo from "./logo.svg";
import "./App.css";
import {
  Button,
  Heading,
  HStack,
  Input,
  Table,
  Select,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("");

  const userData = async () => {
    setIsLoading(true);
    return await axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleSearch = async () => {
    setIsLoading(true);
    return await axios
      .get(`http://localhost:5000/users?q=${searchValue}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReset = () => {
    userData();
    setSearchValue("");
    setSortValue("");
  };

  const searchBySort = async (e) => {
    setIsLoading(true);
    setSortValue(e.target.value);

    return await axios
      .get(`http://localhost:5000/users?_sort=${sortValue}&_order=asc`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleActive = async (value) => {
    return await axios
      .get(`http://localhost:5000/users?status=${value}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInActive = async (value) => {
    return await axios
      .get(`http://localhost:5000/users?status=${value}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    userData();
  }, []);

  const sorting_values = ["name", "email", "phone", "age", "status"];

  if (isLoading) {
    return <Heading>Loading...</Heading>;
  } else {
    return (
      <>
        <HStack spacing="24px" margin={"10px"}>
          <Input
            placeholder="🔍 Search"
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <Button onClick={handleSearch}>Search</Button>
          <Button onClick={handleReset}>Reset</Button>
          <Select
            placeholder="Select option"
            onChange={searchBySort}
            value={sortValue}
          >
            {sorting_values.map((e, index) => (
              <option key={index} value={e}>
                {e}
              </option>
            ))}
          </Select>
        </HStack>

        <HStack spacing="24px" margin={"10px"}>
          <Button onClick={() => handleActive("active")}>Active</Button>
          <Button onClick={() => handleInActive("inactive")}>In Active</Button>
        </HStack>

        <Heading>I'm a Heading</Heading>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>S n</Th>
                <Th>name</Th>
                <Th>age</Th>
                <Th>email</Th>
                <Th>phone</Th>
                <Th>status</Th>
              </Tr>
            </Thead>
            <Tbody textAlign={"center"}>
              {data.length == 0 ? (
                <Tr>
                  <Td>no data found</Td>
                </Tr>
              ) : (
                data.map((ele, index) => (
                  <Tr key={ele.id}>
                    <Td>{index + 1}</Td>
                    <Td>{ele.name}</Td>
                    <Td>{ele.age}</Td>
                    <Td>{ele.email}</Td>
                    <Td>{ele.phone}</Td>
                    <Td>{ele.status}</Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

export default App;
