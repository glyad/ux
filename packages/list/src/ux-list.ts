import { customElement, bindable, useView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { UxComponent, StyleEngine } from '@aurelia-ux/core';
import { UxListTheme } from './ux-list-theme';
import { PLATFORM } from 'aurelia-pal';

@inject(Element, StyleEngine)
@customElement('ux-list')
@useView(PLATFORM.moduleName('./ux-list.html'))
export class UxList implements UxComponent {
  @bindable public theme: UxListTheme;
  @bindable public type: string;

  constructor(
    public element: HTMLElement,
    private styleEngine: StyleEngine) { }

  public bind() {
    if (this.theme != null) {
      this.themeChanged(this.theme);
    }

    this.typeChanged(this.type);
  }

  public typeChanged(newValue: string, oldValue?: string) {
    if (typeof oldValue === 'string') {
      this.element.classList.remove(`ux-list--${oldValue}`);
    }

    if (typeof newValue === 'string') {
      this.element.classList.add(`ux-list--${newValue}`);
    }
  }

  public themeChanged(newValue: UxListTheme) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'list';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }
}
