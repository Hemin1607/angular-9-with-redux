import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegistrationpageComponent } from './registrationpage/registrationpage.component';
import { HomeComponent } from './home/home.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AuthGuard } from './_helpers/auth.guard';


/*
	created by : Hemin patel
 */
const routes: Routes = [
	{
		path : "",
		component :LoginpageComponent,
		data :  {title : "login" }
	},
	{
		path : "registrationpage",
		component :RegistrationpageComponent,
		data :  {title : "registration" }
	},
	{
		path : "home",
		component :HomeComponent,
		canActivate: [AuthGuard],
		data :  {title : "login" }
	},
	{
		path : "user-management",
		component :UserManagementComponent,
		canActivate: [AuthGuard],
		data :  {title : "User Management" }
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
