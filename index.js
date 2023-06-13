grid = [];
const generateGrid = () => {
    const base = document.getElementById("grid");
    grid_x = document.getElementById("width").value;
    grid_y = document.getElementById("height").value;

    base.innerHTML = "";
    grid = [];
    for (let i = 0; i < grid_x; i++) {
        const holder = document.createElement("div");
        grid.push([]);
        for (let j = 0; j < grid_y; j++) {
            const node = document.createElement("div");
            node.className = "node inactive";
            node.id = `${grid_x} ${grid_y}`;
            holder.appendChild(node);
            grid[i].push(node);
        }
        base.appendChild(holder);
    }
};

const isLegal = (x, y, checked) => {
    return x < checked.length && y < checked[0].length && x >= 0 && y >= 0;
};

const wait = (ms) => {
    let start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
        console.log(now - start);
    }
};

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const getRandomRGB = () => {
    return Math.floor(Math.random() * 256);
};

const dfs = async (x, y, checked) => {
    if (checked[x][y]) return;
    await sleep(200);
    checked[x][y] = true;
    grid[x][
        y
    ].style.backgroundColor = `rgb(${getRandomRGB()}, ${getRandomRGB()}, ${getRandomRGB()})`;

    const dirs = [
        [x, y + 1],
        [x + 1, y],
        [x - 1, y],
        [x, y - 1],
    ];

    for (let i = 0; i < dirs.length; i++) {
        if (isLegal(dirs[i][0], dirs[i][1], checked)) {
            await dfs(dirs[i][0], dirs[i][1], checked);
        }
    }
    checked[x][y] = false;
};

const bfs = async (x, y, checked) => {
    const queue = [];

    queue.push([x, y]);
    while (queue.length > 0) {
        obj = queue.shift();
        grid[obj[0]][
            obj[1]
        ].style.backgroundColor = `rgb(${getRandomRGB()}, ${getRandomRGB()}, ${getRandomRGB()})`;
        checked[obj[0]][obj[1]] = true;
        console.log(obj[0] + " " + obj[1]);

        const dirs = [
            [obj[0], obj[1] + 1],
            [obj[0] + 1, obj[1]],
            [obj[0] - 1, obj[1]],
            [obj[0], obj[1] - 1],
        ];

        for (let i = 0; i < dirs.length; i++) {
            if (
                isLegal(dirs[i][0], dirs[i][1], checked) &&
                !checked[dirs[i][0]][dirs[i][1]]
            ) {
                checked[dirs[i][0]][dirs[i][1]] = true;
                queue.push([dirs[i][0], dirs[i][1]]);
            }
        }
        await sleep(200);
    }
    checked[x][y] = false;
};

const toggleBkg = () => {
    document.getElementById("selection").style.backgroundImage =
        document.querySelector("#bkg").checked
            ? 'url("images/Fx8rHZXaUAclbkK.jpg")'
            : "";
};

const toggleAlgo = () => {
    document.getElementById("algoHolder").innerText = document.querySelector(
        "#algo"
    ).checked
        ? "BFS"
        : "DFS";
};

const run = () => {
    const x = document.getElementById("xbegin").value - 1;
    const y = document.getElementById("ybegin").value - 1;

    const checked = [];
    for (let i = 0; i < grid.length; i++) {
        checked.push([]);
        for (let j = 0; j < grid[0].length; j++) {
            checked[i].push(false);
        }
    }

    if(!isLegal(x, y, checked)){
        alert("X & Y are not within the grid.")
        return;
    }

    if(document.querySelector(
        "#algo"
    ).checked) bfs(x, y, checked);
    else dfs(x, y, checked);
    
};

generateGrid();
