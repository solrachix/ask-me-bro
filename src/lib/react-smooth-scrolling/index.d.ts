import React from 'react'
interface SmoothProviderProps {
  /**
   * Default ease is `0.1`. More ease means more stiffness.
   */
  ease?: number
  /**
   * Enable distortion
   */
  skew: boolean
}
export declare const SmoothProvider: React.FC<SmoothProviderProps>
export {}
