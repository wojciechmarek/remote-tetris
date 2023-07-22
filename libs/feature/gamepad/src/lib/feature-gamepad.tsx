import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface FeatureGamepadProps {}

const StyledFeatureGamepad = styled.div`
  color: pink;
`;

export function FeatureGamepad(props: FeatureGamepadProps) {
  return (
    <StyledFeatureGamepad>
      <h1>Welcome to FeatureGamepad!</h1>
    </StyledFeatureGamepad>
  );
}

export default FeatureGamepad;
