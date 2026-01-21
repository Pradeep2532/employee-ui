export const wizardSteps = [
  "basic-info",
  "employment",
  "contacts",
  "addresses",
  "bank-accounts",
] as const;

export type WizardStep = typeof wizardSteps[number];

export function getNextStep(current: WizardStep) {
  const index = wizardSteps.indexOf(current);
  return wizardSteps[index + 1] || null;
}

export function getPrevStep(current: WizardStep) {
  const index = wizardSteps.indexOf(current);
  return wizardSteps[index - 1] || null;
}
