import React from 'react'
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import '../../node_modules/react-grid-layout/css/styles.css'
import '../../node_modules/react-resizable/css/styles.css'
import './GridComp.css'

const ReactGridLayout = WidthProvider(RGL);

let itemNum = 9;

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
            {i: '0', x: 0, y: 0, w: 4, h: 4, minH: 2, maxH: 2, isResizable: false, isDraggable: true, isPlanter: false},
            {i: '1', x: 6, y: 3, w: 2, h: 3, minH: 2, maxH: 2, isResizable: false, isDraggable: true, isPlanter: false},
            {i: '2', x: 8, y: 0, w: 1, h: 1, minH: 2, maxH: 2, isResizable: false, isDraggable: true, isPlanter: true},
            {i: '3', x: 8, y: 3, w: 3, h: 3, minH: 2, maxH: 2, isResizable: false, isDraggable: true, isPlanter: false},
            {i: '4', x: 6, y: 0, w: 2, h: 2, minH: 2, maxH: 2, isResizable: false, isDraggable: true, isPlanter: true},
            {i: '5', x: 0, y: 4, w: 2, h: 2, minH: 2, maxH: 2, isResizable: false, isDraggable: true, isPlanter: true},
            {i: '6', x: 9, y: 0, w: 2, h: 2, minH: 2, maxH: 2, isResizable: false, isDraggable: true, isPlanter: true},
            {i: '7', x: 3, y: 5, w: 1, h: 1, minH: 2, maxH: 1, isResizable: false, isDraggable: true, isPlanter: true},
            {i: '8', x: 12, y: 0, w: 1, h: 8, static: true},
          ],
        newSizes: [
            {w: 2, h: 1, isPlanter: false},
            {w: 3, h: 2, isPlanter: false},
            {w: 2, h: 2, isPlanter: true},
        ],
        currentSize: {} };
        this.onDragStop = this.onDragStop.bind(this);
        this.generateDOM = this.generateDOM.bind(this);
      }

      //builds list of items based on value of i
      //also applies appropriate className depending on isPlanter boolean or lastItem
      //lastItem is invisible barrier to create bounding effect for grid height
      generateDOM() {
        let lastItem = this.state.layoutList.length - 1
        let currentState = this.state.layoutList
        return _.map(_.range(itemNum), function(iKey) {
              if ( currentState[iKey].isPlanter) {
                return (
                    <div key={iKey} className="round">
                      <span className="text">{iKey}</span>
                    </div>
                  );
            } else if ( iKey===lastItem) {
                return (
                    <div key={iKey} className="lastElement">
                    </div>
                  );
            } else {
          return (
            <div key={iKey} className="gridBox">
              <span className="text">{iKey}</span>
            </div>
          );
            }
        });
      }

      onLayoutChange(layout) {
        this.props.onLayoutChange(layout);
        // this.generateDOM()
      }
      
      onDragStop(layout) {
        let stateList = this.state.layoutList
        let newStateList = []
        console.log(layout)

        for ( let gridItem of layout) {
          console.log("gridItem from Layout", gridItem)
          let currentItem = stateList.filter(listItem => listItem.i === gridItem.i );
          console.log("current Item", currentItem[0])
          if ( currentItem[0].x !== gridItem.x || currentItem[0].y !== gridItem.y ) {
            console.log("grid item changed")
            currentItem[0].x = gridItem.x;
            currentItem[0].y = gridItem.y;
          }
          newStateList.push(currentItem[0])
        }
        // let newLayout = layout;
        // layout = this.state.layoutList
        this.setState({ layoutList: newStateList })
        // this.generateDOM()
        // console.log("layoutList", this.state.layoutList)
          // console.log("layout",layout)
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
        

        let newItemSize = this.state.currentSize
        console.log(newItemSize)

        let stateList = this.state.layoutList
        //pull size and coords from dropped item
        const itemX= layoutItem.x; const itemY= layoutItem.y; const itemW= newItemSize.w; const itemH= newItemSize.h; const itemPlanter = newItemSize.isPlanter
        console.log(layoutItem)
        const layoutLength = stateList.length
        const lastItem = parseInt(stateList[layoutLength - 1].i)
        const newIInt = lastItem+1;
        const newIString = newIInt.toString();
        const newItem = {i: lastItem.toString(), x: itemX, y: itemY, w: itemW, h: itemH, minH: 1, maxH: 1, isResizable: false, isDraggable: true, isPlanter: itemPlanter}
        const newLastItem = {i: newIString, x: 12, y: 0, w: 1, h: 8, static: true}
  
        stateList.pop()
        itemNum++;
        stateList.push(newItem);
        stateList.push(newLastItem)
        // console.log("stateList", stateList)
        this.setState({ layoutList: stateList})
        // console.log("layout after", layout)
      };

      dragStart( index) {
        //  console.log("index", index)
         let currentItem = this.state.newSizes[index]
         this.setState({ currentSize: currentItem})
      }
      drag(event) {
        // event.dataTransfer.setData("text/plain", "")
        // console.log(event)

      }

  render() {
    // console.log("Starting layout", this.state.layoutList)

    //create copy of state to assist in refresh of component
    let newLayout = JSON.parse(JSON.stringify(this.state.layoutList))
    newLayout.x =+ 2

    return (
            <div className="container">
                <div className="listContainer">
                  {this.state.newSizes.map((item, index) => {
                    //  console.log(index)
                    let newWidth = item.w * 50;
                    let newHeight = item.h * 50;
                    let planterStyle = {};
                    if (!item.isPlanter) {
                      planterStyle = {
                        width: newWidth,
                        height: newHeight,
                        borderRadius: 5,
                      }
                    } else {
                      planterStyle = {
                        width: newWidth,
                        height: newHeight,
                        borderRadius: '50%',
                      }
                    }
                    return (
                      <div
                          className="droppable-element"
                          draggable={true}
                          unselectable="off"
                          style={planterStyle}
                          // this is a hack for firefox
                          // Firefox requires some kind of initialization
                          // which we can do by adding this attribute
                          // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
                          onDragStart={() => this.dragStart(index)}
                          // onDrag={this.drag}
                          >
                          {item.w} x {item.h}
                      </div>
                    )
                  })}
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