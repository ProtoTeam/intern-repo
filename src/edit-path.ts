type Matrix<T> = Array<Array<T>>;

interface AtomEdit {
  prev?: [number, number];
  dist: number;
}

type EditsTracker = Matrix<AtomEdit>;

type Alignments = Array<[string, string]>;

class EditsPath {
  private m: number;
  private n: number;
  private dp: EditsTracker;
  constructor(origin: string, target: string) {
    this.m = origin.length;
    this.n = target.length;
    const { m, n } = this;
    this.dp = Array(m + 1).fill(Array(n + 1));
  }
  trackEdits(): EditsTracker {
    const { m, n, dp } = this;
    dp[0][0] = {
      dist: 0,
    };
    for (let i = 1; i <= m; i++) {
      dp[i][0] = { dist: i, prev: [i - 1, 0] };
    }
    for (let j = 1; j <= n; j++) {
      dp[0][j] = { dist: j, prev: [0, j - 1] };
    }
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const insert = dp[i - 1][j].dist + 1;
        const remove = dp[i][j - 1].dist + 1;
        const modify = dp[i - 1][j - 1].dist + origin.charAt(i - 1) === origin.charAt(j - 1) ? 0 : 2;
        const minimal = Math.min(insert, remove, modify);
        switch (minimal) {
          case insert:
            dp[i][j] = { dist: insert, prev: [i - 1, j] };
            break;
          case remove:
            dp[i][j] = { dist: remove, prev: [i, j - 1] };
            break;
          default:
            dp[i][j] = { dist: modify, prev: [i - 1, j - 1] };
        }
      }
    }
    return dp;
  }
}

function alignments(edits: EditsTracker): Alignments {
  return null;
}
