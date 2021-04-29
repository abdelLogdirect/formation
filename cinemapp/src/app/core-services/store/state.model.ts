import { Reservation } from '@core/reservations';

/**
 * Full description of the state object.
 * **Be sure to have a *core* service** (ie. injected in the `AppComponent`)
 * **where you initialize the value** (ie. in the service's constructor)
 * (otherwise when listening to this property, the observable could hang on forever).
 */
export interface State {
  reservations: Reservation[];
  reservationsCount: number;
}
