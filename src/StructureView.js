import React from 'react';
import bytes from 'bytes';

const StructureView = ({directory, path, objects, onPush, onPop, onSlice }) => {
  return (
    <div>
      <div>
        {path.map((dir, i) => {
          return (
            <span key={i}><a onClick={event => onSlice(event, i)}>{dir}</a>{'\\'}</span>
          );
        })}
      </div>
      <ul>
        {
          Object.keys(directory).map((key, i) => {
            return (<li key={i}><a onClick={(e) => onPush(e, directory[key], key)}>{key}&nbsp;{typeof directory[key] === 'number' ? <span>{bytes(objects[directory[key]].file_size)}</span> : null}</a></li>);
          })
        }
        { path.length >= 1 ? <li><a onClick={onPop}>..</a></li> : null }
      </ul>
    </div>
  );
}

export default StructureView;