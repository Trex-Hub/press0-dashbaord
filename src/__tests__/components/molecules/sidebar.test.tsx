import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Sidebar, { Logo } from '@/src/components/molecules/sidebar';

// Mock useSession hook
const mockUseSession = vi.fn();
vi.mock('@/src/lib/auth-client', () => ({
  useSession: () => mockUseSession(),
}));

// Mock UI components
vi.mock('@/src/components/ui/sidebar', () => ({
  Sidebar: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="root-sidebar">{children}</div>
  ),
  SidebarBody: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-body">{children}</div>
  ),
  SidebarLink: ({ link }: { link: any }) => (
    <a href={link.href} data-testid="sidebar-link">
      {link.label}
    </a>
  ),
}));

// Mock Avatar components
vi.mock('@/src/components/ui/avatar', () => ({
  Avatar: ({ children, className }: any) => (
    <div data-testid="avatar" className={className}>
      {children}
    </div>
  ),
  AvatarImage: ({ src }: { src: string }) => (
    <img data-testid="avatar-image" src={src} alt="" />
  ),
  AvatarFallback: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="avatar-fallback">{children}</div>
  ),
}));

// Mock sidebar items
vi.mock('@/src/utils/sidebar-items', () => ({
  sidebarItems: [
    { label: 'Dashboard', href: '/dashboard', icon: <span>Icon1</span> },
    { label: 'Chats', href: '/chats', icon: <span>Icon2</span> },
    { label: 'Logout', href: '/api/sign-out', icon: <span>Icon3</span> },
  ],
}));

// Mock Next Link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('Sidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: 'John Doe', image: 'avatar.jpg' } },
    });

    render(<Sidebar />);
    expect(screen.getByTestId('root-sidebar')).toBeInTheDocument();
  });

  it('should render sidebar with user session data', () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: 'Jane Smith', image: 'jane.jpg' } },
    });

    render(<Sidebar />);
    
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-image')).toHaveAttribute('src', 'jane.jpg');
  });

  it('should render user avatar with fallback when no image', () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: 'John Doe', image: null } },
    });

    render(<Sidebar />);
    
    expect(screen.getByTestId('avatar-fallback')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-fallback')).toHaveTextContent('J');
  });

  it('should handle missing user data gracefully', () => {
    mockUseSession.mockReturnValue({
      data: null,
    });

    render(<Sidebar />);
    expect(screen.getByTestId('root-sidebar')).toBeInTheDocument();
  });

  it('should handle undefined session data', () => {
    mockUseSession.mockReturnValue({
      data: undefined,
    });

    render(<Sidebar />);
    expect(screen.getByTestId('root-sidebar')).toBeInTheDocument();
  });

  it('should render all sidebar items', () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: 'Test User', image: 'test.jpg' } },
    });

    render(<Sidebar />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Chats')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('should render Logo component', () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: 'Test User', image: 'test.jpg' } },
    });

    render(<Sidebar />);
    expect(screen.getByText('Press0')).toBeInTheDocument();
  });

  it('should handle empty user name', () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: '', image: 'test.jpg' } },
    });

    render(<Sidebar />);
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('should handle null user name', () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: null, image: 'test.jpg' } },
    });

    render(<Sidebar />);
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('should extract first character for avatar fallback', () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: 'Alice', image: null } },
    });

    render(<Sidebar />);
    expect(screen.getByTestId('avatar-fallback')).toHaveTextContent('A');
  });

  it('should handle multi-word names in avatar fallback', () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: 'John Doe Smith', image: null } },
    });

    render(<Sidebar />);
    expect(screen.getByTestId('avatar-fallback')).toHaveTextContent('J');
  });

  it('should render with empty image string', () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: 'Test User', image: '' } },
    });

    render(<Sidebar />);
    expect(screen.getByTestId('avatar-image')).toHaveAttribute('src', '');
  });

  it('should apply correct CSS classes to avatar', () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: 'Test User', image: 'test.jpg' } },
    });

    render(<Sidebar />);
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('size-8');
    expect(avatar).toHaveClass('border');
  });
});

describe('Logo', () => {
  it('should render Logo component', () => {
    render(<Logo />);
    expect(screen.getByText('Press0')).toBeInTheDocument();
  });

  it('should render as a link', () => {
    const { container } = render(<Logo />);
    const link = container.querySelector('a[href="#"]');
    expect(link).toBeInTheDocument();
  });

  it('should have correct link structure', () => {
    render(<Logo />);
    const logoText = screen.getByText('Press0');
    expect(logoText).toBeInTheDocument();
  });

  it('should render logo icon div', () => {
    const { container } = render(<Logo />);
    const logoIcon = container.querySelector('.h-5.w-6');
    expect(logoIcon).toBeInTheDocument();
  });

  it('should apply correct CSS classes', () => {
    const { container } = render(<Logo />);
    const link = container.querySelector('a');
    expect(link).toHaveClass('relative');
    expect(link).toHaveClass('z-20');
    expect(link).toHaveClass('flex');
    expect(link).toHaveClass('items-center');
  });
});