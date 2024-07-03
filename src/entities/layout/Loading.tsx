"use client";

import styled from "@emotion/styled";
import { PropagateLoader } from "react-spinners";

export const Loading = () => {
  return (
    <>
      <LoadingWrapper>
        <PropagateLoader
          style={{ marginTop: "10px" }}
          color="white"
          size={15}
          speedMultiplier={1}
        />
      </LoadingWrapper>
    </>
  );
};

export const LoadingWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.6);

  position: absolute;
  top: 0px;
  left: 0px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  font-size: 30px;
  color: white;
  font-weight: bold;

  z-index: 100;
`;
