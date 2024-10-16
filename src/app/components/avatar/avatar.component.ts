import { Component } from '@angular/core';
import { HlmAvatarComponent, HlmAvatarFallbackDirective, HlmAvatarImageDirective } from '@spartan-ng/ui-avatar-helm';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [
    CommonModule,
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
  ],
  template: `
    <hlm-avatar variant="medium" class="m-0 p-0 border-2 border-black">
      <div></div>
      <span
        class="font-semibold"
        [class]="authService.isLoggedIn ? 'bg-white' : 'bg-red-500'" 
        hlmAvatarFallback>
        {{ authService.isLoggedIn ? authService.userInitials : 'RG' }}
      </span>
    </hlm-avatar>
  `,
})
export class AvatarComponent {
  constructor(public authService: AuthService) {}
}