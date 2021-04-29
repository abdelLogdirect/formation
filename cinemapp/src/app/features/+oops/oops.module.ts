import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { OopsRoutingModule } from './oops-routing.module';
import { OfflinePage } from './pages/offline/offline.page';
import { UnavailablePage } from './pages/unavailable/unavailable.page';
import { NotFoundPage } from './pages/not-found/not-found.page';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    OopsRoutingModule,
  ],
  declarations: [
    OfflinePage,
    UnavailablePage,
    NotFoundPage,
  ],
})
export class OopsModule { }
