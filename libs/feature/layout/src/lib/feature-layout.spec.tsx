import { render } from '@testing-library/react';

import FeatureLayout from './feature-layout';

describe('FeatureLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FeatureLayout />);
    expect(baseElement).toBeTruthy();
  });
});
