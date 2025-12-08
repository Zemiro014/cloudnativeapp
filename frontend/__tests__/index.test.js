/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import Home from '@/app/page';
import { render, screen } from '@testing-library/react';

describe('Home', () => {
  it('renders a heading', () => {
    
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /Welcome Cloud Native App!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
