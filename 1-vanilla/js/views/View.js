import { emit, on } from "../helpers.js";

const SUBMIT = '@submit';
const RESET = '@reset';
const CHANGE = '@change';

export const EVENT_TYPE = {
  SUBMIT,
  RESET,
  CHANGE
}

export default class View {
  constructor(element) {
    if (!element) throw "no element";

    this.element = element;
    this.originalDisplay = this.element.style.dispaly || "";

    return this;
  }

  hide() {
    this.element.style.display = "none";
    return this;
  }

  show() {
    this.element.style.display = this.originalDisplay;
    return this;
  }

  on(eventName, handler) {
    on(this.element, eventName, handler);
    return this;
  }

  emit(eventName, data) {
    emit(this.element, eventName, data);
    return this;
  }
}
