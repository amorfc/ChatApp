import * as React from 'react'
import {RefObject} from "react";

export const navigationRef: RefObject<any> = React.createRef()

export function navigate(targetName:string,param:any):void {
    navigationRef.current?.navigate(targetName,param)
}

