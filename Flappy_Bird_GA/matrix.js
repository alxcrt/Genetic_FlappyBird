class Matrix {

  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = [];

    for (let i = 0; i < this.rows; i++) {
      this.data[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = 0;
      }
    }
  }

  add(n) {

    if (n instanceof Matrix) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] += n.data[i][j];
        }
      }
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] += n;
        }
      }
    }
  }

  static subtract(a, b) {
    if (a instanceof Matrix) {
      let sub = new Matrix(a.rows, b.cols);
      for (let i = 0; i < sub.rows; i++) {
        for (let j = 0; j < sub.cols; j++) {
          sub.data[i][j] = a.data[i][j] - b.data[i][j];
        }
      }
      return sub;
    } else {
      let sub = new Matrix(a.rows, a.cols);
      for (let i = 0; i < sub.rows; i++) {
        for (let j = 0; j < sub.cols; j++) {
          sub.data[i][j] = a.data[i][j] - b;
        }
      }
      return sub;
    }

  }

  randomize(n) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] += Math.random() * 2 - 1;
      }
    }
  };

  multiply(n) {
    if (n instanceof Matrix) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] *= n.data[i][j];
        }
      }
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] *= n;
        }
      }
    }
  };

  static dot(a, b) {
    if (a.cols !== b.rows) {
      return undefined;
    } else {
      let result = new Matrix(a.rows, b.cols);
      for (let i = 0; i < result.rows; i++) {
        for (let j = 0; j < result.cols; j++) {

          let sum = 0;
          for (let k = 0; k < a.cols; k++) {
            sum += a.data[i][k] * b.data[k][j];
          }
          result.data[i][j] += sum;
        }
      }
      return result;
    }
  }

  static transpose(m) {
    let k = new Matrix(m.cols, m.rows);
    for (let i = 0; i < m.rows; i++) {
      for (let j = 0; j < m.cols; j++) {
        k.data[j][i] = m.data[i][j];
      }
    }
    return k
  }

  print() {
    console.table(this.data);
  }

  map(func) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let val = this.data[i][j];
        this.data[i][j] = func(val, i, j);
      }
    }
    return this;
  }

  static fromArray(array) {
    let m = new Matrix(1, array.length);
    for (let j = 0; j < array.length; j++) {
      m.data[0][j] = array[j];
    }
    return m;
  }

  toArray() {
    let arr = [];
    for (let j = 0; j < this.cols; j++) {
      arr.push(this.data[0][j]);
    }
    return arr;
  }

  static map(x, func) {
    let a = new Matrix(x.rows, x.cols);
    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < a.cols; j++) {
        a.data[i][j] = func(x.data[i][j], i , j);
      }
    }
    return a;
  }

  copy() {
    let m = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        m.data[i][j] = this.data[i][j];
      }
    }
    return m;
  }

}
