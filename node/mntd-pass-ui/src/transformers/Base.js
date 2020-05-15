export class BaseTransformer {
  static fetchCollection(collections) {
    return collections.map(value => this.fetch(value))
  }
}
