import {InjectionToken} from "@angular/core";
import {Action, ActionReducerMap, MetaReducer} from "@ngrx/store";
import {environment} from "../../environments/environment";
import {storeFreeze} from "ngrx-store-freeze";

import * as fromAuth from './auth.reducer';

export interface State {
  [fromAuth.featureKey]: fromAuth.State
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State, Action>>(
  'Root reducers token', {
    factory: (): ActionReducerMap<State, Action> => ({
      [fromAuth.featureKey]: fromAuth.reducer
    })
  }
);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];
