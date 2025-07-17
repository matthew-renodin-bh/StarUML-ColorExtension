
let dict = {
    // Class diagram
    "uml.class.fillColor":                      "#d8e1f8",
    "uml.class.lineColor":                      "#5c82b0",
    "uml.interface.fillColor":                  "#ffffcd",
    "uml.interface.lineColor":                  "#c4c486",
    "uml.enumeration.fillColor":                "#f4d3d3",
    "uml.enumeration.lineColor":                "#cc9999",

    // Use case diagram
    "uml.actor.fillColor":                      "#ffffff",
    "uml.actor.lineColor":                      "#999999",
    "uml.package.fillColor":                    "#fff2e4",
    "uml.package.lineColor":                    "#e6d0b7",
    "uml.usecase.fillColor":                    "#d6ffae",
    "uml.usecase.lineColor":                    "#8fb96b",

    // Activity diagram
    "uml.action.fillColor":                     "#d8e1f8",
    "uml.action.lineColor":                     "#5c82b0",
    "uml.controlnode.fillColor":                "#cce18d",
    "uml.controlnode.lineColor":                "#7c9e3c",

    // Deployment and component diagram
    "uml.node.fillColor":                       "#f1d9c2",
    "uml.node.lineColor":                       "#c2aa8f",
    "uml.component.fillColor":                  "#e1e5fa",
    "uml.component.lineColor":                  "#a0a6d6",
    "uml.artifact.fillColor":                   "#e3ffc9",
    "uml.artifact.lineColor":                   "#a2d987",
    "uml.port.fillColor":                       "#c082ff",
    "uml.port.lineColor":                       "#9955cc",

    // Flowchart diagram
    "flowchart.terminator.fillColor":           "#9acef6",
    "flowchart.terminator.lineColor":           "#669fd6",
    "flowchart.process.fillColor":              "#fff07c",
    "flowchart.process.lineColor":              "#d6c757",
    "flowchart.decision.fillColor":             "#cce18d",
    "flowchart.decision.lineColor":             "#8fb657",
    "flowchart.database.fillColor":             "#f8a9cc",
    "flowchart.database.lineColor":             "#d97fa7",
    "flowchart.document.fillColor":             "#8acd8a",
    "flowchart.document.lineColor":             "#5da35d",
    "flowchart.predefined-process.fillColor":   "#ddc8c3",
    "flowchart.predefined-process.lineColor":   "#bca29e",
    "flowchart.data.fillColor":                 "#dee7fe",
    "flowchart.data.lineColor":                 "#aab6e7",
    "flowchart.manual-input.fillColor":         "#edeffa",
    "flowchart.manual-input.lineColor":         "#c0c3d7",

    // ✅ SysML elements
    "sysml.block.fillColor":                    "#4682B4",
    "sysml.block.lineColor":                    "#2F4F4F",
    "sysml.requirement.fillColor":              "#FFFFF0",
    "sysml.requirement.lineColor":              "#BDB76B",
    "sysml.constraintblock.fillColor":          "#D3D3D3",
    "sysml.constraintblock.lineColor":          "#A9A9A9",
    "sysml.valuetype.fillColor":                "#FFFFF0",
    "sysml.valuetype.lineColor":                "#BDB76B",
    "sysml.port.fillColor":                     "#008080",
    "sysml.port.lineColor":                     "#004C4C",
    "sysml.fullport.fillColor":                 "#20B2AA",
    "sysml.fullport.lineColor":                 "#006666",
    "sysml.proxyport.fillColor":                "#5F9EA0",
    "sysml.proxyport.lineColor":                "#2F4F4F",
    "sysml.flowport.fillColor":                 "#6B8E23",
    "sysml.flowport.lineColor":                 "#556B2F",
    "sysml.itemflow.fillColor":                 "#6B8E23",
    "sysml.itemflow.lineColor":                 "#556B2F",
    "sysml.connector.fillColor":                "#4682B4",
    "sysml.connector.lineColor":                "#2F4F4F",
    "sysml.package.fillColor":                  "#B0C4DE",
    "sysml.package.lineColor":                  "#4682B4"
}

let prefManager;

// Prefix used to match view class names to dictionary keys
const prefixMap = {
    "DFD": "dfd",
    "FC": "flowchart",
    "UML": "uml",
    "SysML": "sysml",
    "ERD": "erd"
};

// Set all custom colors defined in `dict`
function setColors() {
    for (const key of Object.keys(dict)) {
        prefManager.set(key, dict[key]);
    }
}

// Reset all colors to default (null)
function setDefault() {
    for (const key of Object.keys(dict)) {
        prefManager.set(key, null);
    }
}

// Apply color settings to the currently active diagram
function applyOnDiagram() {
    const diagram = app.diagrams.getCurrentDiagram();

    if (!diagram) return;

    for (const view of diagram.ownedViews) {
        let className = view.getClassName();
        let prefix = "";

        // Identify the correct prefix (e.g., "sysml", "uml", etc.)
        for (const key of Object.keys(prefixMap)) {
            if (className.startsWith(key)) {
                prefix = prefixMap[key] + ".";
                className = className.substring(key.length);
                break;
            }
        }

        const baseName = className.replace("View", "").toLowerCase();

        const fillKey = prefix + baseName + ".fillColor";
        const lineKey = prefix + baseName + ".lineColor";

        const fillColor = prefManager.get(fillKey);
        const lineColor = prefManager.get(lineKey);

        if (fillColor !== null) view.fillColor = fillColor;
        if (lineColor !== null) view.lineColor = lineColor;
    }

    app.diagrams.repaint();
}

// Register commands with StarUML
function init() {
    prefManager = app.preferences;
    app.commands.register("color:set", setColors);
    app.commands.register("color:default", setDefault);
    app.commands.register("color:apply", applyOnDiagram);
}

exports.init = init;
