import React, { useRef, useEffect } from "react";
import WebViewer from "@pdftron/webviewer";
import "./App.css";

const App = () => {
    const viewer = useRef(null);

    // if using a class, equivalent of componentDidMount
    useEffect(() => {
        WebViewer(
            {
                path: "/webviewer/lib",
                licenseKey:
                    "demo:1687163586420:7d9c607f03000000009d77a8d8d8163d19b0629fa2cd6d05536e45fdbf",
                enableOfficeEditing: true,
                enableFilePicker: true,
            },
            viewer.current
        ).then((instance) => {
            const { documentViewer, annotationManager, Annotations } =
                instance.Core;

            instance.UI.setHeaderItems((header) => {
                header.push({
                    type: "actionButton",
                    img: "...",
                    onClick: async () => {
                        const doc = documentViewer.getDocument();
                        const data = await doc.getFileData({
                            downloadType: "office",
                        });
                        const arr = new Uint8Array(data);
                        const blob = new Blob([arr], {
                            type: "application/docx",
                        });

                        // Add code for handling Blob here
                        const url = URL.createObjectURL(blob);
                        window.open(url);
                    },
                });
            });
        });
    }, []);

    return (
        <div className="App">
            <div className="header">React sample</div>
            <div className="webviewer" ref={viewer}></div>
        </div>
    );
};

export default App;
