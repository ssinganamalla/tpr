/*
    GVis -- A Google Visualization Simplification Layer
    
    Author: Chris Hager (chris [at] linuxuser.at)
      Date: December 2008
   License: GPLv3
      Home: http://code.google.com/p/gvis/
*/
       
function GVis(chartDiv, chart_type, div_id) {    
    this.column_labels = new Array();
    this.get_gChart = function(type) {
        if (type == "table")          return google.visualization.Table;
        if (type == "piechart")       return google.visualization.PieChart;
        if (type == "barchart")       return google.visualization.BarChart;
        if (type == "columnchart")    return google.visualization.ColumnChart;
        if (type == "areachart")      return google.visualization.AreaChart;
        if (type == "linechart")      return google.visualization.LineChart;
        if (type == "scatterchart")   return google.visualization.ScatterChart;
        if (type == "imagesparkline") return google.visualization.ImageSparkLine;
        if (type == "intensitymap")   return google.visualization.IntensityMap;
        if (type == "geomap")         return google.visualization.GeoMap;
    }

    this.data = new google.visualization.DataTable();    
    this.currentRow = 0;   

    this.setType = function(type) {
        obj = this.get_gChart(type);
        this.chart = new obj(chartDiv);
        this.chart_type = type;
        chartDiv.innerHTML = "";
        if (type == "geomap") {
            google.visualization.events.addListener(this.chart, 'regionClick', function(a) { addRegionData(a.region, a.region); });
        } 
    }

    // Set Parameters
    //if (chartDiv)     { this.div_id = div_id;     } else { return alert("No Container-Object Specified!"); }
    if (chart_type) { this.setType(chart_type); } else { this.setType("piechart") }
        
    this.clear = function() {
        // Removes all Rows and Columns
        this.column_labels = new Array();
        this.columnInfo = [];
        this.data.removeRows(0, this.data.getNumberOfRows());
        this.data.removeColumns(0, this.data.getNumberOfColumns());    
    }
    
    this.setColumnLabels = function(arr) {
        this.column_labels = arr;
    }

    this.addColumns = function(params) {
        // params Format: { 'text': 'type', ... } eg { 'Task': 'string', 'Hours': 'number' }
        for (param in params) {
            this.data.addColumn(params[param], param);        
        }
    }

    this.setRows = function(rows) {
        // Removes all rows, then adds the new ones
//        this.data = new google.visualization.DataTable();
        this.data.removeRows(0, this.data.getNumberOfRows());
        this.currentRow = 0;
        this.addRows(rows);
    }    
    this.addRows = function(rows) {
        // rows Format: [item1, item2, item3]
        // item Format: [col1, col2, ...]
        for (var i=0; i<rows.length; i++) {
            this.addRow(rows[i]);
        }
    }
    
    this.columnInfo = new Array();
    this.addRow = function(items) {
        // items Format: ['a', 3] ...
        if (items.length == 0) return ;

        // 1. Check if Columns Exists (if not, try to guess and create them
        if (this.data.getNumberOfColumns() < items.length) {
            // Too Few Columns. Try to guess and create each of the new ones
            for (var i=this.data.getNumberOfColumns(); i<items.length; i++) {
                // 1. Test: Is Boolean?
                // 2. Is Numeric?
                // 3. -> String
                if (this.column_labels[i]) {
                    l = this.column_labels[i];
                } else {
                    l = "";
                }
                if ((items[i] === true) || (items[i] === false)) {
                    this.data.addColumn("boolean", l);
                    this.columnInfo.push([l, "boolean"]);                         
                } else if (String(parseInt(items[i])) == String(items[i])) {
                    this.data.addColumn("number", l);
                    this.columnInfo.push([l, "number"]);                         
                } else {
                    this.data.addColumn("string", l);                
                    this.columnInfo.push([l, "string"]);                         
                }
            }
        }

        // 2. Add 1 Row
        this.data.addRows(1);
        for (var column=0; column<items.length; column++) {
            this.data.setValue(this.currentRow, column, items[column]);
        }
        this.currentRow++;
    }

    this.getColumnInfo = function() { return this.columnInfo; }
    this.draw = function(extraParams) {
        if (!("height" in extraParams)) { extraParams["height"] = 360; }
        if (!("width" in extraParams))  { extraParams["width"] = 600; }
        this.chart.draw(this.data, extraParams);
    }
}
