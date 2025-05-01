import styled from "styled-components";

const Separator = () => {
  return <SeparatorLine />;
};

const SeparatorLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(216, 177, 142, 0.5);
`;

export default Separator;
