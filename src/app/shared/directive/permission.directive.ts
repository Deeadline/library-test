import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { AuthDataProvider } from '../../data-providers/auth/auth.data-provider';

@Directive({
	selector: '[appPermission]'
})
export class PermissionDirective {

	private hasView = false;

	constructor(
		private readonly authDataProvider: AuthDataProvider,
		private readonly viewContainerRef: ViewContainerRef,
		private readonly templateRef: TemplateRef<Element>
	) {
	}

	@Input()
	public set appPermission(value: string[]) {
		this.authDataProvider.getRole().subscribe((role: string) => {
			if (!this.hasView && value.includes(role)) {
				this.viewContainerRef.createEmbeddedView(this.templateRef);
				this.hasView = true;
			} else if (this.hasView && !value.includes(role)) {
				this.viewContainerRef.clear();
				this.hasView = false;
			}
		});
	}

}
