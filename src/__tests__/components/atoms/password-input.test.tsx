import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PasswordInput from '@/src/components/atoms/password-input';

// Mock the input-group components
vi.mock('@/src/components/ui/input-group', () => ({
  InputGroup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="input-group">{children}</div>
  ),
  InputGroupInput: ({ type, ...props }: React.ComponentProps<'input'>) => (
    <input type={type} data-testid="password-input" {...props} />
  ),
  InputGroupButton: ({
    children,
    onClick,
    ...props
  }: React.ComponentProps<'button'>) => (
    <button onClick={onClick} data-testid="toggle-button" {...props}>
      {children}
    </button>
  ),
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  EyeIcon: () => <span data-testid="eye-icon">Eye</span>,
  EyeOffIcon: () => <span data-testid="eye-off-icon">EyeOff</span>,
}));

describe('PasswordInput', () => {
  it('should render with password type by default', () => {
    render(<PasswordInput />);
    const input = screen.getByTestId('password-input');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('should toggle password visibility when button is clicked', () => {
    render(<PasswordInput />);
    const input = screen.getByTestId('password-input');
    const toggleButton = screen.getByTestId('toggle-button');

    // Initially password type
    expect(input).toHaveAttribute('type', 'password');
    expect(screen.getByTestId('eye-icon')).toBeInTheDocument();

    // Click to show password
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByTestId('eye-off-icon')).toBeInTheDocument();

    // Click to hide password again
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
    expect(screen.getByTestId('eye-icon')).toBeInTheDocument();
  });

  it('should display EyeIcon when password is hidden', () => {
    render(<PasswordInput />);
    expect(screen.getByTestId('eye-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('eye-off-icon')).not.toBeInTheDocument();
  });

  it('should display EyeOffIcon when password is visible', () => {
    render(<PasswordInput />);
    const toggleButton = screen.getByTestId('toggle-button');
    
    fireEvent.click(toggleButton);
    
    expect(screen.getByTestId('eye-off-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('eye-icon')).not.toBeInTheDocument();
  });

  it('should accept and forward all input props', () => {
    const handleChange = vi.fn();
    render(
      <PasswordInput
        placeholder="Enter password"
        onChange={handleChange}
        name="password"
        required
        autoComplete="current-password"
      />
    );
    
    const input = screen.getByTestId('password-input');
    expect(input).toHaveAttribute('placeholder', 'Enter password');
    expect(input).toHaveAttribute('name', 'password');
    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('autocomplete', 'current-password');
    
    fireEvent.change(input, { target: { value: 'test123' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should allow typing in the input field', () => {
    render(<PasswordInput />);
    const input = screen.getByTestId('password-input') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'mySecurePassword123' } });
    expect(input.value).toBe('mySecurePassword123');
  });

  it('should maintain input value when toggling visibility', () => {
    render(<PasswordInput />);
    const input = screen.getByTestId('password-input') as HTMLInputElement;
    const toggleButton = screen.getByTestId('toggle-button');
    
    // Type password
    fireEvent.change(input, { target: { value: 'secretPassword' } });
    expect(input.value).toBe('secretPassword');
    
    // Toggle visibility
    fireEvent.click(toggleButton);
    expect(input.value).toBe('secretPassword');
    expect(input).toHaveAttribute('type', 'text');
    
    // Toggle back
    fireEvent.click(toggleButton);
    expect(input.value).toBe('secretPassword');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('should handle disabled state', () => {
    render(<PasswordInput disabled />);
    const input = screen.getByTestId('password-input');
    expect(input).toBeDisabled();
  });

  it('should handle readOnly state', () => {
    render(<PasswordInput readOnly value="readonly-password" />);
    const input = screen.getByTestId('password-input');
    expect(input).toHaveAttribute('readonly');
  });

  it('should support custom className through props', () => {
    render(<PasswordInput className="custom-class" />);
    const input = screen.getByTestId('password-input');
    expect(input).toHaveClass('custom-class');
  });

  it('should handle multiple rapid toggle clicks', () => {
    render(<PasswordInput />);
    const input = screen.getByTestId('password-input');
    const toggleButton = screen.getByTestId('toggle-button');
    
    expect(input).toHaveAttribute('type', 'password');
    
    // Rapid clicks
    fireEvent.click(toggleButton);
    fireEvent.click(toggleButton);
    fireEvent.click(toggleButton);
    fireEvent.click(toggleButton);
    fireEvent.click(toggleButton);
    
    // Should end up in text mode (5 clicks, odd number)
    expect(input).toHaveAttribute('type', 'password');
  });

  it('should support maxLength attribute', () => {
    render(<PasswordInput maxLength={20} />);
    const input = screen.getByTestId('password-input');
    expect(input).toHaveAttribute('maxLength', '20');
  });

  it('should support minLength attribute', () => {
    render(<PasswordInput minLength={8} />);
    const input = screen.getByTestId('password-input');
    expect(input).toHaveAttribute('minLength', '8');
  });

  it('should support pattern attribute for validation', () => {
    render(<PasswordInput pattern="[A-Za-z0-9]+" />);
    const input = screen.getByTestId('password-input');
    expect(input).toHaveAttribute('pattern', '[A-Za-z0-9]+');
  });
});