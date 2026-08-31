export const featureFlags = {
  enableNewDashboard: false,
  enableExperimentalUI: false,
  enableAnalytics: true,
} as const;
export type FeatureFlags = typeof featureFlags;
