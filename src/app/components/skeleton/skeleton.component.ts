import { Component } from '@angular/core';
import { HlmSkeletonComponent } from '@spartan-ng/ui-skeleton-helm';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [HlmSkeletonComponent],
  template: `
    <hlm-skeleton>
    </hlm-skeleton>
  `,
})
export class SkeletonComponent {}