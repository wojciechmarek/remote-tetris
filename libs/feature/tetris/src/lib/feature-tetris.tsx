import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface FeatureTetrisProps {}

const StyledFeatureTetris = styled.div`
  color: pink;
`;

export function FeatureTetris(props: FeatureTetrisProps) {
  return (
    <StyledFeatureTetris>
      <h1>Welcome to FeatureTetris!</h1>
    </StyledFeatureTetris>
  );
}

export default FeatureTetris;
