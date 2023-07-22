import { render } from '@testing-library/react';

import FeatureStart from './feature-start.styled.tsx';

describe('FeatureStart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FeatureStart />);
    expect(baseElement).toBeTruthy();
  });
});
