export type ProductOrderItemStateType =
    | 'acknowledged'
    | 'rejected'
    | 'pending'
    | 'held'
    | 'inProgress'
    | 'cancelled'
    | 'completed'
    | 'failed'
    | 'assessingCancellation'
    | 'pendingCancellation';

export const ProductOrderItemStateType = {
    Acknowledged: 'acknowledged' as ProductOrderItemStateType,
    Rejected: 'rejected' as ProductOrderItemStateType,
    Pending: 'pending' as ProductOrderItemStateType,
    Held: 'held' as ProductOrderItemStateType,
    InProgress: 'inProgress' as ProductOrderItemStateType,
    Cancelled: 'cancelled' as ProductOrderItemStateType,
    Completed: 'completed' as ProductOrderItemStateType,
    Failed: 'failed' as ProductOrderItemStateType,
    AssessingCancellation: 'assessingCancellation' as ProductOrderItemStateType,
    PendingCancellation: 'pendingCancellation' as ProductOrderItemStateType
};
