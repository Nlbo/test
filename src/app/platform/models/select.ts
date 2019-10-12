export class SelectModel<T = any> {
  public name: string;
  public value: T;
  public id?: number;

  constructor(name: string, value?: T, id?: number) {
    this.name = name;
    this.value = value || null;
    this.id = id;
  }
}
