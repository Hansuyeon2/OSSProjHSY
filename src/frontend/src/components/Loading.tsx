import { useEffect, useState } from "react";
import styled from "styled-components";
import { fonts } from "@styles/fonts";

const Loading = () => {
  const [rotation, setRotation] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    let angle = 0;

    const rotateOnce = () => {
      const randomDeg = 360 * 5 + Math.floor(Math.random() * 360);
      angle += randomDeg;

      setTransitioning(true);
      setRotation(angle);

      setTimeout(() => {
        setTransitioning(false);
        setTimeout(rotateOnce, 400);
      }, 4000);
    };

    rotateOnce();
  }, []);

  return (
    <LoadingWrapper>
      <LoadingText>
        지금&nbsp;<NameText>민영</NameText>&nbsp;님은 어떤 감정일까요?
      </LoadingText>
      <LoadingImgContainer>
        <SpinnerWrapper>
          <LoadingPin src="/images/loading/Subtract.svg" />
          <LoadingSpinner
            src="/images/loading/spinner.png"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: transitioning ? "transform 4s ease-out" : "none",
            }}
          />
        </SpinnerWrapper>
      </LoadingImgContainer>
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const LoadingText = styled.h1`
  ${fonts.title_b_24};
  display: flex;
  align-items: center;
  margin-top: 40px;
`;

const NameText = styled.p`
  color: ${({ theme }) => theme.colors.mainbrown01};
`;

const LoadingImgContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpinnerWrapper = styled.div`
  position: relative;
  width: 330px;
  height: 330px;
`;

const LoadingPin = styled.img`
  width: 21.67px;
  height: 33.229px;
  position: absolute;
  top: 115px;
  left: 200px;
  z-index: 1;
  top: 3%;
  left: 50%;
  transform: translate(-50%);
`;

const LoadingSpinner = styled.img`
  width: 100%;
  height: 100%;
`;

export default Loading;
