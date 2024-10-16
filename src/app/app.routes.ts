import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    {path : '','title':'Banco', component:IndexComponent},
    {path : 'login','title':'Login',component:LoginComponent},
    {path : 'register','title':'Register', component:RegisterComponent},
    {path : 'profile','title':'profile', component:UserInfoComponent},
    {path : '**','title':'Page not found', component:PageNotFoundComponent},
];
