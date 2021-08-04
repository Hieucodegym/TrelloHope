import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarBoardHeaderComponent } from './navbar-board-header/navbar-board-header.component';
import { ModalComponent } from './modal/modal.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    NavbarComponent,
    NavbarBoardHeaderComponent,
    ModalComponent
  ],
  exports: [
    NavbarComponent,
    NavbarBoardHeaderComponent,
    ModalComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ]
})
export class ShareModule { }
