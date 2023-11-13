import { MantineListInferencer } from "@refinedev/inferencer/mantine";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

import React from "react";
import {
    IResourceComponentsProps,
    GetManyResponse,
    useMany,
} from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { ScrollArea, Table, Pagination, Group } from "@mantine/core";
import {
    List,
    EditButton,
    ShowButton,
    DeleteButton,
    DateField,
} from "@refinedev/mantine";

export const SalesList: React.FC<IResourceComponentsProps> = () => {
    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [

            {
                id: "storeId",
                header: "Loja",
                accessorKey: "storeId",
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        storeData: GetManyResponse;
                    };

                    const store = meta.storeData?.data?.find(
                        (item) => item.id == getValue<any>(),
                    );

                    return store?.name ?? "Loading...";
                },
            },
            {
                id: "store_userId",
                header: "Vendedor",
                accessorKey: "store_userId",
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        storeUserData: GetManyResponse;
                    };

                    const storeUser = meta.storeUserData?.data?.find(
                        (item) => item.id == getValue<any>(),
                    );

                    return storeUser?.name ?? "Loading...";
                },
            },
            {
                id: "value",
                accessorKey: "value",
                header: "Value",
            },
            {
                id: "date",
                accessorKey: "date",
                header: "Data",
                cell: function render({ getValue }) {
                    return <DateField value={getValue<any>()} />;
                },
            },
            {
                id: "product",
                header: "Produto",
                accessorKey: "product",
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        productData: GetManyResponse;
                    };

                    const product = meta.productData?.data?.find(
                        (item) => item.id == getValue<any>(),
                    );

                    return product?.name ?? "Loading...";
                },
            },
            {
                id: "actions",
                accessorKey: "id",
                header: "Actions",
                cell: function render({ getValue }) {
                    return (
                        <Group spacing="xs" noWrap>
                            <ShowButton
                                hideText
                                recordItemId={getValue() as string}
                            />
                        </Group>
                    );
                },
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: {
            setCurrent,
            pageCount,
            current,
            tableQueryResult: { data: tableData },
        },
    } = useTable({
        columns,
    });

    const { data: storeData } = useMany({
        resource: "stores",
        ids: tableData?.data?.map((item) => item?.storeId) ?? [],
        queryOptions: {
            enabled: !!tableData?.data,
        },
    });

    const { data: storeUserData } = useMany({
        resource: "store_users",
        ids: tableData?.data?.map((item) => item?.store_userId) ?? [],
        queryOptions: {
            enabled: !!tableData?.data,
        },
    });

    const { data: productData } = useMany({
        resource: "products",
        ids: tableData?.data?.map((item) => item?.product) ?? [],
        queryOptions: {
            enabled: !!tableData?.data,
        },
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
            storeData,
            storeUserData,
            productData,
        },
    }));

    return (
        <List>
            <ScrollArea>
                <Table highlightOnHover>
                    <thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th key={header.id}>
                                            {!header.isPlaceholder &&
                                                flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )}
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {getRowModel().rows.map((row) => {
                            return (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </ScrollArea>
            <br />
            <Pagination
                position="right"
                total={pageCount}
                page={current}
                onChange={setCurrent}
            />
        </List>
    );
};


export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  if (!authenticated) {
    return {
      props: {},
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default SalesList