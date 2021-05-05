import { InjectionToken } from '@angular/core';

export const LS_PREFIX = new InjectionToken<string>('lsPrefix', {
  providedIn: 'root',
  factory: () => '',
});
