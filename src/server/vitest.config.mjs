import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    strictTags: false,

    projects: [
      {
        test: {
          name: 'test_auth_register',
          globals: true,
          strictTags: false,
          include: [
            'tests/config/googleAuth.strategy.spec.mjs',
            'tests/services/register.service.spec.mjs',
            'tests/services/verifyEmail.service.spec.mjs',
            'tests/services/resendVerification.service.spec.mjs',
            'tests/controllers/register.controller.spec.mjs',
            'tests/controllers/verifyEmail.controller.spec.mjs',
            'tests/controllers/resendVerification.controller.spec.mjs',
            'tests/controllers/googleAuth.controller.spec.mjs',
            'tests/integration/register.api.spec.mjs',
            'tests/integration/verifyEmail.api.spec.mjs',
            'tests/integration/resendVerification.api.spec.mjs',
            'tests/integration/googleAuth.api.spec.mjs',
          ],
          tags: [
            { name: '@A_R1', description: 'Successful End-to-End Registration (Register → Verify → JWT Issued)' },
            { name: '@A_R2', description: 'Reject Duplicate Email Across Entry Points' },
            { name: '@A_R3', description: 'Pending-Registration and Verification-Token TTL Lifecycle' },
            { name: '@A_R4', description: 'Resend Verification Email (TTL Refresh & Re-use)' },
            { name: '@A_R5', description: 'Google OAuth First-Time Sign-In (Auto-Provisioning)' },
            { name: '@A_R6', description: 'Google OAuth Returning User' },
            { name: '@A_R7', description: 'Security and Data-Shape Invariants Across All Flows' },
            { name: '@A_R8', description: 'Infrastructure Failure Handling' },
            { name: '@A_R9', description: 'Transactional Consistency & Boundaries' },
            { name: '@A_R10', description: 'HTTP Response and Redirect Matrix Mapping' },
          ],
        },
      },

      {
        test: {
          name: 'test_admin_statistics',
          globals: true,
          strictTags: false,
          include: [
            'tests/services/statistics.service.spec.mjs',
            'tests/services/top_categories.service.spec.mjs',
          ],
        },
      },
    ],

    api: {
      host: '127.0.0.1',
      port: 8080,
    },
  },
});
