import { fonts } from "@styles/fonts";
import styled from "styled-components";

export const DiaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: ${({ theme }) => theme.colors.bgbeige01};
  background-image: repeating-linear-gradient(
      to bottom,
      #d8b18e80 0px,
      #d8b18e80 0.8px,
      transparent 0.8px,
      transparent 35px
    ),
    repeating-linear-gradient(
      to right,
      #d8b18e80 0px,
      #d8b18e80 0.8px,
      transparent 0.8px,
      transparent 32px
    );
  background-size: 32px 32px;
  overflow-y: hidden;
`;

export const DiaryHeader = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.mainbrown02};
  height: 100px;
  color: ${({ theme }) => theme.colors.bgbeige02};
  display: flex;
  justify-content: center;
  align-items: center;

  //TODO: 디자인시스템 추가되면 변경
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: -0.5px;
`;

export const DiaryContent = styled.section`
  padding: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const DiarySpringLeft = styled.img`
  height: 24px;
  position: absolute;
  top: 90px;
  left: 40px;
`;

export const DiarySpringRight = styled.img`
  height: 24px;
  position: absolute;
  top: 90px;
  right: 40px;
`;

export const DiaryImgIcon = styled.img`
  width: 86.343px;
  height: 95.296px;
  position: absolute;
  top: 300px;
  left: -20px;
`;

export const DiaryImgClover = styled.img`
  width: 36px;
  height: 38.441px;
  z-index: 15;
  position: absolute;
  top: 480px;
  right: 30px;
`;

export const BackButton = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 17px;
  cursor: pointer;
`;

export const CloseButton = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 17px;
  cursor: pointer;
`;

// MonthReportLayout

export const MonthReportWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const MonthReportHeader = styled.div`
  width: 100%;
  height: 160px;
  background-color: ${({ theme }) => theme.colors.mainbrown04};
  color: #000000;
  display: flex;
  padding: 24px;
  /* justify-content: center; */
  align-items: center;
  ${fonts.title_b_24}
  position: relative;

  p {
    color: black;
  }

  span {
    color: ${({ theme }) => theme.colors.mainbrown01};
  }
`;

export const MonthReportHeaderImg = styled.img`
  position: absolute;
  width: 100%;
  height: 41.769px;
  flex-shrink: 0;
  bottom: 0;
  right: 0;
`;

export const MonthReportContent = styled.div``;

export const MonthReportCloseButton = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 17px;
  top: 17px;
  cursor: pointer;
`;
