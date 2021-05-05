import { ModuleWithProviders, NgModule } from '@angular/core';
import { LocalStorageComponent } from './local-storage.component';
import { LS_PREFIX } from './tokens';

export interface LocalStorageConfig {
  prefix: string;
}

@NgModule({})
export class LocalStorageModule {

  static forRoot(config?: LocalStorageConfig): ModuleWithProviders<LocalStorageModule> {
    return {
      ngModule: LocalStorageModule,
      providers: [
        config?.prefix ? { provide: LS_PREFIX, useValue: config.prefix } : [],
      ],
    }
  }

}
