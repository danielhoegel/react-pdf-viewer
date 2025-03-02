/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */

'use client';

import { useDebounceCallback, useIsomorphicLayoutEffect, type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';

const WHEEL_EVENT_OPTIONS = {
    passive: false,
};

let svgElement: SVGSVGElement;
const createSvgElement = () => {
    return svgElement || (svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg'));
};

export const PinchZoom: React.FC<{
    pagesContainerRef: React.RefObject<HTMLDivElement>;
    store: Store<StoreProps>;
}> = ({ pagesContainerRef, store }) => {
    const zoomTo = useDebounceCallback((scale: number) => {
        const zoom = store.get('zoom');
        if (zoom) {
            zoom(scale);
        }
    }, 40);

    const handleWheelEvent = (e: WheelEvent) => {
        if (!e.ctrlKey) {
            // Users pan the trackpad
            return;
        }
        // Users pinch the trackpad
        e.preventDefault();

        const target = e.target as HTMLElement;
        const rect = target.getBoundingClientRect();
        const scaleDiff = 1 - e.deltaY / 100;

        const alternativeScaleDiff = Math.pow(0.9, e.deltaY * -0.01);

        const originX = e.clientX - rect.left;
        const originY = e.clientY - rect.top;

        const currentScale = store.get('scale');
        const matrix = createSvgElement()
            .createSVGMatrix()
            .translate(originX, originY)
            .scale(alternativeScaleDiff)
            .translate(-originX, -originY)
            .scale(currentScale);

        console.log('handleWheelEvent', {
            target,
            rect,
            deltaY: e.deltaY,
            scaleDiff,
            alternativeScaleDiff,
            originX,
            originY,
            currentScale,
            matrix,
        });

        zoomTo(matrix.a);
    };

    useIsomorphicLayoutEffect(() => {
        const pagesContainer = pagesContainerRef.current;
        if (!pagesContainer) {
            return;
        }
        pagesContainer.addEventListener('wheel', handleWheelEvent, WHEEL_EVENT_OPTIONS);
        return () => {
            pagesContainer.removeEventListener('wheel', handleWheelEvent);
        };
    }, []);

    return <></>;
};
