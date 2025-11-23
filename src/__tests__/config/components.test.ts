import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('components.json configuration', () => {
  let config: any;

  beforeAll(() => {
    const configPath = join(process.cwd(), 'components.json');
    const configContent = readFileSync(configPath, 'utf-8');
    config = JSON.parse(configContent);
  });

  it('should have valid JSON structure', () => {
    expect(config).toBeDefined();
    expect(typeof config).toBe('object');
  });

  it('should have correct schema version', () => {
    expect(config.$schema).toBe('https://ui.shadcn.com/schema.json');
  });

  it('should have style configuration', () => {
    expect(config.style).toBe('new-york');
  });

  it('should have rsc enabled', () => {
    expect(config.rsc).toBe(true);
  });

  it('should have tsx enabled', () => {
    expect(config.tsx).toBe(true);
  });

  it('should have correct tailwind configuration', () => {
    expect(config.tailwind).toEqual({
      config: 'tailwind.config.ts',
      css: 'src/app/globals.css',
      baseColor: 'neutral',
      cssVariables: true,
      prefix: '',
    });
  });

  it('should have lucide as icon library', () => {
    expect(config.iconLibrary).toBe('lucide');
  });

  it('should have correct aliases', () => {
    expect(config.aliases).toEqual({
      components: '@/src/components',
      utils: '@/src/lib/utils',
      ui: '@/src/components/ui',
      lib: '@/src/lib',
      hooks: '@/src/hooks',
    });
  });

  it('should have utils alias pointing to lib/utils', () => {
    expect(config.aliases.utils).toBe('@/src/lib/utils');
  });

  it('should have aceternity registry configured', () => {
    expect(config.registries).toHaveProperty('@aceternity');
    expect(config.registries['@aceternity']).toBe(
      'https://ui.aceternity.com/registry/{name}.json'
    );
  });

  it('should have all required alias keys', () => {
    const requiredKeys = ['components', 'utils', 'ui', 'lib', 'hooks'];
    requiredKeys.forEach(key => {
      expect(config.aliases).toHaveProperty(key);
    });
  });

  it('should use @ prefix for all aliases', () => {
    Object.values(config.aliases).forEach((alias: any) => {
      expect(alias).toMatch(/^@\//);
    });
  });
});