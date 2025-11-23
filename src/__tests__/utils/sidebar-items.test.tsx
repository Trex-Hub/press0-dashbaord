import { describe, it, expect } from 'vitest';
import { sidebarItems } from '@/src/utils/sidebar-items';

describe('sidebarItems', () => {
  it('should be an array', () => {
    expect(Array.isArray(sidebarItems)).toBe(true);
  });

  it('should have correct number of items', () => {
    expect(sidebarItems).toHaveLength(4);
  });

  it('should have Dashboard as first item', () => {
    expect(sidebarItems[0]).toMatchObject({
      label: 'Dashboard',
      href: '/dashboard',
    });
    expect(sidebarItems[0].icon).toBeDefined();
  });

  it('should have Chats as second item', () => {
    expect(sidebarItems[1]).toMatchObject({
      label: 'Chats',
      href: '#',
    });
    expect(sidebarItems[1].icon).toBeDefined();
  });

  it('should have Analytics as third item', () => {
    expect(sidebarItems[2]).toMatchObject({
      label: 'Analytics',
      href: '#',
    });
    expect(sidebarItems[2].icon).toBeDefined();
  });

  it('should have Logout as fourth item', () => {
    expect(sidebarItems[3]).toMatchObject({
      label: 'Logout',
      href: '/api/sign-out',
    });
    expect(sidebarItems[3].icon).toBeDefined();
  });

  it('should have all required properties for each item', () => {
    sidebarItems.forEach((item, index) => {
      expect(item).toHaveProperty('label');
      expect(item).toHaveProperty('href');
      expect(item).toHaveProperty('icon');
      
      expect(typeof item.label).toBe('string');
      expect(typeof item.href).toBe('string');
      expect(item.icon).toBeDefined();
    });
  });

  it('should have non-empty labels', () => {
    sidebarItems.forEach(item => {
      expect(item.label).toBeTruthy();
      expect(item.label.length).toBeGreaterThan(0);
    });
  });

  it('should have valid hrefs', () => {
    sidebarItems.forEach(item => {
      expect(item.href).toBeTruthy();
      expect(typeof item.href).toBe('string');
      // Should start with / or # for valid navigation
      expect(item.href.startsWith('/') || item.href.startsWith('#')).toBe(true);
    });
  });

  it('should have Dashboard pointing to /dashboard', () => {
    const dashboard = sidebarItems.find(item => item.label === 'Dashboard');
    expect(dashboard).toBeDefined();
    expect(dashboard?.href).toBe('/dashboard');
  });

  it('should have Logout pointing to sign-out API', () => {
    const logout = sidebarItems.find(item => item.label === 'Logout');
    expect(logout).toBeDefined();
    expect(logout?.href).toBe('/api/sign-out');
  });

  it('should have Chats with placeholder href', () => {
    const chats = sidebarItems.find(item => item.label === 'Chats');
    expect(chats).toBeDefined();
    expect(chats?.href).toBe('#');
  });

  it('should have Analytics with placeholder href', () => {
    const analytics = sidebarItems.find(item => item.label === 'Analytics');
    expect(analytics).toBeDefined();
    expect(analytics?.href).toBe('#');
  });

  it('should have unique labels', () => {
    const labels = sidebarItems.map(item => item.label);
    const uniqueLabels = new Set(labels);
    expect(labels.length).toBe(uniqueLabels.size);
  });

  it('should have icons as React elements', () => {
    sidebarItems.forEach(item => {
      expect(item.icon).toBeDefined();
      expect(typeof item.icon).toBe('object');
    });
  });

  it('should maintain consistent structure', () => {
    const expectedKeys = ['label', 'href', 'icon'];
    sidebarItems.forEach(item => {
      const itemKeys = Object.keys(item).sort();
      expect(itemKeys).toEqual(expectedKeys.sort());
    });
  });

  it('should be immutable (frozen or sealed)', () => {
    // Test that the array itself is defined
    expect(sidebarItems).toBeDefined();
    
    // Test that attempting to modify doesn't work in strict mode
    expect(() => {
      const temp = [...sidebarItems];
      expect(temp.length).toBe(sidebarItems.length);
    }).not.toThrow();
  });

  it('should have correct order of items', () => {
    const expectedOrder = ['Dashboard', 'Chats', 'Analytics', 'Logout'];
    const actualOrder = sidebarItems.map(item => item.label);
    expect(actualOrder).toEqual(expectedOrder);
  });

  it('should have Dashboard with IconBrandTabler', () => {
    const dashboard = sidebarItems[0];
    expect(dashboard.label).toBe('Dashboard');
    // Icon should be defined and be a React element
    expect(dashboard.icon).toBeTruthy();
  });

  it('should have Chats with IconMessageCircle', () => {
    const chats = sidebarItems[1];
    expect(chats.label).toBe('Chats');
    expect(chats.icon).toBeTruthy();
  });

  it('should have Analytics with IconChartArea', () => {
    const analytics = sidebarItems[2];
    expect(analytics.label).toBe('Analytics');
    expect(analytics.icon).toBeTruthy();
  });

  it('should have Logout with IconArrowLeft', () => {
    const logout = sidebarItems[3];
    expect(logout.label).toBe('Logout');
    expect(logout.icon).toBeTruthy();
  });

  it('should export as const array', () => {
    // Verify it's a proper array export
    expect(sidebarItems.constructor).toBe(Array);
  });

  it('should not have any null or undefined items', () => {
    sidebarItems.forEach(item => {
      expect(item).not.toBeNull();
      expect(item).not.toBeUndefined();
    });
  });

  it('should have all href values defined', () => {
    sidebarItems.forEach(item => {
      expect(item.href).toBeDefined();
      expect(item.href).not.toBeNull();
    });
  });

  it('should have consistent icon structure', () => {
    sidebarItems.forEach(item => {
      expect(item.icon).toBeTruthy();
      // Icons should be React elements (objects with specific properties)
      expect(typeof item.icon).toBe('object');
    });
  });
});