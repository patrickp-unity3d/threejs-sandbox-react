import React from "react";
import { Vector3 } from 'three'

export type panelProps = {
    setRotation: (Vector3) => void
 };

export const Panel = ({setRotation}: panelProps) => {
    
    return (
        <div className="panel">
            <div className="panel__title">Panel</div>
            <div className="panel__item__preset1" onClick={() => setRotation(new Vector3(0,90,0))}>
                <div className="panel__item__preset1__label">Left Preset</div>
            </div>
            <div className="panel__item__preset2" onClick={() => setRotation(new Vector3(0,0,0))}>
                <div className="panel__item__preset2__label">Front Preset</div>
            </div>
        </div>
    );
};