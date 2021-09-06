import type { NextPage } from "next";
import React from "react";
import styles from "../styles/Home.module.css";
import styled from "styled-components";
const Home: NextPage = () => {
  React.useEffect(() => {
    fetch("/api/hello");
  });
  return (
    <div className={styles.container}>
      <Title>Hello World!!</Title>
    </div>
  );
};

const Title = styled.h1``;

export default Home;
