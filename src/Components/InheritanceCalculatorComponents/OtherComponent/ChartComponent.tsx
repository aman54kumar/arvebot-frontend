import Tree from 'react-d3-tree';

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const orgChart = {
    "name": "Eve",
    "children": [
        {
            "name": "Cain"
        },
        {
            "name": "Seth",
            "children": [
                {
                    "name": "Enos"
                },
                {
                    "name": "Noam"
                }
            ]
        },
        {
            "name": "Abel"
        },
        {
            "name": "Awan",
            "children": [
                {
                    "name": "Enoch"
                }
            ]
        },
        {
            "name": "Azura"
        }
    ]
}


export default function OrgChartTree() {
    return (
        // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
        <div id="treeWrapper" style={{ width: '50em', height: '50em', backgroundColor: 'gray' }}>
            <Tree data={orgChart} />
        </div>
    );
}