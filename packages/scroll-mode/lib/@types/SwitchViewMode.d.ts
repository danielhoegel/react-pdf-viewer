import { ViewMode, type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type RenderSwitchViewModeProps } from './types/RenderSwitchViewModeProps';
import { type StoreProps } from './types/StoreProps';
type RenderSwitchViewMode = (props: RenderSwitchViewModeProps) => React.ReactElement;
export interface SwitchViewModeProps {
    children?: RenderSwitchViewMode;
    mode: ViewMode;
}
export declare const SwitchViewMode: React.FC<{
    children?: RenderSwitchViewMode;
    mode: ViewMode;
    store: Store<StoreProps>;
}>;
export {};
