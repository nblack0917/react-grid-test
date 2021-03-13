import React from 'react'
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import '../../node_modules/react-grid-layout/css/styles.css'
import '../../node_modules/react-resizable/css/styles.css'
import './GridComp.css'

const ReactGridLayout = WidthProvider(RGL);

class MyFirstGrid extends React.Component {
    static defaultProps = {
        className: "layout",
        items: 5,
        cols: 12,
        rowHeight:30 ,
        width: 500,
        onLayoutChange: function() {},
        // This turns off compaction so you can place items wherever.
        verticalCompact: false
      };
      constructor(props) {
        super(props);
    
        const layout = this.generateLayout();
        this.state = { layout };
      }

      generateDOM() {
        return _.map(_.range(this.props.items), function(i) {
          return (
            <div key={i} className="gridBox">
              <span className="text">{i}</span>
            </div>
          );
        });
      }

      generateLayout() {
        const p = this.props;
        return _.map(new Array(p.items), function(item, i) {
          const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
          return {
            x: (i * 2) % 12,
            y: Math.floor(i / 6) * y,
            w: 2,
            h: y,
            i: i.toString(),
            isResizable: false,
          };
        });
      }

      onLayoutChange(layout) {
        this.props.onLayoutChange(layout);
      }

      onDragStop(layout) {
          console.log(layout)
      }

  render() {
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      {i: '0', x: 2, y: 5, w: 4, h: 1, isResizable: false, isDraggable: true},
      {i: '1', x: 2, y: 2, w: 2, h: 6, isResizable: false, isDraggable: true},
      {i: '2', x: 2, y: 4, w: 4, h: 8, isResizable: false, isDraggable: true},
      {i: '3', x: 2, y: 5, w: 0, h: 7, isResizable: false, isDraggable: true},
      {i: '4', x: 2, y: 5, w: 8, h: 0, isResizable: false, isDraggable: true},
    ];
    return (
        <div className="gridContainer">
            <ReactGridLayout
            
              layout={layout}
              onLayoutChange={this.onLayoutChange}
              onDragStop={this.onDragStop}
              isBounded={true}
              {...this.props}
            >
              {this.generateDOM()}
            </ReactGridLayout>
        </div>
      );
  }
}

export default MyFirstGrid;