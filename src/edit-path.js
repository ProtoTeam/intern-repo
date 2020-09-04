class EditsPath {
    constructor(origin, target) {
        this.origin = origin;
        this.target = target;
        this.m = origin.length;
        this.n = target.length;
        const { m, n } = this;
        this.edits = [];
        for (let i = 0; i < m; i++) {
            this.edits[i] = Array(n);
        }
        this.alignments = [];
        console.log(this.edits);
    }
    trackEdits() {
        const { m, n, origin, target, edits: dp } = this;
        dp[0][0] = {
            dist: 0,
            prev: [-1, -1],
        };
        console.log(dp);
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
                const modify = dp[i - 1][j - 1].dist + origin.charAt(i - 1) === target.charAt(j - 1) ? 0 : 2;
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
    getEditsTracker() {
        if (!this.edits[0]) {
            return this.trackEdits();
        }
        return this.edits;
    }
    calcAlignments() {
        const edits = this.getEditsTracker();
        const { origin, target, m, n } = this;
        let i = m;
        let j = n;
        const res = [];
        while (i >= 0 && j >= 0) {
            const [pi, pj] = edits[i][j].prev;
            if (i - pi === 1 && j - pj === 1) {
                res.unshift([origin.charAt(i), target.charAt(j)]);
            }
            else if (i - pi === 1) {
                res.unshift([null, target.charAt(j)]);
            }
            else {
                res.unshift([origin.charAt(i), null]);
            }
            [i, j] = [pi, pj];
        }
        this.alignments = res;
        return res;
    }
    getAlignments() {
        if (!this.alignments[0]) {
            return this.calcAlignments();
        }
        return this.alignments;
    }
}
const diffStrings = (from, to) => {
    const edits = new EditsPath(from, to);
    edits.getAlignments();
};
diffStrings('abc', 'aef');
