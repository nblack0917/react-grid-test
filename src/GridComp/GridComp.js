import React from 'react'
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import '../../node_modules/react-grid-layout/css/styles.css'
import '../../node_modules/react-resizable/css/styles.css'
import './GridComp.css'

const ReactGridLayout = WidthProvider(RGL);

let itemNum = 9;

// const layoutList = [
//     {i: '0', x: 0, y: 0, w: 4, h: 4, minH: 2, maxH: 2, isResizable: false, isDraggable: true},
//     {i: '1', x: 5, y: 3, w: 2, h: 4, minH: 2, maxH: 2, isResizable: false, isDraggable: true},
//     {i: '2', x: 9, y: 0, w: 2, h: 3, minH: 2, maxH: 2, isResizable: false, isDraggable: true},
//     {i: '3', x: 8, y: 3, w: 3, h: 3, minH: 2, maxH: 2, isResizable: false, isDraggable: true},
//     {i: '4', x: 5, y: 0, w: 2, h: 3, minH: 2, maxH: 2, isResizable: false, isDraggable: true},
//     {i: '5', x: 9, y: 9, w: 2, h: 3, minH: 2, maxH: 2, isResizable: false, isDraggable: true},
//     {i: '6', x: 7, y: 0, w: 2, h: 3, minH: 2, maxH: 2, isResizable: false, isDraggable: true},
//     {i: '7', x: 12, y: 0, w: 1, h: 13, static: true},
//   ];

class MyFirstGrid extends React.Component {
    static defaultProps = {
        className: "layout",
        items: itemNum,
        cols: 12,
        rowHeight: 27,
        width: 500,
        onLayoutChange: function() {},
        // This turns off compaction so you can place items wherever.
        // verticalCompact: false,
        compactType: null,
        preventCollision: true,
      };
      constructor(props) {
        super(props);
    
        // const layout = this.generateLayout();
        // this.state = { layoutList };
        this.state = { layoutList: [
            {i: '0', x: 0, y: 0, w: 4, h: 4, minH: 2, maxH: 2, isResizable: false, isDraggable: true},
            {i: '1', x: 5, y: 3, w: 2, h: 4, minH: 2, maxH: 2, isResizable: false, isDraggable: true},
            {i: '2', x: 9, y: 0, w: 2, h: 3, minH: 2, maxH: 2, isResizable: false, isDraggable: true},
            {i: '3', x: 8, y: 3, w: 3, h: 3, minH: 2, maxH: 2, isResizable: false, isDraggable: true},
            {i: '4', x: 5, y: 0, w: 2, h: 3, minH: 2, maxH: 2, isResizable: false, isDraggable: true},
            {i: '5', x: 9, y: 9, w: 2, h: 3, minH: 2, maxH: 2, isResizable: false, isDraggable: true},
            {i: '6', x: 7, y: 0, w: 2, h: 3, minH: 2, maxH: 2, isResizable: false, isDraggable: true},
            {i: '7', x: 2, y: 8, w: 1, h: 1, minH: 2, maxH: 1, isResizable: false, isDraggable: true},
            {i: '8', x: 12, y: 0, w: 1, h: 13, static: true},
          ] };
      }

      generateDOM() {
        let lastItem = this.state.layoutList.length - 1
        return _.map(_.range(itemNum), function(i) {
            // console.log(i)
            if ( i===2 || i === 4 || i === 5 || i === 6) {
                return (
                    <div key={i} className="round">
                      <span className="text">{i}</span>
                    </div>
                  );
            } else if ( i===lastItem) {
                return (
                    <div key={i} className="lastElement">
                      {/* <span className="text">{i}</span> */}
                    </div>
                  );
            } else {
          return (
            <div key={i} className="gridBox">
              <span className="text">{i}</span>
            </div>
          );
            }
        });
      }

    //   generateLayout() {
    //     const p = this.props;
    //     return _.map(new Array(p.items), function(item, i) {
    //       const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
    //       return {
    //         x: (i * 2) % 12,
    //         y: Math.floor(i / 6) * y,
    //         w: y,
    //         h: y,
    //         i: i.toString(),
    //         isResizable: false,
    //         minH: 1,
    //         maxH: 1,
    //       };
    //     });
    //   }

      onLayoutChange(layout) {
        this.props.onLayoutChange(layout);
      }

      onDragStop(layout) {
          console.log(layout)
      }
      onDrop = (layout, layoutItem, _event) => {
        // alert(`Dropped element props:\n${JSON.stringify(layoutItem, ['x', 'y', 'w', 'h'], 2)}`);
        console.log("layout before", layout)
        let stateList = this.state.layoutList
        const itemX= layoutItem.x; const itemY= layoutItem.y; const itemW= layoutItem.w; const itemH= layoutItem.h;
        console.log(layoutItem)
        const layoutLength = stateList.length
        const lastItem = parseInt(stateList[layoutLength - 1].i)
        // const lastItem = layoutList[layoutLength - 1]
        const newIInt = lastItem+1;
        const newIString = newIInt.toString();
        const newItem = {i: lastItem.toString(), x: itemX, y: itemY, w: itemW, h: itemH, minH: 1, maxH: 1, isResizable: false, isDraggable: true}
        const newLastItem = {i: newIString, x: 12, y: 0, w: 1, h: 13, static: true}
        // for (let item in layoutList) {
        //     if (parseInt(layoutList[item].i) === lastItem) {
        //         layoutList[item] = {i: newIString, x: 12, y: 0, w: 1, h: 13, static: true}
        //         break;
        //     }
        // }
        layout.pop()
        itemNum++;
        // this.state.layout.items++
        layout.push(newItem)
        layout.push(newLastItem)
        console.log("itemX", itemX)
        console.log("stateList", stateList)
        this.setState({ layoutList: stateList})
        console.log("layout after", layout)
        // console.log("lastItem", lastItem)
        // console.log("newIString", newIString)
        // console.log("itemNum", itemNum)
        // console.log("layout Item", this.state.layoutItem)
        // console.log("_event", _event)
        // this.onLayoutChange(this.state.layoutList)

      };

      componentDidUpdate(layout) {
          this.generateDOM()
          this.onLayoutChange(layout)
        //   console.log(this.state.layoutList)
      }

  render() {
    // layout is an array of objects, see the demo for more complete usage
    // console.log(this.state.layoutList)
    return (
            <div>
                <div
                    className="droppable-element"
                    draggable={true}
                    unselectable="on"
                    // this is a hack for firefox
                    // Firefox requires some kind of initialization
                    // which we can do by adding this attribute
                    // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
                    onDragStart={e => e.dataTransfer.setData("text/plain", "")}
                    >
                    Droppable Element (Drag me!)
                </div>
                        <div className="gridContainer">
                <ReactGridLayout
                
                  layout={this.state.layoutList}
                  onLayoutChange={this.onLayoutChange}
                  onDragStop={this.onDragStop}
                  isBounded={true}
                  onDrop={this.onDrop}
                  isDroppable={true}
                  {...this.props}
                >
                  {this.generateDOM()}
                </ReactGridLayout>
                        </div>
            </div>
      );
  }
}

export default MyFirstGrid;