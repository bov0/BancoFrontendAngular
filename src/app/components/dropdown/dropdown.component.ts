
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { AuthService } from '../../auth.service';
import { provideIcons } from '@ng-icons/core';
import {
  lucideUserCircle,
  lucideLayers,
  lucideMessageSquare,
  lucideCode,
  lucideMail,
  lucideLogOut,
  lucideSmile,
  lucideCog,
  lucideGithub,
  lucideKeyboard,
  lucideUser,
  lucidePlus,
  lucidePlusCircle,
  lucideHelpCircle,
} from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuItemIconDirective,
  HlmMenuItemSubIndicatorComponent,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
  HlmMenuShortcutComponent,
  HlmSubMenuComponent,
} from '@spartan-ng/ui-menu-helm';
import { AvatarComponent } from '../avatar/avatar.component';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AvatarComponent,
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmSubMenuComponent,
    HlmMenuItemDirective,
    HlmMenuItemSubIndicatorComponent,
    HlmMenuLabelComponent,
    HlmMenuShortcutComponent,
    HlmMenuSeparatorComponent,
    HlmMenuItemIconDirective,
    HlmMenuGroupComponent,
    HlmButtonDirective,
    HlmIconComponent,
    RouterLink,
  ],
  providers: [
    provideIcons({
      lucideUser,
      lucideLayers,
      lucideCog,
      lucideKeyboard,
      lucideUserCircle,
      lucideSmile,
      lucidePlus,
      lucideGithub,
      lucideHelpCircle,
      lucideCode,
      lucideLogOut,
      lucideMail,
      lucideMessageSquare,
      lucidePlusCircle,
    }),
  ],
  templateUrl: './Dropdown.Component.html' 
})
export class DropdownComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;  
  private subscription: Subscription | undefined;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.subscription = this.authService.isLoggedIn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
  }
}