export interface PopupInterface {
    open: boolean,
    content?: JSX.Element | undefined,
    title:string
}


export interface CustomOption {
    id: string;
    name: string;
    price?:string;

}


