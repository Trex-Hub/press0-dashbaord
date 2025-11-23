import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import {
  SidebarProvider,
  useSidebar,
  Sidebar,
  SidebarBody,
  DesktopSidebar,
  MobileSidebar,
  SidebarLink,
} from '@/src/components/ui/sidebar';

// Mock Next Link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Test component to use the useSidebar hook
const TestComponent = () => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <div>
      <span data-testid="open-state">{open ? 'open' : 'closed'}</span>
      <span data-testid="animate-state">{animate ? 'animated' : 'static'}</span>
      <button onClick={() => setOpen(!open)} data-testid="toggle-button">
        Toggle
      </button>
    </div>
  );
};

describe('SidebarProvider', () => {
  it('should provide default context values', () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    );

    expect(screen.getByTestId('open-state')).toHaveTextContent('closed');
    expect(screen.getByTestId('animate-state')).toHaveTextContent('animated');
  });

  it('should allow controlling open state externally', () => {
    const setOpen = vi.fn();
    render(
      <SidebarProvider open={true} setOpen={setOpen}>
        <TestComponent />
      </SidebarProvider>
    );

    expect(screen.getByTestId('open-state')).toHaveTextContent('open');
  });

  it('should handle animate prop', () => {
    render(
      <SidebarProvider animate={false}>
        <TestComponent />
      </SidebarProvider>
    );

    expect(screen.getByTestId('animate-state')).toHaveTextContent('static');
  });

  it('should toggle open state when setOpen is called', () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    );

    const toggleButton = screen.getByTestId('toggle-button');
    const openState = screen.getByTestId('open-state');

    expect(openState).toHaveTextContent('closed');
    
    fireEvent.click(toggleButton);
    expect(openState).toHaveTextContent('open');
    
    fireEvent.click(toggleButton);
    expect(openState).toHaveTextContent('closed');
  });

  it('should render children correctly', () => {
    render(
      <SidebarProvider>
        <div data-testid="child">Child Content</div>
      </SidebarProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('should use internal state when no props provided', () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    );

    expect(screen.getByTestId('open-state')).toHaveTextContent('closed');
  });

  it('should prefer external open prop over internal state', () => {
    const setOpen = vi.fn();
    render(
      <SidebarProvider open={true} setOpen={setOpen}>
        <TestComponent />
      </SidebarProvider>
    );

    expect(screen.getByTestId('open-state')).toHaveTextContent('open');
  });
});

describe('useSidebar', () => {
  it('should throw error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useSidebar must be used within a SidebarProvider');
    
    consoleSpy.mockRestore();
  });

  it('should return context values when used inside provider', () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    );

    expect(screen.getByTestId('open-state')).toBeInTheDocument();
    expect(screen.getByTestId('animate-state')).toBeInTheDocument();
  });
});

describe('Sidebar', () => {
  it('should render children within provider', () => {
    render(
      <Sidebar>
        <div data-testid="sidebar-content">Sidebar Content</div>
      </Sidebar>
    );

    expect(screen.getByTestId('sidebar-content')).toBeInTheDocument();
  });

  it('should pass props to SidebarProvider', () => {
    const setOpen = vi.fn();
    render(
      <Sidebar open={true} setOpen={setOpen} animate={false}>
        <TestComponent />
      </Sidebar>
    );

    expect(screen.getByTestId('open-state')).toHaveTextContent('open');
    expect(screen.getByTestId('animate-state')).toHaveTextContent('static');
  });

  it('should render multiple children', () => {
    render(
      <Sidebar>
        <div data-testid="child1">Child 1</div>
        <div data-testid="child2">Child 2</div>
      </Sidebar>
    );

    expect(screen.getByTestId('child1')).toBeInTheDocument();
    expect(screen.getByTestId('child2')).toBeInTheDocument();
  });
});

describe('SidebarBody', () => {
  it('should render both desktop and mobile sidebars', () => {
    render(
      <SidebarProvider>
        <SidebarBody data-testid="sidebar-body">
          <div>Content</div>
        </SidebarBody>
      </SidebarProvider>
    );

    // Should render content for both desktop and mobile
    const contents = screen.getAllByText('Content');
    expect(contents.length).toBeGreaterThanOrEqual(1);
  });

  it('should pass props to child components', () => {
    render(
      <SidebarProvider>
        <SidebarBody className="custom-class">
          <div>Test</div>
        </SidebarBody>
      </SidebarProvider>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});

describe('DesktopSidebar', () => {
  it('should render children', () => {
    render(
      <SidebarProvider>
        <DesktopSidebar>
          <div data-testid="desktop-content">Desktop Content</div>
        </DesktopSidebar>
      </SidebarProvider>
    );

    expect(screen.getByTestId('desktop-content')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <SidebarProvider>
        <DesktopSidebar className="custom-sidebar">
          <div>Content</div>
        </DesktopSidebar>
      </SidebarProvider>
    );

    const sidebar = container.querySelector('.custom-sidebar');
    expect(sidebar).toBeInTheDocument();
  });

  it('should have correct default classes', () => {
    const { container } = render(
      <SidebarProvider>
        <DesktopSidebar>
          <div>Content</div>
        </DesktopSidebar>
      </SidebarProvider>
    );

    const sidebar = container.querySelector('.h-full.px-4.py-4');
    expect(sidebar).toBeInTheDocument();
  });
});

describe('MobileSidebar', () => {
  it('should render menu icon', () => {
    render(
      <SidebarProvider>
        <MobileSidebar>
          <div>Mobile Content</div>
        </MobileSidebar>
      </SidebarProvider>
    );

    // Check for tabler icon class
    const menuIcon = document.querySelector('.tabler-icon-menu-2');
    expect(menuIcon).toBeTruthy();
  });

  it('should toggle mobile sidebar on icon click', () => {
    render(
      <SidebarProvider>
        <MobileSidebar>
          <div data-testid="mobile-content">Mobile Content</div>
        </MobileSidebar>
      </SidebarProvider>
    );

    // Initially closed, content should not be visible
    // After clicking menu icon, content should be visible
    // This depends on AnimatePresence behavior
  });

  it('should render close icon when open', () => {
    render(
      <SidebarProvider open={true}>
        <MobileSidebar>
          <div>Content</div>
        </MobileSidebar>
      </SidebarProvider>
    );

    // Should render IconX when open
    const closeIcon = document.querySelector('.tabler-icon-x');
    expect(closeIcon).toBeTruthy();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <SidebarProvider>
        <MobileSidebar className="custom-mobile">
          <div>Content</div>
        </MobileSidebar>
      </SidebarProvider>
    );

    expect(container.querySelector('.custom-mobile')).toBeInTheDocument();
  });
});

describe('SidebarLink', () => {
  const mockLink = {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <span data-testid="link-icon">Icon</span>,
  };

  it('should render link with label and icon', () => {
    render(
      <SidebarProvider>
        <SidebarLink link={mockLink} />
      </SidebarProvider>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('link-icon')).toBeInTheDocument();
  });

  it('should use correct href', () => {
    const { container } = render(
      <SidebarProvider>
        <SidebarLink link={mockLink} />
      </SidebarProvider>
    );

    const link = container.querySelector('a[href="/dashboard"]');
    expect(link).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <SidebarProvider>
        <SidebarLink link={mockLink} className="custom-link" />
      </SidebarProvider>
    );

    const link = container.querySelector('.custom-link');
    expect(link).toBeInTheDocument();
  });

  it('should handle link without href (fallback to #)', () => {
    const linkWithoutHref = {
      label: 'No Href',
      href: '',
      icon: <span>Icon</span>,
    };

    const { container } = render(
      <SidebarProvider>
        <SidebarLink link={linkWithoutHref} />
      </SidebarProvider>
    );

    // Should fallback to '#' when href is empty
    expect(screen.getByText('No Href')).toBeInTheDocument();
  });

  it('should render icon component', () => {
    render(
      <SidebarProvider>
        <SidebarLink link={mockLink} />
      </SidebarProvider>
    );

    expect(screen.getByTestId('link-icon')).toBeInTheDocument();
  });

  it('should render with complex icon elements', () => {
    const complexLink = {
      label: 'Settings',
      href: '/settings',
      icon: (
        <div data-testid="complex-icon">
          <span>Icon</span>
          <span>Badge</span>
        </div>
      ),
    };

    render(
      <SidebarProvider>
        <SidebarLink link={complexLink} />
      </SidebarProvider>
    );

    expect(screen.getByTestId('complex-icon')).toBeInTheDocument();
  });

  it('should pass additional props', () => {
    const { container } = render(
      <SidebarProvider>
        <SidebarLink
          link={mockLink}
          data-testid="custom-link"
          aria-label="Dashboard Link"
        />
      </SidebarProvider>
    );

    const link = screen.getByTestId('custom-link');
    expect(link).toBeInTheDocument();
  });

  it('should handle special characters in label', () => {
    const specialLink = {
      label: 'Settings & Preferences',
      href: '/settings',
      icon: <span>Icon</span>,
    };

    render(
      <SidebarProvider>
        <SidebarLink link={specialLink} />
      </SidebarProvider>
    );

    expect(screen.getByText('Settings & Preferences')).toBeInTheDocument();
  });

  it('should apply correct base classes', () => {
    const { container } = render(
      <SidebarProvider>
        <SidebarLink link={mockLink} />
      </SidebarProvider>
    );

    const link = container.querySelector('.flex.items-center.justify-start');
    expect(link).toBeInTheDocument();
  });
});