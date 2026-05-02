import { describe, it, expect } from 'vitest';
import { buildEciKnowledgeBase } from './eci-rules';

describe('buildEciKnowledgeBase', () => {
  it('returns formatted rules based on role and active step', () => {
    const rules = buildEciKnowledgeBase('voter', { label: 'enrollment' });
    
    // Should include the form 6 rule
    expect(rules).toContain('Form 6');
    expect(rules).toContain('Rule');
    expect(typeof rules).toBe('string');
  });

  it('returns default rules when no specific match is found', () => {
    const rules = buildEciKnowledgeBase('randomRole', { label: 'unknown' });
    
    // Should return a default set of rules
    expect(rules).toContain('Rule 1');
    expect(rules).toContain('Rule 2');
    expect(rules).toContain('Rule 3');
    expect(rules).toContain('Rule 4');
    expect(rules).toContain('Rule 5');
  });
});
