import {InjectionToken} from "@angular/core";
import {ActionReducerMap, createFeatureSelector, MetaReducer} from "@ngrx/store";
// import {storageSync} from 'ngrx-store-capacitor';
import * as fromAuth from './auth.reducer';
import {featureKey} from './auth.reducer';
import {environment} from "../../environments/environment";
import {storeFreeze} from "ngrx-store-freeze";

export interface State {
  [fromAuth.featureKey]: fromAuth.State
}

export function onSyncError(err: any) {
  console.log(err);
}

/*export const storageSyncReducer = storageSync({
  keys: [fromAuth.featureKey],
  ignoreActions: [], // Don't sync when these actions occur,
  hydratedStateKey: 'hydrated', // Add this key to the state
  onSyncError: onSyncError      // If a sync fails
});

export function storageMetaReducer(reducer: ActionReducer<any>): ActionReducer<any, any> {
  return storageSyncReducer(reducer);
}*/

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State>>(
  'Root reducers token', {
    factory: (): ActionReducerMap<State> => ({
      [fromAuth.featureKey]: fromAuth.reducer
    })
  }
);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];
