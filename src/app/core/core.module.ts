import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
//import all service 
/*
	created by : Hemin patel
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [UserService]
})
export class CoreModule { }
