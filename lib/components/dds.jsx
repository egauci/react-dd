'use strict';

import React from 'react';

let DDS = React.createClass({
  propTypes: {
    config: React.PropTypes.shape({meta: React.PropTypes.object.isRequired,
                                   list: React.PropTypes.array.isRequired}).isRequired,
    callBack: React.PropTypes.func.isRequired
  },
  onDragStart(e) {
    let id = e.currentTarget.getAttribute('data-id'),
        pos = e.currentTarget.getAttribute('data-pos');
    console.log('onDragStart: ' + id + ', pos: ' + pos);
    e.dataTransfer.setData('text', '');
    this.props.callBack({
      action: 'onDragStart',
      id: id,
      pos: parseInt(pos, 10)
    });
  },
  onDragOver(e) {
    let id = e.currentTarget.getAttribute('data-id'),
        pos = e.currentTarget.getAttribute('data-pos');
    //console.log('onDragOver: ' + id + ', pos: ' + pos);
    if (this.props.config.meta.dragging !== id) {
      if (this.props.config.meta.dragging) {
        e.preventDefault();
      }
      if (id !== this.props.config.meta.over) {
        console.log('Calling onDragOver callback: ' + id);
        this.props.callBack({
          action: 'onDragOver',
          id: id,
          pos: parseInt(pos, 10)
        });
      }
    }
  },
  onDrop(e) {
    console.log('onDrop');
    this.props.callBack({
      action: 'onDrop'
    });
  },
  onDragEnd(e) {
    console.log('onDragEnd');
    this.props.callBack({
      action: 'onDragEnd'
    });
  },
  onDragLeave(e) {
    console.log('onDragLeave');
    this.props.callBack({
      action: 'onDragLeave'
    });
  },
  render() {
    return (
      <div className="dds">
        <ul>
          {
            this.props.config.list.map((itm, ix) => {
              return (
                <li
                  key={itm.id}
                  data-id={itm.id}
                  data-pos={String(ix)}
                  draggable="true"
                  tabIndex={this.props.config.meta.dragging !== itm.id ? "0" : null}
                  aria-grabbed= {(this.props.config.meta.dragging &&
                                 this.props.config.meta.dragging === itm.id) ?
                                 "true" : "false"}
                  aria-dropeffect={(this.props.config.meta.dragging &&
                                 this.props.config.meta.dragging !== itm.id) ?
                                 "move" : "none"}
                  className={(this.props.config.meta.over &&
                              this.props.config.meta.over === itm.id &&
                              this.props.config.meta.dragging !== itm.id) ?
                              "over" : ""}
                  onDragStart={this.onDragStart}
                  onDragOver={this.onDragOver}
                  onDrop={this.onDrop}
                  onDragEnd={this.onDragEnd}
                  onDragLeave={this.onDragLeave}
                >
                  {itm.label}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }

});

export default DDS;
