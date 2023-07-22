import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface FeatureStartProps {}

const StyledFeatureStart = styled.div`
  color: pink;
`;

export function FeatureStart(props: FeatureStartProps) {
  return (
    <StyledFeatureStart>
      <h1>Welcome to FeatureStart!</h1>
    </StyledFeatureStart>
  );
}

export default FeatureStart;
