import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthDataProvider} from '../../data-providers/auth/auth.data-provider';

@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective {

  private hasView = false;

  @Input() set appPermission(value: string[]) {
    this.authDataProvider.getRole().subscribe(role => {
      if (!this.hasView && value.includes(role)) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (this.hasView && !value.includes(role)) {
        this.viewContainerRef.clear();
        this.hasView = false;
      }
    });
  }

  constructor(
    private authDataProvider: AuthDataProvider,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {
  }

}
