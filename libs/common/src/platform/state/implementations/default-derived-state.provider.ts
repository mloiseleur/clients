import { Observable } from "rxjs";

import {
  AbstractStorageService,
  ObservableStorageService,
} from "../../abstractions/storage.service";
import { DeriveDefinition } from "../derive-definition";
import { DerivedState } from "../derived-state";
import { DerivedStateProvider } from "../derived-state.provider";

import { DefaultDerivedState } from "./default-derived-state";

export class DefaultDerivedStateProvider implements DerivedStateProvider {
  private cache: Record<string, DerivedState<unknown>> = {};

  constructor(private memoryStorage: AbstractStorageService & ObservableStorageService) {}

  get<TFrom, TTo, TDeps extends Record<string, Type<unknown>>>(
    parentState$: Observable<TFrom>,
    deriveDefinition: DeriveDefinition<TFrom, TTo, TDeps>,
    dependencies: ShapeToInstances<TDeps>,
  ): DerivedState<TTo> {
    const cacheKey = deriveDefinition.buildCacheKey();
    const existingDerivedState = this.cache[cacheKey];
    if (existingDerivedState != null) {
      // I have to cast out of the unknown generic but this should be safe if rules
      // around domain token are made
      return existingDerivedState as DefaultDerivedState<TFrom, TTo, TDeps>;
    }

    const newDerivedState = this.buildDerivedState(parentState$, deriveDefinition, dependencies);
    this.cache[cacheKey] = newDerivedState;
    return newDerivedState;
  }

  protected buildDerivedState<TFrom, TTo, TDeps extends Record<string, Type<unknown>>>(
    parentState$: Observable<TFrom>,
    deriveDefinition: DeriveDefinition<TFrom, TTo, TDeps>,
    dependencies: ShapeToInstances<TDeps>,
  ): DerivedState<TTo> {
    return new DefaultDerivedState<TFrom, TTo, TDeps>(
      parentState$,
      deriveDefinition,
      this.memoryStorage,
      dependencies,
    );
  }
}
