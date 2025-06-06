import { useFeatureFlag } from '../composables/useFeatureFlag'
import { defineNuxtRouteMiddleware, showError } from '#app'

/**
 * Creates a route-level middleware that blocks access to the route
 * if the specified feature flag is not enabled.
 *
 * Can be used in `definePageMeta()` or manually via named middleware.
 *
 * @param flag - The name of the feature flag required for this route.
 * @returns A Nuxt route middleware that triggers a 404 if the feature is disabled.
 *
 * @example
 * ```ts
 * definePageMeta({
 *   middleware: ['feature-beta-ui']
 * })
 * ```
 */
export const defineFeatureFlagMiddleware = (flag: string) => {
  return defineNuxtRouteMiddleware(() => {
    const { isEnabled } = useFeatureFlag()
    if (!isEnabled(flag)) {
      return showError({ statusCode: 404, statusMessage: 'Feature not available' })
    }
  })
}
