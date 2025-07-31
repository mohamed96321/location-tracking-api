export class MemoCaching<T> {
  private data: T | null = null;

  get(): T | null {
    return this.data;
  }

  set(value: T) {
    this.data = value;
  }

  clear() {
    this.data = null;
  }
}
