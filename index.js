grid_x = 10;
grid_y = 5;

grid = [];
const generateGrid = () => {
    const base = document.getElementById('grid');
    base.innerHTML = "";
    grid = [];
    for(let i = 0; i < grid_x; i++){
        const holder = document.createElement('div');
        grid.push([]);
        for(let j = 0; j < grid_y; j++){
            const node = document.createElement('div');
            node.className = "node inactive";
            node.id = `${grid_x} ${grid_y}`;
            holder.appendChild(node);
            grid[i].push(node);
        }
        base.appendChild(holder);
    }
}

const toggleBkg = () => {
    document.getElementById('selection').style.backgroundImage = document.querySelector('#bkg').checked ? 'url("/images/Fx8rHZXaUAclbkK.jpg")' : '';
}

generateGrid();

console.log(grid);