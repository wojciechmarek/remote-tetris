import { render } from '@testing-library/react';

import FeatureGamepad from './feature-gamepad';

describe('FeatureGamepad', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FeatureGamepad />);
    expect(baseElement).toBeTruthy();
  });
});
