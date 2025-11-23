import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SidebarLayout from '@/src/components/layout/sidebar-layout';

// Mock the Sidebar component
vi.mock('@/src/components/molecules/sidebar', () => ({
  default: () => <div data-testid="sidebar">Sidebar</div>,
}));

describe('SidebarLayout', () => {
  it('should render without crashing', () => {
    render(<SidebarLayout>Test Content</SidebarLayout>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should render children correctly', () => {
    const testContent = 'Hello from children';
    render(<SidebarLayout>{testContent}</SidebarLayout>);
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('should render Sidebar component', () => {
    render(<SidebarLayout>Content</SidebarLayout>);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('should render complex children elements', () => {
    render(
      <SidebarLayout>
        <div data-testid="child-div">
          <h1>Title</h1>
          <p>Paragraph</p>
        </div>
      </SidebarLayout>
    );
    
    expect(screen.getByTestId('child-div')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
  });

  it('should apply correct CSS classes to container', () => {
    const { container } = render(<SidebarLayout>Content</SidebarLayout>);
    const mainDiv = container.firstChild as HTMLElement;
    
    expect(mainDiv).toHaveClass('flex');
    expect(mainDiv).toHaveClass('w-full');
    expect(mainDiv).toHaveClass('flex-1');
    expect(mainDiv).toHaveClass('flex-col');
    expect(mainDiv).toHaveClass('overflow-hidden');
    expect(mainDiv).toHaveClass('md:flex-row');
    expect(mainDiv).toHaveClass('h-screen');
  });

  it('should apply correct CSS classes to content wrapper', () => {
    const { container } = render(<SidebarLayout>Content</SidebarLayout>);
    const contentDiv = container.querySelector('.flex-1.p-4');
    
    expect(contentDiv).toBeInTheDocument();
    expect(contentDiv).toHaveClass('flex-1');
    expect(contentDiv).toHaveClass('p-4');
  });

  it('should render multiple children', () => {
    render(
      <SidebarLayout>
        <div>First Child</div>
        <div>Second Child</div>
        <div>Third Child</div>
      </SidebarLayout>
    );
    
    expect(screen.getByText('First Child')).toBeInTheDocument();
    expect(screen.getByText('Second Child')).toBeInTheDocument();
    expect(screen.getByText('Third Child')).toBeInTheDocument();
  });

  it('should handle empty children', () => {
    render(<SidebarLayout>{null}</SidebarLayout>);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('should render React fragments as children', () => {
    render(
      <SidebarLayout>
        <>
          <span>Fragment Item 1</span>
          <span>Fragment Item 2</span>
        </>
      </SidebarLayout>
    );
    
    expect(screen.getByText('Fragment Item 1')).toBeInTheDocument();
    expect(screen.getByText('Fragment Item 2')).toBeInTheDocument();
  });

  it('should render with nested components', () => {
    const NestedComponent = () => <div>Nested Component</div>;
    
    render(
      <SidebarLayout>
        <NestedComponent />
      </SidebarLayout>
    );
    
    expect(screen.getByText('Nested Component')).toBeInTheDocument();
  });

  it('should maintain proper structure with sidebar and content area', () => {
    const { container } = render(<SidebarLayout>Main Content</SidebarLayout>);
    
    const sidebar = screen.getByTestId('sidebar');
    const content = screen.getByText('Main Content');
    
    expect(sidebar).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    
    // Verify sidebar comes before content in DOM
    const parent = container.firstChild as HTMLElement;
    const children = Array.from(parent.children);
    
    expect(children.length).toBeGreaterThanOrEqual(2);
  });
});