import {ICellRendererComp, ICellRendererParams} from 'ag-grid-community';

class BaseCellRenderer implements ICellRendererComp {
    eGui: HTMLElement = document.createElement('div');

    /** Get the cell to refresh. Return true if successful.
     * Return false if not (or you don't have refresh logic),
     * then the grid will refresh the cell for you. */
    refresh() {
        return true;
    }

    /** Return the DOM element of your component, this is what the grid puts into the DOM */
    getGui() {
        return this.eGui;
    }

    /** Gets called once by grid when the component is being removed; if your component needs to do any cleanup, do it here */
    destroy() {
        return this.eGui;
    }

    /** A hook to perform any necessary operation just after the GUI for this component has been rendered
     on the screen.
     If a parent popup is closed and reopened (e.g. for filters), this method is called each time the component is shown.
     This is useful for any
     logic that requires attachment before executing, such as putting focus on a particular DOM
     element. The params has one callback method 'hidePopup', which you can call at any later
     point to hide the popup - good if you have an 'Apply' button and you want to hide the popup
     after it is pressed. */
    afterGuiAttached() {
        console.log('abc');
    }

    /** The init(params) method is called on the component once. See below for details on the parameters. */
    init(params: ICellRendererParams) {
        this.eGui.nodeValue = `${params.value}(rendered)`;
    }
}

export default BaseCellRenderer;
