export function saveDraft(step: string, data: any) {
  try {
    localStorage.setItem(`draft-${step}`, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to save draft for ${step}:`, error);
    if (error instanceof Error) {
      if (error.name === 'QuotaExceededError') {
        console.warn('localStorage quota exceeded');
      }
    }
  }
}

export function loadDraft(step: string) {
  try {
    const raw = localStorage.getItem(`draft-${step}`);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error(`Failed to load draft for ${step}:`, error);
    return null;
  }
}
