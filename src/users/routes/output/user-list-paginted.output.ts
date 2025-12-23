import {UserOutput} from "./user-output";

export type UserListQueryOutput = {
    pageCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: UserOutput[];
}