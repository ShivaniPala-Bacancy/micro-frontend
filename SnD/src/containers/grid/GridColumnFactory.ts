import { ColDef } from 'ag-grid-community';
import GridColumnDef from '../GridColumnDef';
import GridHeaderComponent from './GridHeaderComponent';

/**
 * Helps create Ag-Grid column definition
 */
class GridColumnFactory {
    static default(header: string, field: string): GridColumnDef {
        return new GridColumnDef(header, field);
    }

    static date(header: string, field: string): GridColumnDef {
        return new GridColumnDef(header, field).asDate();
    }

    static number(header: string, field: string): GridColumnDef {
        return new GridColumnDef(header, field).asNumber();
    }

    static amount(header: string, field: string): GridColumnDef {
        return new GridColumnDef(header, field).asAmount();
    }

    static integer(header: string, field: string): GridColumnDef {
        return new GridColumnDef(header, field).asInt();
    }

    static editable(
        header: string,
        field: string,
        editHandler: any,
        editable: boolean
    ): GridColumnDef {
        return new GridColumnDef(header, field).editable(editable, editHandler);
    }

    static action(handler: any, action: string, bulkHandler?: any): ColDef {
        const pinnedDir =
            action &&
                (action == 'arrow-left' || action === 'edit' || action === 'delete' || action === 'select')
                ? 'left'
                : 'right';
        return {
            headerName: action,
            field: undefined,
            width: 35,
            pinned: pinnedDir,
            cellRendererFramework: GridHeaderComponent,
            cellRendererParams: { action, handler },
            headerComponentFramework: GridHeaderComponent,
            headerComponentParams: { action, bulkHandler }
        };
    }
}

export default GridColumnFactory;
