import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '@/src/app/api/sign-out/route';
import { NextRequest, NextResponse } from 'next/server';

// Mock auth module
const mockSignOut = vi.fn();
vi.mock('@/src/lib/auth', () => ({
  auth: {
    api: {
      signOut: mockSignOut,
    },
  },
}));

// Mock next/headers
const mockHeaders = vi.fn();
vi.mock('next/headers', () => ({
  headers: mockHeaders,
}));

describe('Sign Out API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockHeaders.mockResolvedValue(new Headers());
  });

  it('should call auth.api.signOut with headers', async () => {
    const mockRequest = new NextRequest('http://localhost:3000/api/sign-out');
    mockSignOut.mockResolvedValue(undefined);

    await GET(mockRequest);

    expect(mockSignOut).toHaveBeenCalledTimes(1);
    expect(mockSignOut).toHaveBeenCalledWith({
      headers: expect.any(Headers),
    });
  });

  it('should redirect to /login after sign out', async () => {
    const mockRequest = new NextRequest('http://localhost:3000/api/sign-out');
    mockSignOut.mockResolvedValue(undefined);

    const response = await GET(mockRequest);

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(307); // Temporary redirect
    expect(response.headers.get('location')).toContain('/login');
  });

  it('should redirect to correct login URL with different base URLs', async () => {
    const mockRequest = new NextRequest('https://example.com/api/sign-out');
    mockSignOut.mockResolvedValue(undefined);

    const response = await GET(mockRequest);

    expect(response.headers.get('location')).toBe('https://example.com/login');
  });

  it('should handle signOut errors gracefully', async () => {
    const mockRequest = new NextRequest('http://localhost:3000/api/sign-out');
    const error = new Error('Sign out failed');
    mockSignOut.mockRejectedValue(error);

    await expect(GET(mockRequest)).rejects.toThrow('Sign out failed');
  });

  it('should await headers() before passing to signOut', async () => {
    const mockRequest = new NextRequest('http://localhost:3000/api/sign-out');
    const testHeaders = new Headers({ 'x-test': 'value' });
    mockHeaders.mockResolvedValue(testHeaders);
    mockSignOut.mockResolvedValue(undefined);

    await GET(mockRequest);

    expect(mockHeaders).toHaveBeenCalledTimes(1);
    expect(mockSignOut).toHaveBeenCalledWith({
      headers: testHeaders,
    });
  });

  it('should handle requests with query parameters', async () => {
    const mockRequest = new NextRequest(
      'http://localhost:3000/api/sign-out?redirect=/dashboard'
    );
    mockSignOut.mockResolvedValue(undefined);

    const response = await GET(mockRequest);

    // Should still redirect to /login regardless of query params
    expect(response.headers.get('location')).toBe('http://localhost:3000/login');
  });

  it('should preserve protocol in redirect URL', async () => {
    const httpsRequest = new NextRequest('https://secure.example.com/api/sign-out');
    mockSignOut.mockResolvedValue(undefined);

    const response = await GET(httpsRequest);

    expect(response.headers.get('location')).toBe('https://secure.example.com/login');
  });

  it('should preserve port in redirect URL', async () => {
    const mockRequest = new NextRequest('http://localhost:3001/api/sign-out');
    mockSignOut.mockResolvedValue(undefined);

    const response = await GET(mockRequest);

    expect(response.headers.get('location')).toBe('http://localhost:3001/login');
  });

  it('should handle subdomain URLs correctly', async () => {
    const mockRequest = new NextRequest('https://app.example.com/api/sign-out');
    mockSignOut.mockResolvedValue(undefined);

    const response = await GET(mockRequest);

    expect(response.headers.get('location')).toBe('https://app.example.com/login');
  });

  it('should create proper NextRequest instance', async () => {
    const mockRequest = new NextRequest('http://localhost:3000/api/sign-out');
    
    expect(mockRequest).toBeInstanceOf(NextRequest);
    expect(mockRequest.url).toBe('http://localhost:3000/api/sign-out');
  });

  it('should handle different HTTP methods (GET only)', async () => {
    const mockRequest = new NextRequest('http://localhost:3000/api/sign-out', {
      method: 'GET',
    });
    mockSignOut.mockResolvedValue(undefined);

    const response = await GET(mockRequest);

    expect(response).toBeInstanceOf(NextResponse);
  });

  it('should return NextResponse.redirect instance', async () => {
    const mockRequest = new NextRequest('http://localhost:3000/api/sign-out');
    mockSignOut.mockResolvedValue(undefined);

    const response = await GET(mockRequest);

    expect(response).toBeInstanceOf(Response);
    expect(response.headers.has('location')).toBe(true);
  });

  it('should await signOut before redirecting', async () => {
    const mockRequest = new NextRequest('http://localhost:3000/api/sign-out');
    let signOutCompleted = false;
    
    mockSignOut.mockImplementation(async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
      signOutCompleted = true;
    });

    await GET(mockRequest);

    expect(signOutCompleted).toBe(true);
  });

  it('should handle complex URLs with paths', async () => {
    const mockRequest = new NextRequest(
      'http://localhost:3000/api/sign-out?from=/dashboard/settings'
    );
    mockSignOut.mockResolvedValue(undefined);

    const response = await GET(mockRequest);

    expect(response.headers.get('location')).toBe('http://localhost:3000/login');
  });

  it('should call headers function', async () => {
    const mockRequest = new NextRequest('http://localhost:3000/api/sign-out');
    mockSignOut.mockResolvedValue(undefined);

    await GET(mockRequest);

    expect(mockHeaders).toHaveBeenCalled();
  });

  it('should handle empty headers', async () => {
    const mockRequest = new NextRequest('http://localhost:3000/api/sign-out');
    mockHeaders.mockResolvedValue(new Headers());
    mockSignOut.mockResolvedValue(undefined);

    const response = await GET(mockRequest);

    expect(response).toBeInstanceOf(NextResponse);
    expect(mockSignOut).toHaveBeenCalledWith({
      headers: expect.any(Headers),
    });
  });

  it('should handle headers with custom values', async () => {
    const mockRequest = new NextRequest('http://localhost:3000/api/sign-out');
    const customHeaders = new Headers({
      'Authorization': 'Bearer token123',
      'X-Custom-Header': 'value',
    });
    mockHeaders.mockResolvedValue(customHeaders);
    mockSignOut.mockResolvedValue(undefined);

    await GET(mockRequest);

    expect(mockSignOut).toHaveBeenCalledWith({
      headers: customHeaders,
    });
  });
});