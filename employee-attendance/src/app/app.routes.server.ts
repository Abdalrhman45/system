import { RenderMode, ServerRoute } from '@angular/ssr'; 
import { ProfileComponent } from './employee/profile.component';
export const serverRoutes: ServerRoute[] = [
  {
   { path: 'profile', component: ProfileComponent },

    renderMode: RenderMode.Prerender  
    
  }   
];
