/**
 * @export
 * @interface ISearchColumn
 */
export interface ISearchColumn {
    columnName: string;
    columnValue: string;
}

/**
 * @export
 * @interface ISearchParamRequest
 */
export interface ISearchParamRequest {
    orAnd: string;
    params: [ISearchColumn];
}
export function GetSearchQuery(body: ISearchParamRequest) {
    const orAnd = body.orAnd.toLowerCase();
    const params: any[] = [];
    let query = {};

    body.params.forEach((item: any) => {
        const k = dynmObj(item.columnName.toString(), item.columnValue);

        params.push(k);
    });
    if (orAnd === "or") {
        query = { $or: params };
    } else {
        query = { $and: params };
    }
    return query;
}
export function dynmObj(a: string, b: any) {
    const json = {
        [a]: { $regex: b, $options: "i" },
    };

    return json;
}
