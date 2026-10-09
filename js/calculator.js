// Casio fx-570VN PLUS Scientific Math Engine
class CasioCalculator {
  constructor() {
    this.expression = '';
    this.result = '0';
    this.rawResult = 0;
    this.ans = 0;
    this.memory = 0;
    this.angleMode = 'DEG'; // 'DEG' or 'RAD'
    this.shiftActive = false;
    this.alphaActive = false;
    this.isResultDisplayed = false;
    this.fractionMode = false; // toggle for S<=>D
    this.history = [];
    this.loadHistory();
  }

  loadHistory() {
    try {
      const saved = localStorage.getItem('fx570_history');
      if (saved) {
        this.history = JSON.parse(saved);
      }
    } catch (e) {
      this.history = [];
    }
  }

  saveHistory() {
    try {
      localStorage.setItem('fx570_history', JSON.stringify(this.history.slice(0, 50)));
    } catch (e) {}
  }

  addHistory(expr, res) {
    this.history.unshift({
      expr,
      result: res,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    });
    if (this.history.length > 50) this.history.pop();
    this.saveHistory();
  }

  clearHistory() {
    this.history = [];
    this.saveHistory();
  }

  toggleShift() {
    this.shiftActive = !this.shiftActive;
    if (this.shiftActive) this.alphaActive = false;
    return this.shiftActive;
  }

  toggleAlpha() {
    this.alphaActive = !this.alphaActive;
    if (this.alphaActive) this.shiftActive = false;
    return this.alphaActive;
  }

  toggleAngleMode() {
    this.angleMode = this.angleMode === 'DEG' ? 'RAD' : 'DEG';
    return this.angleMode;
  }

  clear() {
    this.expression = '';
    this.result = '0';
    this.rawResult = 0;
    this.isResultDisplayed = false;
    this.fractionMode = false;
    this.shiftActive = false;
    this.alphaActive = false;
  }

  deleteChar() {
    if (this.isResultDisplayed) {
      this.isResultDisplayed = false;
      return;
    }
    if (this.expression.length > 0) {
      // Check multi-character tokens like 'sin(', 'cos(', 'log(', 'sqrt('
      const multiChars = ['sin⁻¹(', 'cos⁻¹(', 'tan⁻¹(', 'sinh(', 'cosh(', 'tanh(', 'sin(', 'cos(', 'tan(', 'log(', 'ln(', '√( ', '∛(', 'Ans', '×10^'];
      let deleted = false;
      for (const token of multiChars) {
        if (this.expression.endsWith(token)) {
          this.expression = this.expression.slice(0, -token.length);
          deleted = true;
          break;
        }
      }
      if (!deleted) {
        this.expression = this.expression.slice(0, -1);
      }
    }
  }

  input(char) {
    if (this.isResultDisplayed) {
      // If user presses an operator after result, continue calculation with Ans
      if (['+', '-', '×', '÷', '^', '%', '²', '³'].includes(char)) {
        this.expression = 'Ans' + char;
      } else {
        this.expression = char;
      }
      this.isResultDisplayed = false;
      this.fractionMode = false;
    } else {
      this.expression += char;
    }
  }

  // Factorial helper
  factorial(n) {
    if (n < 0 || Math.floor(n) !== n) return NaN;
    if (n > 170) return Infinity;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  }

  // Float precision cleanup
  cleanFloat(n) {
    if (typeof n !== 'number' || !isFinite(n)) return n;
    if (Math.abs(n) < 1e-13) return 0;
    const rounded = parseFloat(n.toPrecision(12));
    return rounded;
  }

  // Continued fraction converter for S<=>D key
  toFraction(val, maxDenom = 100000) {
    if (!isFinite(val) || Math.floor(val) === val) return null;
    const sign = val < 0 ? -1 : 1;
    let x = Math.abs(val);

    let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
    let b = x;
    let bestNum = Math.round(x);
    let bestDen = 1;
    let bestErr = Math.abs(x - bestNum);

    for (let iter = 0; iter < 25; iter++) {
      let a = Math.floor(b);
      let auxH = h1; h1 = a * h1 + h2; h2 = auxH;
      let auxK = k1; k1 = a * k1 + k2; k2 = auxK;
      if (k1 > maxDenom) break;

      let err = Math.abs(x - h1 / k1);
      if (err < bestErr) {
        bestNum = h1;
        bestDen = k1;
        bestErr = err;
      }
      if (err < 1e-9) break;
      if (Math.abs(b - a) < 1e-9) break;
      b = 1 / (b - a);
    }

    if (bestErr < 1e-6 && bestDen > 1) {
      return { num: sign * bestNum, den: bestDen };
    }
    return null;
  }

  toggleFraction() {
    if (!this.isResultDisplayed || typeof this.rawResult !== 'number' || !isFinite(this.rawResult)) return;

    this.fractionMode = !this.fractionMode;
    if (this.fractionMode) {
      const frac = this.toFraction(this.rawResult);
      if (frac) {
        // Mixed fraction or simple fraction
        const whole = Math.trunc(frac.num / frac.den);
        const rem = Math.abs(frac.num % frac.den);
        if (Math.abs(whole) > 0 && rem > 0) {
          this.result = `${whole} ˩ ${rem}/${frac.den}  (${frac.num}/${frac.den})`;
        } else {
          this.result = `${frac.num}/${frac.den}`;
        }
      } else {
        this.result = this.formatNumber(this.rawResult);
      }
    } else {
      this.result = this.formatNumber(this.rawResult);
    }
  }

  formatNumber(val) {
    if (isNaN(val)) return 'Math ERROR';
    if (!isFinite(val)) return val > 0 ? 'Infinity' : '-Infinity';
    const cleaned = this.cleanFloat(val);
    // Exponential notation for huge/tiny numbers
    if (Math.abs(cleaned) >= 1e12 || (Math.abs(cleaned) > 0 && Math.abs(cleaned) < 1e-9)) {
      return cleaned.toExponential(8).replace('e+', ' × 10^').replace('e-', ' × 10^-');
    }
    return cleaned.toString();
  }

  evaluate() {
    if (!this.expression.trim()) return;

    let expr = this.expression;
    const originalExpr = expr;

    try {
      // 1. Replace symbols with evaluator-friendly operators
      expr = expr.replace(/×10\^/g, '*10^');
      expr = expr.replace(/Ans/g, `(${this.ans})`);
      expr = expr.replace(/π/g, `(${Math.PI})`);
      expr = expr.replace(/e(?![a-z])/g, `(${Math.E})`);
      expr = expr.replace(/×/g, '*');
      expr = expr.replace(/÷/g, '/');
      expr = expr.replace(/²/g, '^2');
      expr = expr.replace(/³/g, '^3');
      expr = expr.replace(/⁻¹/g, '^(-1)');

      // 2. Parse and evaluate with our safe mathematical parser
      const val = this.parseExpression(expr);

      if (isNaN(val)) {
        this.result = 'Math ERROR';
      } else {
        this.rawResult = val;
        this.ans = val;
        this.result = this.formatNumber(val);
        this.isResultDisplayed = true;
        this.fractionMode = false;
        this.addHistory(originalExpr, this.result);
      }
    } catch (err) {
      this.result = 'Syntax ERROR';
      this.isResultDisplayed = true;
    }
  }

  parseExpression(raw) {
    // Custom Shunting-Yard tokenizer & evaluator
    const tokens = this.tokenize(raw);
    const postfix = this.toPostfix(tokens);
    return this.evaluatePostfix(postfix);
  }

  tokenize(str) {
    const tokens = [];
    let i = 0;
    const isDeg = this.angleMode === 'DEG';

    while (i < str.length) {
      const c = str[i];

      if (/\s/.test(c)) {
        i++;
        continue;
      }

      // Check numbers
      if (/[0-9.]/.test(c)) {
        let numStr = '';
        while (i < str.length && /[0-9.]/.test(str[i])) {
          numStr += str[i];
          i++;
        }
        tokens.push({ type: 'number', value: parseFloat(numStr) });
        continue;
      }

      // Multi-character functions
      const funcList = [
        'sin⁻¹', 'cos⁻¹', 'tan⁻¹', 'sinh', 'cosh', 'tanh',
        'sin', 'cos', 'tan', 'log', 'ln', '√( ', '√', '∛', 'abs'
      ];
      let matchedFunc = false;
      for (const fn of funcList) {
        if (str.startsWith(fn, i)) {
          tokens.push({ type: 'function', value: fn.trim() });
          i += fn.length;
          matchedFunc = true;
          break;
        }
      }
      if (matchedFunc) continue;

      // Operators and parens
      if ('+-*/^%!(),'.includes(c)) {
        tokens.push({ type: 'operator', value: c });
        i++;
        continue;
      }

      // Unknown character, skip or error
      i++;
    }

    // Insert implicit multiplications: e.g. 2(3) -> 2 * 3, 2sin(30) -> 2 * sin(30)
    const refined = [];
    for (let j = 0; j < tokens.length; j++) {
      const curr = tokens[j];
      const prev = refined[refined.length - 1];

      if (prev) {
        const prevCanBeMultiplied =
          prev.type === 'number' ||
          (prev.type === 'operator' && (prev.value === ')' || prev.value === '%'));
        const currCanBeMultiplier =
          curr.type === 'number' ||
          curr.type === 'function' ||
          (curr.type === 'operator' && curr.value === '(');

        if (prevCanBeMultiplied && currCanBeMultiplier) {
          refined.push({ type: 'operator', value: '*' });
        }
      }
      refined.push(curr);
    }

    // Handle unary minus
    const withUnary = [];
    for (let j = 0; j < refined.length; j++) {
      const curr = refined[j];
      const prev = withUnary[withUnary.length - 1];

      if (curr.type === 'operator' && curr.value === '-') {
        if (!prev || (prev.type === 'operator' && prev.value !== ')')) {
          withUnary.push({ type: 'operator', value: 'neg' });
          continue;
        }
      }
      withUnary.push(curr);
    }

    return withUnary;
  }

  toPostfix(tokens) {
    const prec = {
      'neg': 5,
      '^': 4,
      '*': 3,
      '/': 3,
      '%': 3,
      '+': 2,
      '-': 2
    };
    const assoc = {
      'neg': 'R',
      '^': 'R',
      '*': 'L',
      '/': 'L',
      '%': 'L',
      '+': 'L',
      '-': 'L'
    };

    const output = [];
    const opStack = [];

    for (const t of tokens) {
      if (t.type === 'number') {
        output.push(t);
      } else if (t.type === 'function') {
        opStack.push(t);
      } else if (t.type === 'operator') {
        if (t.value === '(') {
          opStack.push(t);
        } else if (t.value === ')') {
          while (opStack.length && opStack[opStack.length - 1].value !== '(') {
            output.push(opStack.pop());
          }
          if (opStack.length && opStack[opStack.length - 1].value === '(') {
            opStack.pop(); // remove '('
          }
          if (opStack.length && opStack[opStack.length - 1].type === 'function') {
            output.push(opStack.pop());
          }
        } else {
          // Normal operator
          const o1 = t.value;
          while (
            opStack.length &&
            opStack[opStack.length - 1].value !== '(' &&
            opStack[opStack.length - 1].type === 'operator'
          ) {
            const o2 = opStack[opStack.length - 1].value;
            const p1 = prec[o1] || 0;
            const p2 = prec[o2] || 0;
            if ((assoc[o1] === 'L' && p1 <= p2) || (assoc[o1] === 'R' && p1 < p2)) {
              output.push(opStack.pop());
            } else {
              break;
            }
          }
          opStack.push(t);
        }
      }
    }

    while (opStack.length) {
      output.push(opStack.pop());
    }

    return output;
  }

  evaluatePostfix(postfix) {
    const stack = [];
    const isDeg = this.angleMode === 'DEG';
    const toRad = deg => (deg * Math.PI) / 180;
    const toDeg = rad => (rad * 180) / Math.PI;

    for (const t of postfix) {
      if (t.type === 'number') {
        stack.push(t.value);
      } else if (t.type === 'operator' && t.value === 'neg') {
        const a = stack.pop() ?? 0;
        stack.push(-a);
      } else if (t.type === 'operator') {
        const b = stack.pop();
        const a = stack.pop();
        if (a === undefined || b === undefined) throw new Error('Syntax ERROR');

        switch (t.value) {
          case '+': stack.push(a + b); break;
          case '-': stack.push(a - b); break;
          case '*': stack.push(a * b); break;
          case '/':
            if (b === 0) return Infinity;
            stack.push(a / b);
            break;
          case '^': stack.push(Math.pow(a, b)); break;
          case '%': stack.push((a * b) / 100); break;
          default: throw new Error('Unknown operator: ' + t.value);
        }
      } else if (t.type === 'function') {
        const a = stack.pop();
        if (a === undefined) throw new Error('Syntax ERROR');

        switch (t.value) {
          case 'sin':
            stack.push(this.cleanFloat(Math.sin(isDeg ? toRad(a) : a)));
            break;
          case 'cos':
            stack.push(this.cleanFloat(Math.cos(isDeg ? toRad(a) : a)));
            break;
          case 'tan':
            stack.push(this.cleanFloat(Math.tan(isDeg ? toRad(a) : a)));
            break;
          case 'sin⁻¹':
            stack.push(isDeg ? toDeg(Math.asin(a)) : Math.asin(a));
            break;
          case 'cos⁻¹':
            stack.push(isDeg ? toDeg(Math.acos(a)) : Math.acos(a));
            break;
          case 'tan⁻¹':
            stack.push(isDeg ? toDeg(Math.atan(a)) : Math.atan(a));
            break;
          case 'log':
            stack.push(Math.log10(a));
            break;
          case 'ln':
            stack.push(Math.log(a));
            break;
          case '√':
          case '√( ':
            stack.push(Math.sqrt(a));
            break;
          case '∛':
            stack.push(Math.cbrt(a));
            break;
          case 'abs':
            stack.push(Math.abs(a));
            break;
          default:
            throw new Error('Unknown function: ' + t.value);
        }
      }
    }

    if (stack.length !== 1) throw new Error('Syntax ERROR');
    return stack[0];
  }
}

window.casioCalc = new CasioCalculator();
