import React from 'react';
import FrameTable from '../FrameTable/FrameTable';
import FrameList from '../FrameList/FrameList';
import Button from '../Button/Button';

const FramePage = ({ tableData, selected, selectFrame, copiedFrame, copyFrame }) => {
    return (
        <React.Fragment>
            <FrameList selected={selected} selectFrame={selectFrame} />
            <Button onClick={copyFrame}>Copy Frames</Button>
            <FrameTable
                selected={selected}
                tableData={tableData}
                copiedFrame={copiedFrame}
            />
        </React.Fragment>
    )
}

export default FramePage;

