export interface ICategoryCreate {
    category_name: string;
    description: string;
    slug: string;
}
export interface IBrandCreate {
    brand_name: string;
    description: string;
}
export interface ICustomerCreate {
    customer_name: string;
    description: string;
}
export interface IProductCreate {
    product_name: string;
    description: string;
}
export interface IStaffCreate {
    staff_name: string;
    description: string;
    email:string;
}
export interface IOrderCreate {
    order_item_id: string;
}
export interface IOrder_itemCreate {
    order_item_name: string;
    description: string;
}