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
        setTimeout(rotateOnce, 300);
      }, 3000);
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
          <LoadingPin src="/images/loading/pin.png" />
          <LoadingSpinner
            src="/images/loading/spinner.png"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: transitioning ? "transform 4s ease-out" : "none",
            }}
          />
        </SpinnerWrapper>
      </LoadingImgContainer>
      <LoadingDes>쿼디가 열심히 감정을 분석하고 있어요...</LoadingDes>
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
  margin-top: 50px;
`;

const NameText = styled.p`
  color: ${({ theme }) => theme.colors.mainbrown01};
`;

const LoadingImgContainer = styled.section`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const SpinnerWrapper = styled.div`
  position: relative;
  width: 330px;
  height: 330px;
`;

const LoadingPin = styled.img`
  width: 33.363px;
  height: 39.718px;
  position: absolute;
  z-index: 1;
  top: -5%;
  left: 50%;
  transform: translate(-50%);
`;

const LoadingSpinner = styled.img`
  width: 100%;
  height: 100%;
`;

const LoadingDes = styled.span`
  margin-top: 10px;
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.mainbrown01};
  ${fonts.loading}
`;

export default Loading;
