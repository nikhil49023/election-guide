import { describe, it, expect } from 'vitest';
import { JOURNEY_DATA } from './journey-data';

describe('Journey Data', () => {
  it('should have english and hindi translations', () => {
    expect(JOURNEY_DATA).toHaveProperty('en');
    expect(JOURNEY_DATA).toHaveProperty('hi');
  });

  it('should have data for all roles in English', () => {
    expect(JOURNEY_DATA.en.roles).toHaveProperty('voter');
    expect(JOURNEY_DATA.en.roles).toHaveProperty('candidate');
    expect(JOURNEY_DATA.en.roles).toHaveProperty('volunteer');
    expect(JOURNEY_DATA.en.roles).toHaveProperty('observer');
  });

  it('should have valid steps for a voter in English', () => {
    const voterStepsEn = JOURNEY_DATA.en.roles.voter.steps;
    expect(voterStepsEn.length).toBeGreaterThan(0);
    expect(voterStepsEn[0]).toHaveProperty('id');
    expect(voterStepsEn[0]).toHaveProperty('label');
    expect(voterStepsEn[0]).toHaveProperty('detailedExplanation');
  });
});
