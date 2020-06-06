import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {DemoMaterialModule} from './material-module';
import { AuthGuard } from './_helpers';
import { DataTablesModule } from 'angular-datatables';


import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { TodosModule } from './todos/todos.module';
import { IAppState, rootReducer, INITIAL_STATE } from './store';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoOverviewComponent } from './todo-overview/todo-overview.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegistrationpageComponent } from './registrationpage/registrationpage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AddUserComponent ,AddUserDialog} from './user-management/add-user/add-user.component';
import { ListUserComponent } from './user-management/list-user/list-user.component';


/*
	created by : Hemin patel
 */
@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoOverviewComponent,
    LoginpageComponent,
    RegistrationpageComponent,
    HomeComponent,
    UserManagementComponent,
    AddUserComponent,
    ListUserComponent,
    AddUserDialog
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgReduxModule,
    HttpClientModule,
    HttpModule,
    DemoMaterialModule,
    DataTablesModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  entryComponents : [AddUserDialog]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
