"use client";

import styled from "@emotion/styled";

export const ImageBackground = ({ src, alt }: { src: string; alt: string }) => (
  <Wrapper>
    <IntroImg>
      <Img src={src} alt={alt} />
    </IntroImg>
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  position: fixed;
  top: 0px;
  left: 0px;

  overflow-y: hidden;
  z-index: -1;
`;

const IntroImg = styled.div`
  width: 82%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Img = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
  filter: brightness(0.6);
`;
