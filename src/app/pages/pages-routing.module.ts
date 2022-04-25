import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResourceMapComponent } from './resource-map/resource-map.component';
import { ServiceMapComponent } from './service-map/service-map.component';
import { ServicesConfigurationComponent } from './services-configuration/services-configuration.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'resources',
    component: ResourceMapComponent,
  },
  {
    path: 'services',
    component: ServiceMapComponent,
  },
  {
    path: 'services-configuration',
    component: ServicesConfigurationComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
