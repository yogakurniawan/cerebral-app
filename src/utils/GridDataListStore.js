export default class GridDataListStore {
  constructor(data) {
    this.data = data;
    this.size = data.length;
    this._cache = [];
  }

  getObjectAt(index) {
    if (index < 0 || index > this.size) {
      return undefined;
    }
    if (this._cache[index] === undefined) {
      this._cache[index] = this.data[index];
    }
    return this._cache[index];
  }

  /**
  * Populates the entire cache with data.
  * Use with Caution! Behaves slowly for large sizes
  * ex. 100,000 rows
  */
  getAll() {
    if (this._cache.length < this.size) {
      for (let idx = 0; idx < this.size; idx++) {
        this.getObjectAt(idx);
      }
    }
    return this._cache.slice();
  }

  getSize() {
    return this.size;
  }
}
