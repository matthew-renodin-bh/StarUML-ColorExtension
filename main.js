
let dict = {
    // UML diagrams
    "uml.class":             { fillColor: "#d8e1f8", lineColor: "#5c82b0" },
    "uml.interface":         { fillColor: "#ffffcd", lineColor: "#c4c486" },
    "uml.enumeration":       { fillColor: "#f4d3d3", lineColor: "#cc9999" },
    "uml.actor":             { fillColor: "#ffffff", lineColor: "#999999" },
    "uml.package":           { fillColor: "#fff2e4", lineColor: "#e6d0b7" },
    "uml.usecase":           { fillColor: "#d6ffae", lineColor: "#8fb96b" },
    "uml.action":            { fillColor: "#d8e1f8", lineColor: "#5c82b0" },
    "uml.controlnode":       { fillColor: "#cce18d", lineColor: "#7c9e3c" },
    "uml.node":              { fillColor: "#f1d9c2", lineColor: "#c2aa8f" },
    "uml.component":         { fillColor: "#e1e5fa", lineColor: "#a0a6d6" },
    "uml.artifact":          { fillColor: "#e3ffc9", lineColor: "#a2d987" },
    "uml.port":              { fillColor: "#c082ff", lineColor: "#9955cc" },

    // Flowchart diagrams
    "flowchart.terminator":           { fillColor: "#9acef6", lineColor: "#669fd6" },
    "flowchart.process":              { fillColor: "#fff07c", lineColor: "#d6c757" },
    "flowchart.decision":             { fillColor: "#cce18d", lineColor: "#8fb657" },
    "flowchart.database":             { fillColor: "#f8a9cc", lineColor: "#d97fa7" },
    "flowchart.document":             { fillColor: "#8acd8a", lineColor: "#5da35d" },
    "flowchart.predefined-process":   { fillColor: "#ddc8c3", lineColor: "#bca29e" },
    "flowchart.data":                 { fillColor: "#dee7fe", lineColor: "#aab6e7" },
    "flowchart.manual-input":         { fillColor: "#edeffa", lineColor: "#c0c3d7" },

    // ✅ SysML diagrams
    "sysml.block":            { fillColor: "#4682B4", lineColor: "#2F4F4F" },
    "sysml.requirement":      { fillColor: "#FFFFF0", lineColor: "#BDB76B" },
    "sysml.constraintblock":  { fillColor: "#D3D3D3", lineColor: "#A9A9A9" },
    "sysml.valuetype":        { fillColor: "#FFFFF0", lineColor: "#BDB76B" },
    "sysml.port":             { fillColor: "#008080", lineColor: "#004C4C" },
    "sysml.fullport":         { fillColor: "#20B2AA", lineColor: "#006666" },
    "sysml.proxyport":        { fillColor: "#5F9EA0", lineColor: "#2F4F4F" },
    "sysml.flowport":         { fillColor: "#6B8E23", lineColor: "#556B2F" },
    "sysml.itemflow":         { fillColor: "#6B8E23", lineColor: "#556B2F" },
    "sysml.connector":        { fillColor: "#4682B4", lineColor: "#2F4F4F" },
    "sysml.package":          { fillColor: "#B0C4DE", lineColor: "#4682B4" }


}

// Prefix used in class names
let prefix = {
    "DFD": "dfd",
    "FC": "flowchart",
    "UML": "uml",
    "SysML": "sysml",
    "ERD": "erd"
}


function setColors() {
    for (const key of Object.keys(dict)) {
        prefManager.set(key, dict[key])
    }

}

function setDefault() {
    for (const key of Object.keys(dict)) {
        prefManager.set(key, null)
    }
}

function applyOnDiagram() {
    let diagram = app.diagrams.getCurrentDiagram()
    for (const view of diagram.ownedViews) {

        // Build the preference Id using the class name and the class prefix
        let name = view.getClassName()
        let prefId = ""
        
        // TODO check Multi-Document and Manuel-input

        for (const key of Object.keys(prefix)) {
            if (name.startsWith(key)) {
                prefId += prefix[key] + "."
                name = name.substr(key.length)
                break;
            }
        }
        prefId += name.replace("View", "").toLowerCase()+".fillColor"

        // Change the element color
        let prefColor = prefManager.get(prefId)
        if (prefColor != null) view.fillColor = prefColor
    }
    app.diagrams.repaint()
}



let prefManager;
function init() {
    app.commands.register('color:set', setColors)
    app.commands.register('color:default', setDefault)
    app.commands.register('color:apply', applyOnDiagram)
    prefManager = app.preferences
}

exports.init = init
