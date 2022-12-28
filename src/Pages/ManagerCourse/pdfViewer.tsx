import * as React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';
import { MinimalButton, Position, RotateDirection, Tooltip } from '@react-pdf-viewer/core';
import { RotateBackwardIcon, RotateForwardIcon } from '@react-pdf-viewer/rotate';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import type { RenderPage, RenderPageProps } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faForward, faBackward} from "@fortawesome/free-solid-svg-icons"
const TOOLTIP_OFFSET = { left: 0, top: 8 };

interface RotateSinglePageWithThumbnailsExampleProps {
    fileUrl: string;
}

interface FloatingToolbarExampleProps {
    fileUrl: string;
}



const PDFViewer: React.FC<FloatingToolbarExampleProps> = ({ fileUrl }) => {
    const toolbarPluginInstance = toolbarPlugin();
    const { Toolbar } = toolbarPluginInstance;
    const thumbnailPluginInstance = thumbnailPlugin();
    const { Thumbnails } = thumbnailPluginInstance;

    const renderPage: RenderPage = (props: RenderPageProps) => (
     <>
         {props.canvasLayer.children}
         <div
             style={{
                 padding: '.25rem',
                 position: 'absolute',
                 right: 0,
                 top: 0,
                 transform: 'translate(100%, 0)',
                 zIndex: 1,
             }}
         >
             <div
                 style={{
                     alignItems: 'center',
                     display: 'flex',
                     justifyContent: 'center',
                     margin: '0 auto',
                 }}
             >
                 <Tooltip
                     position={Position.BottomCenter}
                     target={
                         <MinimalButton onClick={() => props.onRotatePage(RotateDirection.Forward)}>
                             <RotateForwardIcon />
                         </MinimalButton>
                     }
                     content={() => 'Rotate clockwise'}
                     offset={TOOLTIP_OFFSET}
                 />
                 <Tooltip
                     position={Position.BottomCenter}
                     target={
                         <MinimalButton onClick={() => props.onRotatePage(RotateDirection.Backward)}>
                             <RotateBackwardIcon />
                         </MinimalButton>
                     }
                     content={() => 'Rotate counterclockwise'}
                     offset={TOOLTIP_OFFSET}
                 />
             </div>
         </div>
         {props.annotationLayer.children}
         {props.textLayer.children}
     </>
 );


    return (
        <div
            className="rpv-core__viewer"
            style={{
                border: '1px solid rgba(0, 0, 0, 0.3)',
                display: 'flex',
                height: '100%',
                position: 'relative',
            }}
        >


            <div
                style={{
                    borderRight: '1px solid rgba(0, 0, 0, 0.1)',
                    width: '15%',
                    height: "100%",
                    padding: 0
                }}
            >
                <Thumbnails />
            </div>
            <div
                style={{
                    flex: 1,
                    overflow: 'hidden',
                    position: "relative",
                    padding: "0 0rem 2.5rem 0rem"
                }}
            >

                <Viewer fileUrl={fileUrl} plugins={[toolbarPluginInstance, thumbnailPluginInstance]}  renderPage={renderPage}/>

            <div
                style={{
                    alignItems: 'center',
                    backgroundColor: '#eeeeee',
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    borderRadius: '2px',
                    bottom: '0px',
                    display: 'flex',
                    left: '50%',
                    padding: '4px',
                    position: 'absolute',
                    transform: 'translate(-50%, 0)',
                    zIndex: 1,
                    width: "100%",
                    justifyContent: "center"
                }}
            >
                <Toolbar>
                    {(props: ToolbarSlot) => {
                        const {
                            CurrentPageInput,
                            EnterFullScreen,
                            GoToNextPage,
                            GoToPreviousPage,
                            NumberOfPages,

                        } = props;


                        return (
                            <>

                                <div style={{ padding: '0px 2px'}}>
                                    <GoToPreviousPage>
                                    {(props) => (
                                    <button
                                        style={{
                                            backgroundColor: props.isDisabled ? '#96ccff' : '#357edd',
                                            border: 'none',
                                            borderRadius: '4px',
                                            color: '#ffffff',
                                            cursor: props.isDisabled ? 'not-allowed' : 'pointer',
                                            padding: '8px',
                                        }}
                                        disabled={props.isDisabled}
                                        onClick={props.onClick}
                                    >
                                         <FontAwesomeIcon icon={faBackward}/>
                                    </button>
                                )}
                                    </GoToPreviousPage>
                                </div>
                                <div style={{ padding: '0px 2px', width: '4rem' }}>
                                    <CurrentPageInput />

                                </div>
                                <div style={{ padding: '0px 2px' }}>
                                    / <NumberOfPages />
                                </div>
                                <div style={{ padding: '0px 2px' }}>
                                    <GoToNextPage>
                                    {(props) => (
                                    <button
                                        style={{
                                            backgroundColor: props.isDisabled ? '#96ccff' : '#357edd',
                                            border: 'none',
                                            borderRadius: '4px',
                                            color: '#ffffff',
                                            cursor: props.isDisabled ? 'not-allowed' : 'pointer',
                                            padding: '8px',
                                        }}
                                        disabled={props.isDisabled}
                                        onClick={props.onClick}
                                    >
                                         <FontAwesomeIcon icon={faForward}/>
                                    </button>
                                )}
                                    </GoToNextPage>

                                </div>
                                <div style={{ padding: '0px 2px'}}>
                                    <EnterFullScreen />
                                </div>


                            </>
                        );
                    }}
                </Toolbar>
            </div>
            </div>
        </div>
    );
};

export default PDFViewer;