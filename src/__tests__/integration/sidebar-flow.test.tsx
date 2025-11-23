import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ApplicationLayout from '@/src/app/(application)/layout';

// Mock all dependencies
const mockUseSession = vi.fn();
vi.mock('@/src/lib/auth-client', () => ({
  useSession: () => mockUseSession(),
}));

vi.mock('@/src/utils/sidebar-items', () => ({
  sidebarItems: [
    { label: 'Dashboard', href: '/dashboard', icon: <span>📊</span> },
    { label: 'Logout', href: '/api/sign-out', icon: <span>🚪</span> },
  ],
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('Sidebar Integration Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSession.mockReturnValue({
      data: {
        user: {
          name: 'Integration Test User',
          image: 'test-avatar.jpg',
        },
      },
    });
  });

  it('should render complete application layout with sidebar', () => {
    render(
      <ApplicationLayout>
        <div data-testid="page-content">Dashboard Page</div>
      </ApplicationLayout>
    );

    expect(screen.getByTestId('page-content')).toBeInTheDocument();
    expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
  });

  it('should display user information in sidebar', () => {
    render(
      <ApplicationLayout>
        <div>Content</div>
      </ApplicationLayout>
    );

    expect(screen.getByText('Integration Test User')).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(
      <ApplicationLayout>
        <div>Content</div>
      </ApplicationLayout>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('should render logo in sidebar', () => {
    render(
      <ApplicationLayout>
        <div>Content</div>
      </ApplicationLayout>
    );

    expect(screen.getByText('Press0')).toBeInTheDocument();
  });

  it('should handle user without image', () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          name: 'No Image User',
          image: null,
        },
      },
    });

    render(
      <ApplicationLayout>
        <div>Content</div>
      </ApplicationLayout>
    );

    expect(screen.getByText('No Image User')).toBeInTheDocument();
  });
});