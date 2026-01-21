export type StepKey =
  | "basic-info"
  | "employment"
  | "contacts"
  | "addresses"
  | "bank-accounts";

const stepOrder: StepKey[] = [
  "basic-info",
  "employment",
  "contacts",
  "addresses",
  "bank-accounts",
];

export function completeStep(step: StepKey) {
  const index = stepOrder.indexOf(step);
  localStorage.setItem("completedStep", String(index + 1));
}

export function canAccessStep(step: StepKey) {
  const savedIndex = Number(localStorage.getItem("completedStep") || 0);
  const index = stepOrder.indexOf(step);
  return index <= savedIndex;
}
