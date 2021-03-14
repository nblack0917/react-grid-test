import React from 'react'
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import '../../node_modules/react-grid-layout/css/styles.css'
import '../../node_modules/react-resizable/css/styles.css'
import './GridComp.css'

const ReactGridLayout = WidthProvider(RGL);

let itemNum = 9;
let nextItemNum = 0;

class MyFirstGrid extends React.Component {
    static defaultProps = {
        className: "layout",
        items: itemNum,
        cols: 12,
        rowHeight: 47,
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
            {i: '1', x: 6, y: 3, w: 2, h: 3, minH: 2, maxH: 2, isResizable: false, isDraggable: true},
            {i: '2', x: 8, y: 0, w: 1, h: 1, minH: 2, maxH: 2, isResizable: false, isDraggable: true},
            {i: '3', x: 8, y: 3, w: 3, h: 3, minH: 2, maxH: 2, isResizable: false, isDraggable: true},
            {i: '4', x: 6, y: 0, w: 2, h: 2, minH: 2, maxH: 2, isResizable: false, isDraggable: true},
            {i: '5', x: 0, y: 4, w: 2, h: 2, minH: 2, maxH: 2, isResizable: false, isDraggable: true},
            {i: '6', x: 9, y: 0, w: 2, h: 2, minH: 2, maxH: 2, isResizable: false, isDraggable: true},
            {i: '7', x: 3, y: 5, w: 1, h: 1, minH: 2, maxH: 1, isResizable: false, isDraggable: true},
            {i: '8', x: 12, y: 0, w: 1, h: 8, static: true},
          ],
        newSizes: [
            {w: 2, h: 1},
            {w: 3, h: 2},
            {w: 2, h: 2},
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

      onLayoutChange(layout) {
        this.props.onLayoutChange(layout);
      }

      onDragStop(layout) {
          console.log(layout)
      }

      //When new item is dropped from outside...
      //get copy of layout state
      //find index and i value of last item
      //create new item based on size and coords of new item with i value of removed item
      //create new last item with i value increased
      //remove last item
      //add new items then add new last item to state copy
      //set state to state copy

      onDrop = (layout, layoutItem, _event) => {

        let newItemSize = this.state.newSizes[nextItemNum]
        console.log(newItemSize)

        // console.log("layout before", layout)
        console.log("layout Item", layoutItem)
        let stateList = this.state.layoutList
        //pull size and coords from dropped item
        const itemX= layoutItem.x; const itemY= layoutItem.y; const itemW= newItemSize.w; const itemH= newItemSize.h;
        // console.log(layoutItem)
        const layoutLength = stateList.length
        const lastItem = parseInt(stateList[layoutLength - 1].i)
        const newIInt = lastItem+1;
        const newIString = newIInt.toString();
        const newItem = {i: lastItem.toString(), x: itemX, y: itemY, w: itemW, h: itemH, minH: 1, maxH: 1, isResizable: false, isDraggable: true}
        const newLastItem = {i: newIString, x: 12, y: 0, w: 1, h: 8, static: true}
  
        stateList.pop()
        itemNum++;
        nextItemNum++;
        stateList.push(newItem);
        stateList.push(newLastItem)
        // console.log("stateList", stateList)
        this.setState({ layoutList: stateList})
        // console.log("layout after", layout)
      };



  render() {
    // console.log("Starting layout", this.state.layoutList)

    //create copy of state to assist in refresh of component
    let newLayout = JSON.parse(JSON.stringify(this.state.layoutList))
    newLayout.x =+ 2

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
                
                  layout={newLayout}
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