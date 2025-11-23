import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ApplicationLayout from '@/src/app/(application)/layout';

// Mock SidebarLayout
vi.mock('@/src/components/layout/sidebar-layout', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-layout">{children}</div>
  ),
}));

describe('ApplicationLayout', () => {
  it('should render without crashing', () => {
    render(<ApplicationLayout>Test Content</ApplicationLayout>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should wrap children with SidebarLayout', () => {
    render(<ApplicationLayout>Application Content</ApplicationLayout>);
    
    expect(screen.getByTestId('sidebar-layout')).toBeInTheDocument();
    expect(screen.getByText('Application Content')).toBeInTheDocument();
  });

  it('should pass children correctly to SidebarLayout', () => {
    const testContent = <div data-testid="test-content">Complex Content</div>;
    render(<ApplicationLayout>{testContent}</ApplicationLayout>);
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Complex Content')).toBeInTheDocument();
  });

  it('should handle multiple children', () => {
    render(
      <ApplicationLayout>
        <div>First</div>
        <div>Second</div>
      </ApplicationLayout>
    );
    
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('should handle empty children gracefully', () => {
    render(<ApplicationLayout>{null}</ApplicationLayout>);
    expect(screen.getByTestId('sidebar-layout')).toBeInTheDocument();
  });

  it('should render nested components as children', () => {
    const NestedComponent = () => <div>Nested Page</div>;
    
    render(
      <ApplicationLayout>
        <NestedComponent />
      </ApplicationLayout>
    );
    
    expect(screen.getByText('Nested Page')).toBeInTheDocument();
  });

  it('should render React fragments as children', () => {
    render(
      <ApplicationLayout>
        <>
          <span>Fragment 1</span>
          <span>Fragment 2</span>
        </>
      </ApplicationLayout>
    );
    
    expect(screen.getByText('Fragment 1')).toBeInTheDocument();
    expect(screen.getByText('Fragment 2')).toBeInTheDocument();
  });
});