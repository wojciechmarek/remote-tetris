import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface FeatureLayoutProps {}

const StyledFeatureLayout = styled.div`
  color: pink;
`;

export function FeatureLayout(props: FeatureLayoutProps) {
  return (
    <StyledFeatureLayout>
      <h1>Welcome to FeatureLayout!</h1>
    </StyledFeatureLayout>
  );
}

export default FeatureLayout;
