import { render } from '@testing-library/react';

import FeatureTetris from './feature-tetris';

describe('FeatureTetris', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FeatureTetris />);
    expect(baseElement).toBeTruthy();
  });
});
